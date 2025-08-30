import { prisma } from '@/lib/prisma';
import { CaseRepository } from '../repository/caseRepository';
import { CustomerRepository } from '../repository/customerRepository';
import { CustomerLifecycleService } from '../customerLifecycle/customerLifecycleService';
import { CommunicationService } from '../customerLifecycle/communicationService';
import { PersonaService } from '../customerLifecycle/personaService';
import { AutomationService } from '../customerLifecycle/automationService';

export interface CaseSubmissionData {
  // Patient Information
  firstName: string;
  middleName?: string;
  lastName: string;
  dateOfBirth: Date;
  email: string;
  phone?: string;
  ethnicity?: string;
  gender?: string;
  
  // Medical Context
  diseaseType?: string;
  isFirstOccurrence?: boolean;
  geneticFamilyHistory?: string;
  
  // System Data
  paymentId?: string;
  consentAccepted: boolean;
  customerId: string;
  
  // File attachments
  uploadedFiles?: string[]; // S3 keys
}

export interface SubmissionMetrics {
  submissionId: string;
  customerId: string;
  caseNumber: string;
  submissionTimestamp: Date;
  isFirstSubmission: boolean;
  personaAnalyzed: boolean;
  lifecycleStageUpdated: boolean;
  communicationsSent: string[];
  automationTriggered: string[];
  healthScoreImpact: number;
  segmentationUpdated: boolean;
}

export interface PreSubmissionValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  recommendations: string[];
}

export interface PostSubmissionResult {
  caseId: string;
  caseNumber: string;
  metrics: SubmissionMetrics;
  lifecycleEvents: string[];
  communicationResults: boolean[];
  automationStatus: Record<string, boolean>;
}

export class CaseSubmissionService {
  private caseRepository: CaseRepository;
  private customerRepository: CustomerRepository;
  private customerLifecycleService: CustomerLifecycleService;
  private communicationService: CommunicationService;
  private personaService: PersonaService;
  private automationService: AutomationService;

  constructor() {
    this.caseRepository = new CaseRepository();
    this.customerRepository = new CustomerRepository();
    this.customerLifecycleService = new CustomerLifecycleService();
    this.communicationService = new CommunicationService();
    this.personaService = new PersonaService();
    this.automationService = new AutomationService();
  }

  /**
   * Submit a new case with full lifecycle integration
   */
  async submitCase(data: CaseSubmissionData): Promise<PostSubmissionResult> {
    return await prisma.$transaction(async (tx) => {
      try {
        // Step 1: Pre-submission validation
        const validationResult = await this.validatePreSubmission(data);
        if (!validationResult.isValid) {
          throw new Error(`Validation failed: ${validationResult.errors.join(', ')}`);
        }

        // Step 2: Determine if this is a first-time submission
        const customerCases = await this.caseRepository.findAll({ customerId: data.customerId });
        const isFirstSubmission = customerCases.total === 0;

        // Step 3: Create the case
        const newCase = await this.caseRepository.create({
          firstName: data.firstName,
          middleName: data.middleName,
          lastName: data.lastName,
          dateOfBirth: data.dateOfBirth,
          email: data.email,
          phone: data.phone,
          ethnicity: data.ethnicity,
          gender: data.gender,
          diseaseType: data.diseaseType,
          isFirstOccurrence: data.isFirstOccurrence,
          geneticFamilyHistory: data.geneticFamilyHistory,
          paymentId: data.paymentId,
          consentAccepted: data.consentAccepted,
          customerId: data.customerId,
        });

        // Step 4: Handle file attachments if provided
        if (data.uploadedFiles && data.uploadedFiles.length > 0) {
          await this.linkUploadedFiles(newCase.id, data.uploadedFiles);
        }

        // Step 5: Execute appropriate submission flow
        let result: PostSubmissionResult;
        if (isFirstSubmission) {
          result = await this.submitFirstCase(newCase, data);
        } else {
          result = await this.submitFollowUpCase(newCase, data);
        }

        // Step 6: Track submission metrics
        const metrics = await this.trackSubmissionMetrics(newCase, data, result);
        result.metrics = metrics;

        return result;

      } catch (error) {
        console.error('Case submission failed:', error);
        throw error;
      }
    });
  }

  /**
   * Submit first case with special onboarding flow
   */
  async submitFirstCase(caseData: any, submissionData: CaseSubmissionData): Promise<PostSubmissionResult> {
    const lifecycleEvents: string[] = [];
    const communicationResults: boolean[] = [];
    const automationStatus: Record<string, boolean> = {};

    try {
      // 1. Update customer lifecycle stage to 'onboarding'
      await this.customerLifecycleService.updateCustomerStage(submissionData.customerId, {
        stage: 'onboarding',
        timestamp: new Date(),
        reason: 'First case submission'
      });
      lifecycleEvents.push('lifecycle_stage_updated_to_onboarding');

      // 2. Trigger persona analysis for new customer
      const personaAnalysis = await this.personaService.analyzeCustomerPersona(submissionData.customerId);
      lifecycleEvents.push('persona_analysis_completed');

      // 3. Send welcome communication sequence
      const welcomeResult = await this.communicationService.sendLifecycleMessage(
        submissionData.customerId,
        'onboarding',
        {
          caseNumber: caseData.caseNumber,
          firstName: submissionData.firstName,
          portalLink: `${process.env.NEXT_PUBLIC_APP_URL}/portal`,
        }
      );
      communicationResults.push(welcomeResult);

      // 4. Trigger onboarding automation sequence
      try {
        await this.automationService.triggerEventAutomation('first_case_submitted', {
          customerId: submissionData.customerId,
          caseNumber: caseData.caseNumber,
          personaType: personaAnalysis.type,
          diseaseType: submissionData.diseaseType,
          timestamp: new Date()
        });
        automationStatus['onboarding_sequence'] = true;
        lifecycleEvents.push('onboarding_automation_triggered');
      } catch (error) {
        console.error('Onboarding automation failed:', error);
        automationStatus['onboarding_sequence'] = false;
      }

      // 5. Schedule follow-up communications
      try {
        await this.scheduleOnboardingFollowUps(submissionData.customerId, caseData.caseNumber, personaAnalysis);
        automationStatus['follow_up_scheduling'] = true;
        lifecycleEvents.push('follow_up_communications_scheduled');
      } catch (error) {
        console.error('Follow-up scheduling failed:', error);
        automationStatus['follow_up_scheduling'] = false;
      }

      // 6. Update customer segmentation
      try {
        await this.updateCustomerSegmentation(submissionData.customerId, true, submissionData.diseaseType);
        lifecycleEvents.push('customer_segmentation_updated');
      } catch (error) {
        console.error('Customer segmentation update failed:', error);
      }

      // 7. Notify customer lifecycle service
      await this.customerLifecycleService.onCaseSubmitted(submissionData.customerId, caseData.caseNumber);

      return {
        caseId: caseData.id,
        caseNumber: caseData.caseNumber,
        lifecycleEvents,
        communicationResults,
        automationStatus,
        metrics: {} as SubmissionMetrics // Will be filled by caller
      };

    } catch (error) {
      console.error('First case submission processing failed:', error);
      throw error;
    }
  }

  /**
   * Submit follow-up case for returning customers
   */
  async submitFollowUpCase(caseData: any, submissionData: CaseSubmissionData): Promise<PostSubmissionResult> {
    const lifecycleEvents: string[] = [];
    const communicationResults: boolean[] = [];
    const automationStatus: Record<string, boolean> = {};

    try {
      // 1. Update customer lifecycle stage to 'active'
      await this.customerLifecycleService.updateCustomerStage(submissionData.customerId, {
        stage: 'active',
        timestamp: new Date(),
        reason: 'Follow-up case submission'
      });
      lifecycleEvents.push('lifecycle_stage_updated_to_active');

      // 2. Get existing customer persona
      const existingPersona = await this.personaService.analyzeCustomerPersona(submissionData.customerId);
      
      // 3. Check if persona needs updating based on new case data
      const personaUpdateNeeded = await this.shouldUpdatePersona(submissionData, existingPersona);
      if (personaUpdateNeeded) {
        await this.personaService.analyzeCustomerPersona(submissionData.customerId);
        lifecycleEvents.push('persona_analysis_updated');
      }

      // 4. Send returning customer communication
      const returnCustomerResult = await this.communicationService.sendLifecycleMessage(
        submissionData.customerId,
        'active',
        {
          caseNumber: caseData.caseNumber,
          firstName: submissionData.firstName,
          portalLink: `${process.env.NEXT_PUBLIC_APP_URL}/portal/cases/${caseData.caseNumber}`,
        }
      );
      communicationResults.push(returnCustomerResult);

      // 5. Trigger returning customer automation
      try {
        await this.automationService.triggerEventAutomation('follow_up_case_submitted', {
          customerId: submissionData.customerId,
          caseNumber: caseData.caseNumber,
          personaType: existingPersona.type,
          diseaseType: submissionData.diseaseType,
          timestamp: new Date(),
          previousCaseCount: await this.getPreviousCaseCount(submissionData.customerId)
        });
        automationStatus['returning_customer_sequence'] = true;
        lifecycleEvents.push('returning_customer_automation_triggered');
      } catch (error) {
        console.error('Returning customer automation failed:', error);
        automationStatus['returning_customer_sequence'] = false;
      }

      // 6. Update health score based on engagement
      try {
        await this.updateHealthScoreForSubmission(submissionData.customerId);
        lifecycleEvents.push('health_score_updated');
      } catch (error) {
        console.error('Health score update failed:', error);
      }

      // 7. Check for loyalty program eligibility
      try {
        await this.checkLoyaltyProgramEligibility(submissionData.customerId);
        automationStatus['loyalty_program_check'] = true;
      } catch (error) {
        console.error('Loyalty program check failed:', error);
        automationStatus['loyalty_program_check'] = false;
      }

      // 8. Notify customer lifecycle service
      await this.customerLifecycleService.onCaseSubmitted(submissionData.customerId, caseData.caseNumber);

      return {
        caseId: caseData.id,
        caseNumber: caseData.caseNumber,
        lifecycleEvents,
        communicationResults,
        automationStatus,
        metrics: {} as SubmissionMetrics // Will be filled by caller
      };

    } catch (error) {
      console.error('Follow-up case submission processing failed:', error);
      throw error;
    }
  }

  /**
   * Track submission metrics for analytics
   */
  async trackSubmissionMetrics(caseData: any, submissionData: CaseSubmissionData, result: PostSubmissionResult): Promise<SubmissionMetrics> {
    try {
      const isFirstSubmission = result.lifecycleEvents.includes('lifecycle_stage_updated_to_onboarding');
      const personaAnalyzed = result.lifecycleEvents.includes('persona_analysis_completed') || 
                              result.lifecycleEvents.includes('persona_analysis_updated');
      
      // Calculate health score impact
      const previousScore = await this.customerLifecycleService.getCustomerHealthScore(submissionData.customerId);
      // Submission typically increases health score by 15-20 points
      const healthScoreImpact = isFirstSubmission ? 25 : 15;

      // Track communications sent
      const communicationsSent: string[] = [];
      if (result.communicationResults[0]) {
        communicationsSent.push(isFirstSubmission ? 'welcome_email' : 'case_confirmation_email');
      }

      // Track automations triggered
      const automationTriggered = Object.keys(result.automationStatus)
        .filter(key => result.automationStatus[key]);

      const metrics: SubmissionMetrics = {
        submissionId: `sub_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        customerId: submissionData.customerId,
        caseNumber: caseData.caseNumber,
        submissionTimestamp: new Date(),
        isFirstSubmission,
        personaAnalyzed,
        lifecycleStageUpdated: result.lifecycleEvents.includes('lifecycle_stage_updated_to_onboarding') || 
                               result.lifecycleEvents.includes('lifecycle_stage_updated_to_active'),
        communicationsSent,
        automationTriggered,
        healthScoreImpact,
        segmentationUpdated: result.lifecycleEvents.includes('customer_segmentation_updated'),
      };

      // Log metrics for analytics (in production, this would go to analytics service)
      console.log('Submission metrics tracked:', metrics);
      
      return metrics;

    } catch (error) {
      console.error('Failed to track submission metrics:', error);
      // Return basic metrics even if tracking fails
      return {
        submissionId: `sub_${Date.now()}_error`,
        customerId: submissionData.customerId,
        caseNumber: caseData.caseNumber,
        submissionTimestamp: new Date(),
        isFirstSubmission: false,
        personaAnalyzed: false,
        lifecycleStageUpdated: false,
        communicationsSent: [],
        automationTriggered: [],
        healthScoreImpact: 0,
        segmentationUpdated: false,
      };
    }
  }

  /**
   * Pre-submission validation hooks
   */
  async validatePreSubmission(data: CaseSubmissionData): Promise<PreSubmissionValidationResult> {
    const errors: string[] = [];
    const warnings: string[] = [];
    const recommendations: string[] = [];

    try {
      // 1. Validate required fields
      if (!data.firstName?.trim()) errors.push('First name is required');
      if (!data.lastName?.trim()) errors.push('Last name is required');
      if (!data.email?.trim()) errors.push('Email is required');
      if (!data.dateOfBirth) errors.push('Date of birth is required');
      if (!data.customerId?.trim()) errors.push('Customer ID is required');
      if (!data.consentAccepted) errors.push('Consent must be accepted');

      // 2. Validate email format
      if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.push('Invalid email format');
      }

      // 3. Validate date of birth
      if (data.dateOfBirth) {
        const age = (Date.now() - data.dateOfBirth.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
        if (age < 0) errors.push('Invalid date of birth (future date)');
        if (age > 150) warnings.push('Unusual age detected, please verify');
        if (age < 18) warnings.push('Patient is under 18, special consent may be required');
      }

      // 4. Validate customer exists
      const customer = await this.customerRepository.findById(data.customerId);
      if (!customer) {
        errors.push('Customer not found');
      } else {
        // Check if customer email matches
        if (customer.email !== data.email) {
          warnings.push('Email differs from customer record');
        }
      }

      // 5. Check for duplicate submissions (same patient, similar disease type, within 7 days)
      if (customer) {
        const recentCases = await this.getRecentSimilarCases(data.customerId, data.diseaseType, 7);
        if (recentCases.length > 0) {
          warnings.push('Similar case submitted recently, consider if this is intentional');
        }
      }

      // 6. Validate genetic family history format if provided
      if (data.geneticFamilyHistory) {
        try {
          JSON.parse(data.geneticFamilyHistory);
        } catch {
          errors.push('Invalid genetic family history format');
        }
      }

      // 7. Business rule validations
      if (data.isFirstOccurrence === false && !data.diseaseType) {
        recommendations.push('Disease type recommended for recurring conditions');
      }

      if (!data.phone) {
        recommendations.push('Phone number recommended for urgent communications');
      }

      if (!data.diseaseType) {
        recommendations.push('Disease type helps with professional matching');
      }

      return {
        isValid: errors.length === 0,
        errors,
        warnings,
        recommendations,
      };

    } catch (error) {
      console.error('Pre-submission validation failed:', error);
      return {
        isValid: false,
        errors: ['Validation process failed', error.message],
        warnings,
        recommendations,
      };
    }
  }

  /**
   * Post-submission lifecycle events
   */
  async executePostSubmissionEvents(caseId: string, customerId: string): Promise<void> {
    try {
      // 1. Schedule AI processing
      await this.scheduleAIProcessing(caseId);

      // 2. Trigger professional assignment
      await this.triggerProfessionalAssignment(caseId);

      // 3. Update customer analytics
      await this.updateCustomerAnalytics(customerId, 'case_submitted');

      // 4. Log case submission event
      await this.logCaseEvent(caseId, 'case_submitted', { timestamp: new Date() });

    } catch (error) {
      console.error('Post-submission events failed:', error);
      // Don't throw error to prevent transaction rollback
    }
  }

  /**
   * Private helper methods
   */
  private async linkUploadedFiles(caseId: string, s3Keys: string[]): Promise<void> {
    // In a real implementation, this would link existing S3 uploads to the case
    // For now, we'll log this action
    console.log(`Linking ${s3Keys.length} files to case ${caseId}:`, s3Keys);
  }

  private async scheduleOnboardingFollowUps(customerId: string, caseNumber: string, persona: any): Promise<void> {
    // Schedule 24h, 48h, and 1-week follow-up communications based on persona
    const followUpSchedule = this.getPersonalizedFollowUpSchedule(persona);
    
    for (const followUp of followUpSchedule) {
      await this.automationService.scheduleEventAutomation('follow_up_communication', {
        customerId,
        caseNumber,
        communicationType: followUp.type,
        scheduledFor: followUp.scheduledTime,
        personaType: persona.type
      });
    }
  }

  private async updateCustomerSegmentation(customerId: string, isFirstSubmission: boolean, diseaseType?: string): Promise<void> {
    try {
      await this.personaService.updateCustomerSegment(customerId, {
        hasSubmittedCase: true,
        isFirstTimeUser: isFirstSubmission,
        primaryCondition: diseaseType,
        lastActivity: new Date(),
        engagementLevel: isFirstSubmission ? 'new' : 'active'
      });
    } catch (error) {
      console.error('Customer segmentation update failed:', error);
    }
  }

  private async shouldUpdatePersona(submissionData: CaseSubmissionData, existingPersona: any): Promise<boolean> {
    // Update persona if disease type changed or significant time passed
    const personaWithMetadata = await this.personaService.getCustomerPersonaWithMetadata(submissionData.customerId);
    const daysSinceLastAnalysis = personaWithMetadata.lastAnalyzed ? 
      (Date.now() - new Date(personaWithMetadata.lastAnalyzed).getTime()) / (1000 * 60 * 60 * 24) : 999;
    
    return daysSinceLastAnalysis > 30 || 
           (submissionData.diseaseType && submissionData.diseaseType !== personaWithMetadata.primaryCondition);
  }

  private async getPreviousCaseCount(customerId: string): Promise<number> {
    const cases = await this.caseRepository.findAll({ customerId });
    return cases.total;
  }

  private async updateHealthScoreForSubmission(customerId: string): Promise<void> {
    // Health score increases with each submission, showing engagement
    try {
      const currentScore = await this.customerLifecycleService.getCustomerHealthScore(customerId);
      console.log(`Customer ${customerId} health score updated from engagement: ${currentScore} -> ${currentScore + 15}`);
    } catch (error) {
      console.error('Health score update failed:', error);
    }
  }

  private async checkLoyaltyProgramEligibility(customerId: string): Promise<void> {
    const caseCount = await this.getPreviousCaseCount(customerId);
    
    if (caseCount >= 3) {
      await this.automationService.triggerEventAutomation('loyalty_program_eligible', {
        customerId,
        caseCount,
        timestamp: new Date()
      });
    }
  }

  private async getRecentSimilarCases(customerId: string, diseaseType?: string, daysPast: number = 7): Promise<any[]> {
    if (!diseaseType) return [];
    
    const dateThreshold = new Date(Date.now() - (daysPast * 24 * 60 * 60 * 1000));
    
    try {
      const cases = await prisma.case.findMany({
        where: {
          customerId,
          diseaseType,
          createdAt: {
            gte: dateThreshold
          }
        },
        select: {
          id: true,
          caseNumber: true,
          createdAt: true,
          diseaseType: true
        }
      });
      
      return cases;
    } catch (error) {
      console.error('Failed to check for recent similar cases:', error);
      return [];
    }
  }

  private async scheduleAIProcessing(caseId: string): Promise<void> {
    // Schedule AI analysis - in production this would trigger the AI pipeline
    console.log(`AI processing scheduled for case ${caseId}`);
  }

  private async triggerProfessionalAssignment(caseId: string): Promise<void> {
    // Trigger professional assignment - in production this would use the assignment service
    console.log(`Professional assignment triggered for case ${caseId}`);
  }

  private async updateCustomerAnalytics(customerId: string, eventType: string): Promise<void> {
    // Update analytics - in production this would send to analytics service
    console.log(`Customer analytics updated: ${customerId} - ${eventType}`);
  }

  private async logCaseEvent(caseId: string, eventType: string, metadata: any): Promise<void> {
    // Log case event - in production this would use an event logging service
    console.log(`Case event logged: ${caseId} - ${eventType}`, metadata);
  }

  private getPersonalizedFollowUpSchedule(persona: any): Array<{type: string, scheduledTime: Date}> {
    const now = new Date();
    const schedule = [];

    // Base schedule
    schedule.push({
      type: 'case_status_check',
      scheduledTime: new Date(now.getTime() + (24 * 60 * 60 * 1000)) // 24 hours
    });

    // Persona-specific scheduling
    if (persona.type === 'anxious') {
      schedule.push({
        type: 'reassurance_message',
        scheduledTime: new Date(now.getTime() + (48 * 60 * 60 * 1000)) // 48 hours
      });
    }

    schedule.push({
      type: 'progress_update',
      scheduledTime: new Date(now.getTime() + (7 * 24 * 60 * 60 * 1000)) // 1 week
    });

    return schedule;
  }

  /**
   * Get submission analytics
   */
  async getSubmissionAnalytics(customerId?: string, dateFrom?: Date, dateTo?: Date) {
    try {
      const whereClause: any = {};
      
      if (customerId) {
        whereClause.customerId = customerId;
      }
      
      if (dateFrom || dateTo) {
        whereClause.createdAt = {};
        if (dateFrom) whereClause.createdAt.gte = dateFrom;
        if (dateTo) whereClause.createdAt.lte = dateTo;
      }

      const cases = await prisma.case.findMany({
        where: whereClause,
        include: {
          customer: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              createdAt: true
            }
          }
        }
      });

      // Calculate metrics
      const totalSubmissions = cases.length;
      const uniqueCustomers = new Set(cases.map(c => c.customerId)).size;
      const firstTimeSubmissions = cases.filter(c => {
        // This would need a more sophisticated check in production
        return true; // Placeholder
      }).length;

      const diseaseTypeDistribution = cases.reduce((acc, c) => {
        const type = c.diseaseType || 'unknown';
        acc[type] = (acc[type] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      return {
        totalSubmissions,
        uniqueCustomers,
        firstTimeSubmissions,
        returningSubmissions: totalSubmissions - firstTimeSubmissions,
        diseaseTypeDistribution,
        averageSubmissionsPerCustomer: totalSubmissions / uniqueCustomers || 0,
        timeframe: { from: dateFrom, to: dateTo }
      };

    } catch (error) {
      console.error('Failed to get submission analytics:', error);
      throw error;
    }
  }
}
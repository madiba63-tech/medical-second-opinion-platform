import { CustomerRepository } from '../repository/customerRepository';
import { CaseRepository } from '../repository/caseRepository';
import { CommunicationService } from './communicationService';
import { PersonaService } from './personaService';
import { AutomationService } from './automationService';

export interface CustomerLifecycleStage {
  stage: 'onboarding' | 'active' | 'inactive' | 'churned' | 'reactivated';
  timestamp: Date;
  reason?: string;
}

export interface CustomerJourney {
  customerId: string;
  stages: CustomerLifecycleStage[];
  currentStage: CustomerLifecycleStage;
  totalCases: number;
  lastActivity: Date;
  lifetimeValue: number;
}

export class CustomerLifecycleService {
  private customerRepository: CustomerRepository;
  private caseRepository: CaseRepository;
  private communicationService: CommunicationService;
  private personaService: PersonaService;
  private automationService: AutomationService;

  constructor() {
    this.customerRepository = new CustomerRepository();
    this.caseRepository = new CaseRepository();
    this.communicationService = new CommunicationService();
    this.personaService = new PersonaService();
    this.automationService = new AutomationService();
    // Break circular dependency by setting the lifecycle service reference
    this.automationService.setLifecycleService(this);
  }

  /**
   * Get complete customer journey
   */
  async getCustomerJourney(customerId: string): Promise<CustomerJourney | null> {
    const customer = await this.customerRepository.findById(customerId);
    if (!customer) return null;

    const cases = await this.caseRepository.findAll({ customerId });
    
    // Calculate lifetime value (sum of all case payments)
    const lifetimeValue = cases.cases.reduce((total, caseItem) => {
      // Assuming $299 per case for now
      return total + 299;
    }, 0);

    // Determine current stage based on activity
    const lastActivity = customer.cases?.[0]?.createdAt || customer.createdAt;
    const daysSinceLastActivity = (Date.now() - new Date(lastActivity).getTime()) / (1000 * 60 * 60 * 24);
    
    let currentStage: CustomerLifecycleStage;
    if (daysSinceLastActivity < 30) {
      currentStage = { stage: 'active', timestamp: new Date() };
    } else if (daysSinceLastActivity < 90) {
      currentStage = { stage: 'inactive', timestamp: new Date() };
    } else {
      currentStage = { stage: 'churned', timestamp: new Date() };
    }

    // Build journey stages
    const stages: CustomerLifecycleStage[] = [
      { stage: 'onboarding', timestamp: customer.createdAt },
      currentStage,
    ];

    return {
      customerId,
      stages,
      currentStage,
      totalCases: cases.total,
      lastActivity: new Date(lastActivity),
      lifetimeValue,
    };
  }

  /**
   * Update customer lifecycle stage
   */
  async updateCustomerStage(customerId: string, stage: CustomerLifecycleStage) {
    // In a real implementation, this would store lifecycle events
    // For now, we'll just log the stage change
    console.log(`Customer ${customerId} stage changed to ${stage.stage}`, stage);
    
    return await this.customerRepository.update(customerId, {
      // Add stage tracking fields to customer model if needed
    });
  }

  /**
   * Get customers by lifecycle stage
   */
  async getCustomersByStage(stage: string, page: number = 1, limit: number = 20) {
    const customers = await this.customerRepository.findAll({}, page, limit);
    
    // Filter by stage (this would be more efficient with database-level filtering)
    const filteredCustomers = customers.customers.filter(async (customer) => {
      const journey = await this.getCustomerJourney(customer.id);
      return journey?.currentStage.stage === stage;
    });

    return {
      customers: filteredCustomers,
      total: filteredCustomers.length,
      page,
      totalPages: Math.ceil(filteredCustomers.length / limit),
    };
  }

  /**
   * Get customer lifecycle statistics
   */
  async getLifecycleStatistics() {
    const allCustomers = await this.customerRepository.findAll({}, 1, 1000);
    
    const stageCounts = {
      onboarding: 0,
      active: 0,
      inactive: 0,
      churned: 0,
      reactivated: 0,
    };

    for (const customer of allCustomers.customers) {
      const journey = await this.getCustomerJourney(customer.id);
      if (journey) {
        stageCounts[journey.currentStage.stage]++;
      }
    }

    return {
      totalCustomers: allCustomers.total,
      stageDistribution: stageCounts,
      averageLifetimeValue: 0, // Would calculate from actual payment data
    };
  }

  /**
   * Trigger customer re-engagement
   */
  async triggerReEngagement(customerId: string) {
    const customer = await this.customerRepository.findById(customerId);
    if (!customer) throw new Error('Customer not found');

    // Analyze customer persona for personalized approach
    const persona = await this.personaService.analyzeCustomerPersona(customerId);
    
    // Update stage to reactivated
    await this.updateCustomerStage(customerId, {
      stage: 'reactivated',
      timestamp: new Date(),
      reason: 'Re-engagement campaign',
    });

    // Send personalized re-engagement communication
    const success = await this.communicationService.sendLifecycleMessage(
      customerId,
      'inactive',
      {
        portalLink: `https://platform.com/portal`,
        reactivationLink: `https://platform.com/submit?ref=reactivation&customer=${customerId}`,
        personaType: persona.type
      }
    );

    // Trigger automation for follow-up sequence
    await this.automationService.triggerEventAutomation('reengagement_initiated', {
      customerId,
      persona: persona.type,
      previousStage: 'inactive'
    });

    return { 
      success, 
      message: success ? 'Re-engagement triggered successfully' : 'Failed to send re-engagement message',
      persona: persona.type,
      confidence: persona.confidence
    };
  }

  /**
   * Get customer health score
   */
  async getCustomerHealthScore(customerId: string): Promise<number> {
    const journey = await this.getCustomerJourney(customerId);
    if (!journey) return 0;

    let score = 0;

    // Activity score (40% weight)
    const daysSinceLastActivity = (Date.now() - journey.lastActivity.getTime()) / (1000 * 60 * 60 * 24);
    if (daysSinceLastActivity < 7) score += 40;
    else if (daysSinceLastActivity < 30) score += 30;
    else if (daysSinceLastActivity < 90) score += 20;
    else score += 10;

    // Engagement score (30% weight)
    if (journey.totalCases > 3) score += 30;
    else if (journey.totalCases > 1) score += 20;
    else score += 10;

    // Value score (30% weight)
    if (journey.lifetimeValue > 1000) score += 30;
    else if (journey.lifetimeValue > 500) score += 20;
    else score += 10;

    return score;
  }

  /**
   * Get at-risk customers
   */
  async getAtRiskCustomers(threshold: number = 50) {
    const allCustomers = await this.customerRepository.findAll({}, 1, 1000);
    const atRiskCustomers = [];

    for (const customer of allCustomers.customers) {
      const healthScore = await this.getCustomerHealthScore(customer.id);
      if (healthScore < threshold) {
        atRiskCustomers.push({
          customer,
          healthScore,
        });
      }
    }

    return atRiskCustomers.sort((a, b) => a.healthScore - b.healthScore);
  }

  /**
   * Get customer persona analysis
   */
  async getCustomerPersona(customerId: string) {
    return await this.personaService.analyzeCustomerPersona(customerId);
  }

  /**
   * Get personalized experience recommendations
   */
  async getPersonalizedRecommendations(customerId: string) {
    const persona = await this.personaService.analyzeCustomerPersona(customerId);
    return this.personaService.getPersonalizedExperienceRecommendations(persona);
  }

  /**
   * Send lifecycle-based communication
   */
  async sendLifecycleCommunication(customerId: string, messageType: string, variables?: Record<string, string>) {
    const journey = await this.getCustomerJourney(customerId);
    if (!journey) return false;

    return await this.communicationService.sendLifecycleMessage(
      customerId,
      journey.currentStage.stage,
      variables
    );
  }

  /**
   * Get communication history
   */
  async getCommunicationHistory(customerId: string) {
    return await this.communicationService.getCommunicationHistory(customerId);
  }

  /**
   * Create automated lifecycle campaign
   */
  async createLifecycleCampaign(campaignConfig: any) {
    return this.automationService.createAutomationRule(campaignConfig);
  }

  /**
   * Execute all automated lifecycle triggers
   */
  async executeLifecycleAutomations() {
    return await this.automationService.executeAutomations();
  }

  /**
   * Get customer segments
   */
  async getCustomerSegments() {
    return await this.personaService.createCustomerSegments();
  }

  /**
   * Trigger case submission automation
   */
  async onCaseSubmitted(customerId: string, caseNumber: string) {
    await this.automationService.triggerEventAutomation('case_submitted', {
      customerId,
      caseNumber,
      timestamp: new Date()
    });
  }

  /**
   * Trigger case completion automation
   */
  async onCaseCompleted(customerId: string, caseNumber: string, summary: string) {
    await this.automationService.triggerEventAutomation('case_completed', {
      customerId,
      caseNumber,
      summary,
      timestamp: new Date()
    });
  }
}

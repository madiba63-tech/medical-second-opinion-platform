import { CustomerLifecycleService } from './customerLifecycleService';
import { CommunicationService } from './communicationService';
import { PersonaService } from './personaService';
import { AutomationService } from './automationService';

export interface PortalIntegrationContext {
  customerId: string;
  sessionId?: string;
  deviceType: 'mobile' | 'tablet' | 'desktop';
  lastActivity: Date;
  referrer?: string;
}

export interface PortalEvent {
  eventType: 'page_view' | 'action_click' | 'form_submit' | 'case_status_check' | 'support_request';
  customerId: string;
  timestamp: Date;
  data: Record<string, any>;
  persona?: string;
  lifecycleStage?: string;
}

export class PortalIntegrationService {
  private lifecycleService: CustomerLifecycleService;
  private communicationService: CommunicationService;
  private personaService: PersonaService;
  private automationService: AutomationService;

  constructor() {
    this.lifecycleService = new CustomerLifecycleService();
    this.communicationService = new CommunicationService();
    this.personaService = new PersonaService();
    this.automationService = new AutomationService();
  }

  /**
   * Initialize customer session with lifecycle context
   */
  async initializeCustomerSession(context: PortalIntegrationContext) {
    try {
      // Get or create customer lifecycle profile
      let journey = await this.lifecycleService.getCustomerJourney(context.customerId);
      
      if (!journey) {
        // First time visitor - initialize with onboarding stage
        await this.lifecycleService.updateCustomerStage(context.customerId, {
          stage: 'onboarding',
          timestamp: new Date(),
          reason: 'First portal visit'
        });
        journey = await this.lifecycleService.getCustomerJourney(context.customerId);
      }

      // Analyze customer persona if not already done
      const persona = await this.personaService.analyzeCustomerPersona(context.customerId);
      
      // Update last activity
      await this.updateCustomerActivity(context.customerId, context.deviceType);

      // Trigger session-based automations
      await this.automationService.triggerEventAutomation('portal_session_start', {
        customerId: context.customerId,
        deviceType: context.deviceType,
        persona: persona.type,
        stage: journey?.currentStage.stage,
        timestamp: new Date()
      });

      return {
        journey,
        persona,
        sessionInitialized: true,
        recommendations: await this.lifecycleService.getPersonalizedRecommendations(context.customerId)
      };
    } catch (error) {
      console.error('Error initializing customer session:', error);
      throw error;
    }
  }

  /**
   * Track customer portal events for lifecycle analysis
   */
  async trackPortalEvent(event: PortalEvent) {
    try {
      // Log the event for analytics
      console.log(`[PORTAL EVENT] ${event.eventType}:`, {
        customerId: event.customerId,
        timestamp: event.timestamp,
        data: event.data
      });

      // Update customer activity based on event
      await this.updateCustomerActivity(event.customerId, event.data.deviceType);

      // Trigger relevant automations based on event type
      switch (event.eventType) {
        case 'case_status_check':
          await this.handleCaseStatusCheck(event);
          break;
        case 'support_request':
          await this.handleSupportRequest(event);
          break;
        case 'form_submit':
          await this.handleFormSubmission(event);
          break;
        case 'page_view':
          await this.handlePageView(event);
          break;
      }

      return { eventTracked: true };
    } catch (error) {
      console.error('Error tracking portal event:', error);
      return { eventTracked: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  /**
   * Get personalized dashboard configuration
   */
  async getPersonalizedDashboard(customerId: string) {
    try {
      const [journey, persona, healthScore, recommendations] = await Promise.all([
        this.lifecycleService.getCustomerJourney(customerId),
        this.personaService.analyzeCustomerPersona(customerId),
        this.lifecycleService.getCustomerHealthScore(customerId),
        this.lifecycleService.getPersonalizedRecommendations(customerId)
      ]);

      if (!journey) {
        throw new Error('Customer journey not found');
      }

      // Generate persona-based dashboard configuration
      const dashboardConfig = this.generateDashboardConfig(persona, journey.currentStage.stage);
      
      // Get personalized content
      const personalizedContent = await this.generatePersonalizedContent(customerId, persona, journey);

      return {
        profile: {
          customerId,
          persona: {
            type: persona.type,
            confidence: persona.confidence,
            characteristics: persona.characteristics
          },
          currentStage: journey.currentStage,
          healthScore,
          totalCases: journey.totalCases,
          lifetimeValue: journey.lifetimeValue
        },
        dashboardConfig,
        personalizedContent,
        recommendations
      };
    } catch (error) {
      console.error('Error generating personalized dashboard:', error);
      throw error;
    }
  }

  /**
   * Handle real-time notifications for portal
   */
  async sendPortalNotification(customerId: string, notification: {
    type: string;
    title: string;
    message: string;
    priority: 'low' | 'medium' | 'high' | 'urgent';
    actionUrl?: string;
    metadata?: Record<string, any>;
  }) {
    try {
      // Get customer persona for personalized messaging
      const persona = await this.personaService.analyzeCustomerPersona(customerId);
      
      // Personalize the notification message based on persona
      const personalizedMessage = this.personalizeNotificationMessage(
        notification.message, 
        persona.type
      );

      // Send through communication service
      const success = await this.communicationService.sendMultiChannelNotification(
        customerId,
        personalizedMessage,
        notification.priority
      );

      return { 
        success,
        notificationId: `portal_${Date.now()}`,
        personalizedFor: persona.type
      };
    } catch (error) {
      console.error('Error sending portal notification:', error);
      throw error;
    }
  }

  /**
   * Update customer activity timestamp and engagement metrics
   */
  private async updateCustomerActivity(customerId: string, deviceType: string) {
    try {
      // Update last activity timestamp
      const now = new Date();
      
      // Calculate engagement score based on activity patterns
      const currentHealthScore = await this.lifecycleService.getCustomerHealthScore(customerId);
      
      // Increase health score slightly for portal activity
      const activityBonus = deviceType === 'mobile' ? 2 : 1; // Mobile usage gets bonus
      const newHealthScore = Math.min(100, currentHealthScore + activityBonus);

      // Log activity for future analytics
      console.log(`[ACTIVITY] Customer ${customerId} active on ${deviceType} at ${now.toISOString()}`);
      
      return { activityUpdated: true, newHealthScore };
    } catch (error) {
      console.error('Error updating customer activity:', error);
      return { activityUpdated: false };
    }
  }

  /**
   * Handle case status check events
   */
  private async handleCaseStatusCheck(event: PortalEvent) {
    const { customerId, data } = event;
    
    // Track engagement - customer is actively checking case status
    await this.lifecycleService.updateCustomerStage(customerId, {
      stage: 'active',
      timestamp: new Date(),
      reason: 'Active case monitoring'
    });

    // If case has updates, send notification
    if (data.hasUpdates) {
      await this.sendPortalNotification(customerId, {
        type: 'case_status',
        title: 'Case Status Update',
        message: `Your case ${data.caseNumber} has been updated`,
        priority: 'high',
        actionUrl: `/portal/cases/${data.caseNumber}`
      });
    }
  }

  /**
   * Handle support request events
   */
  private async handleSupportRequest(event: PortalEvent) {
    const { customerId, data } = event;
    
    // Get customer persona to determine support approach
    const persona = await this.personaService.analyzeCustomerPersona(customerId);
    
    // Route support request based on persona preferences
    const supportApproach = this.getSupportApproach(persona.type);
    
    // Send appropriate support response
    await this.sendPortalNotification(customerId, {
      type: 'support_response',
      title: 'Support Request Received',
      message: supportApproach.message,
      priority: 'medium',
      actionUrl: supportApproach.actionUrl
    });

    // Trigger support workflow automation
    await this.automationService.triggerEventAutomation('support_requested', {
      customerId,
      persona: persona.type,
      requestType: data.requestType,
      priority: data.priority || 'medium'
    });
  }

  /**
   * Handle form submission events
   */
  private async handleFormSubmission(event: PortalEvent) {
    const { customerId, data } = event;
    
    // Update customer journey based on form type
    if (data.formType === 'profile_update') {
      await this.lifecycleService.updateCustomerStage(customerId, {
        stage: 'active',
        timestamp: new Date(),
        reason: 'Profile information updated'
      });
    } else if (data.formType === 'case_submission') {
      await this.lifecycleService.onCaseSubmitted(customerId, data.caseNumber);
    }

    // Send confirmation notification
    await this.sendPortalNotification(customerId, {
      type: 'form_confirmation',
      title: 'Information Updated',
      message: 'Your information has been successfully updated',
      priority: 'low'
    });
  }

  /**
   * Handle page view events for engagement tracking
   */
  private async handlePageView(event: PortalEvent) {
    const { customerId, data } = event;
    
    // Track page engagement patterns
    const engagementData = {
      page: data.page,
      timeOnPage: data.timeOnPage,
      timestamp: event.timestamp
    };

    // Update engagement metrics based on page interactions
    if (data.timeOnPage > 300000) { // 5+ minutes on page
      // User is highly engaged - boost health score
      console.log(`[ENGAGEMENT] High engagement detected for customer ${customerId}`);
    }
  }

  /**
   * Generate dashboard configuration based on persona
   */
  private generateDashboardConfig(persona: any, stage: string) {
    const baseConfig = {
      layout: 'standard',
      widgets: ['case_status', 'progress', 'next_steps'],
      theme: 'professional'
    };

    switch (persona.type) {
      case 'informed_advocator':
        return {
          ...baseConfig,
          layout: 'detailed',
          widgets: [...baseConfig.widgets, 'analytics', 'professional_insights', 'research_links'],
          theme: 'professional'
        };
      
      case 'cautious_researcher':
        return {
          ...baseConfig,
          layout: 'simplified',
          widgets: ['case_status', 'support_contact', 'testimonials'],
          theme: 'reassuring'
        };
      
      case 'tech_savvy_optimizer':
        return {
          ...baseConfig,
          layout: 'advanced',
          widgets: [...baseConfig.widgets, 'api_status', 'technical_metrics', 'integrations'],
          theme: 'technical'
        };
      
      default:
        return baseConfig;
    }
  }

  /**
   * Generate personalized content for portal
   */
  private async generatePersonalizedContent(customerId: string, persona: any, journey: any) {
    const communicationHistory = await this.communicationService.getCommunicationHistory(customerId);
    
    return {
      welcomeMessage: this.getPersonalizedWelcomeMessage(persona.type),
      nextSteps: this.getPersonalizedNextSteps(persona.type, journey.currentStage.stage),
      resources: this.getPersonalizedResources(persona.type),
      supportOptions: this.getPersonalizedSupportOptions(persona.type),
      recentCommunications: communicationHistory.slice(0, 3)
    };
  }

  /**
   * Personalize notification messages based on persona
   */
  private personalizeNotificationMessage(message: string, persona: string): string {
    const personalizations = {
      'informed_advocator': (msg: string) => `[Detailed Update] ${msg}`,
      'cautious_researcher': (msg: string) => `[Gentle Reminder] ${msg}`,
      'tech_savvy_optimizer': (msg: string) => `[System Alert] ${msg}`
    };

    const personalizer = personalizations[persona as keyof typeof personalizations];
    return personalizer ? personalizer(message) : message;
  }

  /**
   * Get support approach based on persona
   */
  private getSupportApproach(persona: string) {
    const approaches = {
      'informed_advocator': {
        message: 'We\'ve received your inquiry and our medical professionals will provide a detailed response within 24 hours.',
        actionUrl: '/portal/support/professional-contact'
      },
      'cautious_researcher': {
        message: 'A patient advocate will personally reach out to you within 2 hours to address your concerns.',
        actionUrl: '/portal/support/advocate-contact'
      },
      'tech_savvy_optimizer': {
        message: 'Your technical support ticket has been created. Check our developer portal for real-time status updates.',
        actionUrl: '/portal/developer/support'
      }
    };

    return approaches[persona as keyof typeof approaches] || approaches['informed_advocator'];
  }

  /**
   * Get personalized welcome message
   */
  private getPersonalizedWelcomeMessage(persona: string): string {
    const messages = {
      'informed_advocator': 'Welcome to your comprehensive health management dashboard. Here you\'ll find detailed insights and expert analysis.',
      'cautious_researcher': 'Welcome! We\'re here to guide you through every step with personalized support and clear explanations.',
      'tech_savvy_optimizer': 'Welcome to your advanced health analytics platform with real-time insights and integration capabilities.'
    };

    return messages[persona as keyof typeof messages] || 'Welcome to your personalized health portal.';
  }

  /**
   * Get personalized next steps
   */
  private getPersonalizedNextSteps(persona: string, stage: string): string[] {
    const baseSteps = [`Continue with ${stage} stage`, 'Review case progress', 'Contact support if needed'];
    
    const personaSteps = {
      'informed_advocator': ['Review professional credentials', 'Access medical literature', 'Schedule expert consultation'],
      'cautious_researcher': ['Read patient testimonials', 'Schedule support call', 'Review simplified explanations'],
      'tech_savvy_optimizer': ['Check API status', 'Review analytics dashboard', 'Configure integrations']
    };

    return [...baseSteps, ...(personaSteps[persona as keyof typeof personaSteps] || [])];
  }

  /**
   * Get personalized resources
   */
  private getPersonalizedResources(persona: string): string[] {
    const resources = {
      'informed_advocator': ['Medical research database', 'Professional credentials', 'Clinical study results'],
      'cautious_researcher': ['Patient guide', 'FAQ section', 'Support contact'],
      'tech_savvy_optimizer': ['API documentation', 'Integration guides', 'Technical specifications']
    };

    return resources[persona as keyof typeof resources] || ['General resources', 'Help center', 'Contact support'];
  }

  /**
   * Get personalized support options
   */
  private getPersonalizedSupportOptions(persona: string): string[] {
    const options = {
      'informed_advocator': ['Professional consultation', 'Email support', 'Resource library'],
      'cautious_researcher': ['Phone support', 'Patient advocate', 'Live chat'],
      'tech_savvy_optimizer': ['Technical support', 'API support', 'Developer community']
    };

    return options[persona as keyof typeof options] || ['General support', 'Help center'];
  }
}
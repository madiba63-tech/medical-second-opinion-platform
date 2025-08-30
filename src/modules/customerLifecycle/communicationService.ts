import { CustomerRepository } from '../repository/customerRepository';

export interface NotificationPreferences {
  email: boolean;
  sms: boolean;
  push: boolean;
  preferredTime?: string;
  frequency: 'immediate' | 'daily' | 'weekly';
}

export interface CommunicationTemplate {
  id: string;
  name: string;
  type: 'email' | 'sms' | 'push';
  stage: string;
  subject?: string;
  content: string;
  variables: string[];
  isActive: boolean;
}

export interface CommunicationLog {
  id: string;
  customerId: string;
  templateId: string;
  type: 'email' | 'sms' | 'push';
  status: 'sent' | 'delivered' | 'failed' | 'pending';
  sentAt: Date;
  deliveredAt?: Date;
  content: string;
  metadata?: any;
}

export class CommunicationService {
  private customerRepository: CustomerRepository;
  private templates: Map<string, CommunicationTemplate>;
  private communicationLogs: CommunicationLog[];

  constructor() {
    this.customerRepository = new CustomerRepository();
    this.templates = new Map();
    this.communicationLogs = [];
    this.initializeDefaultTemplates();
  }

  private initializeDefaultTemplates() {
    const defaultTemplates: CommunicationTemplate[] = [
      {
        id: 'onboarding-welcome',
        name: 'Welcome Email',
        type: 'email',
        stage: 'onboarding',
        subject: 'Welcome to Medical Second Opinion Platform',
        content: `
          <h2>Welcome {{firstName}}!</h2>
          <p>Thank you for choosing our Medical Second Opinion Platform. We're here to help you make informed healthcare decisions.</p>
          <p>Your case number is: <strong>{{caseNumber}}</strong></p>
          <p>What happens next:</p>
          <ul>
            <li>Our medical professionals will review your case within 24-48 hours</li>
            <li>You'll receive updates via your preferred communication method</li>
            <li>A comprehensive second opinion report will be prepared</li>
          </ul>
          <p>Questions? Contact our support team anytime.</p>
        `,
        variables: ['firstName', 'caseNumber'],
        isActive: true
      },
      {
        id: 'case-in-review',
        name: 'Case Under Review',
        type: 'email',
        stage: 'active',
        subject: 'Your case is now under review',
        content: `
          <h2>Good news, {{firstName}}!</h2>
          <p>Your case {{caseNumber}} has been assigned to our medical expert: <strong>Dr. {{doctorName}}</strong></p>
          <p>Specialization: {{specialty}}</p>
          <p>Expected completion: {{expectedDate}}</p>
          <p>Track your case progress in your <a href="{{portalLink}}">patient portal</a>.</p>
        `,
        variables: ['firstName', 'caseNumber', 'doctorName', 'specialty', 'expectedDate', 'portalLink'],
        isActive: true
      },
      {
        id: 'inactive-reengagement',
        name: 'Re-engagement Campaign',
        type: 'email',
        stage: 'inactive',
        subject: 'We miss you - Special offer inside',
        content: `
          <h2>Hi {{firstName}},</h2>
          <p>It's been a while since your last interaction with our platform. We hope your health journey is going well!</p>
          <p>As a valued customer, we're offering you:</p>
          <ul>
            <li>20% off your next second opinion consultation</li>
            <li>Priority review within 24 hours</li>
            <li>Access to our new AI-enhanced analysis features</li>
          </ul>
          <p>Use code: <strong>COMEBACK20</strong></p>
          <p><a href="{{reactivationLink}}">Get your second opinion now</a></p>
        `,
        variables: ['firstName', 'reactivationLink'],
        isActive: true
      },
      {
        id: 'health-score-alert',
        name: 'Health Score Alert',
        type: 'sms',
        stage: 'at-risk',
        content: 'Hi {{firstName}}, your health engagement score needs attention. Check your portal for personalized recommendations: {{portalLink}}',
        variables: ['firstName', 'portalLink'],
        isActive: true
      },
      {
        id: 'case-completed',
        name: 'Case Completed',
        type: 'email',
        stage: 'completed',
        subject: 'Your second opinion report is ready',
        content: `
          <h2>Your report is ready, {{firstName}}!</h2>
          <p>Dr. {{doctorName}} has completed the review of case {{caseNumber}}.</p>
          <p><strong>Key findings:</strong> {{keySummary}}</p>
          <p><a href="{{reportLink}}">Download your complete report</a></p>
          <p>Would you like to schedule a consultation to discuss these findings?</p>
          <p>We'd love your feedback on this experience.</p>
        `,
        variables: ['firstName', 'doctorName', 'caseNumber', 'keySummary', 'reportLink'],
        isActive: true
      }
    ];

    defaultTemplates.forEach(template => {
      this.templates.set(template.id, template);
    });
  }

  /**
   * Send personalized communication based on customer stage
   */
  async sendLifecycleMessage(
    customerId: string,
    stage: string,
    variables: Record<string, string> = {},
    overridePreferences: boolean = false
  ): Promise<boolean> {
    const customer = await this.customerRepository.findById(customerId);
    if (!customer) {
      throw new Error('Customer not found');
    }

    // Get customer's communication preferences
    const preferences = await this.getCustomerPreferences(customerId);
    
    // Find appropriate template
    const template = Array.from(this.templates.values()).find(
      t => t.stage === stage && t.isActive
    );

    if (!template) {
      console.log(`No template found for stage: ${stage}`);
      return false;
    }

    // Check if customer wants this type of communication
    if (!overridePreferences) {
      if (template.type === 'email' && !preferences.email) return false;
      if (template.type === 'sms' && !preferences.sms) return false;
      if (template.type === 'push' && !preferences.push) return false;
    }

    // Personalize content
    const personalizedContent = this.personalizeContent(template.content, {
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      ...variables
    });

    const personalizedSubject = template.subject ? 
      this.personalizeContent(template.subject, { firstName: customer.firstName, ...variables }) : 
      undefined;

    // Send message
    const success = await this.sendMessage(
      customer,
      template.type,
      personalizedContent,
      personalizedSubject
    );

    // Log communication
    const logEntry: CommunicationLog = {
      id: `comm_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      customerId,
      templateId: template.id,
      type: template.type,
      status: success ? 'sent' : 'failed',
      sentAt: new Date(),
      content: personalizedContent,
      metadata: variables
    };

    this.communicationLogs.push(logEntry);
    
    return success;
  }

  /**
   * Send multi-channel notification
   */
  async sendMultiChannelNotification(
    customerId: string,
    message: string,
    priority: 'low' | 'medium' | 'high' = 'medium'
  ): Promise<boolean> {
    const customer = await this.customerRepository.findById(customerId);
    if (!customer) return false;

    const preferences = await this.getCustomerPreferences(customerId);
    let sent = false;

    // High priority: send via all enabled channels
    if (priority === 'high') {
      if (preferences.email) {
        await this.sendMessage(customer, 'email', message, 'Important Update');
        sent = true;
      }
      if (preferences.sms && customer.phone) {
        await this.sendMessage(customer, 'sms', message);
        sent = true;
      }
      if (preferences.push) {
        await this.sendMessage(customer, 'push', message);
        sent = true;
      }
    } else {
      // Medium/low priority: use preferred channel
      if (preferences.email) {
        sent = await this.sendMessage(customer, 'email', message, 'Platform Update');
      } else if (preferences.sms && customer.phone) {
        sent = await this.sendMessage(customer, 'sms', message);
      } else if (preferences.push) {
        sent = await this.sendMessage(customer, 'push', message);
      }
    }

    return sent;
  }

  /**
   * Get customer communication preferences
   */
  private async getCustomerPreferences(customerId: string): Promise<NotificationPreferences> {
    const customer = await this.customerRepository.findById(customerId);
    if (!customer) {
      return { email: false, sms: false, push: false, frequency: 'immediate' };
    }

    return {
      email: customer.emailNotifications,
      sms: customer.smsNotifications,
      push: false, // Default for now
      frequency: 'immediate' // Default for now
    };
  }

  /**
   * Personalize content with variables
   */
  private personalizeContent(content: string, variables: Record<string, string>): string {
    let personalizedContent = content;
    
    Object.entries(variables).forEach(([key, value]) => {
      const placeholder = `{{${key}}}`;
      personalizedContent = personalizedContent.replace(new RegExp(placeholder, 'g'), value || '');
    });

    return personalizedContent;
  }

  /**
   * Send actual message (mock implementation)
   */
  private async sendMessage(
    customer: any,
    type: 'email' | 'sms' | 'push',
    content: string,
    subject?: string
  ): Promise<boolean> {
    try {
      switch (type) {
        case 'email':
          console.log(`[EMAIL] To: ${customer.email}`);
          console.log(`[EMAIL] Subject: ${subject}`);
          console.log(`[EMAIL] Content: ${content}`);
          // In production: integrate with SendGrid, SES, etc.
          break;

        case 'sms':
          if (customer.phone) {
            console.log(`[SMS] To: ${customer.phone}`);
            console.log(`[SMS] Content: ${content}`);
            // In production: integrate with Twilio, AWS SNS, etc.
          }
          break;

        case 'push':
          console.log(`[PUSH] To: Customer ${customer.id}`);
          console.log(`[PUSH] Content: ${content}`);
          // In production: integrate with FCM, APNS, etc.
          break;
      }

      return true;
    } catch (error) {
      console.error(`Failed to send ${type} message:`, error);
      return false;
    }
  }

  /**
   * Get communication history for customer
   */
  async getCommunicationHistory(customerId: string): Promise<CommunicationLog[]> {
    return this.communicationLogs
      .filter(log => log.customerId === customerId)
      .sort((a, b) => b.sentAt.getTime() - a.sentAt.getTime());
  }

  /**
   * Update communication template
   */
  updateTemplate(templateId: string, updates: Partial<CommunicationTemplate>): boolean {
    const template = this.templates.get(templateId);
    if (!template) return false;

    this.templates.set(templateId, { ...template, ...updates });
    return true;
  }

  /**
   * Get all templates
   */
  getAllTemplates(): CommunicationTemplate[] {
    return Array.from(this.templates.values());
  }

  /**
   * Get template by stage
   */
  getTemplatesByStage(stage: string): CommunicationTemplate[] {
    return Array.from(this.templates.values()).filter(t => t.stage === stage);
  }
}
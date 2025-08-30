import { CustomerLifecycleService } from './customerLifecycleService';
import { CommunicationService } from './communicationService';
import { PersonaService } from './personaService';
import { CustomerRepository } from '../repository/customerRepository';

export interface AutomationRule {
  id: string;
  name: string;
  description: string;
  trigger: AutomationTrigger;
  conditions: AutomationCondition[];
  actions: AutomationAction[];
  isActive: boolean;
  createdAt: Date;
  lastExecuted?: Date;
  executionCount: number;
}

export interface AutomationTrigger {
  type: 'time_based' | 'event_based' | 'score_based';
  schedule?: string; // Cron expression for time-based
  event?: string; // Event name for event-based
  threshold?: number; // Threshold for score-based
}

export interface AutomationCondition {
  field: string;
  operator: 'equals' | 'not_equals' | 'greater_than' | 'less_than' | 'contains' | 'in_range';
  value: any;
  logicalOperator?: 'AND' | 'OR';
}

export interface AutomationAction {
  type: 'send_communication' | 'update_stage' | 'create_task' | 'trigger_webhook' | 'assign_segment';
  parameters: Record<string, any>;
}

export interface CampaignMetrics {
  campaignId: string;
  sent: number;
  delivered: number;
  opened: number;
  clicked: number;
  converted: number;
  unsubscribed: number;
  bounced: number;
  revenue: number;
}

export class AutomationService {
  private lifecycleService: CustomerLifecycleService;
  private communicationService: CommunicationService;
  private personaService: PersonaService;
  private customerRepository: CustomerRepository;
  private automationRules: Map<string, AutomationRule>;
  private campaignMetrics: Map<string, CampaignMetrics>;

  constructor() {
    // Remove circular dependency - lifecycle service will be injected when needed
    this.lifecycleService = null as any; // Will be set later to avoid circular dependency
    this.communicationService = new CommunicationService();
    this.personaService = new PersonaService();
    this.customerRepository = new CustomerRepository();
    this.automationRules = new Map();
    this.campaignMetrics = new Map();
    this.initializeDefaultRules();
  }

  // Method to set lifecycle service after instantiation to break circular dependency
  setLifecycleService(lifecycleService: CustomerLifecycleService) {
    this.lifecycleService = lifecycleService;
  }

  private initializeDefaultRules() {
    const defaultRules: AutomationRule[] = [
      {
        id: 'welcome_sequence',
        name: 'Welcome Sequence',
        description: 'Send welcome email immediately after case submission',
        trigger: { type: 'event_based', event: 'case_submitted' },
        conditions: [],
        actions: [
          {
            type: 'send_communication',
            parameters: {
              templateId: 'onboarding-welcome',
              delay: 0,
              personalizeByPersona: true
            }
          }
        ],
        isActive: true,
        createdAt: new Date(),
        executionCount: 0
      },
      {
        id: 'inactive_customer_reengagement',
        name: 'Inactive Customer Re-engagement',
        description: 'Re-engage customers who haven\'t been active for 30 days',
        trigger: { type: 'time_based', schedule: '0 9 * * 1' }, // Monday 9 AM
        conditions: [
          {
            field: 'daysSinceLastActivity',
            operator: 'greater_than',
            value: 30
          },
          {
            field: 'stage',
            operator: 'equals',
            value: 'inactive',
            logicalOperator: 'AND'
          }
        ],
        actions: [
          {
            type: 'send_communication',
            parameters: {
              templateId: 'inactive-reengagement',
              personalizeByPersona: true
            }
          },
          {
            type: 'update_stage',
            parameters: {
              newStage: 'reactivation_campaign',
              reason: 'Automated re-engagement'
            }
          }
        ],
        isActive: true,
        createdAt: new Date(),
        executionCount: 0
      },
      {
        id: 'low_health_score_intervention',
        name: 'Low Health Score Intervention',
        description: 'Intervene when customer health score drops below 40',
        trigger: { type: 'score_based', threshold: 40 },
        conditions: [
          {
            field: 'healthScore',
            operator: 'less_than',
            value: 40
          }
        ],
        actions: [
          {
            type: 'send_communication',
            parameters: {
              templateId: 'health-score-alert',
              priority: 'high'
            }
          },
          {
            type: 'create_task',
            parameters: {
              taskType: 'customer_outreach',
              priority: 'high',
              assignTo: 'customer_success_team'
            }
          }
        ],
        isActive: true,
        createdAt: new Date(),
        executionCount: 0
      },
      {
        id: 'high_value_customer_nurturing',
        name: 'High Value Customer Nurturing',
        description: 'Special attention for customers with high lifetime value',
        trigger: { type: 'score_based', threshold: 1000 },
        conditions: [
          {
            field: 'lifetimeValue',
            operator: 'greater_than',
            value: 1000
          }
        ],
        actions: [
          {
            type: 'assign_segment',
            parameters: {
              segmentId: 'high_value_advocates'
            }
          },
          {
            type: 'send_communication',
            parameters: {
              templateId: 'vip-experience',
              personalizeByPersona: true
            }
          }
        ],
        isActive: true,
        createdAt: new Date(),
        executionCount: 0
      },
      {
        id: 'abandoned_case_followup',
        name: 'Abandoned Case Follow-up',
        description: 'Follow up on cases started but not completed within 7 days',
        trigger: { type: 'time_based', schedule: '0 10 * * *' }, // Daily at 10 AM
        conditions: [
          {
            field: 'caseStatus',
            operator: 'equals',
            value: 'incomplete'
          },
          {
            field: 'daysSinceCreated',
            operator: 'greater_than',
            value: 7,
            logicalOperator: 'AND'
          }
        ],
        actions: [
          {
            type: 'send_communication',
            parameters: {
              templateId: 'case-completion-reminder',
              personalizeByPersona: true
            }
          }
        ],
        isActive: true,
        createdAt: new Date(),
        executionCount: 0
      }
    ];

    defaultRules.forEach(rule => {
      this.automationRules.set(rule.id, rule);
    });
  }

  /**
   * Execute automation rules based on triggers
   */
  async executeAutomations(triggerType?: string): Promise<number> {
    let executedCount = 0;
    
    for (const rule of this.automationRules.values()) {
      if (!rule.isActive) continue;
      
      if (triggerType && rule.trigger.type !== triggerType) continue;

      try {
        const executed = await this.executeRule(rule);
        if (executed) {
          executedCount++;
          rule.executionCount++;
          rule.lastExecuted = new Date();
        }
      } catch (error) {
        console.error(`Error executing rule ${rule.id}:`, error);
      }
    }

    return executedCount;
  }

  /**
   * Execute a specific automation rule
   */
  private async executeRule(rule: AutomationRule): Promise<boolean> {
    // Get customers who meet the conditions
    const eligibleCustomers = await this.getEligibleCustomers(rule.conditions);
    
    if (eligibleCustomers.length === 0) return false;

    let executedForAnyCustomer = false;

    for (const customer of eligibleCustomers) {
      try {
        // Execute actions for each eligible customer
        for (const action of rule.actions) {
          await this.executeAction(action, customer);
        }
        executedForAnyCustomer = true;
      } catch (error) {
        console.error(`Error executing actions for customer ${customer.id}:`, error);
      }
    }

    return executedForAnyCustomer;
  }

  /**
   * Get customers who meet the rule conditions
   */
  private async getEligibleCustomers(conditions: AutomationCondition[]): Promise<any[]> {
    const allCustomers = await this.customerRepository.findAll({}, 1, 1000);
    const eligibleCustomers = [];

    for (const customer of allCustomers.customers) {
      const journey = await this.lifecycleService.getCustomerJourney(customer.id);
      const healthScore = await this.lifecycleService.getCustomerHealthScore(customer.id);
      
      if (!journey) continue;

      const customerData = {
        ...customer,
        ...journey,
        healthScore,
        daysSinceLastActivity: Math.floor((Date.now() - journey.lastActivity.getTime()) / (1000 * 60 * 60 * 24))
      };

      if (this.evaluateConditions(conditions, customerData)) {
        eligibleCustomers.push(customerData);
      }
    }

    return eligibleCustomers;
  }

  /**
   * Evaluate conditions against customer data
   */
  private evaluateConditions(conditions: AutomationCondition[], customerData: any): boolean {
    if (conditions.length === 0) return true;

    let result = true;
    let currentLogicalOp = 'AND';

    for (const condition of conditions) {
      const conditionResult = this.evaluateSingleCondition(condition, customerData);
      
      if (currentLogicalOp === 'AND') {
        result = result && conditionResult;
      } else {
        result = result || conditionResult;
      }

      currentLogicalOp = condition.logicalOperator || 'AND';
    }

    return result;
  }

  /**
   * Evaluate a single condition
   */
  private evaluateSingleCondition(condition: AutomationCondition, customerData: any): boolean {
    const fieldValue = this.getNestedValue(customerData, condition.field);
    
    switch (condition.operator) {
      case 'equals':
        return fieldValue === condition.value;
      case 'not_equals':
        return fieldValue !== condition.value;
      case 'greater_than':
        return Number(fieldValue) > Number(condition.value);
      case 'less_than':
        return Number(fieldValue) < Number(condition.value);
      case 'contains':
        return String(fieldValue).toLowerCase().includes(String(condition.value).toLowerCase());
      case 'in_range':
        const [min, max] = condition.value;
        return Number(fieldValue) >= min && Number(fieldValue) <= max;
      default:
        return false;
    }
  }

  /**
   * Get nested value from object using dot notation
   */
  private getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  }

  /**
   * Execute an automation action
   */
  private async executeAction(action: AutomationAction, customer: any): Promise<void> {
    switch (action.type) {
      case 'send_communication':
        await this.executeCommunicationAction(action.parameters, customer);
        break;
      case 'update_stage':
        await this.executeStageUpdateAction(action.parameters, customer);
        break;
      case 'create_task':
        await this.executeCreateTaskAction(action.parameters, customer);
        break;
      case 'assign_segment':
        await this.executeSegmentAssignmentAction(action.parameters, customer);
        break;
      case 'trigger_webhook':
        await this.executeWebhookAction(action.parameters, customer);
        break;
    }
  }

  /**
   * Execute communication action
   */
  private async executeCommunicationAction(parameters: any, customer: any): Promise<void> {
    if (parameters.personalizeByPersona) {
      const persona = await this.personaService.analyzeCustomerPersona(customer.id);
      const recommendations = this.personaService.getPersonalizedExperienceRecommendations(persona);
      
      // Customize message based on persona
      parameters.personaContext = {
        type: persona.type,
        communicationStyle: recommendations.communicationPlan.tone,
        supportLevel: recommendations.supportStrategy.level
      };
    }

    if (parameters.delay) {
      setTimeout(async () => {
        await this.communicationService.sendLifecycleMessage(
          customer.id,
          customer.currentStage?.stage || 'active',
          parameters.variables || {}
        );
      }, parameters.delay * 1000);
    } else {
      await this.communicationService.sendLifecycleMessage(
        customer.id,
        customer.currentStage?.stage || 'active',
        parameters.variables || {}
      );
    }
  }

  /**
   * Execute stage update action
   */
  private async executeStageUpdateAction(parameters: any, customer: any): Promise<void> {
    await this.lifecycleService.updateCustomerStage(customer.id, {
      stage: parameters.newStage,
      timestamp: new Date(),
      reason: parameters.reason
    });
  }

  /**
   * Execute create task action
   */
  private async executeCreateTaskAction(parameters: any, customer: any): Promise<void> {
    console.log(`[TASK CREATED] Type: ${parameters.taskType}, Customer: ${customer.id}, Priority: ${parameters.priority}`);
    // In production, integrate with task management system
  }

  /**
   * Execute segment assignment action
   */
  private async executeSegmentAssignmentAction(parameters: any, customer: any): Promise<void> {
    console.log(`[SEGMENT ASSIGNED] Customer: ${customer.id}, Segment: ${parameters.segmentId}`);
    // In production, update customer segment in database
  }

  /**
   * Execute webhook action
   */
  private async executeWebhookAction(parameters: any, customer: any): Promise<void> {
    console.log(`[WEBHOOK TRIGGERED] URL: ${parameters.url}, Customer: ${customer.id}`);
    // In production, make HTTP request to webhook URL
  }

  /**
   * Create new automation rule
   */
  createAutomationRule(rule: Omit<AutomationRule, 'id' | 'createdAt' | 'executionCount' | 'lastExecuted'>): string {
    const id = `rule_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const newRule: AutomationRule = {
      ...rule,
      id,
      createdAt: new Date(),
      executionCount: 0
    };
    
    this.automationRules.set(id, newRule);
    return id;
  }

  /**
   * Update automation rule
   */
  updateAutomationRule(ruleId: string, updates: Partial<AutomationRule>): boolean {
    const rule = this.automationRules.get(ruleId);
    if (!rule) return false;

    this.automationRules.set(ruleId, { ...rule, ...updates });
    return true;
  }

  /**
   * Delete automation rule
   */
  deleteAutomationRule(ruleId: string): boolean {
    return this.automationRules.delete(ruleId);
  }

  /**
   * Get all automation rules
   */
  getAllAutomationRules(): AutomationRule[] {
    return Array.from(this.automationRules.values());
  }

  /**
   * Start campaign tracking
   */
  startCampaignTracking(campaignId: string): void {
    this.campaignMetrics.set(campaignId, {
      campaignId,
      sent: 0,
      delivered: 0,
      opened: 0,
      clicked: 0,
      converted: 0,
      unsubscribed: 0,
      bounced: 0,
      revenue: 0
    });
  }

  /**
   * Update campaign metrics
   */
  updateCampaignMetrics(campaignId: string, metric: keyof CampaignMetrics, value: number): void {
    const metrics = this.campaignMetrics.get(campaignId);
    if (metrics && metric !== 'campaignId') {
      metrics[metric] = value;
    }
  }

  /**
   * Get campaign metrics
   */
  getCampaignMetrics(campaignId: string): CampaignMetrics | undefined {
    return this.campaignMetrics.get(campaignId);
  }

  /**
   * Trigger event-based automation
   */
  async triggerEventAutomation(eventName: string, customerData: any): Promise<void> {
    const eventRules = Array.from(this.automationRules.values()).filter(
      rule => rule.isActive && rule.trigger.type === 'event_based' && rule.trigger.event === eventName
    );

    for (const rule of eventRules) {
      if (this.evaluateConditions(rule.conditions, customerData)) {
        for (const action of rule.actions) {
          await this.executeAction(action, customerData);
        }
        rule.executionCount++;
        rule.lastExecuted = new Date();
      }
    }
  }

  /**
   * Schedule event automation for future execution
   */
  async scheduleEventAutomation(eventName: string, eventData: any): Promise<void> {
    // In production, this would integrate with a job scheduler like Bull/Agenda
    console.log(`[SCHEDULED AUTOMATION] Event: ${eventName}, Data:`, eventData);
    
    // For now, we'll simulate scheduling by logging
    const scheduleId = `sched_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // In production, this would be stored in a job queue
    if (eventData.scheduledFor) {
      const delay = new Date(eventData.scheduledFor).getTime() - Date.now();
      if (delay > 0) {
        setTimeout(async () => {
          await this.triggerEventAutomation(eventName, eventData);
        }, delay);
      } else {
        // If scheduled time has passed, execute immediately
        await this.triggerEventAutomation(eventName, eventData);
      }
    } else {
      // Execute immediately if no schedule specified
      await this.triggerEventAutomation(eventName, eventData);
    }
  }
}
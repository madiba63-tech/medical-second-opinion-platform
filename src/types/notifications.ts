// Notification System Types for Customer Lifecycle Integration

export type NotificationType = 
  | 'case_update'
  | 'assignment_notification'
  | 'report_ready'
  | 'milestone_reached'
  | 'support_message'
  | 'educational_content'
  | 'reminder'
  | 'promotional'
  | 'system_update';

export type NotificationPriority = 'low' | 'medium' | 'high' | 'urgent';

export type NotificationStatus = 'unread' | 'read' | 'archived' | 'dismissed';

export interface BaseNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  priority: NotificationPriority;
  status: NotificationStatus;
  createdAt: string;
  readAt?: string;
  expiresAt?: string;
  metadata?: Record<string, any>;
}

export interface CaseUpdateNotification extends BaseNotification {
  type: 'case_update';
  metadata: {
    caseNumber: string;
    previousStatus: string;
    newStatus: string;
    assignedTo?: string;
    estimatedCompletion?: string;
  };
}

export interface ReportReadyNotification extends BaseNotification {
  type: 'report_ready';
  metadata: {
    caseNumber: string;
    reportUrl: string;
    professionalName: string;
    completionTime: string;
  };
}

export interface MilestoneNotification extends BaseNotification {
  type: 'milestone_reached';
  metadata: {
    milestone: string;
    lifecycleStage: string;
    nextSteps: string[];
    celebrationType: 'first_case' | 'completion' | 'satisfaction' | 'referral';
  };
}

export interface EducationalNotification extends BaseNotification {
  type: 'educational_content';
  metadata: {
    contentType: 'article' | 'video' | 'infographic' | 'webinar';
    contentUrl: string;
    relevantCondition?: string;
    personalized: boolean;
  };
}

export type Notification = 
  | CaseUpdateNotification 
  | ReportReadyNotification 
  | MilestoneNotification 
  | EducationalNotification 
  | BaseNotification;

export interface NotificationPreferences {
  customerId: string;
  channels: {
    email: boolean;
    sms: boolean;
    push: boolean;
    inApp: boolean;
  };
  types: {
    caseUpdates: boolean;
    reportReady: boolean;
    milestones: boolean;
    educational: boolean;
    reminders: boolean;
    promotional: boolean;
  };
  frequency: {
    immediate: NotificationType[];
    daily: NotificationType[];
    weekly: NotificationType[];
  };
  quietHours: {
    enabled: boolean;
    startTime: string; // HH:mm format
    endTime: string;   // HH:mm format
    timezone: string;
  };
  personalization: {
    usePersona: boolean;
    includeLifecycleStage: boolean;
    adaptToEngagement: boolean;
  };
}

export interface NotificationCenter {
  notifications: Notification[];
  unreadCount: number;
  hasUrgent: boolean;
  lastFetched: string;
  preferences: NotificationPreferences;
}

export interface NotificationAction {
  id: string;
  label: string;
  type: 'primary' | 'secondary' | 'danger';
  url?: string;
  onClick?: () => void;
  icon?: string;
}

export interface EnhancedNotification extends Notification {
  actions?: NotificationAction[];
  personaAdaptation?: {
    adaptedMessage?: string;
    urgencyLevel?: 'relaxed' | 'standard' | 'immediate';
    supportLevel?: 'minimal' | 'standard' | 'high_touch';
  };
  lifecycleContext?: {
    stage: string;
    daysSinceEntry: number;
    relevanceScore: number;
    nextBestAction?: string;
  };
}
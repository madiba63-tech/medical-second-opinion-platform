'use client';

import { useState, useEffect, useRef } from 'react';
import { usePersona } from '@/hooks/usePersona';
import { 
  Notification, 
  NotificationPreferences, 
  NotificationPriority,
  NotificationType,
  EnhancedNotification 
} from '@/types/notifications';

interface NotificationCenterProps {
  className?: string;
}

export function NotificationCenter({ className = '' }: NotificationCenterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<EnhancedNotification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const { persona, lifecycleData, uiConfig } = usePersona();

  // Mock data - in real implementation, this would come from an API
  useEffect(() => {
    const mockNotifications: EnhancedNotification[] = [
      {
        id: '1',
        type: 'case_update',
        title: 'Case Update Available',
        message: 'Your case CASE-2024-002 has been assigned to Dr. Emily Rodriguez',
        priority: 'high',
        status: 'unread',
        createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        metadata: {
          caseNumber: 'CASE-2024-002',
          previousStatus: 'processing',
          newStatus: 'assigned',
          assignedTo: 'Dr. Emily Rodriguez',
        },
        personaAdaptation: getPersonaAdaptation(persona, 'case_update'),
        lifecycleContext: {
          stage: lifecycleData?.lifecycleStage || 'active_case',
          daysSinceEntry: lifecycleData?.daysInStage || 0,
          relevanceScore: 95,
          nextBestAction: 'Review professional credentials'
        },
        actions: [
          {
            id: 'view_case',
            label: 'View Case',
            type: 'primary',
            url: '/portal/cases/CASE-2024-002'
          }
        ]
      },
      {
        id: '2',
        type: 'milestone_reached',
        title: 'Milestone Achieved',
        message: 'Congratulations! Your case has passed AI analysis with 94% confidence',
        priority: 'medium',
        status: 'unread',
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        metadata: {
          milestone: 'AI Analysis Complete',
          lifecycleStage: 'active_case',
          nextSteps: ['Professional review', 'Quality assurance'],
          celebrationType: 'completion'
        },
        personaAdaptation: getPersonaAdaptation(persona, 'milestone_reached')
      },
      {
        id: '3',
        type: 'educational_content',
        title: 'Relevant Resource Available',
        message: 'New article: Understanding AI-Enhanced Medical Analysis',
        priority: 'low',
        status: 'read',
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        metadata: {
          contentType: 'article',
          contentUrl: '/resources/ai-analysis-guide',
          personalized: true
        },
        personaAdaptation: getPersonaAdaptation(persona, 'educational_content')
      }
    ];

    setNotifications(mockNotifications);
    setUnreadCount(mockNotifications.filter(n => n.status === 'unread').length);
  }, [persona, lifecycleData]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, status: 'read' as const, readAt: new Date().toISOString() }
          : notification
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({
        ...notification,
        status: 'read' as const,
        readAt: new Date().toISOString()
      }))
    );
    setUnreadCount(0);
  };

  const getPriorityIcon = (priority: NotificationPriority) => {
    switch (priority) {
      case 'urgent':
        return (
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
        );
      case 'high':
        return (
          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
        );
      case 'medium':
        return (
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
        );
      default:
        return (
          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
        );
    }
  };

  const getNotificationIcon = (type: NotificationType) => {
    const iconClass = "w-5 h-5";
    
    switch (type) {
      case 'case_update':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      case 'report_ready':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
      case 'milestone_reached':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'educational_content':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
      default:
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        );
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Notification Bell */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        style={{ 
          backgroundColor: isOpen ? uiConfig.colorScheme.primary + '10' : 'transparent',
          color: isOpen ? uiConfig.colorScheme.primary : undefined
        }}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        
        {unreadCount > 0 && (
          <span 
            className="absolute -top-1 -right-1 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center animate-pulse font-semibold"
            style={{ backgroundColor: uiConfig.colorScheme.accent }}
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-lg border border-gray-200 z-50 max-h-96 overflow-hidden">
          {/* Header */}
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                  style={{ color: uiConfig.colorScheme.primary }}
                >
                  Mark all read
                </button>
              )}
            </div>
            <p className="text-sm text-gray-500 mt-1">
              {unreadCount > 0 ? `${unreadCount} unread` : 'All caught up!'}
            </p>
          </div>

          {/* Notifications List */}
          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="px-4 py-8 text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
                <p className="text-gray-500 text-sm">No notifications yet</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`px-4 py-3 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors ${
                    notification.status === 'unread' ? 'bg-blue-50/50' : ''
                  }`}
                  onClick={() => {
                    if (notification.status === 'unread') {
                      markAsRead(notification.id);
                    }
                    if (notification.actions?.[0]?.url) {
                      window.location.href = notification.actions[0].url;
                    }
                  }}
                >
                  <div className="flex items-start space-x-3">
                    {/* Priority & Type Icon */}
                    <div className="flex items-center space-x-2 mt-1">
                      {getPriorityIcon(notification.priority)}
                      <div 
                        className="p-1.5 rounded-lg"
                        style={{ 
                          backgroundColor: uiConfig.colorScheme.primary + '15',
                          color: uiConfig.colorScheme.primary 
                        }}
                      >
                        {getNotificationIcon(notification.type)}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className={`text-sm font-medium text-gray-900 ${
                          notification.status === 'unread' ? 'font-semibold' : ''
                        }`}>
                          {notification.title}
                        </h4>
                        <span className="text-xs text-gray-500 ml-2 whitespace-nowrap">
                          {formatTimeAgo(notification.createdAt)}
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                        {notification.personaAdaptation?.adaptedMessage || notification.message}
                      </p>

                      {/* Persona-specific context */}
                      {notification.lifecycleContext && uiConfig.features.showAdvancedMetrics && (
                        <div className="mt-2 text-xs text-gray-500">
                          Stage: {notification.lifecycleContext.stage} • 
                          Day {notification.lifecycleContext.daysSinceEntry}
                          {notification.lifecycleContext.nextBestAction && (
                            <span className="ml-2 text-blue-600 font-medium">
                              → {notification.lifecycleContext.nextBestAction}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Actions */}
                      {notification.actions && notification.actions.length > 0 && (
                        <div className="mt-2 flex space-x-2">
                          {notification.actions.map((action) => (
                            <button
                              key={action.id}
                              className="text-xs font-medium px-2 py-1 rounded transition-colors"
                              style={{
                                backgroundColor: action.type === 'primary' ? uiConfig.colorScheme.primary : 'transparent',
                                color: action.type === 'primary' ? 'white' : uiConfig.colorScheme.primary,
                                border: action.type === 'primary' ? 'none' : `1px solid ${uiConfig.colorScheme.primary}`
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                if (action.onClick) {
                                  action.onClick();
                                } else if (action.url) {
                                  window.location.href = action.url;
                                }
                              }}
                            >
                              {action.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Unread indicator */}
                    {notification.status === 'unread' && (
                      <div 
                        className="w-2 h-2 rounded-full mt-2"
                        style={{ backgroundColor: uiConfig.colorScheme.primary }}
                      ></div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-3 border-t border-gray-100">
            <button
              className="w-full text-sm font-medium text-center py-2 rounded-lg transition-colors"
              style={{ 
                color: uiConfig.colorScheme.primary,
                backgroundColor: uiConfig.colorScheme.primary + '10'
              }}
              onClick={() => {
                setIsOpen(false);
                // Navigate to full notifications page
              }}
            >
              View all notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Helper function to get persona-specific adaptations
function getPersonaAdaptation(persona: string, type: NotificationType) {
  const adaptations = {
    informed_advocator: {
      case_update: {
        adaptedMessage: 'Your case has been assigned to a board-certified specialist. Review their credentials and expertise.',
        urgencyLevel: 'standard' as const,
        supportLevel: 'standard' as const
      },
      milestone_reached: {
        adaptedMessage: 'AI analysis achieved 94% confidence score. View detailed technical metrics and next steps.',
        urgencyLevel: 'standard' as const,
        supportLevel: 'minimal' as const
      },
      educational_content: {
        adaptedMessage: 'New evidence-based resource available based on your case specifics.',
        urgencyLevel: 'relaxed' as const,
        supportLevel: 'minimal' as const
      }
    },
    cautious_researcher: {
      case_update: {
        adaptedMessage: 'Good news! Your case has been assigned to an experienced doctor. We\'ll guide you through each step.',
        urgencyLevel: 'relaxed' as const,
        supportLevel: 'high_touch' as const
      },
      milestone_reached: {
        adaptedMessage: 'Excellent progress! Your case analysis is proceeding smoothly. Our team is here if you have questions.',
        urgencyLevel: 'relaxed' as const,
        supportLevel: 'high_touch' as const
      },
      educational_content: {
        adaptedMessage: 'We\'ve prepared simple, helpful information relevant to your case.',
        urgencyLevel: 'relaxed' as const,
        supportLevel: 'standard' as const
      }
    },
    tech_savvy_optimizer: {
      case_update: {
        adaptedMessage: 'Case ASSIGNED → Dr. Rodriguez | ETA: 24-48h | Confidence: 94% | Track real-time',
        urgencyLevel: 'immediate' as const,
        supportLevel: 'minimal' as const
      },
      milestone_reached: {
        adaptedMessage: 'MILESTONE ✓ AI Analysis: 94% confidence | Next: Professional review | Auto-notify enabled',
        urgencyLevel: 'immediate' as const,
        supportLevel: 'minimal' as const
      },
      educational_content: {
        adaptedMessage: 'Tech deep-dive: AI-enhanced medical analysis methodology and performance metrics',
        urgencyLevel: 'standard' as const,
        supportLevel: 'minimal' as const
      }
    }
  };

  return adaptations[persona]?.[type] || adaptations.informed_advocator[type];
}
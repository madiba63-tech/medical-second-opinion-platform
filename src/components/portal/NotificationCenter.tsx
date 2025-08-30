'use client';

import { useState, useEffect, useRef } from 'react';

interface Notification {
  id: string;
  type: 'lifecycle_update' | 'case_status' | 'action_required' | 'persona_insight' | 'system';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  title: string;
  message: string;
  actionUrl?: string;
  timestamp: string;
  read: boolean;
  persona?: string;
  metadata?: Record<string, any>;
}

interface NotificationCenterProps {
  customerId: string;
  persona?: string;
}

export default function NotificationCenter({ customerId, persona }: NotificationCenterProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const [mounted, setMounted] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    // Load initial notifications
    fetchNotifications();
    
    // Establish WebSocket connection for real-time updates
    connectWebSocket();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [customerId, mounted]);

  useEffect(() => {
    const unread = notifications.filter(n => !n.read).length;
    setUnreadCount(unread);
  }, [notifications]);

  const fetchNotifications = async () => {
    try {
      // Mock API call - replace with actual API endpoint
      const mockNotifications: Notification[] = [
        {
          id: '1',
          type: 'case_status',
          priority: 'high',
          title: 'Case Update',
          message: 'Your case CASE-2024-002 is now under expert review by Dr. Emily Rodriguez',
          actionUrl: '/portal/cases/CASE-2024-002',
          timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
          read: false,
          persona: persona
        },
        {
          id: '2',
          type: 'lifecycle_update',
          priority: 'medium',
          title: 'Journey Progress',
          message: 'You\'ve moved to the "Under Review" stage. Estimated completion in 2-3 days.',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
          read: false,
          persona: persona
        },
        {
          id: '3',
          type: 'action_required',
          priority: 'urgent',
          title: 'Profile Incomplete',
          message: 'Please complete your medical history for better analysis accuracy.',
          actionUrl: '/portal/profile',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
          read: true,
          persona: persona
        }
      ];
      
      setNotifications(mockNotifications);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const connectWebSocket = () => {
    try {
      // Mock WebSocket connection - replace with actual WebSocket URL
      // const ws = new WebSocket(`ws://localhost:3000/api/v1/customer/notifications/stream?customerId=${customerId}`);
      
      // Simulate WebSocket connection
      setIsConnected(true);
      
      // Simulate receiving real-time notifications
      const simulateRealTimeNotifications = () => {
        setTimeout(() => {
          const newNotification: Notification = {
            id: `${Date.now()}`,
            type: 'lifecycle_update',
            priority: 'medium',
            title: 'New Insight Available',
            message: getPersonalizedMessage(persona || 'informed_advocator'),
            timestamp: new Date().toISOString(),
            read: false,
            persona: persona
          };
          
          setNotifications(prev => [newNotification, ...prev]);
        }, 10000); // Simulate notification after 10 seconds
      };

      simulateRealTimeNotifications();
    } catch (error) {
      console.error('Error connecting WebSocket:', error);
      setIsConnected(false);
    }
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'case_status':
        return '📋';
      case 'lifecycle_update':
        return '📈';
      case 'action_required':
        return '⚠️';
      case 'persona_insight':
        return '💡';
      case 'system':
        return '⚙️';
      default:
        return '🔔';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    if (!mounted) return 'Loading...';
    
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hr ago`;
    return `${Math.floor(diffInMinutes / 1440)} day ago`;
  };

  if (!mounted) {
    return (
      <div className="relative">
        <button className="relative p-2 text-gray-600 rounded-full">
          <span className="text-xl">🔔</span>
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Notification Bell */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full"
      >
        <span className="text-xl">🔔</span>
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
        
        {/* Connection Status Indicator */}
        <span 
          className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
            isConnected ? 'bg-green-500' : 'bg-red-500'
          }`}
          title={isConnected ? 'Connected' : 'Disconnected'}
        />
      </button>

      {/* Notification Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center">
              <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
              {isConnected && (
                <span className="ml-2 flex items-center text-xs text-green-600">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                  Live
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-sm text-blue-600 hover:text-blue-900"
              >
                Mark all read
              </button>
            )}
          </div>

          {/* Notification List */}
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                <span className="text-2xl mb-2 block">📭</span>
                No notifications yet
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                    !notification.read ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => {
                    markAsRead(notification.id);
                    if (notification.actionUrl) {
                      window.location.href = notification.actionUrl;
                    }
                  }}
                >
                  <div className="flex items-start space-x-3">
                    <span className="text-lg flex-shrink-0">
                      {getNotificationIcon(notification.type)}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-sm font-medium text-gray-900 truncate">
                          {notification.title}
                        </h4>
                        <span className={`text-xs px-2 py-1 rounded-full border ${getPriorityColor(notification.priority)}`}>
                          {notification.priority}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                        {notification.message}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          {formatTimestamp(notification.timestamp)}
                        </span>
                        {!notification.read && (
                          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="p-3 border-t border-gray-200 text-center">
              <button
                onClick={() => {
                  setIsOpen(false);
                  window.location.href = '/portal/notifications';
                }}
                className="text-sm text-blue-600 hover:text-blue-900"
              >
                View all notifications
              </button>
            </div>
          )}
        </div>
      )}

      {/* Click outside to close */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}

// Helper function to generate personalized messages
function getPersonalizedMessage(persona: string): string {
  const messages = {
    'informed_advocator': 'New research insights available for your condition. Review the latest medical literature findings.',
    'cautious_researcher': 'Your patient advocate has prepared a simplified explanation of your case progress. Would you like to schedule a call?',
    'tech_savvy_optimizer': 'API health metrics updated. Your integration is performing optimally with 99.9% uptime.'
  };
  
  return messages[persona as keyof typeof messages] || 'You have a new update available.';
}
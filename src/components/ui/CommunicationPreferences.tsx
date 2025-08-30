'use client';

import { useState, useEffect } from 'react';
import { usePersona } from '@/hooks/usePersona';
import { NotificationPreferences, CommunicationPreference } from '@/types/notifications';

interface CommunicationPreferencesProps {
  className?: string;
  onSave?: (preferences: NotificationPreferences) => void;
  embedded?: boolean; // If true, shows simplified version
}

export function CommunicationPreferences({ 
  className = '', 
  onSave,
  embedded = false 
}: CommunicationPreferencesProps) {
  const { persona, lifecycleData, uiConfig } = usePersona();
  const [preferences, setPreferences] = useState<NotificationPreferences | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Initialize preferences based on persona
  useEffect(() => {
    const initializePreferences = () => {
      const defaultPreferences: NotificationPreferences = {
        customerId: lifecycleData?.customerId || 'mock-customer',
        channels: getPersonaChannelDefaults(persona),
        types: getPersonaTypeDefaults(persona),
        frequency: getPersonaFrequencyDefaults(persona),
        quietHours: {
          enabled: persona === 'cautious_researcher', // More consideration for this persona
          startTime: '22:00',
          endTime: '08:00',
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        },
        personalization: {
          usePersona: true,
          includeLifecycleStage: true,
          adaptToEngagement: persona === 'tech_savvy_optimizer'
        }
      };

      setPreferences(defaultPreferences);
      setLoading(false);
    };

    initializePreferences();
  }, [persona, lifecycleData]);

  const handleSave = async () => {
    if (!preferences) return;
    
    setSaving(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (onSave) {
        onSave(preferences);
      }
      
      // Show success notification
      console.log('Preferences saved successfully');
    } catch (error) {
      console.error('Failed to save preferences:', error);
    } finally {
      setSaving(false);
    }
  };

  const updateChannelPreference = (channel: keyof NotificationPreferences['channels'], enabled: boolean) => {
    if (!preferences) return;
    
    setPreferences(prev => prev ? {
      ...prev,
      channels: {
        ...prev.channels,
        [channel]: enabled
      }
    } : null);
  };

  const updateTypePreference = (type: keyof NotificationPreferences['types'], enabled: boolean) => {
    if (!preferences) return;
    
    setPreferences(prev => prev ? {
      ...prev,
      types: {
        ...prev.types,
        [type]: enabled
      }
    } : null);
  };

  if (loading || !preferences) {
    return (
      <div className="animate-pulse">
        <div className="h-4 bg-gray-200 rounded mb-4"></div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center space-x-3">
              <div className="h-4 w-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded flex-1"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const channelIcons = {
    email: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    sms: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    push: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    ),
    inApp: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  };

  const Toggle = ({ checked, onChange, disabled = false }: { 
    checked: boolean; 
    onChange: (checked: boolean) => void;
    disabled?: boolean;
  }) => (
    <button
      type="button"
      onClick={() => !disabled && onChange(!checked)}
      disabled={disabled}
      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      }`}
      style={{
        backgroundColor: checked ? uiConfig.colorScheme.primary : '#E5E7EB',
        focusRingColor: uiConfig.colorScheme.primary
      }}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform ${
          checked ? 'translate-x-4' : 'translate-x-0.5'
        }`}
      />
    </button>
  );

  if (embedded) {
    return (
      <div className={`${className}`}>
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-900 mb-3">Quick Preferences</h4>
          
          {/* Essential channels only */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="text-gray-600">{channelIcons.email}</div>
                <span className="text-sm text-gray-700">Email notifications</span>
              </div>
              <Toggle
                checked={preferences.channels.email}
                onChange={(checked) => updateChannelPreference('email', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="text-gray-600">{channelIcons.sms}</div>
                <span className="text-sm text-gray-700">Text messages</span>
              </div>
              <Toggle
                checked={preferences.channels.sms}
                onChange={(checked) => updateChannelPreference('sms', checked)}
              />
            </div>
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full text-sm font-medium py-2 px-3 rounded-lg transition-colors"
            style={{
              backgroundColor: uiConfig.colorScheme.primary,
              color: 'white'
            }}
          >
            {saving ? 'Saving...' : 'Update Preferences'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-100 ${className}`}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Communication Preferences</h2>
            <p className="text-sm text-gray-600 mt-1">
              Choose how you want to receive updates about your cases
            </p>
          </div>
          
          {/* Persona indicator */}
          <div 
            className="px-3 py-1 rounded-full text-xs font-medium"
            style={{
              backgroundColor: uiConfig.colorScheme.primary + '20',
              color: uiConfig.colorScheme.primary
            }}
          >
            {persona.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </div>
        </div>

        <div className="space-y-8">
          {/* Communication Channels */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Communication Channels</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.entries(preferences.channels).map(([channel, enabled]) => (
                <div
                  key={channel}
                  className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-gray-600">
                      {channelIcons[channel as keyof typeof channelIcons]}
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 capitalize">
                        {channel === 'inApp' ? 'In-App' : channel}
                      </h4>
                      <p className="text-xs text-gray-500">
                        {getChannelDescription(channel as keyof typeof preferences.channels)}
                      </p>
                    </div>
                  </div>
                  
                  <Toggle
                    checked={enabled}
                    onChange={(checked) => updateChannelPreference(channel as keyof typeof preferences.channels, checked)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Notification Types */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Notification Types</h3>
            <div className="space-y-3">
              {Object.entries(preferences.types).map(([type, enabled]) => (
                <div key={type} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">
                      {getTypeDisplayName(type)}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">
                      {getTypeDescription(type, persona)}
                    </p>
                  </div>
                  
                  <Toggle
                    checked={enabled}
                    onChange={(checked) => updateTypePreference(type as keyof typeof preferences.types, checked)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Quiet Hours */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Quiet Hours</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Enable quiet hours</h4>
                  <p className="text-xs text-gray-500">Pause non-urgent notifications during specified hours</p>
                </div>
                <Toggle
                  checked={preferences.quietHours.enabled}
                  onChange={(checked) => setPreferences(prev => prev ? {
                    ...prev,
                    quietHours: { ...prev.quietHours, enabled: checked }
                  } : null)}
                />
              </div>

              {preferences.quietHours.enabled && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Start time</label>
                    <input
                      type="time"
                      value={preferences.quietHours.startTime}
                      onChange={(e) => setPreferences(prev => prev ? {
                        ...prev,
                        quietHours: { ...prev.quietHours, startTime: e.target.value }
                      } : null)}
                      className="block w-full text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">End time</label>
                    <input
                      type="time"
                      value={preferences.quietHours.endTime}
                      onChange={(e) => setPreferences(prev => prev ? {
                        ...prev,
                        quietHours: { ...prev.quietHours, endTime: e.target.value }
                      } : null)}
                      className="block w-full text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Advanced Personalization */}
          {uiConfig.features.showAdvancedMetrics && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Personalization</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Persona-based messaging</h4>
                    <p className="text-xs text-gray-500">Adapt message style to your preferences</p>
                  </div>
                  <Toggle
                    checked={preferences.personalization.usePersona}
                    onChange={(checked) => setPreferences(prev => prev ? {
                      ...prev,
                      personalization: { ...prev.personalization, usePersona: checked }
                    } : null)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Lifecycle context</h4>
                    <p className="text-xs text-gray-500">Include your current journey stage in messages</p>
                  </div>
                  <Toggle
                    checked={preferences.personalization.includeLifecycleStage}
                    onChange={(checked) => setPreferences(prev => prev ? {
                      ...prev,
                      personalization: { ...prev.personalization, includeLifecycleStage: checked }
                    } : null)}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Save Button */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-3 text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50"
            style={{
              backgroundColor: uiConfig.colorScheme.primary,
              color: 'white',
              focusRingColor: uiConfig.colorScheme.primary
            }}
          >
            {saving ? 'Saving Preferences...' : 'Save Preferences'}
          </button>
        </div>
      </div>
    </div>
  );
}

// Helper functions
function getPersonaChannelDefaults(persona: string) {
  const defaults = {
    informed_advocator: { email: true, sms: false, push: true, inApp: true },
    cautious_researcher: { email: true, sms: true, push: false, inApp: true },
    tech_savvy_optimizer: { email: false, sms: true, push: true, inApp: true }
  };
  return defaults[persona] || defaults.informed_advocator;
}

function getPersonaTypeDefaults(persona: string) {
  const defaults = {
    informed_advocator: { caseUpdates: true, reportReady: true, milestones: true, educational: true, reminders: true, promotional: false },
    cautious_researcher: { caseUpdates: true, reportReady: true, milestones: true, educational: true, reminders: true, promotional: false },
    tech_savvy_optimizer: { caseUpdates: true, reportReady: true, milestones: false, educational: false, reminders: false, promotional: false }
  };
  return defaults[persona] || defaults.informed_advocator;
}

function getPersonaFrequencyDefaults(persona: string) {
  return {
    immediate: ['case_update', 'report_ready'],
    daily: persona === 'cautious_researcher' ? ['milestone_reached'] : [],
    weekly: persona === 'informed_advocator' ? ['educational_content'] : []
  };
}

function getChannelDescription(channel: string): string {
  const descriptions = {
    email: 'Detailed updates and reports',
    sms: 'Quick status updates',
    push: 'Real-time mobile alerts',
    inApp: 'Platform notifications'
  };
  return descriptions[channel] || '';
}

function getTypeDisplayName(type: string): string {
  const names = {
    caseUpdates: 'Case Updates',
    reportReady: 'Report Ready',
    milestones: 'Milestone Achievements',
    educational: 'Educational Content',
    reminders: 'Reminders',
    promotional: 'Promotional Offers'
  };
  return names[type] || type;
}

function getTypeDescription(type: string, persona: string): string {
  const descriptions = {
    informed_advocator: {
      caseUpdates: 'Status changes, assignments, and progress updates',
      reportReady: 'When your second opinion report is available',
      milestones: 'Key achievements in your case journey',
      educational: 'Research articles and medical insights',
      reminders: 'Follow-up actions and appointments',
      promotional: 'Special offers and new services'
    },
    cautious_researcher: {
      caseUpdates: 'Gentle updates about your case progress',
      reportReady: 'Personal notification when results are ready',
      milestones: 'Celebrate important steps in your journey',
      educational: 'Simple, helpful health information',
      reminders: 'Friendly reminders for next steps',
      promotional: 'Occasional updates about our services'
    },
    tech_savvy_optimizer: {
      caseUpdates: 'Real-time case status and technical metrics',
      reportReady: 'Instant notification with download links',
      milestones: 'Achievement tracking and analytics',
      educational: 'Technical content and research findings',
      reminders: 'Automated task and deadline alerts',
      promotional: 'Beta features and platform updates'
    }
  };

  return descriptions[persona]?.[type] || descriptions.informed_advocator[type] || '';
}
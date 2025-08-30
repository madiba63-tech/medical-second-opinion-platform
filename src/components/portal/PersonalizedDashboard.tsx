'use client';

import { useEffect, useState } from 'react';
import { usePersonaLifecycle, usePersonaConfiguration } from '@/hooks/usePersonaLifecycle';
import Link from 'next/link';

interface PersonalizedDashboardProps {
  customerId: string;
}

export default function PersonalizedDashboard({ customerId }: PersonalizedDashboardProps) {
  const [mounted, setMounted] = useState(false);
  const { profile, progress, personalizedContent, loading, error } = usePersonaLifecycle(customerId);
  const { applyPersonaStyles } = usePersonaConfiguration();

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (personalizedContent?.uiConfiguration) {
      applyPersonaStyles(personalizedContent.uiConfiguration);
    }
  }, [personalizedContent, applyPersonaStyles]);

  // Show loading state on both server and client until mounted
  if (!mounted || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your personalized dashboard...</p>
        </div>
      </div>
    );
  }

  if (error || !profile || !personalizedContent) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">⚠️</div>
          <p className="text-gray-600">Unable to load your dashboard. Please try again.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const { messaging, quickActions, resources } = personalizedContent.content;
  const { colorScheme, typography, interactions } = personalizedContent.uiConfiguration;

  return (
    <div 
      className="min-h-screen bg-gray-50 py-8"
      style={{
        '--persona-primary': colorScheme.primary,
        '--persona-secondary': colorScheme.secondary,
        '--persona-accent': colorScheme.accent
      } as React.CSSProperties}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Personalized Welcome Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 
                className="text-3xl font-bold mb-2"
                style={{ 
                  color: colorScheme.primary,
                  fontSize: `calc(1.875rem * var(--persona-scale, 1))`
                }}
              >
                {messaging.welcomeMessage}
              </h1>
              <p className="text-gray-600 mb-4">{messaging.supportMessage}</p>
              
              {/* Persona Badge */}
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {getPersonaIcon(profile.persona.type)} {getPersonaLabel(profile.persona.type)}
                <span className="ml-2 text-xs">
                  ({Math.round(profile.persona.confidence * 100)}% match)
                </span>
              </div>
            </div>
            
            {/* Health Score */}
            <div className="text-center">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-lg mb-2"
                style={{ backgroundColor: getHealthScoreColor(profile.healthScore) }}
              >
                {profile.healthScore}
              </div>
              <p className="text-sm text-gray-600">Health Score</p>
            </div>
          </div>
        </div>

        {/* Progress Section - Client-side only */}
        {mounted && progress && (
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Your Journey Progress</h2>
            
            <div className="flex items-center mb-4">
              <div className="flex-1">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Current Stage: {progress.currentStage.stage}</span>
                  <span>{progress.progressPercentage}% Complete</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${progress.progressPercentage}%`,
                      backgroundColor: colorScheme.primary 
                    }}
                  ></div>
                </div>
              </div>
            </div>

            {progress.estimatedTimeToCompletion && (
              <p className="text-sm text-gray-600">
                Estimated completion: {progress.estimatedTimeToCompletion}
              </p>
            )}
          </div>
        )}

        {/* Quick Actions Grid - Client-side only */}
        {mounted && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {quickActions.map((action: any) => (
              <Link
                key={action.id}
                href={action.actionUrl}
                className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer"
              >
              <div className="flex items-center mb-3">
                <span className="text-2xl mr-3">{action.icon}</span>
                <h3 className="font-semibold text-gray-900">{action.title}</h3>
              </div>
              <p className="text-gray-600 text-sm mb-3">{action.description}</p>
              <div className="flex items-center justify-between">
                <span 
                  className={`text-xs px-2 py-1 rounded-full ${
                    action.priority === 'high' ? 'bg-red-100 text-red-800' :
                    action.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}
                >
                  {action.priority} priority
                </span>
                <span className="text-blue-600 text-sm">→</span>
              </div>
              </Link>
            ))}
          </div>
        )}

        {/* Personalized Resources - Client-side only */}
        {mounted && (
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Recommended Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {resources.slice(0, 4).map((resource: any) => (
                <Link
                  key={resource.id}
                  href={resource.url}
                  className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
                >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{resource.title}</h3>
                  <span className={`text-xs px-2 py-1 rounded ${getResourceTypeColor(resource.type)}`}>
                    {resource.type}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{resource.description}</p>
                {resource.estimatedReadTime && (
                  <p className="text-xs text-gray-500">
                    📚 {resource.estimatedReadTime}
                  </p>
                )}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Support Section - Persona Specific - Client-side only */}
        {mounted && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Support & Help</h2>
            <p className="text-gray-600 mb-4">{messaging.encouragementMessage}</p>
            
            <div className="flex flex-wrap gap-3">
              {interactions.supportLevel === 'high_touch' && (
                <Link
                  href="/portal/support/schedule"
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                >
                  📞 Schedule Support Call
                </Link>
              )}
              
              <Link
                href="/portal/support"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
              >
                💬 {interactions.preferredContactMethod === 'chat' ? 'Live Chat' : 
                     interactions.preferredContactMethod === 'phone' ? 'Phone Support' : 
                     'Email Support'}
              </Link>
              
              {profile.persona.type === 'tech_savvy_optimizer' && (
                <Link
                  href="/portal/developer"
                  className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors"
                >
                  🔧 Developer Tools
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Helper functions
function getPersonaIcon(persona: string): string {
  const icons = {
    'informed_advocator': '🎯',
    'cautious_researcher': '🔍',
    'tech_savvy_optimizer': '⚡'
  };
  return icons[persona as keyof typeof icons] || '👤';
}

function getPersonaLabel(persona: string): string {
  const labels = {
    'informed_advocator': 'Informed Advocator',
    'cautious_researcher': 'Cautious Researcher',
    'tech_savvy_optimizer': 'Tech-Savvy Optimizer'
  };
  return labels[persona as keyof typeof labels] || 'Customer';
}

function getHealthScoreColor(score: number): string {
  if (score >= 80) return '#10B981'; // Green
  if (score >= 60) return '#F59E0B'; // Yellow
  if (score >= 40) return '#EF4444'; // Red
  return '#6B7280'; // Gray
}

function getResourceTypeColor(type: string): string {
  const colors = {
    'article': 'bg-blue-100 text-blue-800',
    'video': 'bg-purple-100 text-purple-800',
    'infographic': 'bg-green-100 text-green-800',
    'checklist': 'bg-yellow-100 text-yellow-800'
  };
  return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
}
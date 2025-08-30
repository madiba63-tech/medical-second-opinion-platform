'use client';

import { useState, useEffect, useMemo } from 'react';
import { usePersona } from '@/hooks/usePersona';
import { LifecycleStage } from '@/types/persona';

interface LifecycleStage {
  id: LifecycleStage;
  name: string;
  description: string;
  icon: React.ReactNode;
  estimatedDuration: string;
  completed: boolean;
  current: boolean;
  completedAt?: string;
}

interface LifecycleProgressProps {
  className?: string;
  variant?: 'horizontal' | 'vertical' | 'compact';
  showDetails?: boolean;
  showEstimates?: boolean;
}

export function LifecycleProgress({ 
  className = '', 
  variant = 'horizontal',
  showDetails = true,
  showEstimates = true
}: LifecycleProgressProps) {
  const { persona, lifecycleData, uiConfig } = usePersona();
  const [animationComplete, setAnimationComplete] = useState(false);

  // Animate progress on mount
  useEffect(() => {
    const timer = setTimeout(() => setAnimationComplete(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const lifecycleStages = useMemo(() => {
    if (!lifecycleData) return [];

    const baseStages: Omit<LifecycleStage, 'completed' | 'current' | 'completedAt'>[] = [
      {
        id: 'discovery',
        name: 'Discovery',
        description: 'Learning about second opinions',
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        ),
        estimatedDuration: '1-2 days'
      },
      {
        id: 'consideration',
        name: 'Consideration',
        description: 'Evaluating service providers',
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
        ),
        estimatedDuration: '2-3 days'
      },
      {
        id: 'onboarding',
        name: 'Onboarding',
        description: 'Account setup and preparation',
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        ),
        estimatedDuration: '30 minutes'
      },
      {
        id: 'active_case',
        name: 'Active Case',
        description: 'Case submitted and in review',
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        ),
        estimatedDuration: '3-5 days'
      },
      {
        id: 'waiting',
        name: 'Waiting',
        description: 'Professional review in progress',
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ),
        estimatedDuration: '1-2 days'
      },
      {
        id: 'results_review',
        name: 'Results Review',
        description: 'Reviewing your second opinion',
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        ),
        estimatedDuration: '1-7 days'
      },
      {
        id: 'follow_up',
        name: 'Follow-up',
        description: 'Post-opinion support and guidance',
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
          </svg>
        ),
        estimatedDuration: '2-4 weeks'
      },
      {
        id: 'advocate',
        name: 'Advocate',
        description: 'Satisfied customer and referrer',
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        ),
        estimatedDuration: 'Ongoing'
      }
    ];

    const currentStageIndex = baseStages.findIndex(stage => stage.id === lifecycleData.lifecycleStage);

    return baseStages.map((stage, index) => ({
      ...stage,
      completed: index < currentStageIndex,
      current: index === currentStageIndex,
      completedAt: index < currentStageIndex ? '2024-01-20T10:00:00Z' : undefined // Mock data
    }));
  }, [lifecycleData]);

  const currentStageIndex = lifecycleStages.findIndex(stage => stage.current);
  const progressPercentage = lifecycleStages.length > 0 ? 
    ((currentStageIndex + 1) / lifecycleStages.length) * 100 : 0;

  const getPersonaSpecificMessage = () => {
    if (!lifecycleData) return '';

    const messages = {
      informed_advocator: {
        active_case: 'Your case is progressing through our comprehensive review process. Track detailed metrics and professional credentials.',
        waiting: 'Board-certified specialists are conducting thorough analysis. Review our quality assurance methodology.',
        results_review: 'Your evidence-based second opinion is ready. Compare recommendations with initial diagnosis.'
      },
      cautious_researcher: {
        active_case: 'We\'re taking good care of your case. Our team will keep you informed at every step.',
        waiting: 'Your expert is carefully reviewing everything. No need to worry - we\'ll update you soon.',
        results_review: 'Your report is ready! Take your time reviewing it, and call us with any questions.'
      },
      tech_savvy_optimizer: {
        active_case: 'Case processing: AI analysis 94% complete → Professional review → QA validation',
        waiting: 'Real-time status: Professional review in progress | ETA: 18-24h | Auto-notify enabled',
        results_review: 'Report delivered | Data export available | Integration APIs ready | Next action recommended'
      }
    };

    return messages[persona]?.[lifecycleData.lifecycleStage] || 
           `Currently in ${lifecycleData.lifecycleStage.replace('_', ' ')} stage`;
  };

  const getStageColor = (stage: LifecycleStage, isCompleted: boolean, isCurrent: boolean) => {
    if (isCompleted) {
      return {
        bg: uiConfig.colorScheme.primary,
        text: 'white',
        border: uiConfig.colorScheme.primary
      };
    } else if (isCurrent) {
      return {
        bg: uiConfig.colorScheme.accent,
        text: 'white',
        border: uiConfig.colorScheme.accent
      };
    } else {
      return {
        bg: '#F3F4F6',
        text: '#6B7280',
        border: '#E5E7EB'
      };
    }
  };

  if (!lifecycleData) {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="h-4 bg-gray-200 rounded mb-4"></div>
        <div className="flex space-x-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex-1">
              <div className="w-8 h-8 bg-gray-200 rounded-full mx-auto mb-2"></div>
              <div className="h-3 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`${className}`}>
        <div className="flex items-center space-x-3">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-900">
                {lifecycleStages[currentStageIndex]?.name}
              </span>
              <span className="text-xs text-gray-500">
                {Math.round(progressPercentage)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="h-2 rounded-full transition-all duration-1000 ease-out"
                style={{ 
                  width: animationComplete ? `${progressPercentage}%` : '0%',
                  backgroundColor: uiConfig.colorScheme.primary
                }}
              />
            </div>
            <p className="text-xs text-gray-600 mt-1">
              Day {lifecycleData.daysInStage} in current stage
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'vertical') {
    return (
      <div className={`${className}`}>
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Your Journey Progress</h3>
          <p className="text-sm text-gray-600">{getPersonaSpecificMessage()}</p>
        </div>

        <div className="space-y-4">
          {lifecycleStages.map((stage, index) => {
            const colors = getStageColor(stage, stage.completed, stage.current);
            const isLast = index === lifecycleStages.length - 1;

            return (
              <div key={stage.id} className="relative">
                {/* Connecting line */}
                {!isLast && (
                  <div 
                    className="absolute left-4 top-8 w-0.5 h-8"
                    style={{
                      backgroundColor: stage.completed || stage.current ? 
                        uiConfig.colorScheme.primary : '#E5E7EB'
                    }}
                  />
                )}

                <div className="flex items-start space-x-4">
                  {/* Stage icon */}
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
                    style={{
                      backgroundColor: colors.bg,
                      color: colors.text,
                      borderWidth: '2px',
                      borderStyle: 'solid',
                      borderColor: colors.border
                    }}
                  >
                    {stage.completed ? (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : stage.current ? (
                      <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                    ) : (
                      stage.icon
                    )}
                  </div>

                  {/* Stage content */}
                  <div className="flex-1 pb-4">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className={`text-sm font-medium ${
                        stage.completed || stage.current ? 'text-gray-900' : 'text-gray-500'
                      }`}>
                        {stage.name}
                      </h4>
                      
                      {stage.current && (
                        <span 
                          className="px-2 py-1 text-xs font-medium rounded-full"
                          style={{
                            backgroundColor: uiConfig.colorScheme.accent + '20',
                            color: uiConfig.colorScheme.accent
                          }}
                        >
                          Current
                        </span>
                      )}
                      
                      {stage.completed && stage.completedAt && (
                        <span className="text-xs text-gray-400">
                          {new Date(stage.completedAt).toLocaleDateString()}
                        </span>
                      )}
                    </div>

                    <p className={`text-sm ${
                      stage.completed || stage.current ? 'text-gray-600' : 'text-gray-400'
                    }`}>
                      {stage.description}
                    </p>

                    {showEstimates && stage.current && (
                      <p className="text-xs text-gray-500 mt-1">
                        Estimated duration: {stage.estimatedDuration}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Horizontal variant (default)
  return (
    <div className={`${className}`}>
      {showDetails && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900">Your Journey Progress</h3>
            <span 
              className="px-3 py-1 text-sm font-medium rounded-full"
              style={{
                backgroundColor: uiConfig.colorScheme.primary + '20',
                color: uiConfig.colorScheme.primary
              }}
            >
              {Math.round(progressPercentage)}% Complete
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-4">{getPersonaSpecificMessage()}</p>
          
          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
            <div 
              className="h-2 rounded-full transition-all duration-1000 ease-out"
              style={{ 
                width: animationComplete ? `${progressPercentage}%` : '0%',
                backgroundColor: uiConfig.colorScheme.primary
              }}
            />
          </div>
        </div>
      )}

      {/* Stage indicators */}
      <div className="flex justify-between items-start relative">
        {/* Connecting line */}
        <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200" />
        <div 
          className="absolute top-4 left-0 h-0.5 transition-all duration-1000 ease-out"
          style={{ 
            width: animationComplete ? `${(currentStageIndex / (lifecycleStages.length - 1)) * 100}%` : '0%',
            backgroundColor: uiConfig.colorScheme.primary
          }}
        />

        {lifecycleStages.map((stage, index) => {
          const colors = getStageColor(stage, stage.completed, stage.current);

          return (
            <div key={stage.id} className="flex flex-col items-center relative z-10">
              {/* Stage circle */}
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 mb-2"
                style={{
                  backgroundColor: colors.bg,
                  color: colors.text,
                  borderWidth: '2px',
                  borderStyle: 'solid',
                  borderColor: colors.border
                }}
              >
                {stage.completed ? (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : stage.current ? (
                  <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                ) : (
                  <span className="text-xs font-medium">{index + 1}</span>
                )}
              </div>

              {/* Stage label */}
              <div className="text-center max-w-20">
                <h4 className={`text-xs font-medium mb-1 ${
                  stage.completed || stage.current ? 'text-gray-900' : 'text-gray-500'
                }`}>
                  {stage.name}
                </h4>
                
                {showDetails && (
                  <p className={`text-xs ${
                    stage.completed || stage.current ? 'text-gray-600' : 'text-gray-400'
                  }`}>
                    {stage.description}
                  </p>
                )}

                {stage.current && showEstimates && (
                  <p className="text-xs text-gray-500 mt-1">
                    {stage.estimatedDuration}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Current stage details */}
      {showDetails && lifecycleData.daysInStage > 0 && (
        <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: uiConfig.colorScheme.background }}>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">
                Current Stage: {lifecycleStages[currentStageIndex]?.name}
              </h4>
              <p className="text-xs text-gray-600 mt-1">
                Day {lifecycleData.daysInStage} • 
                Started {new Date(lifecycleData.stageEntryDate).toLocaleDateString()}
              </p>
            </div>

            {uiConfig.features.showAdvancedMetrics && (
              <div className="text-right">
                <div className="text-xs text-gray-500">Engagement Score</div>
                <div className="text-sm font-semibold text-gray-900">
                  {lifecycleData.engagementScore}/100
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
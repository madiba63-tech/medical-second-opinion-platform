'use client';

import { useMemo } from 'react';
import { usePersonaTheme, PersonaStyledDiv } from './PersonaAdaptiveUI';
import type { CustomerPersona } from '@/types/persona';

interface ProgressStep {
  id: string;
  title: string;
  personaSpecific?: Partial<Record<CustomerPersona, { title?: string; description?: string }>>;
}

interface SubmissionProgressProps {
  steps: ProgressStep[];
  currentStep: number;
  completedSteps: number;
  persona?: CustomerPersona | null;
  onStepClick?: (stepIndex: number) => void;
  validationErrors?: Record<string, string[]>;
  className?: string;
  variant?: 'horizontal' | 'vertical' | 'compact';
  showLabels?: boolean;
  showProgress?: boolean;
  animated?: boolean;
}

interface ProgressStepProps {
  step: ProgressStep;
  index: number;
  currentStep: number;
  completedSteps: number;
  persona?: CustomerPersona | null;
  onClick?: () => void;
  hasErrors: boolean;
  variant: 'horizontal' | 'vertical' | 'compact';
  showLabel: boolean;
  isLast: boolean;
}

export function SubmissionProgress({
  steps,
  currentStep,
  completedSteps,
  persona,
  onStepClick,
  validationErrors = {},
  className = '',
  variant = 'horizontal',
  showLabels = true,
  showProgress = true,
  animated = true,
}: SubmissionProgressProps) {
  const theme = usePersonaTheme(persona);
  
  const progressPercentage = useMemo(() => {
    return Math.round(((currentStep + 1) / steps.length) * 100);
  }, [currentStep, steps.length]);

  const hasStepErrors = (stepId: string): boolean => {
    return Object.keys(validationErrors).some(key => key.startsWith(stepId));
  };

  const containerClasses = useMemo(() => {
    const base = 'submission-progress';
    const variantClass = `submission-progress--${variant}`;
    const personaClass = persona ? `submission-progress--${persona}` : '';
    const animatedClass = animated ? 'submission-progress--animated' : '';
    
    return [base, variantClass, personaClass, animatedClass, className].filter(Boolean).join(' ');
  }, [variant, persona, animated, className]);

  const renderProgressBar = () => {
    if (!showProgress || variant === 'vertical') return null;

    return (
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            Overall Progress
          </span>
          <span className="text-sm text-gray-500">
            {progressPercentage}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div 
            className={`progress-bar h-full transition-all duration-500 ease-out ${
              animated ? 'animate-pulse' : ''
            }`}
            style={{ 
              width: `${progressPercentage}%`,
              background: `linear-gradient(90deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%)`
            }}
            role="progressbar"
            aria-valuenow={progressPercentage}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Submission progress: ${progressPercentage}% complete`}
          />
        </div>
      </div>
    );
  };

  const renderMobileProgress = () => {
    if (variant !== 'compact') return null;

    const currentStepData = steps[currentStep];
    const stepTitle = currentStepData?.personaSpecific?.[persona || 'informed_advocator']?.title || 
                     currentStepData?.title || 
                     `Step ${currentStep + 1}`;

    return (
      <PersonaStyledDiv persona={persona} variant="primary" className="mb-6 p-4 rounded-lg">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900">
            {stepTitle}
          </h3>
          <span className="text-sm font-medium text-gray-600">
            {currentStep + 1} of {steps.length}
          </span>
        </div>
        
        <div className="flex items-center space-x-2 mb-3">
          <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
            <div 
              className="progress-bar h-full transition-all duration-300"
              style={{ 
                width: `${progressPercentage}%`,
                background: theme.colors.primary
              }}
            />
          </div>
          <span className="text-xs text-gray-500 min-w-0">
            {progressPercentage}%
          </span>
        </div>

        {currentStepData?.personaSpecific?.[persona || 'informed_advocator']?.description && (
          <p className="text-sm text-gray-600">
            {currentStepData.personaSpecific[persona || 'informed_advocator']?.description}
          </p>
        )}

        {/* Step indicators for mobile */}
        <div className="flex justify-center mt-4 space-x-2">
          {steps.map((_, index) => (
            <button
              key={index}
              onClick={() => onStepClick?.(index)}
              disabled={index > completedSteps}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentStep
                  ? 'ring-2 ring-primary ring-offset-2'
                  : ''
              } ${
                index <= completedSteps
                  ? 'bg-primary'
                  : hasStepErrors(steps[index].id)
                  ? 'bg-red-400'
                  : 'bg-gray-300'
              } ${
                index <= completedSteps && onStepClick
                  ? 'hover:scale-110 cursor-pointer'
                  : 'cursor-default'
              } ${
                index > completedSteps
                  ? 'opacity-50 cursor-not-allowed'
                  : ''
              }`}
              aria-label={`Go to step ${index + 1}: ${steps[index].title}`}
              aria-current={index === currentStep ? 'step' : undefined}
            />
          ))}
        </div>
      </PersonaStyledDiv>
    );
  };

  const renderDesktopProgress = () => {
    if (variant === 'compact') return null;

    return (
      <PersonaStyledDiv persona={persona} className="mb-8">
        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Submission Progress
            </h3>
            <span className="text-sm text-gray-500">
              Step {currentStep + 1} of {steps.length}
            </span>
          </div>
          
          {renderProgressBar()}
          
          <div className={`${
            variant === 'vertical' 
              ? 'space-y-4' 
              : 'flex items-center justify-between space-x-4'
          }`}>
            {steps.map((step, index) => (
              <ProgressStepComponent
                key={step.id}
                step={step}
                index={index}
                currentStep={currentStep}
                completedSteps={completedSteps}
                persona={persona}
                onClick={() => onStepClick?.(index)}
                hasErrors={hasStepErrors(step.id)}
                variant={variant}
                showLabel={showLabels}
                isLast={index === steps.length - 1}
              />
            ))}
          </div>
          
          {/* Accessibility helper text */}
          <div className="sr-only" aria-live="polite" aria-atomic="true">
            Currently on step {currentStep + 1} of {steps.length}: {
              steps[currentStep]?.personaSpecific?.[persona || 'informed_advocator']?.title || 
              steps[currentStep]?.title
            }
          </div>
        </div>
      </PersonaStyledDiv>
    );
  };

  return (
    <div className={containerClasses} role="navigation" aria-label="Submission progress">
      {variant === 'compact' ? renderMobileProgress() : renderDesktopProgress()}
      
      <style jsx>{`
        .submission-progress--animated .progress-bar {
          background-size: 200% 100%;
          animation: progress-shine 2s infinite;
        }
        
        @keyframes progress-shine {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        
        .submission-progress--cautious_researcher {
          --step-emphasis: trust;
        }
        
        .submission-progress--tech_savvy_optimizer {
          --step-emphasis: efficiency;
        }
        
        .submission-progress--informed_advocator {
          --step-emphasis: comprehensive;
        }
      `}</style>
    </div>
  );
}

function ProgressStepComponent({
  step,
  index,
  currentStep,
  completedSteps,
  persona,
  onClick,
  hasErrors,
  variant,
  showLabel,
  isLast,
}: ProgressStepProps) {
  const theme = usePersonaTheme(persona);
  
  const isCompleted = index <= completedSteps;
  const isCurrent = index === currentStep;
  const isClickable = isCompleted && onClick;
  const isDisabled = index > completedSteps;
  
  const stepTitle = step.personaSpecific?.[persona || 'informed_advocator']?.title || step.title;
  
  const getStepIcon = () => {
    if (hasErrors) {
      return (
        <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      );
    }
    
    if (isCompleted && !isCurrent) {
      return (
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
      );
    }
    
    if (isCurrent) {
      return (
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
    }
    
    return (
      <span className="text-sm font-medium">
        {index + 1}
      </span>
    );
  };

  const getStepClasses = () => {
    const baseClasses = [
      'relative',
      'flex',
      'items-center',
      'justify-center',
      'w-10',
      'h-10',
      'rounded-full',
      'transition-all',
      'duration-300',
      'text-sm',
      'font-medium',
    ];

    if (hasErrors) {
      baseClasses.push('bg-red-100', 'border-2', 'border-red-300', 'text-red-600');
    } else if (isCurrent) {
      baseClasses.push('ring-4', 'ring-opacity-50', 'shadow-lg', 'transform', 'scale-110');
      baseClasses.push('bg-primary', 'text-white', 'ring-primary');
    } else if (isCompleted) {
      baseClasses.push('bg-primary', 'text-white', 'shadow-md');
      if (isClickable) {
        baseClasses.push('hover:bg-primary-dark', 'hover:shadow-lg', 'hover:scale-105', 'cursor-pointer');
      }
    } else if (isDisabled) {
      baseClasses.push('bg-gray-200', 'text-gray-400', 'cursor-not-allowed');
    } else {
      baseClasses.push('bg-gray-200', 'text-gray-600');
    }

    return baseClasses.join(' ');
  };

  const renderConnector = () => {
    if (isLast || variant === 'vertical') return null;

    return (
      <div className={`flex-1 h-0.5 mx-4 transition-colors duration-300 ${
        isCompleted ? 'bg-primary' : 'bg-gray-200'
      }`} />
    );
  };

  const stepElement = (
    <div className={variant === 'vertical' ? 'flex items-center space-x-4' : 'flex flex-col items-center'}>
      <button
        onClick={isClickable ? onClick : undefined}
        disabled={isDisabled || !onClick}
        className={getStepClasses()}
        aria-current={isCurrent ? 'step' : undefined}
        aria-label={`${isCompleted ? 'Completed: ' : isCurrent ? 'Current: ' : ''}${stepTitle}`}
        type="button"
      >
        {getStepIcon()}
        
        {/* Pulsing animation for current step */}
        {isCurrent && (
          <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75" />
        )}
      </button>
      
      {showLabel && (
        <div className={`${variant === 'vertical' ? 'flex-1' : 'mt-3'} text-center`}>
          <span className={`text-xs font-medium px-2 py-1 rounded transition-colors duration-200 ${
            isCurrent 
              ? 'text-primary bg-primary bg-opacity-10' 
              : isCompleted 
              ? 'text-primary' 
              : hasErrors
              ? 'text-red-600'
              : 'text-gray-500'
          }`}>
            {stepTitle}
          </span>
          
          {hasErrors && (
            <div className="mt-1 text-xs text-red-600 font-medium">
              Needs attention
            </div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className={`${variant === 'vertical' ? 'w-full' : 'flex-1'} relative`}>
      {stepElement}
      {renderConnector()}
    </div>
  );
}

// Utility component for simple progress display
export function SimpleProgress({ 
  current, 
  total, 
  persona,
  showPercentage = true,
  className = ''
}: {
  current: number;
  total: number;
  persona?: CustomerPersona | null;
  showPercentage?: boolean;
  className?: string;
}) {
  const theme = usePersonaTheme(persona);
  const percentage = Math.round((current / total) * 100);

  return (
    <div className={`simple-progress ${className}`}>
      {showPercentage && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Progress</span>
          <span className="text-sm text-gray-500">{percentage}%</span>
        </div>
      )}
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="progress-bar h-full rounded-full transition-all duration-300"
          style={{ 
            width: `${percentage}%`,
            backgroundColor: theme.colors.primary
          }}
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
}
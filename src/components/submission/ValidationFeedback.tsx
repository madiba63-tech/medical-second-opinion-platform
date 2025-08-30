'use client';

import { useState, useEffect, useMemo } from 'react';
import { usePersonaTheme, PersonaStyledDiv } from './PersonaAdaptiveUI';
import type { CustomerPersona } from '@/types/persona';

interface ValidationError {
  field: string;
  message: string;
  severity: 'error' | 'warning' | 'info';
  code?: string;
}

interface ValidationWarning {
  field: string;
  message: string;
  suggestion?: string;
  code?: string;
}

interface ValidationFeedbackProps {
  errors: Record<string, string[]>;
  warnings: Record<string, string[]>;
  isValidating: boolean;
  persona?: CustomerPersona | null;
  currentStep?: string;
  className?: string;
  showSummary?: boolean;
  autoHide?: boolean;
  onErrorClick?: (field: string) => void;
  realTimeValidation?: boolean;
}

interface ValidationMessageProps {
  type: 'error' | 'warning' | 'info' | 'success';
  message: string;
  field?: string;
  suggestion?: string;
  onDismiss?: () => void;
  onClick?: () => void;
  persona?: CustomerPersona | null;
  animated?: boolean;
  icon?: React.ReactNode;
}

interface ValidationSummaryProps {
  totalErrors: number;
  totalWarnings: number;
  currentStep: string;
  persona?: CustomerPersona | null;
  isValidating: boolean;
}

export function ValidationFeedback({
  errors = {},
  warnings = {},
  isValidating = false,
  persona,
  currentStep = '',
  className = '',
  showSummary = true,
  autoHide = false,
  onErrorClick,
  realTimeValidation = true,
}: ValidationFeedbackProps) {
  const theme = usePersonaTheme(persona);
  const [dismissedErrors, setDismissedErrors] = useState<Set<string>>(new Set());
  const [dismissedWarnings, setDismissedWarnings] = useState<Set<string>>(new Set());
  const [isVisible, setIsVisible] = useState(true);

  const totalErrors = Object.keys(errors).reduce((sum, key) => sum + errors[key].length, 0);
  const totalWarnings = Object.keys(warnings).reduce((sum, key) => sum + warnings[key].length, 0);
  const hasIssues = totalErrors > 0 || totalWarnings > 0;

  // Auto-hide functionality
  useEffect(() => {
    if (autoHide && !hasIssues) {
      const timer = setTimeout(() => setIsVisible(false), 3000);
      return () => clearTimeout(timer);
    } else if (hasIssues) {
      setIsVisible(true);
    }
  }, [autoHide, hasIssues]);

  // Clear dismissed items when errors/warnings change
  useEffect(() => {
    setDismissedErrors(prev => {
      const activeErrors = new Set(Object.keys(errors));
      return new Set([...prev].filter(key => activeErrors.has(key)));
    });
    setDismissedWarnings(prev => {
      const activeWarnings = new Set(Object.keys(warnings));
      return new Set([...prev].filter(key => activeWarnings.has(key)));
    });
  }, [errors, warnings]);

  const getPersonaSpecificContent = useMemo(() => {
    switch (persona) {
      case 'cautious_researcher':
        return {
          validatingMessage: 'Checking your information carefully...',
          noIssuesMessage: 'Everything looks good! You can proceed with confidence.',
          errorTitle: 'Please Review These Items',
          warningTitle: 'Suggestions for Your Submission',
          helpText: 'We want to make sure everything is correct before you submit.',
        };
      case 'tech_savvy_optimizer':
        return {
          validatingMessage: 'Running validation algorithms...',
          noIssuesMessage: 'All systems green! Ready to proceed.',
          errorTitle: 'Validation Errors Detected',
          warningTitle: 'Optimization Recommendations',
          helpText: 'Real-time validation ensures optimal submission quality.',
        };
      case 'informed_advocator':
        return {
          validatingMessage: 'Performing comprehensive validation...',
          noIssuesMessage: 'All requirements met. Ready for expert review.',
          errorTitle: 'Required Information Missing',
          warningTitle: 'Recommendations for Better Results',
          helpText: 'Thorough validation ensures the best possible medical review.',
        };
      default:
        return {
          validatingMessage: 'Validating your information...',
          noIssuesMessage: 'Everything looks good!',
          errorTitle: 'Please Fix These Issues',
          warningTitle: 'Suggestions',
          helpText: 'Please review the items below before continuing.',
        };
    }
  }, [persona]);

  const content = getPersonaSpecificContent;

  const dismissError = (field: string) => {
    setDismissedErrors(prev => new Set([...prev, field]));
  };

  const dismissWarning = (field: string) => {
    setDismissedWarnings(prev => new Set([...prev, field]));
  };

  const visibleErrors = useMemo(() => {
    return Object.entries(errors).filter(([field]) => !dismissedErrors.has(field));
  }, [errors, dismissedErrors]);

  const visibleWarnings = useMemo(() => {
    return Object.entries(warnings).filter(([field]) => !dismissedWarnings.has(field));
  }, [warnings, dismissedWarnings]);

  if (!isVisible && !hasIssues && !isValidating) {
    return null;
  }

  return (
    <PersonaStyledDiv persona={persona} className={`validation-feedback ${className}`}>
      {/* Validation Status */}
      {isValidating && (
        <ValidationMessage
          type="info"
          message={content.validatingMessage}
          persona={persona}
          animated
          icon={
            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          }
        />
      )}

      {/* Success State */}
      {!isValidating && !hasIssues && realTimeValidation && (
        <ValidationMessage
          type="success"
          message={content.noIssuesMessage}
          persona={persona}
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          }
        />
      )}

      {/* Validation Summary */}
      {showSummary && hasIssues && !isValidating && (
        <ValidationSummary
          totalErrors={visibleErrors.length}
          totalWarnings={visibleWarnings.length}
          currentStep={currentStep}
          persona={persona}
          isValidating={isValidating}
        />
      )}

      {/* Error Messages */}
      {visibleErrors.length > 0 && (
        <div className="space-y-2">
          {showSummary && (
            <h4 className="text-sm font-semibold text-red-800 flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
              {content.errorTitle} ({visibleErrors.reduce((sum, [, msgs]) => sum + msgs.length, 0)})
            </h4>
          )}
          {visibleErrors.map(([field, messages]) =>
            messages.map((message, index) => (
              <ValidationMessage
                key={`${field}-error-${index}`}
                type="error"
                message={message}
                field={field}
                onDismiss={() => dismissError(field)}
                onClick={() => onErrorClick?.(field)}
                persona={persona}
              />
            ))
          )}
        </div>
      )}

      {/* Warning Messages */}
      {visibleWarnings.length > 0 && (
        <div className="space-y-2">
          {showSummary && (
            <h4 className="text-sm font-semibold text-amber-800 flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
              {content.warningTitle} ({visibleWarnings.reduce((sum, [, msgs]) => sum + msgs.length, 0)})
            </h4>
          )}
          {visibleWarnings.map(([field, messages]) =>
            messages.map((message, index) => (
              <ValidationMessage
                key={`${field}-warning-${index}`}
                type="warning"
                message={message}
                field={field}
                onDismiss={() => dismissWarning(field)}
                onClick={() => onErrorClick?.(field)}
                persona={persona}
              />
            ))
          )}
        </div>
      )}

      {/* Help Text */}
      {hasIssues && !isValidating && (
        <div className="mt-4 text-sm text-gray-600 border-t pt-4">
          <p className="flex items-start">
            <svg className="w-4 h-4 mr-2 mt-0.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {content.helpText}
          </p>
        </div>
      )}
    </PersonaStyledDiv>
  );
}

function ValidationMessage({
  type,
  message,
  field,
  suggestion,
  onDismiss,
  onClick,
  persona,
  animated = false,
  icon,
}: ValidationMessageProps) {
  const theme = usePersonaTheme(persona);

  const getTypeStyles = () => {
    switch (type) {
      case 'error':
        return {
          containerClass: 'alert-error border-l-4 border-red-400 bg-red-50 p-4',
          iconColor: 'text-red-400',
          textColor: 'text-red-800',
          buttonColor: 'text-red-600 hover:text-red-800',
        };
      case 'warning':
        return {
          containerClass: 'alert-warning border-l-4 border-amber-400 bg-amber-50 p-4',
          iconColor: 'text-amber-400',
          textColor: 'text-amber-800',
          buttonColor: 'text-amber-600 hover:text-amber-800',
        };
      case 'success':
        return {
          containerClass: 'alert-success border-l-4 border-green-400 bg-green-50 p-4',
          iconColor: 'text-green-400',
          textColor: 'text-green-800',
          buttonColor: 'text-green-600 hover:text-green-800',
        };
      case 'info':
        return {
          containerClass: 'border-l-4 border-blue-400 bg-blue-50 p-4',
          iconColor: 'text-blue-400',
          textColor: 'text-blue-800',
          buttonColor: 'text-blue-600 hover:text-blue-800',
        };
    }
  };

  const styles = getTypeStyles();

  const getDefaultIcon = () => {
    switch (type) {
      case 'error':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        );
      case 'warning':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        );
      case 'success':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      case 'info':
      default:
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
    }
  };

  return (
    <div 
      className={`${styles.containerClass} rounded-md transition-all duration-300 ${
        animated ? 'animate-pulse' : ''
      } ${onClick ? 'cursor-pointer hover:shadow-md' : ''}`}
      onClick={onClick}
      role={type === 'error' ? 'alert' : 'status'}
      aria-live={type === 'error' ? 'assertive' : 'polite'}
    >
      <div className="flex items-start">
        <div className={`${styles.iconColor} flex-shrink-0`}>
          {icon || getDefaultIcon()}
        </div>
        
        <div className="ml-3 flex-1">
          <div className={`text-sm ${styles.textColor}`}>
            {field && persona === 'tech_savvy_optimizer' && (
              <span className="font-mono text-xs bg-black bg-opacity-10 px-2 py-1 rounded mr-2">
                {field}
              </span>
            )}
            <span className="font-medium">{message}</span>
          </div>
          
          {suggestion && (
            <div className={`mt-2 text-xs ${styles.textColor} opacity-80`}>
              <strong>Suggestion:</strong> {suggestion}
            </div>
          )}
        </div>
        
        {onDismiss && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDismiss();
            }}
            className={`ml-2 flex-shrink-0 p-1 rounded-md transition-colors duration-200 ${styles.buttonColor}`}
            aria-label="Dismiss validation message"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

function ValidationSummary({
  totalErrors,
  totalWarnings,
  currentStep,
  persona,
  isValidating,
}: ValidationSummaryProps) {
  const theme = usePersonaTheme(persona);

  if (isValidating || (totalErrors === 0 && totalWarnings === 0)) {
    return null;
  }

  const getPersonaSpecificSummary = () => {
    switch (persona) {
      case 'cautious_researcher':
        return `We found ${totalErrors + totalWarnings} items that need your attention. Don't worry - we'll help you fix them.`;
      case 'tech_savvy_optimizer':
        return `Validation scan complete: ${totalErrors} errors, ${totalWarnings} optimization opportunities detected.`;
      case 'informed_advocator':
        return `Comprehensive review identified ${totalErrors + totalWarnings} items for optimal submission quality.`;
      default:
        return `Please review ${totalErrors + totalWarnings} items before continuing.`;
    }
  };

  return (
    <PersonaStyledDiv
      persona={persona}
      variant={totalErrors > 0 ? 'primary' : 'secondary'}
      className="mb-4 p-4 rounded-lg"
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          {totalErrors > 0 ? (
            <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          )}
        </div>
        
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-gray-900 mb-1">
            Validation Summary for {currentStep}
          </h3>
          <p className="text-sm text-gray-700 mb-3">
            {getPersonaSpecificSummary()}
          </p>
          
          <div className="flex items-center space-x-4 text-xs">
            {totalErrors > 0 && (
              <div className="flex items-center text-red-600">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-1" />
                {totalErrors} error{totalErrors !== 1 ? 's' : ''}
              </div>
            )}
            {totalWarnings > 0 && (
              <div className="flex items-center text-amber-600">
                <div className="w-2 h-2 bg-amber-500 rounded-full mr-1" />
                {totalWarnings} warning{totalWarnings !== 1 ? 's' : ''}
              </div>
            )}
          </div>
        </div>
      </div>
    </PersonaStyledDiv>
  );
}

// Utility hook for validation feedback
export function useValidationFeedback() {
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [warnings, setWarnings] = useState<Record<string, string[]>>({});
  const [isValidating, setIsValidating] = useState(false);

  const addError = (field: string, message: string) => {
    setErrors(prev => ({
      ...prev,
      [field]: [...(prev[field] || []), message]
    }));
  };

  const removeError = (field: string, message?: string) => {
    setErrors(prev => {
      if (!message) {
        const { [field]: _, ...rest } = prev;
        return rest;
      }
      const filtered = prev[field]?.filter(msg => msg !== message) || [];
      return filtered.length > 0 ? { ...prev, [field]: filtered } : { ...prev };
    });
  };

  const addWarning = (field: string, message: string) => {
    setWarnings(prev => ({
      ...prev,
      [field]: [...(prev[field] || []), message]
    }));
  };

  const removeWarning = (field: string, message?: string) => {
    setWarnings(prev => {
      if (!message) {
        const { [field]: _, ...rest } = prev;
        return rest;
      }
      const filtered = prev[field]?.filter(msg => msg !== message) || [];
      return filtered.length > 0 ? { ...prev, [field]: filtered } : { ...prev };
    });
  };

  const clearAll = () => {
    setErrors({});
    setWarnings({});
  };

  return {
    errors,
    warnings,
    isValidating,
    setIsValidating,
    addError,
    removeError,
    addWarning,
    removeWarning,
    clearAll,
  };
}
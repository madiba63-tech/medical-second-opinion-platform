'use client';

import { useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import type { CaseSubmissionRequest, CaseSubmissionResponse } from '@/lib/validations/caseSubmission';

interface SubmissionAnalytics {
  submissionId: string;
  startTime: number;
  endTime?: number;
  duration?: number;
  steps: {
    stepId: string;
    startTime: number;
    endTime?: number;
    duration?: number;
    errors: number;
    warnings: number;
  }[];
  totalErrors: number;
  totalWarnings: number;
  conversionFunnel: {
    stepId: string;
    completed: boolean;
    timestamp: number;
  }[];
  userAgent: string;
  deviceInfo: {
    isMobile: boolean;
    screen: {
      width: number;
      height: number;
    };
  };
}

interface SubmissionState {
  isSubmitting: boolean;
  submissionProgress: number;
  error: string | null;
  success: boolean;
  caseNumber: string | null;
  submissionId: string | null;
  analytics: SubmissionAnalytics | null;
}

interface SubmissionResult {
  success: boolean;
  caseId?: string;
  caseNumber?: string;
  error?: string;
  metrics?: CaseSubmissionResponse['metrics'];
  lifecycleEvents?: string[];
}

interface UseCaseSubmissionReturn {
  // State
  isSubmitting: boolean;
  submissionProgress: number;
  error: string | null;
  success: boolean;
  caseNumber: string | null;
  submissionId: string | null;
  analytics: SubmissionAnalytics | null;
  
  // Actions
  submitCase: (data: CaseSubmissionRequest) => Promise<SubmissionResult>;
  resetSubmission: () => void;
  cancelSubmission: () => void;
  trackAnalytics: (event: string, data?: Record<string, any>) => void;
  
  // Analytics methods
  startStepAnalytics: (stepId: string) => void;
  completeStepAnalytics: (stepId: string, errors?: number, warnings?: number) => void;
  getSubmissionAnalytics: () => SubmissionAnalytics | null;
}

export function useCaseSubmission(): UseCaseSubmissionReturn {
  const router = useRouter();
  const [state, setState] = useState<SubmissionState>({
    isSubmitting: false,
    submissionProgress: 0,
    error: null,
    success: false,
    caseNumber: null,
    submissionId: null,
    analytics: null,
  });

  const abortControllerRef = useRef<AbortController | null>(null);
  const analyticsRef = useRef<SubmissionAnalytics | null>(null);

  // Initialize analytics
  const initializeAnalytics = useCallback(() => {
    const submissionId = `sub_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    analyticsRef.current = {
      submissionId,
      startTime: Date.now(),
      steps: [],
      totalErrors: 0,
      totalWarnings: 0,
      conversionFunnel: [],
      userAgent: navigator.userAgent,
      deviceInfo: {
        isMobile: /Mobi|Android/i.test(navigator.userAgent),
        screen: {
          width: window.screen.width,
          height: window.screen.height,
        },
      },
    };

    setState(prev => ({
      ...prev,
      submissionId,
      analytics: analyticsRef.current,
    }));

    return submissionId;
  }, []);

  // Track analytics events
  const trackAnalytics = useCallback((event: string, data?: Record<string, any>) => {
    if (!analyticsRef.current) {
      initializeAnalytics();
    }

    const eventData = {
      event,
      timestamp: Date.now(),
      data: data || {},
    };

    // Send analytics to API endpoint
    fetch('/api/v1/customer/case-submission/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        submissionId: analyticsRef.current?.submissionId,
        event: eventData,
      }),
    }).catch(error => {
      console.warn('Failed to send analytics:', error);
    });
  }, [initializeAnalytics]);

  // Start step analytics
  const startStepAnalytics = useCallback((stepId: string) => {
    if (!analyticsRef.current) return;

    const existingStep = analyticsRef.current.steps.find(s => s.stepId === stepId);
    if (existingStep && !existingStep.endTime) return; // Step already started

    analyticsRef.current.steps.push({
      stepId,
      startTime: Date.now(),
      errors: 0,
      warnings: 0,
    });

    analyticsRef.current.conversionFunnel.push({
      stepId,
      completed: false,
      timestamp: Date.now(),
    });

    trackAnalytics('step_started', { stepId });
  }, [trackAnalytics]);

  // Complete step analytics
  const completeStepAnalytics = useCallback((stepId: string, errors = 0, warnings = 0) => {
    if (!analyticsRef.current) return;

    const step = analyticsRef.current.steps.find(s => s.stepId === stepId);
    if (step && !step.endTime) {
      step.endTime = Date.now();
      step.duration = step.endTime - step.startTime;
      step.errors = errors;
      step.warnings = warnings;

      analyticsRef.current.totalErrors += errors;
      analyticsRef.current.totalWarnings += warnings;
    }

    const funnelStep = analyticsRef.current.conversionFunnel.find(s => s.stepId === stepId);
    if (funnelStep) {
      funnelStep.completed = true;
      funnelStep.timestamp = Date.now();
    }

    trackAnalytics('step_completed', { stepId, errors, warnings, duration: step?.duration });
  }, [trackAnalytics]);

  // Main submission function
  const submitCase = useCallback(async (data: CaseSubmissionRequest): Promise<SubmissionResult> => {
    try {
      // Initialize analytics if not already done
      if (!analyticsRef.current) {
        initializeAnalytics();
      }

      // Cancel any existing submission
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // Create new abort controller
      abortControllerRef.current = new AbortController();

      setState(prev => ({
        ...prev,
        isSubmitting: true,
        submissionProgress: 0,
        error: null,
        success: false,
      }));

      trackAnalytics('submission_started', {
        customerId: data.customerId,
        diseaseType: data.diseaseType,
        fileCount: data.uploadedFiles?.length || 0,
      });

      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setState(prev => {
          if (prev.submissionProgress < 90) {
            return { ...prev, submissionProgress: prev.submissionProgress + 10 };
          }
          return prev;
        });
      }, 200);

      try {
        // Submit to API
        const response = await fetch('/api/v1/customer/case-submission/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('auth_token') || ''}`,
          },
          body: JSON.stringify(data),
          signal: abortControllerRef.current.signal,
        });

        clearInterval(progressInterval);

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || `HTTP ${response.status}`);
        }

        const result: CaseSubmissionResponse = await response.json();

        // Complete analytics
        if (analyticsRef.current) {
          analyticsRef.current.endTime = Date.now();
          analyticsRef.current.duration = analyticsRef.current.endTime - analyticsRef.current.startTime;
        }

        setState(prev => ({
          ...prev,
          isSubmitting: false,
          submissionProgress: 100,
          success: true,
          caseNumber: result.caseNumber,
          analytics: analyticsRef.current,
        }));

        trackAnalytics('submission_completed', {
          caseId: result.caseId,
          caseNumber: result.caseNumber,
          duration: analyticsRef.current?.duration,
          isFirstSubmission: result.metrics?.isFirstSubmission,
        });

        return {
          success: true,
          caseId: result.caseId,
          caseNumber: result.caseNumber,
          metrics: result.metrics,
          lifecycleEvents: result.lifecycleEvents,
        };

      } catch (fetchError) {
        clearInterval(progressInterval);
        
        const error = fetchError instanceof Error ? fetchError : new Error('Unknown error');
        
        if (error.name === 'AbortError') {
          setState(prev => ({
            ...prev,
            isSubmitting: false,
            submissionProgress: 0,
            error: null,
          }));
          trackAnalytics('submission_cancelled');
          return { success: false, error: 'Submission cancelled' };
        }

        setState(prev => ({
          ...prev,
          isSubmitting: false,
          submissionProgress: 0,
          error: error.message,
          success: false,
        }));

        trackAnalytics('submission_failed', {
          error: error.message,
          duration: analyticsRef.current ? Date.now() - analyticsRef.current.startTime : 0,
        });

        return { success: false, error: error.message };
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      
      setState(prev => ({
        ...prev,
        isSubmitting: false,
        submissionProgress: 0,
        error: errorMessage,
        success: false,
      }));

      trackAnalytics('submission_error', { error: errorMessage });

      return { success: false, error: errorMessage };
    }
  }, [initializeAnalytics, trackAnalytics]);

  // Reset submission state
  const resetSubmission = useCallback(() => {
    setState({
      isSubmitting: false,
      submissionProgress: 0,
      error: null,
      success: false,
      caseNumber: null,
      submissionId: null,
      analytics: null,
    });
    
    analyticsRef.current = null;
    
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  }, []);

  // Cancel ongoing submission
  const cancelSubmission = useCallback(() => {
    if (abortControllerRef.current && state.isSubmitting) {
      abortControllerRef.current.abort();
      trackAnalytics('submission_cancelled_by_user');
    }
  }, [state.isSubmitting, trackAnalytics]);

  // Get current analytics
  const getSubmissionAnalytics = useCallback(() => {
    return analyticsRef.current;
  }, []);

  return {
    // State
    isSubmitting: state.isSubmitting,
    submissionProgress: state.submissionProgress,
    error: state.error,
    success: state.success,
    caseNumber: state.caseNumber,
    submissionId: state.submissionId,
    analytics: state.analytics,
    
    // Actions
    submitCase,
    resetSubmission,
    cancelSubmission,
    trackAnalytics,
    
    // Analytics methods
    startStepAnalytics,
    completeStepAnalytics,
    getSubmissionAnalytics,
  };
}

// Utility hook for submission progress monitoring
export function useSubmissionProgress(submissionId?: string) {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<'idle' | 'processing' | 'completed' | 'failed'>('idle');

  const checkProgress = useCallback(async () => {
    if (!submissionId) return;

    try {
      const response = await fetch(`/api/v1/customer/case-submission/progress/${submissionId}`);
      if (response.ok) {
        const data = await response.json();
        setProgress(data.progress || 0);
        setStatus(data.status || 'idle');
      }
    } catch (error) {
      console.error('Failed to check submission progress:', error);
    }
  }, [submissionId]);

  return { progress, status, checkProgress };
}

// Hook for submission history
export function useSubmissionHistory(customerId?: string) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchHistory = useCallback(async () => {
    if (!customerId) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/v1/customer/cases?customerId=${customerId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token') || ''}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch submission history');
      }

      const data = await response.json();
      setHistory(data.cases || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [customerId]);

  return { history, loading, error, fetchHistory };
}
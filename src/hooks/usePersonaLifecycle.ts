'use client';

import { useState, useEffect, useCallback } from 'react';

interface PersonaLifecycle {
  customerId: string;
  persona: {
    type: 'informed_advocator' | 'cautious_researcher' | 'tech_savvy_optimizer';
    confidence: number;
    characteristics: string[];
  };
  currentStage: {
    stage: string;
    timestamp: string;
    daysSinceLastActivity: number;
  };
  healthScore: number;
  engagementLevel: 'low' | 'medium' | 'high';
  preferences: {
    communication: any;
    notifications: any;
    ui: any;
  };
  journey: {
    totalCases: number;
    lifetimeValue: number;
    stages: any[];
  };
}

interface LifecycleProgress {
  currentStage: {
    stage: string;
    entryDate: string;
    daysInStage: number;
    milestones: any[];
  };
  nextActions: any[];
  progressPercentage: number;
  estimatedTimeToCompletion?: string;
}

interface PersonalizedContent {
  persona: {
    type: string;
    preferences: any;
  };
  stage: string;
  content: {
    dashboard: any;
    messaging: any;
    resources: any[];
    quickActions: any[];
  };
  uiConfiguration: {
    colorScheme: {
      primary: string;
      secondary: string;
      accent: string;
    };
    typography: {
      scale: 'compact' | 'comfortable' | 'spacious';
      complexity: 'simple' | 'detailed' | 'technical';
    };
    interactions: {
      supportLevel: 'self_service' | 'guided' | 'high_touch';
      preferredContactMethod: 'chat' | 'phone' | 'email';
    };
  };
}

export function usePersonaLifecycle(customerId: string) {
  const [mounted, setMounted] = useState(false);
  const [profile, setProfile] = useState<PersonaLifecycle | null>(null);
  const [progress, setProgress] = useState<LifecycleProgress | null>(null);
  const [personalizedContent, setPersonalizedContent] = useState<PersonalizedContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Hydration safety: only render after component mounts on client
  useEffect(() => {
    setMounted(true);
  }, []);

  const fetchLifecycleData = useCallback(async () => {
    if (!customerId || !mounted) return;

    setLoading(true);
    setError(null);

    try {
      const [profileRes, progressRes, contentRes] = await Promise.all([
        fetch(`/api/v1/customer/lifecycle/profile?customerId=${customerId}`),
        fetch(`/api/v1/customer/lifecycle/progress?customerId=${customerId}`),
        fetch(`/api/v1/customer/content/personalized?customerId=${customerId}`)
      ]);

      if (!profileRes.ok || !progressRes.ok || !contentRes.ok) {
        throw new Error('Failed to fetch lifecycle data');
      }

      const [profileData, progressData, contentData] = await Promise.all([
        profileRes.json(),
        progressRes.json(),
        contentRes.json()
      ]);

      setProfile(profileData.data);
      setProgress(progressData.data);
      setPersonalizedContent(contentData.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      console.error('Error fetching lifecycle data:', err);
    } finally {
      setLoading(false);
    }
  }, [customerId, mounted]);

  useEffect(() => {
    if (mounted) {
      fetchLifecycleData();
    }
  }, [fetchLifecycleData, mounted]);

  return {
    profile,
    progress,
    personalizedContent,
    loading: loading || !mounted, // Keep loading until mounted and data fetched
    error,
    refetch: fetchLifecycleData
  };
}

export function usePersonaConfiguration() {
  const [configuration, setConfiguration] = useState<PersonalizedContent['uiConfiguration'] | null>(null);

  const applyPersonaStyles = useCallback((uiConfig: PersonalizedContent['uiConfiguration']) => {
    if (!uiConfig || typeof window === 'undefined') return; // SSR guard

    // Apply CSS custom properties for persona-based styling
    const root = document.documentElement;
    
    root.style.setProperty('--persona-primary', uiConfig.colorScheme.primary);
    root.style.setProperty('--persona-secondary', uiConfig.colorScheme.secondary);
    root.style.setProperty('--persona-accent', uiConfig.colorScheme.accent);
    
    // Apply typography scale
    const scaleValues = {
      compact: '0.9',
      comfortable: '1.0',
      spacious: '1.1'
    };
    root.style.setProperty('--persona-scale', scaleValues[uiConfig.typography.scale]);
    
    // Apply spacing based on complexity
    const spacingValues = {
      simple: '1.2',
      detailed: '1.0',
      technical: '0.8'
    };
    root.style.setProperty('--persona-spacing', spacingValues[uiConfig.typography.complexity]);
    
    setConfiguration(uiConfig);
  }, []);

  return {
    configuration,
    applyPersonaStyles
  };
}
'use client';

import React, { useState, useEffect, useContext, createContext, ReactNode } from 'react';
import { 
  CustomerPersona, 
  CustomerLifecycleData, 
  PersonaUIConfiguration,
  PERSONA_PROFILES,
  PERSONA_UI_CONFIGS,
  LifecycleStage
} from '@/types/persona';

interface PersonaContextType {
  persona: CustomerPersona;
  lifecycleData: CustomerLifecycleData | null;
  uiConfig: PersonaUIConfiguration;
  setPersona: (persona: CustomerPersona) => void;
  updateLifecycleStage: (stage: LifecycleStage) => void;
  isLoading: boolean;
}

const PersonaContext = createContext<PersonaContextType | null>(null);

interface PersonaProviderProps {
  children: ReactNode;
  customerId?: string;
}

export function PersonaProvider({ children, customerId }: PersonaProviderProps) {
  const [persona, setPersonaState] = useState<CustomerPersona>('informed_advocator');
  const [lifecycleData, setLifecycleData] = useState<CustomerLifecycleData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate fetching customer persona and lifecycle data
  useEffect(() => {
    const fetchPersonaData = async () => {
      setIsLoading(true);
      
      // In a real implementation, this would be an API call
      // For now, we'll simulate based on customer behavior or use default
      
      // Mock lifecycle data based on persona
      const mockLifecycleData: CustomerLifecycleData = {
        customerId: customerId || 'mock-customer',
        persona: persona,
        lifecycleStage: 'active_case',
        stageEntryDate: '2024-01-20',
        daysInStage: 3,
        previousStage: 'onboarding',
        communicationPreferences: PERSONA_PROFILES[persona].preferredChannels,
        engagementScore: getPersonaEngagementScore(persona),
        satisfactionScore: 85,
        riskScore: getPersonaRiskScore(persona),
        nextRecommendedActions: getPersonaRecommendedActions(persona),
        personalizedContent: {
          welcomeMessage: getPersonaWelcomeMessage(persona),
          stageSpecificTips: getPersonaStageTips(persona, 'active_case'),
          relevantResources: getPersonaResources(persona)
        }
      };

      setLifecycleData(mockLifecycleData);
      setIsLoading(false);
    };

    fetchPersonaData();
  }, [customerId, persona]);

  const setPersona = (newPersona: CustomerPersona) => {
    setPersonaState(newPersona);
    // In real implementation, this would update the backend
    localStorage.setItem('customerPersona', newPersona);
  };

  const updateLifecycleStage = (stage: LifecycleStage) => {
    if (lifecycleData) {
      const updatedData = {
        ...lifecycleData,
        previousStage: lifecycleData.lifecycleStage,
        lifecycleStage: stage,
        stageEntryDate: new Date().toISOString(),
        daysInStage: 0,
        nextRecommendedActions: getPersonaRecommendedActions(persona, stage),
        personalizedContent: {
          ...lifecycleData.personalizedContent,
          stageSpecificTips: getPersonaStageTips(persona, stage)
        }
      };
      setLifecycleData(updatedData);
    }
  };

  const uiConfig = PERSONA_UI_CONFIGS[persona];

  const value = {
    persona,
    lifecycleData,
    uiConfig,
    setPersona,
    updateLifecycleStage,
    isLoading
  };

  return React.createElement(PersonaContext.Provider, { value }, children);
}

export function usePersona() {
  const context = useContext(PersonaContext);
  if (!context) {
    // Instead of throwing an error, return safe defaults
    // This prevents crashes when components use usePersona outside of a provider
    console.warn('usePersona called outside of PersonaProvider - returning safe defaults');
    return {
      persona: 'informed_advocator' as CustomerPersona,
      lifecycleData: null,
      uiConfig: PERSONA_UI_CONFIGS['informed_advocator'],
      setPersona: (p: CustomerPersona) => console.log('setPersona called outside provider:', p),
      updateLifecycleStage: (s: LifecycleStage) => console.log('updateLifecycleStage called outside provider:', s),
      isLoading: false
    };
  }
  return context;
}

// Safe hook that can be used without a provider
export function usePersonaSafe(customerId?: string) {
  const context = useContext(PersonaContext);
  const [persona, setPersonaState] = useState<CustomerPersona>('informed_advocator');
  const [lifecycleData, setLifecycleData] = useState<CustomerLifecycleData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    // Load persona from localStorage if available and no context
    if (!context && typeof window !== 'undefined') {
      const savedPersona = localStorage.getItem('customerPersona') as CustomerPersona;
      if (savedPersona && ['informed_advocator', 'cautious_researcher', 'tech_savvy_optimizer'].includes(savedPersona)) {
        setPersonaState(savedPersona);
      }
    }
  }, [context]);
  
  // If context exists, use it
  if (context) {
    return context;
  }
  
  // Otherwise, return a default implementation
  const setPersona = (newPersona: CustomerPersona) => {
    setPersonaState(newPersona);
    if (typeof window !== 'undefined') {
      localStorage.setItem('customerPersona', newPersona);
    }
  };
  
  const updateLifecycleStage = (stage: LifecycleStage) => {
    console.log('Lifecycle stage update (no provider):', stage);
  };
  
  return {
    persona,
    lifecycleData,
    uiConfig: PERSONA_UI_CONFIGS[persona],
    setPersona,
    updateLifecycleStage,
    isLoading,
    // Additional properties for compatibility
    customerData: lifecycleData,
    lifecycleStage: lifecycleData?.lifecycleStage || 'onboarding',
    loading: isLoading,
    error: null,
    updatePersonaData: setPersona
  };
}

// Helper functions to generate persona-specific content
function getPersonaEngagementScore(persona: CustomerPersona): number {
  switch (persona) {
    case 'informed_advocator': return 92;
    case 'cautious_researcher': return 76;
    case 'tech_savvy_optimizer': return 88;
    default: return 80;
  }
}

function getPersonaRiskScore(persona: CustomerPersona): number {
  switch (persona) {
    case 'informed_advocator': return 15;
    case 'cautious_researcher': return 35;
    case 'tech_savvy_optimizer': return 20;
    default: return 25;
  }
}

function getPersonaRecommendedActions(persona: CustomerPersona, stage?: LifecycleStage): string[] {
  const baseActions = {
    informed_advocator: [
      'Review detailed professional credentials',
      'Access comprehensive case analysis',
      'Compare treatment options thoroughly',
      'Download educational resources'
    ],
    cautious_researcher: [
      'Schedule a call with patient support',
      'Read similar patient testimonials',
      'Review cost breakdown clearly',
      'Get answers to common concerns'
    ],
    tech_savvy_optimizer: [
      'Enable real-time notifications',
      'Connect health tracking devices',
      'Explore AI analysis details',
      'Set up automated follow-ups'
    ]
  };

  return baseActions[persona] || baseActions.informed_advocator;
}

function getPersonaWelcomeMessage(persona: CustomerPersona): string {
  switch (persona) {
    case 'informed_advocator':
      return "Welcome! We've curated comprehensive resources and expert insights to support your healthcare decision-making process.";
    case 'cautious_researcher':
      return "Welcome! Our team is here to guide you through every step with clear explanations and personal support.";
    case 'tech_savvy_optimizer':
      return "Welcome! Experience our cutting-edge platform with real-time updates and AI-powered insights.";
    default:
      return "Welcome to your personalized medical portal!";
  }
}

function getPersonaStageTips(persona: CustomerPersona, stage: LifecycleStage): string[] {
  const tips = {
    informed_advocator: {
      active_case: [
        "Track your case progress with detailed timeline updates",
        "Review professional credentials of your assigned expert",
        "Access educational resources related to your condition",
        "Set up email notifications for important updates"
      ],
      waiting: [
        "Your case is being reviewed by board-certified specialists",
        "Review our quality assurance process for peace of mind",
        "Prepare questions for when your report is ready",
        "Connect with our patient advocacy team if needed"
      ]
    },
    cautious_researcher: {
      active_case: [
        "Your dedicated case manager will keep you informed",
        "Call our support team anytime with questions",
        "Read testimonials from patients with similar conditions",
        "We'll explain each step clearly as we proceed"
      ],
      waiting: [
        "Your expert is carefully reviewing your medical information",
        "No need to worry - you'll hear from us within 24-48 hours",
        "Our patient support team is available by phone",
        "Review our simple guide to understanding medical reports"
      ]
    },
    tech_savvy_optimizer: {
      active_case: [
        "Track real-time progress with 94% AI analysis confidence",
        "Get instant notifications on case status changes",
        "Access detailed technical metrics and timelines",
        "Connect with our API for health data integration"
      ],
      waiting: [
        "Advanced AI analysis completed - professional review in progress",
        "Real-time progress: 75% complete, estimated 18 hours remaining",
        "Your data is processed using cutting-edge medical algorithms",
        "Enable push notifications for immediate status updates"
      ]
    }
  };

  return tips[persona]?.[stage] || tips.informed_advocator.active_case;
}

function getPersonaResources(persona: CustomerPersona): string[] {
  const resources = {
    informed_advocator: [
      "Comprehensive Treatment Comparison Guide",
      "Board Certification Verification Database",
      "Medical Literature References",
      "Second Opinion Best Practices Whitepaper"
    ],
    cautious_researcher: [
      "Simple Guide to Second Opinions",
      "Patient Success Stories",
      "Cost and Insurance FAQ",
      "What to Expect Timeline"
    ],
    tech_savvy_optimizer: [
      "AI Analysis Technical Documentation",
      "Health Data Integration APIs",
      "Advanced Metrics Dashboard",
      "Mobile App Feature Guide"
    ]
  };

  return resources[persona] || resources.informed_advocator;
}

// Hook for persona-aware styling
export function usePersonaStyles() {
  // Try to use the safe version to avoid errors
  const context = useContext(PersonaContext);
  const uiConfig = context ? context.uiConfig : PERSONA_UI_CONFIGS['informed_advocator'];
  
  return {
    colors: uiConfig.colorScheme,
    typography: uiConfig.typography,
    layout: uiConfig.layout,
    features: uiConfig.features,
    
    // Helper functions for common styling patterns
    getPrimaryButton: () => ({
      backgroundColor: uiConfig.colorScheme.primary,
      borderRadius: uiConfig.layout.density === 'compact' ? '8px' : '12px',
      padding: uiConfig.layout.density === 'compact' ? '8px 16px' : '12px 24px'
    }),
    
    getSecondaryButton: () => ({
      borderColor: uiConfig.colorScheme.primary,
      color: uiConfig.colorScheme.primary,
      borderRadius: uiConfig.layout.density === 'compact' ? '8px' : '12px',
      padding: uiConfig.layout.density === 'compact' ? '8px 16px' : '12px 24px'
    }),
    
    getCardSpacing: () => ({
      padding: uiConfig.layout.density === 'compact' ? '16px' : 
               uiConfig.layout.density === 'spacious' ? '32px' : '24px',
      marginBottom: uiConfig.layout.density === 'compact' ? '12px' : 
                   uiConfig.layout.density === 'spacious' ? '24px' : '16px'
    })
  };
}
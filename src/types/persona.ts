// Customer Persona Types and Definitions
// Based on market research for B2C medical second opinion platform

export type CustomerPersona = 'informed_advocator' | 'cautious_researcher' | 'tech_savvy_optimizer';

export type LifecycleStage = 
  | 'discovery'         // Learning about second opinions
  | 'consideration'     // Evaluating service providers
  | 'onboarding'        // Initial account setup
  | 'active_case'       // Has submitted case(s)
  | 'waiting'           // Awaiting results
  | 'results_review'    // Reviewing second opinion
  | 'follow_up'         // Post-opinion follow-up
  | 'advocate'          // Satisfied customer who refers others
  | 'at_risk';          // May churn without intervention

export type CommunicationPreference = 'EMAIL' | 'SMS' | 'PUSH' | 'PHONE' | 'IN_APP';

export interface PersonaProfile {
  persona: CustomerPersona;
  name: string;
  description: string;
  characteristics: string[];
  painPoints: string[];
  motivations: string[];
  preferredChannels: CommunicationPreference[];
  digitalLiteracy: 'low' | 'medium' | 'high';
  decisionStyle: 'analytical' | 'relationship_based' | 'efficiency_focused';
  trustFactors: string[];
}

export interface CustomerLifecycleData {
  customerId: string;
  persona: CustomerPersona;
  lifecycleStage: LifecycleStage;
  stageEntryDate: string;
  daysInStage: number;
  previousStage?: LifecycleStage;
  communicationPreferences: CommunicationPreference[];
  engagementScore: number; // 0-100
  satisfactionScore?: number; // 0-100
  riskScore: number; // 0-100, higher = more at risk
  nextRecommendedActions: string[];
  personalizedContent: {
    welcomeMessage?: string;
    stageSpecificTips: string[];
    relevantResources: string[];
  };
}

export interface PersonaUIConfiguration {
  persona: CustomerPersona;
  colorScheme: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };
  typography: {
    headingFont: string;
    bodyFont: string;
    size: 'compact' | 'standard' | 'comfortable';
  };
  layout: {
    density: 'compact' | 'standard' | 'spacious';
    navigationStyle: 'simple' | 'standard' | 'advanced';
    informationDepth: 'minimal' | 'moderate' | 'comprehensive';
  };
  features: {
    showAdvancedMetrics: boolean;
    enableQuickActions: boolean;
    showTechnicalDetails: boolean;
    prioritizeEducation: boolean;
    emphasizeTrust: boolean;
  };
}

// Persona Definitions
export const PERSONA_PROFILES: Record<CustomerPersona, PersonaProfile> = {
  informed_advocator: {
    persona: 'informed_advocator',
    name: 'Informed Advocator',
    description: 'College-educated professional who researches extensively before healthcare decisions',
    characteristics: [
      'High digital literacy',
      'Extensive online research behavior',
      'Values quality over cost',
      'Strong social network influence',
      'Time-conscious due to work/family'
    ],
    painPoints: [
      'Overwhelmed by conflicting medical information',
      'Concerns about over-treatment',
      'Need for expert validation',
      'Time constraints for research'
    ],
    motivations: [
      'Peace of mind through expert validation',
      'Transparent, credible expertise',
      'Clear communication',
      'Comprehensive information access'
    ],
    preferredChannels: ['EMAIL', 'PUSH', 'IN_APP'],
    digitalLiteracy: 'high',
    decisionStyle: 'analytical',
    trustFactors: [
      'Professional credentials',
      'Peer testimonials',
      'Transparent processes',
      'Evidence-based recommendations'
    ]
  },
  cautious_researcher: {
    persona: 'cautious_researcher',
    name: 'Cautious Researcher',
    description: 'Moderate digital literacy user who values personal relationships and trust-building',
    characteristics: [
      'Moderate digital literacy',
      'Prefers human validation',
      'Cost-conscious but willing to invest',
      'Values personal attention',
      'Relies on family support'
    ],
    painPoints: [
      'Lacks medical knowledge for independent evaluation',
      'Skeptical of physician motivations',
      'Needs jargon-free explanations',
      'Requires reassurance throughout process'
    ],
    motivations: [
      'Straightforward explanations',
      'Personal attention and support',
      'Confidence-building',
      'Responsive customer service'
    ],
    preferredChannels: ['PHONE', 'EMAIL', 'SMS'],
    digitalLiteracy: 'medium',
    decisionStyle: 'relationship_based',
    trustFactors: [
      'Personal communication',
      'Similar patient testimonials',
      'Clear cost transparency',
      'Human support availability'
    ]
  },
  tech_savvy_optimizer: {
    persona: 'tech_savvy_optimizer',
    name: 'Tech-Savvy Optimizer',
    description: 'High-tech early adopter who expects sophisticated digital experiences',
    characteristics: [
      'Advanced digital literacy',
      'Early technology adopter',
      'Expects app-like experiences',
      'Values automation and efficiency',
      'Influences others through reviews'
    ],
    painPoints: [
      'Frustrated by inefficient processes',
      'Expects real-time updates',
      'Wants cutting-edge treatments',
      'Demands sophisticated technology'
    ],
    motivations: [
      'Access to global expertise',
      'AI-enhanced analysis',
      'Real-time data and updates',
      'Integration with health tech'
    ],
    preferredChannels: ['PUSH', 'IN_APP', 'SMS'],
    digitalLiteracy: 'high',
    decisionStyle: 'efficiency_focused',
    trustFactors: [
      'Technology innovation',
      'Data-driven recommendations',
      'Real-time transparency',
      'Integration capabilities'
    ]
  }
};

// UI Configuration for each persona
export const PERSONA_UI_CONFIGS: Record<CustomerPersona, PersonaUIConfiguration> = {
  informed_advocator: {
    persona: 'informed_advocator',
    colorScheme: {
      primary: '#3B82F6', // Blue - professional, trustworthy
      secondary: '#10B981', // Green - success, validation
      accent: '#8B5CF6', // Purple - premium, expertise
      background: '#F8FAFC' // Light gray-blue
    },
    typography: {
      headingFont: 'Inter',
      bodyFont: 'Inter',
      size: 'standard'
    },
    layout: {
      density: 'standard',
      navigationStyle: 'standard',
      informationDepth: 'comprehensive'
    },
    features: {
      showAdvancedMetrics: true,
      enableQuickActions: true,
      showTechnicalDetails: true,
      prioritizeEducation: true,
      emphasizeTrust: true
    }
  },
  cautious_researcher: {
    persona: 'cautious_researcher',
    colorScheme: {
      primary: '#059669', // Calming green - trust, reassurance
      secondary: '#0EA5E9', // Sky blue - clarity, openness
      accent: '#F59E0B', // Warm amber - attention, guidance
      background: '#F9FAFB' // Warm white
    },
    typography: {
      headingFont: 'Inter',
      bodyFont: 'Inter',
      size: 'comfortable'
    },
    layout: {
      density: 'spacious',
      navigationStyle: 'simple',
      informationDepth: 'moderate'
    },
    features: {
      showAdvancedMetrics: false,
      enableQuickActions: true,
      showTechnicalDetails: false,
      prioritizeEducation: true,
      emphasizeTrust: true
    }
  },
  tech_savvy_optimizer: {
    persona: 'tech_savvy_optimizer',
    colorScheme: {
      primary: '#6366F1', // Indigo - innovation, technology
      secondary: '#EC4899', // Pink - energy, innovation
      accent: '#10B981', // Green - optimization, success
      background: '#F8FAFC' // Clean tech white
    },
    typography: {
      headingFont: 'Inter',
      bodyFont: 'Inter',
      size: 'compact'
    },
    layout: {
      density: 'compact',
      navigationStyle: 'advanced',
      informationDepth: 'comprehensive'
    },
    features: {
      showAdvancedMetrics: true,
      enableQuickActions: true,
      showTechnicalDetails: true,
      prioritizeEducation: false,
      emphasizeTrust: false
    }
  }
};
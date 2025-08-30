import { NextRequest, NextResponse } from 'next/server';
import { CustomerLifecycleService, PersonaService } from '@/modules/customerLifecycle';

interface PersonalizedContent {
  persona: {
    type: string;
    preferences: any;
  };
  stage: string;
  content: {
    dashboard: DashboardConfig;
    messaging: PersonalizedMessages;
    resources: EducationalResource[];
    quickActions: QuickAction[];
  };
  uiConfiguration: PersonaUIConfiguration;
}

interface DashboardConfig {
  layout: 'simplified' | 'standard' | 'advanced';
  widgets: DashboardWidget[];
  prioritizedSections: string[];
}

interface DashboardWidget {
  id: string;
  type: string;
  title: string;
  priority: number;
  data: any;
}

interface PersonalizedMessages {
  welcomeMessage: string;
  ctaText: string;
  supportMessage: string;
  encouragementMessage: string;
}

interface EducationalResource {
  id: string;
  title: string;
  description: string;
  type: 'article' | 'video' | 'infographic' | 'checklist';
  url: string;
  estimatedReadTime?: string;
  relevanceScore: number;
}

interface QuickAction {
  id: string;
  title: string;
  description: string;
  actionUrl: string;
  icon: string;
  priority: 'high' | 'medium' | 'low';
}

interface PersonaUIConfiguration {
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
}

const lifecycleService = new CustomerLifecycleService();
const personaService = new PersonaService();

async function extractCustomerId(request: NextRequest): Promise<string> {
  const customerId = request.nextUrl.searchParams.get('customerId');
  if (!customerId) {
    throw new Error('Customer ID required');
  }
  return customerId;
}

function generatePersonalizedMessages(persona: string, stage: string, customerName: string = 'there'): PersonalizedMessages {
  const messagesByPersona = {
    'informed_advocator': {
      welcomeMessage: `Welcome back, ${customerName}. Here's your comprehensive health journey overview with detailed insights and progress metrics.`,
      ctaText: 'View Detailed Analysis',
      supportMessage: 'Access our medical literature database and expert insights to make informed decisions about your health.',
      encouragementMessage: 'Your proactive approach to health management puts you in control of your medical decisions.'
    },
    'cautious_researcher': {
      welcomeMessage: `Hello ${customerName}, we're here to guide you through every step of your health journey with personalized support.`,
      ctaText: 'Get Personalized Guidance',
      supportMessage: 'Our patient advocates are available to answer your questions and provide reassurance throughout the process.',
      encouragementMessage: 'Take your time to explore. We\'re here to support you with clear, simple explanations every step of the way.'
    },
    'tech_savvy_optimizer': {
      welcomeMessage: `Hey ${customerName}! Your health data dashboard is ready with real-time insights and AI-powered recommendations.`,
      ctaText: 'Access Advanced Analytics',
      supportMessage: 'Explore our API documentation and integrate your health data with our advanced analysis tools.',
      encouragementMessage: 'Leverage cutting-edge technology to optimize your health outcomes and track your progress efficiently.'
    }
  };

  return messagesByPersona[persona as keyof typeof messagesByPersona] || messagesByPersona['informed_advocator'];
}

function generateDashboardConfig(persona: string, stage: string): DashboardConfig {
  const baseWidgets: DashboardWidget[] = [
    {
      id: 'case_status',
      type: 'status_card',
      title: 'Case Status',
      priority: 1,
      data: { stage }
    },
    {
      id: 'next_steps',
      type: 'action_list',
      title: 'Next Steps',
      priority: 2,
      data: {}
    },
    {
      id: 'progress_tracker',
      type: 'progress_bar',
      title: 'Journey Progress',
      priority: 3,
      data: {}
    }
  ];

  switch (persona) {
    case 'informed_advocator':
      return {
        layout: 'advanced',
        widgets: [
          ...baseWidgets,
          {
            id: 'detailed_metrics',
            type: 'metrics_grid',
            title: 'Health Metrics',
            priority: 4,
            data: {}
          },
          {
            id: 'professional_insights',
            type: 'expert_panel',
            title: 'Professional Insights',
            priority: 5,
            data: {}
          }
        ],
        prioritizedSections: ['case_details', 'professional_credentials', 'medical_literature']
      };

    case 'cautious_researcher':
      return {
        layout: 'simplified',
        widgets: baseWidgets.slice(0, 3),
        prioritizedSections: ['support_contact', 'patient_testimonials', 'simple_explanations']
      };

    case 'tech_savvy_optimizer':
      return {
        layout: 'advanced',
        widgets: [
          ...baseWidgets,
          {
            id: 'api_metrics',
            type: 'technical_dashboard',
            title: 'API & Integration Status',
            priority: 4,
            data: {}
          },
          {
            id: 'ai_insights',
            type: 'ai_analysis',
            title: 'AI-Powered Insights',
            priority: 5,
            data: {}
          }
        ],
        prioritizedSections: ['technical_details', 'data_analytics', 'integration_options']
      };

    default:
      return {
        layout: 'standard',
        widgets: baseWidgets,
        prioritizedSections: ['overview', 'next_steps', 'support']
      };
  }
}

function generateEducationalResources(persona: string, stage: string): EducationalResource[] {
  const baseResources: EducationalResource[] = [
    {
      id: 'second_opinion_guide',
      title: 'Understanding Medical Second Opinions',
      description: 'Learn about the importance and process of getting a second medical opinion',
      type: 'article',
      url: '/resources/second-opinion-guide',
      estimatedReadTime: '5 min',
      relevanceScore: 90
    }
  ];

  const personaResources = {
    'informed_advocator': [
      {
        id: 'medical_research_methods',
        title: 'How to Evaluate Medical Research',
        description: 'Guide to understanding and evaluating medical literature and studies',
        type: 'article' as const,
        url: '/resources/research-evaluation',
        estimatedReadTime: '12 min',
        relevanceScore: 95
      },
      {
        id: 'treatment_options_comparison',
        title: 'Comparing Treatment Options',
        description: 'Comprehensive framework for evaluating different treatment approaches',
        type: 'infographic' as const,
        url: '/resources/treatment-comparison',
        relevanceScore: 85
      }
    ],
    'cautious_researcher': [
      {
        id: 'patient_rights_guide',
        title: 'Your Rights as a Patient',
        description: 'Simple guide to understanding your healthcare rights and how to advocate for yourself',
        type: 'checklist' as const,
        url: '/resources/patient-rights',
        estimatedReadTime: '8 min',
        relevanceScore: 88
      },
      {
        id: 'questions_to_ask_doctor',
        title: 'Questions to Ask Your Doctor',
        description: 'Essential questions to help you get the information you need',
        type: 'checklist' as const,
        url: '/resources/doctor-questions',
        relevanceScore: 92
      }
    ],
    'tech_savvy_optimizer': [
      {
        id: 'health_data_integration',
        title: 'Integrating Your Health Data',
        description: 'Technical guide to connecting wearables and health apps with our platform',
        type: 'article' as const,
        url: '/resources/data-integration',
        estimatedReadTime: '15 min',
        relevanceScore: 90
      },
      {
        id: 'ai_analysis_explanation',
        title: 'How Our AI Analysis Works',
        description: 'Deep dive into our machine learning algorithms and data processing',
        type: 'video' as const,
        url: '/resources/ai-explanation',
        relevanceScore: 87
      }
    ]
  };

  return [
    ...baseResources,
    ...(personaResources[persona as keyof typeof personaResources] || [])
  ];
}

function generateQuickActions(persona: string, stage: string): QuickAction[] {
  const baseActions: QuickAction[] = [
    {
      id: 'view_cases',
      title: 'View My Cases',
      description: 'See all your submitted medical cases',
      actionUrl: '/portal/cases',
      icon: '📋',
      priority: 'high'
    },
    {
      id: 'contact_support',
      title: 'Contact Support',
      description: 'Get help from our customer support team',
      actionUrl: '/portal/support',
      icon: '💬',
      priority: 'medium'
    }
  ];

  const personaActions = {
    'informed_advocator': [
      {
        id: 'review_credentials',
        title: 'Professional Credentials',
        description: 'Review your assigned professional\'s qualifications',
        actionUrl: '/portal/professionals',
        icon: '🎓',
        priority: 'medium' as const
      },
      {
        id: 'access_literature',
        title: 'Medical Literature',
        description: 'Access relevant medical research and studies',
        actionUrl: '/portal/literature',
        icon: '📚',
        priority: 'low' as const
      }
    ],
    'cautious_researcher': [
      {
        id: 'schedule_call',
        title: 'Schedule Support Call',
        description: 'Talk to a patient advocate',
        actionUrl: '/portal/support/schedule',
        icon: '📞',
        priority: 'high' as const
      },
      {
        id: 'read_testimonials',
        title: 'Patient Stories',
        description: 'Read experiences from other patients',
        actionUrl: '/portal/testimonials',
        icon: '💭',
        priority: 'medium' as const
      }
    ],
    'tech_savvy_optimizer': [
      {
        id: 'api_access',
        title: 'API Access',
        description: 'Get your API keys and documentation',
        actionUrl: '/portal/developer',
        icon: '🔧',
        priority: 'medium' as const
      },
      {
        id: 'advanced_analytics',
        title: 'Advanced Analytics',
        description: 'View detailed data and insights',
        actionUrl: '/portal/analytics',
        icon: '📊',
        priority: 'high' as const
      }
    ]
  };

  return [
    ...baseActions,
    ...(personaActions[persona as keyof typeof personaActions] || [])
  ];
}

function generateUIConfiguration(persona: string): PersonaUIConfiguration {
  const configurations = {
    'informed_advocator': {
      colorScheme: {
        primary: '#3B82F6', // Professional blue
        secondary: '#1E40AF',
        accent: '#10B981' // Validation green
      },
      typography: {
        scale: 'comfortable' as const,
        complexity: 'detailed' as const
      },
      interactions: {
        supportLevel: 'guided' as const,
        preferredContactMethod: 'email' as const
      }
    },
    'cautious_researcher': {
      colorScheme: {
        primary: '#059669', // Calming green
        secondary: '#047857',
        accent: '#3B82F6' // Reassuring blue
      },
      typography: {
        scale: 'spacious' as const,
        complexity: 'simple' as const
      },
      interactions: {
        supportLevel: 'high_touch' as const,
        preferredContactMethod: 'phone' as const
      }
    },
    'tech_savvy_optimizer': {
      colorScheme: {
        primary: '#6366F1', // Innovation indigo
        secondary: '#4F46E5',
        accent: '#EC4899' // Energy pink
      },
      typography: {
        scale: 'compact' as const,
        complexity: 'technical' as const
      },
      interactions: {
        supportLevel: 'self_service' as const,
        preferredContactMethod: 'chat' as const
      }
    }
  };

  return configurations[persona as keyof typeof configurations] || configurations['informed_advocator'];
}

export async function GET(request: NextRequest) {
  try {
    const customerId = await extractCustomerId(request);
    
    // Fetch customer data
    const [journey, persona] = await Promise.all([
      lifecycleService.getCustomerJourney(customerId),
      personaService.analyzeCustomerPersona(customerId)
    ]);

    if (!journey) {
      return NextResponse.json(
        { error: 'Customer journey not found' },
        { status: 404 }
      );
    }

    const stage = journey.currentStage.stage;

    const content: PersonalizedContent = {
      persona: {
        type: persona.type,
        preferences: persona.preferredExperience
      },
      stage,
      content: {
        dashboard: generateDashboardConfig(persona.type, stage),
        messaging: generatePersonalizedMessages(persona.type, stage),
        resources: generateEducationalResources(persona.type, stage),
        quickActions: generateQuickActions(persona.type, stage)
      },
      uiConfiguration: generateUIConfiguration(persona.type)
    };
    
    return NextResponse.json({
      success: true,
      data: content,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching personalized content:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch personalized content',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
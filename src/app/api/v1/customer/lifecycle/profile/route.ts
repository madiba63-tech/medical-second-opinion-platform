import { NextRequest, NextResponse } from 'next/server';
import { CustomerLifecycleService, PersonaService } from '@/modules/customerLifecycle';
import { CustomerRepository } from '@/modules/repository/customerRepository';

interface LifecycleProfile {
  customerId: string;
  persona: {
    type: 'informed_advocator' | 'cautious_researcher' | 'tech_savvy_optimizer';
    confidence: number;
    characteristics: string[];
  };
  currentStage: {
    stage: string;
    timestamp: Date;
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

const lifecycleService = new CustomerLifecycleService();
const personaService = new PersonaService();
const customerRepository = new CustomerRepository();

// Helper function to extract customer ID from request (mock implementation)
async function extractCustomerId(request: NextRequest): Promise<string> {
  // In production, this would validate JWT token and extract customer ID
  const authHeader = request.headers.get('authorization');
  if (!authHeader) {
    throw new Error('No authorization header');
  }
  
  // Mock customer ID extraction - replace with actual JWT validation
  const customerId = request.nextUrl.searchParams.get('customerId');
  if (!customerId) {
    throw new Error('Customer ID required');
  }
  
  return customerId;
}

function calculateEngagementLevel(healthScore: number): 'low' | 'medium' | 'high' {
  if (healthScore >= 80) return 'high';
  if (healthScore >= 50) return 'medium';
  return 'low';
}

export async function GET(request: NextRequest) {
  try {
    const customerId = await extractCustomerId(request);
    
    // Fetch customer lifecycle data
    const [journey, persona, healthScore] = await Promise.all([
      lifecycleService.getCustomerJourney(customerId),
      personaService.analyzeCustomerPersona(customerId),
      lifecycleService.getCustomerHealthScore(customerId)
    ]);

    if (!journey) {
      return NextResponse.json(
        { error: 'Customer journey not found' },
        { status: 404 }
      );
    }

    // Build lifecycle profile
    const profile: LifecycleProfile = {
      customerId,
      persona: {
        type: persona.type,
        confidence: persona.confidence,
        characteristics: persona.characteristics
      },
      currentStage: {
        stage: journey.currentStage.stage,
        timestamp: journey.currentStage.timestamp,
        daysSinceLastActivity: Math.floor((Date.now() - journey.lastActivity.getTime()) / (1000 * 60 * 60 * 24))
      },
      healthScore,
      engagementLevel: calculateEngagementLevel(healthScore),
      preferences: {
        communication: await getCustomerCommunicationPreferences(customerId),
        notifications: await getCustomerNotificationPreferences(customerId),
        ui: persona.preferredExperience
      },
      journey: {
        totalCases: journey.totalCases,
        lifetimeValue: journey.lifetimeValue,
        stages: journey.stages
      }
    };
    
    return NextResponse.json({
      success: true,
      data: profile,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching customer lifecycle profile:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch customer lifecycle profile',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Helper functions (to be implemented based on actual schema)
async function getCustomerCommunicationPreferences(customerId: string) {
  const customer = await customerRepository.findById(customerId);
  return {
    email: customer?.emailNotifications || false,
    sms: customer?.smsNotifications || false,
    preferredChannel: customer?.preferredChannel || 'EMAIL'
  };
}

async function getCustomerNotificationPreferences(customerId: string) {
  return {
    caseUpdates: true,
    marketingEmails: false,
    surveyRequests: true,
    systemNotifications: true
  };
}
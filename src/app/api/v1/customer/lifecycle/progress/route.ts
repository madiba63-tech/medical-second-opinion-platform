import { NextRequest, NextResponse } from 'next/server';
import { CustomerLifecycleService } from '@/modules/customerLifecycle';

interface LifecycleProgress {
  currentStage: {
    stage: string;
    entryDate: string;
    daysInStage: number;
    milestones: ProgressMilestone[];
  };
  nextActions: RecommendedAction[];
  progressPercentage: number;
  estimatedTimeToCompletion?: string;
}

interface ProgressMilestone {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  completedDate?: string;
  order: number;
}

interface RecommendedAction {
  id: string;
  title: string;
  description: string;
  actionUrl: string;
  priority: 'low' | 'medium' | 'high';
  category: 'case_management' | 'communication' | 'education' | 'support';
}

const lifecycleService = new CustomerLifecycleService();

async function extractCustomerId(request: NextRequest): Promise<string> {
  const customerId = request.nextUrl.searchParams.get('customerId');
  if (!customerId) {
    throw new Error('Customer ID required');
  }
  return customerId;
}

function calculateProgressPercentage(stage: string): number {
  const stageProgress: Record<string, number> = {
    'onboarding': 10,
    'active': 50,
    'in_review': 75,
    'completed': 90,
    'follow_up': 95,
    'advocate': 100,
    'inactive': 30,
    'churned': 0
  };
  
  return stageProgress[stage] || 0;
}

function getStageTimeline(stage: string): string | undefined {
  const timelines: Record<string, string> = {
    'onboarding': '1-2 days',
    'active': '3-5 days',
    'in_review': '2-3 days',
    'completed': '1-2 days',
    'follow_up': '1-2 weeks'
  };
  
  return timelines[stage];
}

function getStageMilestones(stage: string, totalCases: number): ProgressMilestone[] {
  const baseMilestones: Record<string, ProgressMilestone[]> = {
    'onboarding': [
      {
        id: 'account_setup',
        title: 'Account Setup Complete',
        description: 'Your account has been created successfully',
        completed: true,
        completedDate: new Date().toISOString(),
        order: 1
      },
      {
        id: 'first_case_submitted',
        title: 'First Case Submitted',
        description: 'Your medical case has been submitted for review',
        completed: totalCases > 0,
        completedDate: totalCases > 0 ? new Date().toISOString() : undefined,
        order: 2
      }
    ],
    'active': [
      {
        id: 'document_review',
        title: 'Document Review',
        description: 'Medical documents are being reviewed',
        completed: true,
        completedDate: new Date().toISOString(),
        order: 1
      },
      {
        id: 'professional_assigned',
        title: 'Medical Professional Assigned',
        description: 'A specialist has been assigned to your case',
        completed: false,
        order: 2
      },
      {
        id: 'analysis_in_progress',
        title: 'Analysis in Progress',
        description: 'Detailed medical analysis is underway',
        completed: false,
        order: 3
      }
    ],
    'completed': [
      {
        id: 'report_ready',
        title: 'Second Opinion Report Ready',
        description: 'Your comprehensive medical report is available',
        completed: true,
        completedDate: new Date().toISOString(),
        order: 1
      },
      {
        id: 'consultation_scheduled',
        title: 'Follow-up Consultation',
        description: 'Optional consultation with medical professional',
        completed: false,
        order: 2
      }
    ]
  };
  
  return baseMilestones[stage] || [];
}

function getRecommendedActions(stage: string, healthScore: number): RecommendedAction[] {
  const actions: RecommendedAction[] = [];
  
  switch (stage) {
    case 'onboarding':
      actions.push({
        id: 'complete_profile',
        title: 'Complete Your Profile',
        description: 'Add additional health information for better analysis',
        actionUrl: '/portal/profile',
        priority: 'medium',
        category: 'case_management'
      });
      break;
      
    case 'active':
      actions.push({
        id: 'check_progress',
        title: 'Check Case Progress',
        description: 'View the latest updates on your case analysis',
        actionUrl: '/portal/cases',
        priority: 'high',
        category: 'case_management'
      });
      break;
      
    case 'completed':
      actions.push({
        id: 'download_report',
        title: 'Download Your Report',
        description: 'Access your comprehensive second opinion report',
        actionUrl: '/portal/reports/download',
        priority: 'high',
        category: 'case_management'
      },
      {
        id: 'schedule_consultation',
        title: 'Schedule Follow-up',
        description: 'Book a consultation to discuss your results',
        actionUrl: '/portal/consultations/schedule',
        priority: 'medium',
        category: 'support'
      });
      break;
      
    case 'inactive':
      if (healthScore < 50) {
        actions.push({
          id: 'reactivate_account',
          title: 'Reactivate Your Account',
          description: 'Continue your health journey with our platform',
          actionUrl: '/portal/reactivate',
          priority: 'high',
          category: 'communication'
        });
      }
      break;
  }
  
  // Add educational content for all stages
  actions.push({
    id: 'health_resources',
    title: 'Health Education Resources',
    description: 'Access our library of health education materials',
    actionUrl: '/portal/resources',
    priority: 'low',
    category: 'education'
  });
  
  return actions;
}

export async function GET(request: NextRequest) {
  try {
    const customerId = await extractCustomerId(request);
    
    // Fetch customer journey data
    const journey = await lifecycleService.getCustomerJourney(customerId);
    const healthScore = await lifecycleService.getCustomerHealthScore(customerId);
    
    if (!journey) {
      return NextResponse.json(
        { error: 'Customer journey not found' },
        { status: 404 }
      );
    }
    
    const currentStage = journey.currentStage.stage;
    const entryDate = journey.currentStage.timestamp;
    const daysInStage = Math.floor((Date.now() - entryDate.getTime()) / (1000 * 60 * 60 * 24));
    
    const progress: LifecycleProgress = {
      currentStage: {
        stage: currentStage,
        entryDate: entryDate.toISOString(),
        daysInStage,
        milestones: getStageMilestones(currentStage, journey.totalCases)
      },
      nextActions: getRecommendedActions(currentStage, healthScore),
      progressPercentage: calculateProgressPercentage(currentStage),
      estimatedTimeToCompletion: getStageTimeline(currentStage)
    };
    
    return NextResponse.json({
      success: true,
      data: progress,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching lifecycle progress:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch lifecycle progress',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
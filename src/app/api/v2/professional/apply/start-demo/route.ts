import { NextRequest, NextResponse } from 'next/server';
import { 
  StartApplicationResponse,
  ApplicationPathType
} from '@/types/dual-path-recruitment';

// ========================================================================================
// DUAL-PATH PROFESSIONAL APPLICATION - DEMO START ENDPOINT (V2)
// Simplified version without AI dependencies for demonstration
// ========================================================================================

export async function POST(request: NextRequest) {
  try {
    console.log('=== STARTING DUAL-PATH PROFESSIONAL APPLICATION (DEMO) ===');
    
    // Parse multipart form data for potential file upload
    const formData = await request.formData();
    const pathType = formData.get('pathType') as string;
    const applicantEmail = formData.get('applicantEmail') as string;
    const cvFile = formData.get('cvFile') as File | null;

    // Validate basic request data
    if (!pathType || !['AI_ASSISTED', 'MANUAL'].includes(pathType)) {
      return NextResponse.json(
        { error: 'Invalid path type. Must be AI_ASSISTED or MANUAL' },
        { status: 400 }
      );
    }

    if (!applicantEmail) {
      return NextResponse.json(
        { error: 'Applicant email is required' },
        { status: 400 }
      );
    }

    // For AI-assisted path, CV file is required
    if (pathType === 'AI_ASSISTED' && !cvFile) {
      return NextResponse.json(
        { error: 'CV file is required for AI-assisted application path' },
        { status: 400 }
      );
    }

    // Validate CV file format (PDF only)
    if (cvFile && cvFile.type !== 'application/pdf') {
      return NextResponse.json(
        { error: 'CV must be a PDF file' },
        { status: 400 }
      );
    }

    // Generate application number
    const applicationNumber = await generateApplicationNumber();
    const candidateId = generateCandidateId();

    console.log(`Created application ${applicationNumber} for ${applicantEmail} using ${pathType} path`);

    // Initialize application record
    const applicationData = {
      applicationNumber,
      candidateId,
      pathType: pathType as ApplicationPathType,
      email: applicantEmail,
      status: 'DRAFT' as const,
      createdAt: new Date()
    };

    let processingIssues: string[] = [];

    // Process CV with mock AI if AI-assisted path (for demo)
    if (pathType === 'AI_ASSISTED' && cvFile) {
      console.log(`Mock AI processing for application ${applicationNumber}`);
      processingIssues.push('AI processing not available in demo mode');
    }

    // Store application in database (mock for demo)
    console.log('Mock: Storing application data:', applicationData);

    // Prepare response
    const response: StartApplicationResponse = {
      success: true,
      applicationNumber,
      candidateId,
      pathType: pathType as ApplicationPathType,
      nextStep: pathType === 'AI_ASSISTED' ? 'manual_entry' : 'manual_entry', // Skip AI review in demo
      message: pathType === 'AI_ASSISTED' ?
        'AI processing not available in demo mode. Please proceed with manual entry.' :
        'Please proceed with manual data entry.'
    };

    console.log(`Application ${applicationNumber} started successfully (demo mode)`);

    return NextResponse.json(response, { status: 201 });

  } catch (error) {
    console.error('Application start error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to start application', 
        details: error.message 
      },
      { status: 500 }
    );
  }
}

// ========================================================================================
// HELPER FUNCTIONS
// ========================================================================================

/**
 * Generate unique application number
 */
async function generateApplicationNumber(): Promise<string> {
  const timestamp = Date.now();
  const year = new Date().getFullYear();
  const randomSuffix = Math.random().toString(36).substring(2, 8).toUpperCase();
  
  return `APP-${year}-${timestamp}-${randomSuffix}`;
}

/**
 * Generate candidate UUID
 */
function generateCandidateId(): string {
  return 'candidate-' + Date.now() + '-' + Math.random().toString(36).substring(2, 15);
}

export const runtime = 'nodejs';
export const maxDuration = 30;
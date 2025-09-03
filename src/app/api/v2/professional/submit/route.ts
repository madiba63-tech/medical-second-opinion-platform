import { NextRequest, NextResponse } from 'next/server';

// ========================================================================================
// PROFESSIONAL APPLICATION SUBMISSION ENDPOINT (V2)
// Integrates with Professional Recruitment Service
// ========================================================================================

export async function POST(request: NextRequest) {
  try {
    console.log('=== PROFESSIONAL APPLICATION FINAL SUBMISSION ===');
    
    const submissionData = await request.json();
    
    // Validate required fields
    if (!submissionData.candidateId || !submissionData.applicationNumber) {
      return NextResponse.json(
        { error: 'Missing required fields: candidateId, applicationNumber' },
        { status: 400 }
      );
    }

    console.log(`Processing final submission for application ${submissionData.applicationNumber}`);

    // Forward to Professional Recruitment Service
    const recruitmentServiceUrl = process.env.PROFESSIONAL_RECRUITMENT_SERVICE_URL || 'http://localhost:3004';
    
    const recruitmentResponse = await fetch(`${recruitmentServiceUrl}/api/professionals/applications/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.INTERNAL_SERVICE_TOKEN || 'internal-service-token'}`
      },
      body: JSON.stringify({
        ...submissionData,
        submissionSource: 'dual-path-v2',
        submissionTimestamp: new Date().toISOString()
      })
    });

    if (!recruitmentResponse.ok) {
      const errorText = await recruitmentResponse.text();
      console.error('Professional recruitment service error:', errorText);
      
      // Return a user-friendly error
      return NextResponse.json(
        { 
          success: false,
          message: 'Failed to submit application to recruitment service. Please try again.' 
        },
        { status: 500 }
      );
    }

    const recruitmentResult = await recruitmentResponse.json();
    console.log('✅ Professional recruitment service response:', recruitmentResult);

    // Return success response
    return NextResponse.json({
      success: true,
      professionalId: recruitmentResult.professionalId || `prof-${Date.now()}`,
      applicationNumber: submissionData.applicationNumber,
      message: 'Application submitted successfully',
      recruitmentServiceResponse: recruitmentResult
    }, { status: 200 });

  } catch (error) {
    console.error('Professional submission error:', error);
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Internal server error during application submission',
        message: 'We encountered an error processing your application. Please try again later.'
      },
      { status: 500 }
    );
  }
}

export const runtime = 'nodejs';
export const maxDuration = 30;
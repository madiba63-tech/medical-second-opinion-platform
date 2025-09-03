import { NextRequest, NextResponse } from 'next/server';

// ========================================================================================
// WORKFLOW ENGINE INTEGRATION ENDPOINT (V2)
// Integrates with Workflow Engine Service for admin review processes
// ========================================================================================

export async function POST(request: NextRequest) {
  try {
    console.log('=== STARTING WORKFLOW FOR APPLICATION REVIEW ===');
    
    const workflowData = await request.json();
    
    // Validate required fields
    if (!workflowData.applicationNumber || !workflowData.workflowType) {
      return NextResponse.json(
        { error: 'Missing required fields: applicationNumber, workflowType' },
        { status: 400 }
      );
    }

    console.log(`Starting workflow ${workflowData.workflowType} for application ${workflowData.applicationNumber}`);

    // Forward to Workflow Engine Service
    const workflowServiceUrl = process.env.WORKFLOW_SERVICE_URL || 'http://localhost:3010';
    
    const workflowResponse = await fetch(`${workflowServiceUrl}/api/workflows/start`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.INTERNAL_SERVICE_TOKEN || 'internal-service-token'}`
      },
      body: JSON.stringify({
        ...workflowData,
        initiatedBy: 'dual-path-application-v2',
        initiatedAt: new Date().toISOString(),
        workflowData: {
          ...workflowData.metadata,
          applicationSource: 'professional-application-v2'
        }
      })
    });

    if (!workflowResponse.ok) {
      const errorText = await workflowResponse.text();
      console.error('Workflow service error:', errorText);
      
      // Return a user-friendly error
      return NextResponse.json(
        { 
          success: false,
          message: 'Failed to initiate admin review workflow. Application was submitted but review may be delayed.' 
        },
        { status: 500 }
      );
    }

    const workflowResult = await workflowResponse.json();
    console.log('✅ Workflow engine response:', workflowResult);

    // Return success response
    return NextResponse.json({
      success: true,
      workflowId: workflowResult.workflowId || `wf-${Date.now()}`,
      applicationNumber: workflowData.applicationNumber,
      estimatedCompletionTime: workflowResult.estimatedCompletionTime || '3-5 business days',
      message: 'Admin review workflow initiated successfully',
      workflowServiceResponse: workflowResult
    }, { status: 200 });

  } catch (error) {
    console.error('Workflow initiation error:', error);
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Internal server error during workflow initiation',
        message: 'Failed to start admin review process. Your application was submitted but may require manual processing.'
      },
      { status: 500 }
    );
  }
}

export const runtime = 'nodejs';
export const maxDuration = 30;
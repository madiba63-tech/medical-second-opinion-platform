import { NextRequest, NextResponse } from 'next/server';

// ========================================================================================
// NOTIFICATION SERVICE INTEGRATION ENDPOINT (V2)
// Integrates with Notification Service for application confirmations
// ========================================================================================

export async function POST(request: NextRequest) {
  try {
    console.log('=== SENDING APPLICATION CONFIRMATION NOTIFICATION ===');
    
    const notificationData = await request.json();
    
    // Validate required fields
    if (!notificationData.recipientEmail || !notificationData.notificationType) {
      return NextResponse.json(
        { error: 'Missing required fields: recipientEmail, notificationType' },
        { status: 400 }
      );
    }

    console.log(`Sending ${notificationData.notificationType} notification to ${notificationData.recipientEmail}`);

    // Prepare notification payload
    const notificationPayload = {
      channels: ['email'], // Could expand to SMS, push notifications later
      email: {
        to: notificationData.recipientEmail,
        subject: getEmailSubject(notificationData.notificationType, notificationData),
        template: getEmailTemplate(notificationData.notificationType),
        data: {
          recipientName: notificationData.recipientName || 'Professional',
          applicationNumber: notificationData.applicationNumber,
          pathType: notificationData.pathType,
          estimatedReviewTime: notificationData.estimatedReviewTime || '3-5 business days',
          supportEmail: 'support@medical-second-opinion.com',
          platformUrl: process.env.NEXT_PUBLIC_APP_URL || 'https://medical-second-opinion.com',
          submissionDate: new Date().toLocaleDateString(),
          nextSteps: getNextStepsForPath(notificationData.pathType)
        }
      },
      priority: 'normal',
      metadata: {
        source: 'dual-path-application-v2',
        applicationNumber: notificationData.applicationNumber,
        pathType: notificationData.pathType
      }
    };

    // Forward to Notification Service
    const notificationServiceUrl = process.env.NOTIFICATION_SERVICE_URL || 'http://localhost:3005';
    
    const notificationResponse = await fetch(`${notificationServiceUrl}/api/notifications/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.INTERNAL_SERVICE_TOKEN || 'internal-service-token'}`
      },
      body: JSON.stringify(notificationPayload)
    });

    if (!notificationResponse.ok) {
      const errorText = await notificationResponse.text();
      console.error('Notification service error:', errorText);
      
      // Return a user-friendly error but don't fail the whole request
      return NextResponse.json(
        { 
          success: false,
          message: 'Failed to send confirmation email. You will still receive updates once your application is reviewed.' 
        },
        { status: 500 }
      );
    }

    const notificationResult = await notificationResponse.json();
    console.log('✅ Notification service response:', notificationResult);

    // Return success response
    return NextResponse.json({
      success: true,
      notificationId: notificationResult.notificationId || `notif-${Date.now()}`,
      message: 'Confirmation email sent successfully',
      notificationServiceResponse: notificationResult
    }, { status: 200 });

  } catch (error) {
    console.error('Notification sending error:', error);
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Internal server error during notification sending',
        message: 'Failed to send confirmation email, but your application was submitted successfully.'
      },
      { status: 500 }
    );
  }
}

/**
 * Get email subject based on notification type
 */
function getEmailSubject(notificationType: string, data: any): string {
  switch (notificationType) {
    case 'APPLICATION_SUBMITTED':
      return `Application Submitted Successfully - ${data.applicationNumber}`;
    case 'APPLICATION_APPROVED':
      return `Professional Application Approved - Welcome to the Platform!`;
    case 'APPLICATION_REJECTED':
      return `Professional Application Status Update`;
    case 'ADDITIONAL_INFO_REQUIRED':
      return `Additional Information Required - ${data.applicationNumber}`;
    default:
      return `Medical Second Opinion Platform - Application Update`;
  }
}

/**
 * Get email template based on notification type
 */
function getEmailTemplate(notificationType: string): string {
  switch (notificationType) {
    case 'APPLICATION_SUBMITTED':
      return 'professional_application_submitted';
    case 'APPLICATION_APPROVED':
      return 'professional_application_approved';
    case 'APPLICATION_REJECTED':
      return 'professional_application_rejected';
    case 'ADDITIONAL_INFO_REQUIRED':
      return 'professional_additional_info_required';
    default:
      return 'professional_application_update';
  }
}

/**
 * Get next steps based on application path
 */
function getNextStepsForPath(pathType: string): string[] {
  const baseSteps = [
    'Application submitted to admin review queue',
    'Credential verification will be conducted during review',
    'You will receive email updates on application status'
  ];

  if (pathType === 'AI_ASSISTED') {
    return [
      ...baseSteps,
      'AI-assisted applications typically reviewed within 3-5 business days',
      'AI-extracted information will be verified against submitted documents'
    ];
  } else {
    return [
      ...baseSteps,
      'Manual applications typically reviewed within 2-4 business days',
      'All manually entered information will be cross-verified'
    ];
  }
}

export const runtime = 'nodejs';
export const maxDuration = 15;
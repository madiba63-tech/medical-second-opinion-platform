/**
 * Example implementation demonstrating the Enhanced Case Submission Service
 * This file shows how to integrate the service with existing API routes
 */
import { NextRequest, NextResponse } from 'next/server';
import { CaseSubmissionService, CaseAnalyticsService, CaseSubmissionData } from './index';

// Example API route handler for enhanced case submission
export async function handleEnhancedCaseSubmission(request: NextRequest) {
  try {
    const body = await request.json();
    const caseSubmissionService = new CaseSubmissionService();
    
    // Extract and validate submission data
    const submissionData: CaseSubmissionData = {
      firstName: body.firstName,
      middleName: body.middleName,
      lastName: body.lastName,
      dateOfBirth: new Date(body.dateOfBirth),
      email: body.email,
      phone: body.phone,
      ethnicity: body.ethnicity,
      gender: body.gender,
      diseaseType: body.diseaseType,
      isFirstOccurrence: body.isFirstOccurrence,
      geneticFamilyHistory: body.geneticFamilyHistory ? JSON.stringify(body.geneticFamilyHistory) : undefined,
      consentAccepted: body.consentAccepted,
      customerId: body.customerId,
      uploadedFiles: body.uploadedFiles || []
    };

    // Pre-submission validation
    const validationResult = await caseSubmissionService.validatePreSubmission(submissionData);
    
    if (!validationResult.isValid) {
      return NextResponse.json({
        success: false,
        message: 'Validation failed',
        errors: validationResult.errors,
        warnings: validationResult.warnings,
        recommendations: validationResult.recommendations
      }, { status: 400 });
    }

    // Submit case with full lifecycle integration
    const result = await caseSubmissionService.submitCase(submissionData);

    // Return comprehensive response
    return NextResponse.json({
      success: true,
      message: 'Case submitted successfully',
      data: {
        caseId: result.caseId,
        caseNumber: result.caseNumber,
        metrics: {
          isFirstSubmission: result.metrics.isFirstSubmission,
          personaAnalyzed: result.metrics.personaAnalyzed,
          communicationsSent: result.metrics.communicationsSent,
          automationTriggered: result.metrics.automationTriggered,
          healthScoreImpact: result.metrics.healthScoreImpact
        },
        lifecycleEvents: result.lifecycleEvents,
        nextSteps: result.metrics.isFirstSubmission ? 
          ['Welcome sequence initiated', 'Persona analysis completed', 'Case assigned for review'] :
          ['Case confirmation sent', 'Health score updated', 'Professional assignment in progress']
      }
    });

  } catch (error) {
    console.error('Enhanced case submission failed:', error);
    return NextResponse.json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    }, { status: 500 });
  }
}

// Example API route handler for case analytics dashboard
export async function handleCaseAnalyticsDashboard(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const dateFrom = url.searchParams.get('dateFrom') ? new Date(url.searchParams.get('dateFrom')!) : undefined;
    const dateTo = url.searchParams.get('dateTo') ? new Date(url.searchParams.get('dateTo')!) : undefined;
    
    const analyticsService = new CaseAnalyticsService();
    const dashboardData = await analyticsService.getCaseAnalyticsDashboard(dateFrom, dateTo);

    return NextResponse.json({
      success: true,
      data: dashboardData,
      meta: {
        dateRange: {
          from: dateFrom?.toISOString() || 'beginning',
          to: dateTo?.toISOString() || 'now'
        },
        generatedAt: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Analytics dashboard failed:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to generate analytics dashboard',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    }, { status: 500 });
  }
}

// Example API route handler for customer journey analytics
export async function handleCustomerJourneyAnalytics(customerId: string) {
  try {
    const analyticsService = new CaseAnalyticsService();
    const journeyData = await analyticsService.getCustomerJourneyAnalytics(customerId);

    return NextResponse.json({
      success: true,
      data: journeyData,
      insights: {
        engagementLevel: journeyData.totalCases > 3 ? 'high' : journeyData.totalCases > 1 ? 'medium' : 'new',
        riskLevel: journeyData.averageTimeBetweenCases > 90 ? 'high' : 'low',
        segmentSuggestion: journeyData.lifetimeValue > 1000 ? 'vip' : journeyData.engagementTrend === 'increasing' ? 'growing' : 'standard',
        automationRecommendations: getAutomationRecommendations(journeyData)
      }
    });

  } catch (error) {
    console.error('Customer journey analytics failed:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to generate customer journey analytics'
    }, { status: 500 });
  }
}

// Example usage in a background job or scheduled task
export async function processSubmissionMetrics() {
  try {
    const caseSubmissionService = new CaseSubmissionService();
    const analyticsService = new CaseAnalyticsService();
    
    // Get recent submissions for analysis
    const last30Days = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const submissionAnalytics = await caseSubmissionService.getSubmissionAnalytics(
      undefined,
      last30Days,
      new Date()
    );

    // Generate insights for business intelligence
    const insights = {
      conversionRate: (submissionAnalytics.firstTimeSubmissions / submissionAnalytics.totalSubmissions) * 100,
      retentionRate: (submissionAnalytics.returningSubmissions / submissionAnalytics.totalSubmissions) * 100,
      popularConditions: Object.entries(submissionAnalytics.diseaseTypeDistribution)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5),
      averageEngagement: submissionAnalytics.averageSubmissionsPerCustomer
    };

    // Log insights for monitoring
    console.log('Submission Metrics Insights:', insights);
    
    // In production, this would send to analytics service or dashboard
    return insights;

  } catch (error) {
    console.error('Failed to process submission metrics:', error);
    throw error;
  }
}

// Helper function for automation recommendations
function getAutomationRecommendations(journeyData: any): string[] {
  const recommendations = [];
  
  if (journeyData.totalCases === 1) {
    recommendations.push('Schedule follow-up satisfaction survey');
    recommendations.push('Send educational content about second opinions');
  }
  
  if (journeyData.averageTimeBetweenCases > 90) {
    recommendations.push('Initiate re-engagement campaign');
    recommendations.push('Send health check-up reminders');
  }
  
  if (journeyData.engagementTrend === 'increasing') {
    recommendations.push('Offer loyalty program enrollment');
    recommendations.push('Suggest premium services');
  }
  
  if (journeyData.lifetimeValue > 1000) {
    recommendations.push('Assign to VIP customer segment');
    recommendations.push('Provide dedicated account manager');
  }
  
  return recommendations;
}

// Example integration with existing case submission API route
export const enhancedCaseSubmissionExample = {
  // This would replace or enhance the existing POST /api/v1/customer/cases route
  async POST(request: NextRequest) {
    return await handleEnhancedCaseSubmission(request);
  }
};

// Example scheduled task for metrics processing
export const metricsProcessingTask = {
  schedule: '0 2 * * *', // Daily at 2 AM
  task: processSubmissionMetrics
};

// Example webhook handler for external integrations
export async function handleLifecycleWebhook(eventType: string, customerData: any) {
  try {
    const caseSubmissionService = new CaseSubmissionService();
    
    switch (eventType) {
      case 'customer.created':
        // New customer registered - prepare for first case submission
        console.log('New customer registered:', customerData.customerId);
        break;
        
      case 'case.submitted':
        // Case submitted - already handled by the service
        console.log('Case submitted successfully:', customerData.caseNumber);
        break;
        
      case 'case.completed':
        // Case completed - trigger satisfaction survey
        console.log('Case completed:', customerData.caseNumber);
        break;
        
      default:
        console.log('Unknown event type:', eventType);
    }
    
  } catch (error) {
    console.error('Webhook processing failed:', error);
  }
}
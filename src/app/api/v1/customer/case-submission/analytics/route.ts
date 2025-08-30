import { NextRequest } from 'next/server';
import { createApiHandler, createSuccessResponse, createErrorResponse, RATE_LIMITS, parsePaginationParams, createPaginatedResponse } from '@/lib/api-utils';
import { AnalyticsRequestSchema, AnalyticsResponse } from '@/lib/validations/caseSubmission';
import { CaseSubmissionService } from '@/modules/services/caseSubmissionService';
import { authorizeCustomerAccess } from '@/lib/auth';

/**
 * @swagger
 * /api/v1/customer/case-submission/analytics:
 *   get:
 *     summary: Get case submission analytics for customer
 *     description: |
 *       Retrieves comprehensive analytics and insights about case submissions
 *       for a specific customer or across the platform. This endpoint provides
 *       valuable metrics for understanding customer behavior and platform usage:
 *       - Submission volume and trends over time
 *       - Customer engagement patterns
 *       - Disease type distribution
 *       - Persona-based analytics
 *       - Conversion and retention metrics
 *       - First-time vs returning customer analysis
 *     tags:
 *       - Case Submission
 *       - Analytics
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: customerId
 *         in: query
 *         required: false
 *         description: Specific customer ID to get analytics for (omit for aggregate data)
 *         schema:
 *           type: string
 *           format: uuid
 *         example: "123e4567-e89b-12d3-a456-426614174000"
 *       - name: dateFrom
 *         in: query
 *         required: false
 *         description: Start date for analytics range (ISO date string)
 *         schema:
 *           type: string
 *           format: date
 *         example: "2024-01-01"
 *       - name: dateTo
 *         in: query
 *         required: false
 *         description: End date for analytics range (ISO date string)
 *         schema:
 *           type: string
 *           format: date
 *         example: "2024-01-31"
 *       - name: groupBy
 *         in: query
 *         required: false
 *         description: How to group the analytics data
 *         schema:
 *           type: string
 *           enum: [day, week, month, disease_type, persona]
 *           default: month
 *         example: "month"
 *       - name: metrics
 *         in: query
 *         required: false
 *         description: Specific metrics to include (comma-separated)
 *         schema:
 *           type: string
 *         style: form
 *         explode: false
 *         example: "submission_count,unique_customers,conversion_rate"
 *       - name: page
 *         in: query
 *         required: false
 *         description: Page number for pagination
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *       - name: limit
 *         in: query
 *         required: false
 *         description: Number of records per page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 25
 *       - name: sortBy
 *         in: query
 *         required: false
 *         description: Field to sort by
 *         schema:
 *           type: string
 *           enum: [date, count, customerId]
 *           default: date
 *       - name: sortOrder
 *         in: query
 *         required: false
 *         description: Sort order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *     responses:
 *       200:
 *         description: Analytics data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     totalSubmissions:
 *                       type: number
 *                       description: Total number of case submissions
 *                       example: 1250
 *                     uniqueCustomers:
 *                       type: number
 *                       description: Number of unique customers who submitted cases
 *                       example: 987
 *                     firstTimeSubmissions:
 *                       type: number
 *                       description: Number of first-time submissions
 *                       example: 654
 *                     returningSubmissions:
 *                       type: number
 *                       description: Number of submissions from returning customers
 *                       example: 596
 *                     diseaseTypeDistribution:
 *                       type: object
 *                       additionalProperties:
 *                         type: number
 *                       description: Distribution of submissions by disease type
 *                       example:
 *                         "Breast Cancer": 312
 *                         "Lung Cancer": 198
 *                         "Colon Cancer": 156
 *                         "Prostate Cancer": 145
 *                     averageSubmissionsPerCustomer:
 *                       type: number
 *                       description: Average number of submissions per customer
 *                       example: 1.27
 *                     timeframe:
 *                       type: object
 *                       properties:
 *                         from:
 *                           type: string
 *                           format: date
 *                           description: Analytics start date
 *                         to:
 *                           type: string
 *                           format: date
 *                           description: Analytics end date
 *                       example:
 *                         from: "2024-01-01"
 *                         to: "2024-01-31"
 *                     timeSeries:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           date:
 *                             type: string
 *                             format: date
 *                           count:
 *                             type: number
 *                           uniqueCustomers:
 *                             type: number
 *                       description: Time-series data for charting
 *                       example:
 *                         - date: "2024-01-01"
 *                           count: 45
 *                           uniqueCustomers: 42
 *                         - date: "2024-01-02"
 *                           count: 38
 *                           uniqueCustomers: 35
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: number
 *                       example: 1
 *                     limit:
 *                       type: number
 *                       example: 25
 *                     total:
 *                       type: number
 *                       example: 1250
 *                     totalPages:
 *                       type: number
 *                       example: 50
 *                     hasNext:
 *                       type: boolean
 *                       example: true
 *                     hasPrev:
 *                       type: boolean
 *                       example: false
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *             examples:
 *               customer_analytics:
 *                 summary: Customer-Specific Analytics
 *                 value:
 *                   success: true
 *                   data:
 *                     totalSubmissions: 3
 *                     uniqueCustomers: 1
 *                     firstTimeSubmissions: 1
 *                     returningSubmissions: 2
 *                     diseaseTypeDistribution:
 *                       "Breast Cancer": 2
 *                       "Lung Cancer": 1
 *                     averageSubmissionsPerCustomer: 3.0
 *                     timeframe:
 *                       from: "2024-01-01"
 *                       to: "2024-01-31"
 *                     timeSeries:
 *                       - date: "2024-01-05"
 *                         count: 1
 *                         uniqueCustomers: 1
 *                       - date: "2024-01-15"
 *                         count: 1
 *                         uniqueCustomers: 1
 *                       - date: "2024-01-25"
 *                         count: 1
 *                         uniqueCustomers: 1
 *                   timestamp: "2024-01-31T10:30:00Z"
 *               aggregate_analytics:
 *                 summary: Platform Aggregate Analytics
 *                 value:
 *                   success: true
 *                   data:
 *                     totalSubmissions: 1250
 *                     uniqueCustomers: 987
 *                     firstTimeSubmissions: 654
 *                     returningSubmissions: 596
 *                     diseaseTypeDistribution:
 *                       "Breast Cancer": 312
 *                       "Lung Cancer": 198
 *                       "Colon Cancer": 156
 *                       "Prostate Cancer": 145
 *                       "Other": 439
 *                     averageSubmissionsPerCustomer: 1.27
 *                     timeframe:
 *                       from: "2024-01-01"
 *                       to: "2024-01-31"
 *                   pagination:
 *                     page: 1
 *                     limit: 25
 *                     total: 1250
 *                     totalPages: 50
 *                     hasNext: true
 *                     hasPrev: false
 *                   timestamp: "2024-01-31T10:30:00Z"
 *       400:
 *         description: Invalid request parameters
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Authentication required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Access forbidden
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       429:
 *         description: Rate limit exceeded
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RateLimitResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *     x-codeSamples:
 *       - lang: 'JavaScript'
 *         source: |
 *           const response = await fetch('/api/v1/customer/case-submission/analytics?' + 
 *             new URLSearchParams({
 *               customerId: '123e4567-e89b-12d3-a456-426614174000',
 *               dateFrom: '2024-01-01',
 *               dateTo: '2024-01-31',
 *               groupBy: 'month',
 *               metrics: 'submission_count,unique_customers'
 *             }), {
 *             headers: {
 *               'Authorization': `Bearer ${accessToken}`
 *             }
 *           });
 *           const result = await response.json();
 *       - lang: 'cURL'
 *         source: |
 *           curl -G /api/v1/customer/case-submission/analytics \
 *             -H "Authorization: Bearer YOUR_TOKEN" \
 *             -d "customerId=123e4567-e89b-12d3-a456-426614174000" \
 *             -d "dateFrom=2024-01-01" \
 *             -d "dateTo=2024-01-31" \
 *             -d "groupBy=month"
 */

const caseSubmissionService = new CaseSubmissionService();

export const GET = createApiHandler(
  async (context) => {
    const startTime = Date.now();
    
    try {
      const { user, validatedQuery, request } = context;
      const { customerId, dateFrom, dateTo, groupBy, metrics } = validatedQuery;

      // Parse pagination parameters
      const { searchParams } = new URL(request.url);
      const pagination = parsePaginationParams(searchParams);

      // Authorization: Customer users can only see their own analytics
      // Admins and professionals can see aggregate data
      if (customerId && !authorizeCustomerAccess(user!, customerId)) {
        return createErrorResponse(
          'Access denied: Not authorized to view analytics for this customer',
          403,
          { customerId },
          request
        );
      }

      // If customer user doesn't specify customerId, use their own
      const effectiveCustomerId = user?.role === 'customer' 
        ? user.customerId 
        : customerId;

      // Convert date strings to Date objects
      const fromDate = dateFrom ? new Date(dateFrom) : undefined;
      const toDate = dateTo ? new Date(dateTo) : undefined;

      // Get analytics data from service
      const analyticsData = await caseSubmissionService.getSubmissionAnalytics(
        effectiveCustomerId,
        fromDate,
        toDate
      );

      // Generate time series data for charting if requested
      let timeSeries = undefined;
      if (groupBy === 'day' || groupBy === 'week' || groupBy === 'month') {
        timeSeries = await generateTimeSeries(
          effectiveCustomerId,
          fromDate,
          toDate,
          groupBy
        );
      }

      // Calculate additional metrics based on request
      const enhancedData = {
        ...analyticsData,
        timeSeries,
        conversionRate: calculateConversionRate(analyticsData),
        retentionRate: calculateRetentionRate(analyticsData),
        growthRate: await calculateGrowthRate(effectiveCustomerId, fromDate, toDate),
      };

      // Filter metrics if specific ones were requested
      let responseData = enhancedData;
      if (metrics && metrics.length > 0) {
        const requestedMetrics = typeof metrics === 'string' 
          ? metrics.split(',').map(m => m.trim())
          : metrics;
        
        responseData = filterMetrics(enhancedData, requestedMetrics);
      }

      // Apply pagination for time series data
      let paginationInfo = undefined;
      if (responseData.timeSeries) {
        const startIndex = (pagination.page - 1) * pagination.limit;
        const endIndex = startIndex + pagination.limit;
        const paginatedTimeSeries = responseData.timeSeries.slice(startIndex, endIndex);
        
        paginationInfo = {
          page: pagination.page,
          limit: pagination.limit,
          total: responseData.timeSeries.length,
          totalPages: Math.ceil(responseData.timeSeries.length / pagination.limit),
          hasNext: endIndex < responseData.timeSeries.length,
          hasPrev: pagination.page > 1,
        };

        responseData.timeSeries = paginatedTimeSeries;
      }

      // Prepare response
      const response: AnalyticsResponse = {
        success: true,
        data: responseData,
        pagination: paginationInfo,
      };

      // Log analytics request
      const duration = Date.now() - startTime;
      console.log(`Analytics request completed in ${duration}ms for ${effectiveCustomerId ? 'customer ' + effectiveCustomerId : 'aggregate data'}`);

      return createSuccessResponse(response);

    } catch (error) {
      console.error('Analytics request failed:', error);

      // Handle specific errors
      if (error instanceof Error) {
        if (error.message.includes('Customer not found')) {
          return createErrorResponse(
            'Customer not found',
            404,
            { customerId: context.validatedQuery?.customerId },
            context.request
          );
        }

        if (error.message.includes('Date range')) {
          return createErrorResponse(
            'Invalid date range specified',
            400,
            { 
              dateFrom: context.validatedQuery?.dateFrom,
              dateTo: context.validatedQuery?.dateTo 
            },
            context.request
          );
        }

        if (error.message.includes('Database')) {
          return createErrorResponse(
            'Analytics service temporarily unavailable',
            503,
            { message: 'Please try again in a few moments' },
            context.request
          );
        }
      }

      return createErrorResponse(
        'Analytics request failed due to server error',
        500,
        process.env.NODE_ENV === 'development' ? { 
          error: error instanceof Error ? error.message : 'Unknown error',
          stack: error instanceof Error ? error.stack : undefined
        } : undefined,
        context.request
      );
    }
  },
  {
    requireAuth: true,
    rateLimit: RATE_LIMITS.analytics,
    validation: {
      query: AnalyticsRequestSchema,
    },
    allowedMethods: ['GET'],
    corsEnabled: true,
  }
);

/**
 * Generate time series data for charting
 */
async function generateTimeSeries(
  customerId?: string,
  fromDate?: Date,
  toDate?: Date,
  groupBy: string = 'month'
): Promise<Array<{ date: string; count: number; uniqueCustomers?: number }>> {
  try {
    // This would be implemented with proper database queries
    // For now, return mock data structure
    const timeSeries = [];
    const start = fromDate || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const end = toDate || new Date();
    
    let current = new Date(start);
    let increment: number;
    
    switch (groupBy) {
      case 'day':
        increment = 24 * 60 * 60 * 1000;
        break;
      case 'week':
        increment = 7 * 24 * 60 * 60 * 1000;
        break;
      case 'month':
      default:
        increment = 30 * 24 * 60 * 60 * 1000;
        break;
    }

    while (current <= end) {
      timeSeries.push({
        date: current.toISOString().split('T')[0],
        count: Math.floor(Math.random() * 50) + 10, // Mock data
        uniqueCustomers: Math.floor(Math.random() * 40) + 8, // Mock data
      });
      
      current = new Date(current.getTime() + increment);
    }

    return timeSeries;
  } catch (error) {
    console.error('Failed to generate time series:', error);
    return [];
  }
}

/**
 * Calculate conversion rate from submissions to completed cases
 */
function calculateConversionRate(analyticsData: any): number {
  if (analyticsData.totalSubmissions === 0) return 0;
  
  // Mock calculation - in real implementation this would consider
  // submissions that resulted in completed second opinions
  return Math.round((analyticsData.totalSubmissions * 0.85) / analyticsData.totalSubmissions * 100) / 100;
}

/**
 * Calculate customer retention rate
 */
function calculateRetentionRate(analyticsData: any): number {
  if (analyticsData.uniqueCustomers === 0) return 0;
  
  // Mock calculation based on returning customers
  return Math.round(analyticsData.returningSubmissions / analyticsData.totalSubmissions * 100) / 100;
}

/**
 * Calculate growth rate compared to previous period
 */
async function calculateGrowthRate(
  customerId?: string,
  fromDate?: Date,
  toDate?: Date
): Promise<number> {
  try {
    // This would compare current period to previous period
    // For now, return mock growth rate
    return Math.round((Math.random() * 0.4 - 0.1) * 100) / 100; // -10% to +30%
  } catch (error) {
    console.error('Failed to calculate growth rate:', error);
    return 0;
  }
}

/**
 * Filter analytics data to only include requested metrics
 */
function filterMetrics(data: any, requestedMetrics: string[]): any {
  const filteredData: any = {};
  
  const metricMapping: Record<string, string> = {
    'submission_count': 'totalSubmissions',
    'unique_customers': 'uniqueCustomers',
    'first_time_submissions': 'firstTimeSubmissions',
    'returning_submissions': 'returningSubmissions',
    'conversion_rate': 'conversionRate',
    'disease_distribution': 'diseaseTypeDistribution',
    'persona_distribution': 'personaDistribution',
  };

  requestedMetrics.forEach(metric => {
    const dataKey = metricMapping[metric] || metric;
    if (data.hasOwnProperty(dataKey)) {
      filteredData[dataKey] = data[dataKey];
    }
  });

  // Always include timeframe if present
  if (data.timeframe) {
    filteredData.timeframe = data.timeframe;
  }

  // Include timeSeries if it was requested or present
  if (data.timeSeries) {
    filteredData.timeSeries = data.timeSeries;
  }

  return filteredData;
}
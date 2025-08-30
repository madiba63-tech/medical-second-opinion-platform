/**
 * OpenAPI 3.0 Schema Definitions for Case Submission API
 * 
 * This file contains all the schema definitions referenced in the API documentation
 * comments. These schemas ensure consistent documentation across all endpoints.
 */

export const openApiSchemas = {
  /**
   * @swagger
   * components:
   *   schemas:
   *     ErrorResponse:
   *       type: object
   *       required:
   *         - success
   *         - error
   *         - timestamp
   *         - path
   *         - statusCode
   *       properties:
   *         success:
   *           type: boolean
   *           example: false
   *           description: Indicates the request failed
   *         error:
   *           type: string
   *           description: Human-readable error message
   *           example: "Validation failed"
   *         details:
   *           type: object
   *           description: Additional error details (optional)
   *           additionalProperties: true
   *           example:
   *             validationErrors:
   *               - "First name is required"
   *               - "Invalid email format"
   *         timestamp:
   *           type: string
   *           format: date-time
   *           description: When the error occurred
   *           example: "2024-01-15T10:30:00Z"
   *         path:
   *           type: string
   *           description: API endpoint path where error occurred
   *           example: "/api/v1/customer/case-submission/submit"
   *         statusCode:
   *           type: integer
   *           description: HTTP status code
   *           example: 400
   * 
   *     RateLimitResponse:
   *       type: object
   *       required:
   *         - success
   *         - error
   *         - retryAfter
   *         - limit
   *         - remaining
   *         - resetTime
   *       properties:
   *         success:
   *           type: boolean
   *           example: false
   *         error:
   *           type: string
   *           example: "Rate limit exceeded"
   *         retryAfter:
   *           type: integer
   *           description: Seconds to wait before retrying
   *           example: 60
   *         limit:
   *           type: integer
   *           description: Maximum requests allowed in window
   *           example: 5
   *         remaining:
   *           type: integer
   *           description: Requests remaining in current window
   *           example: 0
   *         resetTime:
   *           type: integer
   *           description: Unix timestamp when limit resets
   *           example: 1705312800
   * 
   *     HealthCheckResponse:
   *       type: object
   *       properties:
   *         success:
   *           type: boolean
   *           example: true
   *         status:
   *           type: string
   *           enum: [healthy, unhealthy]
   *           example: "healthy"
   *         services:
   *           type: object
   *           description: Status of dependent services
   *           additionalProperties:
   *             type: boolean
   *           example:
   *             database: true
   *             redis: true
   *             s3: true
   *         uptime:
   *           type: number
   *           description: Server uptime in seconds
   *           example: 86400
   *         memory:
   *           type: object
   *           properties:
   *             rss:
   *               type: integer
   *               description: Resident set size in bytes
   *             heapTotal:
   *               type: integer
   *               description: Total heap size in bytes
   *             heapUsed:
   *               type: integer
   *               description: Used heap size in bytes
   *             external:
   *               type: integer
   *               description: External memory in bytes
   *         timestamp:
   *           type: string
   *           format: date-time
   * 
   *     CaseSubmissionMetrics:
   *       type: object
   *       properties:
   *         submissionId:
   *           type: string
   *           description: Unique submission tracking ID
   *           example: "sub_1705312800_abc123def"
   *         customerId:
   *           type: string
   *           format: uuid
   *           example: "123e4567-e89b-12d3-a456-426614174000"
   *         caseNumber:
   *           type: string
   *           example: "CASE-1234567890-ABC123"
   *         submissionTimestamp:
   *           type: string
   *           format: date-time
   *           example: "2024-01-15T10:30:00Z"
   *         isFirstSubmission:
   *           type: boolean
   *           description: Whether this is customer's first case
   *           example: true
   *         personaAnalyzed:
   *           type: boolean
   *           description: Whether persona analysis was completed
   *           example: true
   *         lifecycleStageUpdated:
   *           type: boolean
   *           description: Whether customer lifecycle stage was updated
   *           example: true
   *         communicationsSent:
   *           type: array
   *           items:
   *             type: string
   *           description: Types of communications sent
   *           example: ["welcome_email", "case_confirmation"]
   *         automationTriggered:
   *           type: array
   *           items:
   *             type: string
   *           description: Automation sequences triggered
   *           example: ["onboarding_sequence", "follow_up_scheduling"]
   *         healthScoreImpact:
   *           type: number
   *           description: Impact on customer health score (0-100)
   *           example: 25
   *         segmentationUpdated:
   *           type: boolean
   *           description: Whether customer segmentation was updated
   *           example: true
   * 
   *     ValidationResult:
   *       type: object
   *       properties:
   *         isValid:
   *           type: boolean
   *           description: Overall validation result
   *           example: true
   *         errors:
   *           type: array
   *           items:
   *             type: string
   *           description: Critical errors that prevent submission
   *           example: []
   *         warnings:
   *           type: array
   *           items:
   *             type: string
   *           description: Warnings that don't prevent submission
   *           example: ["Phone number recommended for urgent communications"]
   *         recommendations:
   *           type: array
   *           items:
   *             type: string
   *           description: Recommendations to improve submission
   *           example: ["Disease type helps with professional matching"]
   *         duplicateCheck:
   *           type: object
   *           properties:
   *             hasDuplicates:
   *               type: boolean
   *               description: Whether duplicate cases were found
   *               example: false
   *             duplicateCount:
   *               type: number
   *               description: Number of duplicate cases found
   *               example: 0
   *             mostRecentDate:
   *               type: string
   *               format: date-time
   *               description: Date of most recent duplicate case
   *               example: "2024-01-10T15:45:00Z"
   * 
   *     AnalyticsData:
   *       type: object
   *       properties:
   *         totalSubmissions:
   *           type: number
   *           description: Total number of case submissions
   *           example: 1250
   *         uniqueCustomers:
   *           type: number
   *           description: Number of unique customers who submitted cases
   *           example: 987
   *         firstTimeSubmissions:
   *           type: number
   *           description: Number of first-time submissions
   *           example: 654
   *         returningSubmissions:
   *           type: number
   *           description: Number of submissions from returning customers
   *           example: 596
   *         diseaseTypeDistribution:
   *           type: object
   *           additionalProperties:
   *             type: number
   *           description: Distribution of submissions by disease type
   *           example:
   *             "Breast Cancer": 312
   *             "Lung Cancer": 198
   *             "Colon Cancer": 156
   *         averageSubmissionsPerCustomer:
   *           type: number
   *           description: Average number of submissions per customer
   *           example: 1.27
   *         conversionRate:
   *           type: number
   *           description: Conversion rate from submissions to completed cases
   *           example: 0.85
   *         retentionRate:
   *           type: number
   *           description: Customer retention rate
   *           example: 0.48
   *         growthRate:
   *           type: number
   *           description: Growth rate compared to previous period
   *           example: 0.15
   *         timeframe:
   *           type: object
   *           properties:
   *             from:
   *               type: string
   *               format: date
   *               description: Analytics start date
   *               example: "2024-01-01"
   *             to:
   *               type: string
   *               format: date
   *               description: Analytics end date
   *               example: "2024-01-31"
   *         timeSeries:
   *           type: array
   *           items:
   *             type: object
   *             properties:
   *               date:
   *                 type: string
   *                 format: date
   *                 example: "2024-01-15"
   *               count:
   *                 type: number
   *                 example: 45
   *               uniqueCustomers:
   *                 type: number
   *                 example: 42
   *           description: Time-series data for charting
   * 
   *     PaginationInfo:
   *       type: object
   *       properties:
   *         page:
   *           type: number
   *           description: Current page number
   *           example: 1
   *         limit:
   *           type: number
   *           description: Items per page
   *           example: 25
   *         total:
   *           type: number
   *           description: Total number of items
   *           example: 1250
   *         totalPages:
   *           type: number
   *           description: Total number of pages
   *           example: 50
   *         hasNext:
   *           type: boolean
   *           description: Whether there are more pages
   *           example: true
   *         hasPrev:
   *           type: boolean
   *           description: Whether there are previous pages
   *           example: false
   * 
   *     UploadedFile:
   *       type: object
   *       properties:
   *         id:
   *           type: string
   *           format: uuid
   *           description: Database ID of the uploaded file record
   *           example: "789e0123-e45f-67g8-h901-234567890123"
   *         s3Key:
   *           type: string
   *           description: S3 object key where file is stored
   *           example: "documents/case-456/pathology_report.pdf"
   *         filename:
   *           type: string
   *           description: Original filename
   *           example: "pathology_report.pdf"
   *         size:
   *           type: integer
   *           description: File size in bytes
   *           example: 2048576
   *         category:
   *           type: string
   *           enum: [medical_records, lab_results, imaging, pathology, genetic_tests, other]
   *           description: Document category
   *           example: "pathology"
   *         uploadedAt:
   *           type: string
   *           format: date-time
   *           description: Upload timestamp
   *           example: "2024-01-15T10:30:00Z"
   * 
   *     WebhookEvent:
   *       type: object
   *       required:
   *         - eventType
   *         - customerId
   *         - data
   *         - timestamp
   *       properties:
   *         eventType:
   *           type: string
   *           enum:
   *             - case.submitted
   *             - case.validated
   *             - case.processing_started
   *             - case.assigned
   *             - case.completed
   *             - customer.onboarded
   *             - customer.reengaged
   *             - communication.sent
   *             - automation.triggered
   *           description: Type of lifecycle event
   *           example: "case.submitted"
   *         customerId:
   *           type: string
   *           format: uuid
   *           description: Customer ID associated with the event
   *           example: "123e4567-e89b-12d3-a456-426614174000"
   *         caseId:
   *           type: string
   *           format: uuid
   *           description: Case ID if event is case-related (optional)
   *           example: "456e7890-e12b-34d5-a678-901234567890"
   *         data:
   *           type: object
   *           description: Event-specific data payload
   *           additionalProperties: true
   *           example:
   *             caseNumber: "CASE-1234567890-ABC123"
   *             diseaseType: "Breast Cancer"
   *             isFirstSubmission: true
   *         timestamp:
   *           type: string
   *           format: date-time
   *           description: When the event occurred
   *           example: "2024-01-15T10:30:00Z"
   *         retryCount:
   *           type: integer
   *           minimum: 0
   *           default: 0
   *           description: Number of retry attempts for this event
   *           example: 0
   * 
   *   securitySchemes:
   *     BearerAuth:
   *       type: http
   *       scheme: bearer
   *       bearerFormat: JWT
   *       description: |
   *         JWT token obtained from the authentication endpoint.
   *         Include in the Authorization header as: `Bearer <token>`
   * 
   *     ApiKeyAuth:
   *       type: apiKey
   *       in: header
   *       name: x-api-key
   *       description: |
   *         API key for internal service authentication.
   *         Include in the x-api-key header.
   * 
   *     WebhookSignature:
   *       type: apiKey
   *       in: header
   *       name: x-webhook-signature
   *       description: |
   *         HMAC-SHA256 signature of the webhook payload.
   *         Format: sha256=<hex-encoded-signature>
   * 
   *   parameters:
   *     CustomerId:
   *       name: customerId
   *       in: query
   *       required: true
   *       description: Customer ID to filter results
   *       schema:
   *         type: string
   *         format: uuid
   *       example: "123e4567-e89b-12d3-a456-426614174000"
   * 
   *     DateFrom:
   *       name: dateFrom
   *       in: query
   *       required: false
   *       description: Start date for date range filtering (ISO date string)
   *       schema:
   *         type: string
   *         format: date
   *       example: "2024-01-01"
   * 
   *     DateTo:
   *       name: dateTo
   *       in: query
   *       required: false
   *       description: End date for date range filtering (ISO date string)
   *       schema:
   *         type: string
   *         format: date
   *       example: "2024-01-31"
   * 
   *     Page:
   *       name: page
   *       in: query
   *       required: false
   *       description: Page number for pagination
   *       schema:
   *         type: integer
   *         minimum: 1
   *         default: 1
   *       example: 1
   * 
   *     Limit:
   *       name: limit
   *       in: query
   *       required: false
   *       description: Number of items per page
   *       schema:
   *         type: integer
   *         minimum: 1
   *         maximum: 100
   *         default: 25
   *       example: 25
   * 
   *     SortBy:
   *       name: sortBy
   *       in: query
   *       required: false
   *       description: Field to sort by
   *       schema:
   *         type: string
   *         enum: [date, count, customerId]
   *         default: date
   *       example: "date"
   * 
   *     SortOrder:
   *       name: sortOrder
   *       in: query
   *       required: false
   *       description: Sort order
   *       schema:
   *         type: string
   *         enum: [asc, desc]
   *         default: desc
   *       example: "desc"
   * 
   *   headers:
   *     X-RateLimit-Limit:
   *       description: Number of requests allowed per window
   *       schema:
   *         type: integer
   *       example: 5
   * 
   *     X-RateLimit-Remaining:
   *       description: Number of requests remaining in current window
   *       schema:
   *         type: integer
   *       example: 3
   * 
   *     X-RateLimit-Reset:
   *       description: Unix timestamp when rate limit resets
   *       schema:
   *         type: integer
   *       example: 1705312800
   * 
   *     Retry-After:
   *       description: Seconds to wait before retrying (for 429 responses)
   *       schema:
   *         type: integer
   *       example: 60
   * 
   *   responses:
   *     BadRequest:
   *       description: Bad request - validation error
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/ErrorResponse'
   * 
   *     Unauthorized:
   *       description: Unauthorized - authentication required
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/ErrorResponse'
   * 
   *     Forbidden:
   *       description: Forbidden - insufficient permissions
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/ErrorResponse'
   * 
   *     NotFound:
   *       description: Not found - resource does not exist
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/ErrorResponse'
   * 
   *     TooManyRequests:
   *       description: Too many requests - rate limit exceeded
   *       headers:
   *         X-RateLimit-Limit:
   *           $ref: '#/components/headers/X-RateLimit-Limit'
   *         X-RateLimit-Remaining:
   *           $ref: '#/components/headers/X-RateLimit-Remaining'
   *         X-RateLimit-Reset:
   *           $ref: '#/components/headers/X-RateLimit-Reset'
   *         Retry-After:
   *           $ref: '#/components/headers/Retry-After'
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/RateLimitResponse'
   * 
   *     InternalServerError:
   *       description: Internal server error
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/ErrorResponse'
   * 
   *     ServiceUnavailable:
   *       description: Service unavailable - temporary issue
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/ErrorResponse'
   * 
   *   examples:
   *     CaseSubmissionExample:
   *       summary: Complete Case Submission
   *       description: Example of a complete case submission with all fields
   *       value:
   *         firstName: "Sarah"
   *         middleName: "Jane"
   *         lastName: "Johnson"
   *         dateOfBirth: "1975-08-20"
   *         email: "sarah.johnson@email.com"
   *         phone: "+1987654321"
   *         customerId: "456e7890-e12b-34d5-a678-901234567890"
   *         diseaseType: "Lung Cancer"
   *         ethnicity: "white"
   *         gender: "female"
   *         isFirstOccurrence: false
   *         geneticFamilyHistory: '{"mother": "lung_cancer", "grandmother": "breast_cancer"}'
   *         paymentId: "pay_1234567890"
   *         consentAccepted: true
   *         uploadedFiles: ["documents/case-456/pathology.pdf", "images/case-456/ct_scan.jpg"]
   *         submissionSource: "mobile"
   *         timezone: "America/Los_Angeles"
   * 
   *     ValidationErrorExample:
   *       summary: Validation Error Response
   *       description: Example response when validation fails
   *       value:
   *         success: false
   *         error: "Validation failed"
   *         details:
   *           validationErrors:
   *             - "Body firstName: First name is required"
   *             - "Body email: Invalid email format"
   *             - "Body consentAccepted: Consent must be accepted"
   *         timestamp: "2024-01-15T10:30:00Z"
   *         path: "/api/v1/customer/case-submission/submit"
   *         statusCode: 400
   * 
   *     RateLimitExample:
   *       summary: Rate Limit Exceeded
   *       description: Example response when rate limit is exceeded
   *       value:
   *         success: false
   *         error: "Rate limit exceeded"
   *         retryAfter: 60
   *         limit: 5
   *         remaining: 0
   *         resetTime: 1705312800
   */
};

/**
 * OpenAPI 3.0 base configuration
 */
export const openApiConfig = {
  openapi: '3.0.0',
  info: {
    title: 'Medical Second Opinion Platform - Case Submission API',
    description: `
# Medical Second Opinion Platform Case Submission API

Comprehensive API for managing medical case submissions with integrated customer lifecycle management.

## Features

- **Secure Case Submission**: End-to-end encrypted case submission with comprehensive validation
- **Lifecycle Integration**: Automatic customer lifecycle stage updates and persona analysis
- **Real-time Analytics**: Detailed submission metrics and customer behavior insights
- **File Management**: Secure medical document upload and processing
- **Webhook Events**: Real-time event notifications for lifecycle management
- **Rate Limiting**: Built-in protection against abuse with configurable limits
- **Comprehensive Validation**: Multi-layer validation with business rule enforcement

## Authentication

This API uses JWT bearer tokens for authentication. Include your token in the Authorization header:

\`\`\`
Authorization: Bearer <your-jwt-token>
\`\`\`

## Rate Limiting

API endpoints have different rate limits based on their functionality:
- **Submission endpoints**: 5 requests per minute
- **Validation endpoints**: 20 requests per minute  
- **Analytics endpoints**: 50 requests per minute
- **Upload endpoints**: 10 requests per 5 minutes

Rate limit headers are included in all responses:
- \`X-RateLimit-Limit\`: Maximum requests allowed
- \`X-RateLimit-Remaining\`: Requests remaining in window
- \`X-RateLimit-Reset\`: Unix timestamp when limit resets

## Error Handling

All errors follow a consistent format with detailed information:

\`\`\`json
{
  "success": false,
  "error": "Human-readable error message",
  "details": {
    "additionalContext": "..."
  },
  "timestamp": "2024-01-15T10:30:00Z",
  "path": "/api/v1/...",
  "statusCode": 400
}
\`\`\`

## Webhooks

The API supports webhooks for real-time event notifications. Webhook payloads are signed using HMAC-SHA256 for security verification.

## Support

For API support or questions, contact: support@medical-second-opinion.com
    `,
    version: '1.0.0',
    contact: {
      name: 'API Support',
      email: 'support@medical-second-opinion.com',
      url: 'https://medical-second-opinion.com/support'
    },
    license: {
      name: 'MIT',
      url: 'https://opensource.org/licenses/MIT'
    }
  },
  servers: [
    {
      url: 'https://api.medical-second-opinion.com',
      description: 'Production server'
    },
    {
      url: 'https://staging-api.medical-second-opinion.com',
      description: 'Staging server'
    },
    {
      url: 'http://localhost:3000',
      description: 'Development server'
    }
  ],
  tags: [
    {
      name: 'Case Submission',
      description: 'Medical case submission and management endpoints'
    },
    {
      name: 'Analytics',
      description: 'Submission analytics and reporting endpoints'
    },
    {
      name: 'File Upload',
      description: 'Medical document upload and management endpoints'
    },
    {
      name: 'Webhooks',
      description: 'Real-time event notification endpoints'
    },
    {
      name: 'Customer Lifecycle',
      description: 'Customer lifecycle management and automation endpoints'
    }
  ],
  paths: {},
  components: {
    schemas: {},
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      },
      ApiKeyAuth: {
        type: 'apiKey',
        in: 'header',
        name: 'x-api-key'
      }
    }
  }
};
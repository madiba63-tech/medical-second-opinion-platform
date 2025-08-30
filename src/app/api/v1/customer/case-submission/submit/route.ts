import { NextRequest } from 'next/server';
import { createApiHandler, createSuccessResponse, createErrorResponse, RATE_LIMITS } from '@/lib/api-utils';
import { CaseSubmissionSchema, CaseSubmissionResponse } from '@/lib/validations/caseSubmission';
import { CaseSubmissionService } from '@/modules/services/caseSubmissionService';
import { authorizeCustomerAccess } from '@/lib/auth';

/**
 * @swagger
 * /api/v1/customer/case-submission/submit:
 *   post:
 *     summary: Submit a new medical case for second opinion
 *     description: |
 *       Comprehensive case submission endpoint that integrates with the customer lifecycle module.
 *       This endpoint handles the complete submission flow including:
 *       - Case validation and creation
 *       - Customer lifecycle stage updates
 *       - Persona analysis and segmentation
 *       - Communication automation triggers
 *       - File attachment processing
 *       - Health score updates
 *     tags:
 *       - Case Submission
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - dateOfBirth
 *               - email
 *               - customerId
 *               - consentAccepted
 *             properties:
 *               firstName:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 100
 *                 pattern: ^[a-zA-Z\s'-]+$
 *                 description: Patient's first name
 *                 example: "John"
 *               middleName:
 *                 type: string
 *                 maxLength: 100
 *                 pattern: ^[a-zA-Z\s'-]*$
 *                 description: Patient's middle name (optional)
 *                 example: "Michael"
 *               lastName:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 100
 *                 pattern: ^[a-zA-Z\s'-]+$
 *                 description: Patient's last name
 *                 example: "Smith"
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *                 description: Patient's date of birth (ISO date string)
 *                 example: "1980-05-15"
 *               email:
 *                 type: string
 *                 format: email
 *                 maxLength: 255
 *                 description: Patient's email address
 *                 example: "john.smith@email.com"
 *               phone:
 *                 type: string
 *                 pattern: ^[\+]?[1-9][\d]{0,15}$
 *                 description: Patient's phone number (optional)
 *                 example: "+1234567890"
 *               customerId:
 *                 type: string
 *                 format: uuid
 *                 description: Customer ID from authentication
 *                 example: "123e4567-e89b-12d3-a456-426614174000"
 *               diseaseType:
 *                 type: string
 *                 maxLength: 200
 *                 description: Type of disease or condition
 *                 example: "Breast Cancer"
 *               ethnicity:
 *                 type: string
 *                 enum: [hispanic_latino, white, black_african_american, native_american, asian, pacific_islander, other, prefer_not_to_say]
 *                 description: Patient's ethnicity (optional)
 *               gender:
 *                 type: string
 *                 enum: [male, female, non_binary, other, prefer_not_to_say]
 *                 description: Patient's gender (optional)
 *               isFirstOccurrence:
 *                 type: boolean
 *                 description: Whether this is the first occurrence of the condition
 *                 example: true
 *               geneticFamilyHistory:
 *                 type: string
 *                 description: JSON string containing genetic family history data
 *                 example: '{"mother": "breast_cancer", "father": "none"}'
 *               paymentId:
 *                 type: string
 *                 description: Payment transaction ID (optional)
 *                 example: "pay_1234567890"
 *               consentAccepted:
 *                 type: boolean
 *                 description: Whether patient has accepted all consents (must be true)
 *                 example: true
 *               uploadedFiles:
 *                 type: array
 *                 items:
 *                   type: string
 *                 maxItems: 20
 *                 description: Array of S3 keys for uploaded medical files
 *                 example: ["documents/case-123/report.pdf", "images/case-123/scan.jpg"]
 *               submissionSource:
 *                 type: string
 *                 enum: [web, mobile, api]
 *                 default: api
 *                 description: Source of the submission
 *               timezone:
 *                 type: string
 *                 pattern: ^[A-Za-z_\/]+$
 *                 description: Patient's timezone for communication scheduling
 *                 example: "America/New_York"
 *           examples:
 *             basic_submission:
 *               summary: Basic Case Submission
 *               value:
 *                 firstName: "John"
 *                 lastName: "Smith"
 *                 dateOfBirth: "1980-05-15"
 *                 email: "john.smith@email.com"
 *                 phone: "+1234567890"
 *                 customerId: "123e4567-e89b-12d3-a456-426614174000"
 *                 diseaseType: "Breast Cancer"
 *                 gender: "male"
 *                 isFirstOccurrence: true
 *                 consentAccepted: true
 *                 submissionSource: "web"
 *             comprehensive_submission:
 *               summary: Comprehensive Case Submission
 *               value:
 *                 firstName: "Sarah"
 *                 middleName: "Jane"
 *                 lastName: "Johnson"
 *                 dateOfBirth: "1975-08-20"
 *                 email: "sarah.johnson@email.com"
 *                 phone: "+1987654321"
 *                 customerId: "456e7890-e12b-34d5-a678-901234567890"
 *                 diseaseType: "Lung Cancer"
 *                 ethnicity: "white"
 *                 gender: "female"
 *                 isFirstOccurrence: false
 *                 geneticFamilyHistory: '{"mother": "lung_cancer", "grandmother": "breast_cancer"}'
 *                 paymentId: "pay_1234567890"
 *                 consentAccepted: true
 *                 uploadedFiles: ["documents/case-456/pathology.pdf", "images/case-456/ct_scan.jpg"]
 *                 submissionSource: "mobile"
 *                 timezone: "America/Los_Angeles"
 *     responses:
 *       200:
 *         description: Case submitted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 caseId:
 *                   type: string
 *                   format: uuid
 *                   description: Generated case ID
 *                 caseNumber:
 *                   type: string
 *                   description: Human-readable case number
 *                   example: "CASE-1234567890-ABC123"
 *                 metrics:
 *                   type: object
 *                   properties:
 *                     submissionId:
 *                       type: string
 *                       description: Unique submission tracking ID
 *                     customerId:
 *                       type: string
 *                       format: uuid
 *                     caseNumber:
 *                       type: string
 *                     submissionTimestamp:
 *                       type: string
 *                       format: date-time
 *                     isFirstSubmission:
 *                       type: boolean
 *                       description: Whether this is customer's first case
 *                     personaAnalyzed:
 *                       type: boolean
 *                       description: Whether persona analysis was completed
 *                     lifecycleStageUpdated:
 *                       type: boolean
 *                       description: Whether customer lifecycle stage was updated
 *                     communicationsSent:
 *                       type: array
 *                       items:
 *                         type: string
 *                       description: Types of communications sent
 *                     automationTriggered:
 *                       type: array
 *                       items:
 *                         type: string
 *                       description: Automation sequences triggered
 *                     healthScoreImpact:
 *                       type: number
 *                       description: Impact on customer health score
 *                     segmentationUpdated:
 *                       type: boolean
 *                       description: Whether customer segmentation was updated
 *                 lifecycleEvents:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: Lifecycle events triggered during submission
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: "Case submitted successfully. You will receive confirmation via email."
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Validation error or bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               validation_error:
 *                 summary: Validation Error
 *                 value:
 *                   success: false
 *                   error: "Validation failed"
 *                   details:
 *                     validationErrors:
 *                       - "Body firstName: First name is required"
 *                       - "Body email: Invalid email format"
 *                   timestamp: "2024-01-15T10:30:00Z"
 *                   path: "/api/v1/customer/case-submission/submit"
 *                   statusCode: 400
 *               consent_error:
 *                 summary: Consent Not Accepted
 *                 value:
 *                   success: false
 *                   error: "Validation failed"
 *                   details:
 *                     validationErrors:
 *                       - "Body consentAccepted: Consent must be accepted"
 *                   timestamp: "2024-01-15T10:30:00Z"
 *                   path: "/api/v1/customer/case-submission/submit"
 *                   statusCode: 400
 *       401:
 *         description: Authentication required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Access forbidden - not authorized for this customer
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       429:
 *         description: Rate limit exceeded
 *         headers:
 *           X-RateLimit-Limit:
 *             description: Number of requests allowed per window
 *             schema:
 *               type: integer
 *           X-RateLimit-Remaining:
 *             description: Number of requests remaining in current window
 *             schema:
 *               type: integer
 *           X-RateLimit-Reset:
 *             description: Unix timestamp when rate limit resets
 *             schema:
 *               type: integer
 *           Retry-After:
 *             description: Seconds to wait before retrying
 *             schema:
 *               type: integer
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
 *           const response = await fetch('/api/v1/customer/case-submission/submit', {
 *             method: 'POST',
 *             headers: {
 *               'Content-Type': 'application/json',
 *               'Authorization': `Bearer ${accessToken}`
 *             },
 *             body: JSON.stringify({
 *               firstName: 'John',
 *               lastName: 'Smith',
 *               dateOfBirth: '1980-05-15',
 *               email: 'john.smith@email.com',
 *               customerId: '123e4567-e89b-12d3-a456-426614174000',
 *               diseaseType: 'Breast Cancer',
 *               consentAccepted: true
 *             })
 *           });
 *           const result = await response.json();
 *       - lang: 'cURL'
 *         source: |
 *           curl -X POST /api/v1/customer/case-submission/submit \
 *             -H "Content-Type: application/json" \
 *             -H "Authorization: Bearer YOUR_TOKEN" \
 *             -d '{
 *               "firstName": "John",
 *               "lastName": "Smith",
 *               "dateOfBirth": "1980-05-15",
 *               "email": "john.smith@email.com",
 *               "customerId": "123e4567-e89b-12d3-a456-426614174000",
 *               "diseaseType": "Breast Cancer",
 *               "consentAccepted": true
 *             }'
 */

const caseSubmissionService = new CaseSubmissionService();

export const POST = createApiHandler(
  async (context) => {
    const startTime = Date.now();
    
    try {
      const { user, validatedBody, request } = context;

      // Authorization: Ensure user can submit cases for this customer
      if (!authorizeCustomerAccess(user!, validatedBody.customerId)) {
        return createErrorResponse(
          'Access denied: Not authorized to submit cases for this customer',
          403,
          { customerId: validatedBody.customerId },
          request
        );
      }

      // Convert date string to Date object
      const submissionData = {
        ...validatedBody,
        dateOfBirth: new Date(validatedBody.dateOfBirth),
      };

      // Submit the case with full lifecycle integration
      const result = await caseSubmissionService.submitCase(submissionData);

      // Log successful submission
      console.log(`Case submitted successfully: ${result.caseNumber} for customer ${validatedBody.customerId}`);

      // Prepare response data
      const responseData: CaseSubmissionResponse = {
        success: true,
        caseId: result.caseId,
        caseNumber: result.caseNumber,
        metrics: result.metrics,
        lifecycleEvents: result.lifecycleEvents,
        message: `Case ${result.caseNumber} submitted successfully. ${
          result.metrics.isFirstSubmission 
            ? 'Welcome! You will receive onboarding information via your preferred communication method.' 
            : 'You will receive confirmation and updates via your preferred communication method.'
        }`,
      };

      // Track API metrics
      const duration = Date.now() - startTime;
      console.log(`Case submission API call completed in ${duration}ms`);

      return createSuccessResponse(responseData, 201);

    } catch (error) {
      console.error('Case submission failed:', error);

      // Handle specific business logic errors
      if (error instanceof Error) {
        if (error.message.includes('Validation failed')) {
          return createErrorResponse(
            'Case submission validation failed',
            400,
            { 
              originalError: error.message,
              timestamp: new Date().toISOString()
            },
            context.request
          );
        }

        if (error.message.includes('Customer not found')) {
          return createErrorResponse(
            'Customer not found',
            404,
            { customerId: context.validatedBody?.customerId },
            context.request
          );
        }

        if (error.message.includes('Payment')) {
          return createErrorResponse(
            'Payment verification failed',
            402,
            { 
              paymentId: context.validatedBody?.paymentId,
              message: 'Payment must be completed before case submission'
            },
            context.request
          );
        }

        if (error.message.includes('File upload')) {
          return createErrorResponse(
            'File processing failed',
            400,
            { 
              uploadedFiles: context.validatedBody?.uploadedFiles,
              message: 'One or more uploaded files could not be processed'
            },
            context.request
          );
        }
      }

      // Generic server error
      return createErrorResponse(
        'Case submission failed due to server error',
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
    rateLimit: RATE_LIMITS.submission,
    validation: {
      body: CaseSubmissionSchema,
    },
    allowedMethods: ['POST'],
    corsEnabled: true,
  }
);
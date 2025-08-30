import { NextRequest } from 'next/server';
import { createApiHandler, createSuccessResponse, createErrorResponse, RATE_LIMITS } from '@/lib/api-utils';
import { ValidationRequestSchema, ValidationResponse } from '@/lib/validations/caseSubmission';
import { CaseSubmissionService } from '@/modules/services/caseSubmissionService';
import { authorizeCustomerAccess } from '@/lib/auth';

/**
 * @swagger
 * /api/v1/customer/case-submission/validate:
 *   get:
 *     summary: Pre-submission validation for case data
 *     description: |
 *       Validates case submission data before actual submission to provide
 *       early feedback to users and prevent submission errors. This endpoint
 *       performs comprehensive validation including:
 *       - Customer verification and authorization
 *       - Duplicate case detection
 *       - Data format and business rule validation
 *       - File upload verification
 *       - Payment requirement checks
 *     tags:
 *       - Case Submission
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: customerId
 *         in: query
 *         required: true
 *         description: Customer ID to validate submission for
 *         schema:
 *           type: string
 *           format: uuid
 *         example: "123e4567-e89b-12d3-a456-426614174000"
 *       - name: email
 *         in: query
 *         required: false
 *         description: Email address to validate against customer record
 *         schema:
 *           type: string
 *           format: email
 *         example: "john.smith@email.com"
 *       - name: diseaseType
 *         in: query
 *         required: false
 *         description: Disease type to check for duplicates
 *         schema:
 *           type: string
 *         example: "Breast Cancer"
 *       - name: checkDuplicates
 *         in: query
 *         required: false
 *         description: Whether to check for duplicate submissions
 *         schema:
 *           type: boolean
 *           default: true
 *         example: true
 *       - name: duplicateCheckDays
 *         in: query
 *         required: false
 *         description: Number of days to look back for duplicates
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 30
 *           default: 7
 *         example: 7
 *     responses:
 *       200:
 *         description: Validation completed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 isValid:
 *                   type: boolean
 *                   description: Overall validation result
 *                   example: true
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: Critical errors that prevent submission
 *                   example: []
 *                 warnings:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: Warnings that don't prevent submission
 *                   example: ["Phone number recommended for urgent communications"]
 *                 recommendations:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: Recommendations to improve submission
 *                   example: ["Disease type helps with professional matching"]
 *                 duplicateCheck:
 *                   type: object
 *                   properties:
 *                     hasDuplicates:
 *                       type: boolean
 *                       description: Whether duplicate cases were found
 *                     duplicateCount:
 *                       type: number
 *                       description: Number of duplicate cases found
 *                     mostRecentDate:
 *                       type: string
 *                       format: date-time
 *                       description: Date of most recent duplicate case
 *                   example:
 *                     hasDuplicates: false
 *                     duplicateCount: 0
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *             examples:
 *               valid_submission:
 *                 summary: Valid Submission
 *                 value:
 *                   success: true
 *                   isValid: true
 *                   errors: []
 *                   warnings: ["Phone number recommended for urgent communications"]
 *                   recommendations: ["Disease type helps with professional matching"]
 *                   duplicateCheck:
 *                     hasDuplicates: false
 *                     duplicateCount: 0
 *                   timestamp: "2024-01-15T10:30:00Z"
 *               invalid_customer:
 *                 summary: Invalid Customer
 *                 value:
 *                   success: true
 *                   isValid: false
 *                   errors: ["Customer not found"]
 *                   warnings: []
 *                   recommendations: []
 *                   timestamp: "2024-01-15T10:30:00Z"
 *               duplicate_found:
 *                 summary: Duplicate Case Found
 *                 value:
 *                   success: true
 *                   isValid: true
 *                   errors: []
 *                   warnings: ["Similar case submitted recently, consider if this is intentional"]
 *                   recommendations: []
 *                   duplicateCheck:
 *                     hasDuplicates: true
 *                     duplicateCount: 1
 *                     mostRecentDate: "2024-01-10T15:45:00Z"
 *                   timestamp: "2024-01-15T10:30:00Z"
 *       400:
 *         description: Validation request error
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
 *           const response = await fetch('/api/v1/customer/case-submission/validate?' + 
 *             new URLSearchParams({
 *               customerId: '123e4567-e89b-12d3-a456-426614174000',
 *               email: 'john.smith@email.com',
 *               diseaseType: 'Breast Cancer',
 *               checkDuplicates: 'true'
 *             }), {
 *             headers: {
 *               'Authorization': `Bearer ${accessToken}`
 *             }
 *           });
 *           const result = await response.json();
 *       - lang: 'cURL'
 *         source: |
 *           curl -G /api/v1/customer/case-submission/validate \
 *             -H "Authorization: Bearer YOUR_TOKEN" \
 *             -d "customerId=123e4567-e89b-12d3-a456-426614174000" \
 *             -d "email=john.smith@email.com" \
 *             -d "diseaseType=Breast Cancer" \
 *             -d "checkDuplicates=true"
 */

const caseSubmissionService = new CaseSubmissionService();

export const GET = createApiHandler(
  async (context) => {
    const startTime = Date.now();
    
    try {
      const { user, validatedQuery, request } = context;
      const { customerId, email, diseaseType, checkDuplicates, duplicateCheckDays } = validatedQuery;

      // Authorization: Ensure user can access this customer's data
      if (!authorizeCustomerAccess(user!, customerId)) {
        return createErrorResponse(
          'Access denied: Not authorized to validate submissions for this customer',
          403,
          { customerId },
          request
        );
      }

      // Create mock case data for validation
      const mockCaseData = {
        customerId,
        email: email || '',
        diseaseType,
        firstName: 'ValidationCheck', // Mock required fields
        lastName: 'ValidationCheck',
        dateOfBirth: new Date('1980-01-01'),
        consentAccepted: true,
      };

      // Perform pre-submission validation using the service
      const validationResult = await caseSubmissionService.validatePreSubmission(mockCaseData);

      // Additional duplicate checking if requested
      let duplicateCheckResult = undefined;
      if (checkDuplicates && diseaseType) {
        try {
          const recentCases = await caseSubmissionService['getRecentSimilarCases'](
            customerId, 
            diseaseType, 
            duplicateCheckDays
          );
          
          duplicateCheckResult = {
            hasDuplicates: recentCases.length > 0,
            duplicateCount: recentCases.length,
            mostRecentDate: recentCases.length > 0 ? recentCases[0].createdAt?.toISOString() : undefined,
          };

          // Add duplicate warning to validation result if found
          if (recentCases.length > 0) {
            validationResult.warnings.push(
              `Found ${recentCases.length} similar case(s) submitted in the last ${duplicateCheckDays} days. Consider if this submission is intentional.`
            );
          }
        } catch (error) {
          console.warn('Duplicate check failed:', error);
          // Don't fail validation if duplicate check fails
          duplicateCheckResult = {
            hasDuplicates: false,
            duplicateCount: 0,
          };
        }
      }

      // Clean up validation result (remove mock data artifacts)
      const cleanErrors = validationResult.errors.filter(error => 
        !error.includes('ValidationCheck') && 
        !error.includes('1980-01-01')
      );

      // Prepare response
      const responseData: ValidationResponse = {
        success: true,
        isValid: cleanErrors.length === 0,
        errors: cleanErrors,
        warnings: validationResult.warnings,
        recommendations: validationResult.recommendations,
        duplicateCheck: duplicateCheckResult,
      };

      // Log validation metrics
      const duration = Date.now() - startTime;
      console.log(`Validation completed in ${duration}ms for customer ${customerId}: ${responseData.isValid ? 'VALID' : 'INVALID'}`);

      return createSuccessResponse(responseData);

    } catch (error) {
      console.error('Case validation failed:', error);

      // Handle specific validation errors
      if (error instanceof Error) {
        if (error.message.includes('Customer not found')) {
          return createErrorResponse(
            'Customer not found',
            404,
            { customerId: context.validatedQuery?.customerId },
            context.request
          );
        }

        if (error.message.includes('Database')) {
          return createErrorResponse(
            'Validation service temporarily unavailable',
            503,
            { message: 'Please try again in a few moments' },
            context.request
          );
        }
      }

      // Generic server error
      return createErrorResponse(
        'Validation failed due to server error',
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
    rateLimit: RATE_LIMITS.validation,
    validation: {
      query: ValidationRequestSchema,
    },
    allowedMethods: ['GET'],
    corsEnabled: true,
  }
);
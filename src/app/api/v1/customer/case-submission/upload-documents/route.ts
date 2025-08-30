import { NextRequest } from 'next/server';
import { createApiHandler, createSuccessResponse, createErrorResponse, RATE_LIMITS } from '@/lib/api-utils';
import { DocumentUploadSchema, DocumentUploadResponse } from '@/lib/validations/caseSubmission';
import { authorizeCustomerAccess } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { v4 as uuidv4 } from 'uuid';

/**
 * @swagger
 * /api/v1/customer/case-submission/upload-documents:
 *   post:
 *     summary: Upload and associate medical documents with a case
 *     description: |
 *       Upload medical documents and associate them with an existing case or prepare them
 *       for future case submission. This endpoint handles the complete document upload flow:
 *       - Validates uploaded files and metadata
 *       - Associates files with existing cases or creates temporary associations
 *       - Processes file metadata for AI analysis preparation
 *       - Ensures proper file categorization and security
 *       - Supports batch uploads with transaction safety
 *     tags:
 *       - Case Submission
 *       - File Upload
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - customerId
 *               - files
 *             properties:
 *               customerId:
 *                 type: string
 *                 format: uuid
 *                 description: Customer ID who owns the documents
 *                 example: "123e4567-e89b-12d3-a456-426614174000"
 *               caseId:
 *                 type: string
 *                 format: uuid
 *                 description: Existing case ID to associate files with (optional)
 *                 example: "456e7890-e12b-34d5-a678-901234567890"
 *               tempCaseId:
 *                 type: string
 *                 description: Temporary case ID for pre-submission uploads
 *                 example: "temp_case_1234567890"
 *               associateWithCase:
 *                 type: boolean
 *                 default: false
 *                 description: Whether to immediately associate files with a case
 *               files:
 *                 type: array
 *                 minItems: 1
 *                 maxItems: 10
 *                 items:
 *                   type: object
 *                   required:
 *                     - s3Key
 *                     - filename
 *                     - mimetype
 *                     - size
 *                     - category
 *                   properties:
 *                     s3Key:
 *                       type: string
 *                       description: S3 object key where file is stored
 *                       example: "documents/customer-123/report-456.pdf"
 *                     filename:
 *                       type: string
 *                       description: Original filename
 *                       example: "pathology_report.pdf"
 *                     mimetype:
 *                       type: string
 *                       description: MIME type of the file
 *                       example: "application/pdf"
 *                     size:
 *                       type: integer
 *                       minimum: 1
 *                       description: File size in bytes
 *                       example: 2048576
 *                     category:
 *                       type: string
 *                       enum: [medical_records, lab_results, imaging, pathology, genetic_tests, other]
 *                       description: Category of medical document
 *                       example: "pathology"
 *           examples:
 *             case_association:
 *               summary: Associate files with existing case
 *               value:
 *                 customerId: "123e4567-e89b-12d3-a456-426614174000"
 *                 caseId: "456e7890-e12b-34d5-a678-901234567890"
 *                 associateWithCase: true
 *                 files:
 *                   - s3Key: "documents/case-456/pathology_report.pdf"
 *                     filename: "pathology_report.pdf"
 *                     mimetype: "application/pdf"
 *                     size: 2048576
 *                     category: "pathology"
 *                   - s3Key: "images/case-456/ct_scan.jpg"
 *                     filename: "ct_scan_chest.jpg"
 *                     mimetype: "image/jpeg"
 *                     size: 5242880
 *                     category: "imaging"
 *             pre_submission:
 *               summary: Pre-submission document upload
 *               value:
 *                 customerId: "123e4567-e89b-12d3-a456-426614174000"
 *                 tempCaseId: "temp_case_1234567890"
 *                 associateWithCase: false
 *                 files:
 *                   - s3Key: "temp/customer-123/medical_records.pdf"
 *                     filename: "medical_records.pdf"
 *                     mimetype: "application/pdf"
 *                     size: 1024000
 *                     category: "medical_records"
 *     responses:
 *       201:
 *         description: Documents uploaded and processed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 uploadedFiles:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         format: uuid
 *                         description: Database ID of the uploaded file record
 *                       s3Key:
 *                         type: string
 *                         description: S3 object key
 *                       filename:
 *                         type: string
 *                         description: Original filename
 *                       size:
 *                         type: integer
 *                         description: File size in bytes
 *                       category:
 *                         type: string
 *                         description: Document category
 *                       uploadedAt:
 *                         type: string
 *                         format: date-time
 *                         description: Upload timestamp
 *                   example:
 *                     - id: "789e0123-e45f-67g8-h901-234567890123"
 *                       s3Key: "documents/case-456/pathology_report.pdf"
 *                       filename: "pathology_report.pdf"
 *                       size: 2048576
 *                       category: "pathology"
 *                       uploadedAt: "2024-01-15T10:30:00Z"
 *                 caseAssociation:
 *                   type: object
 *                   properties:
 *                     caseId:
 *                       type: string
 *                       format: uuid
 *                       description: Case ID files were associated with
 *                     tempCaseId:
 *                       type: string
 *                       description: Temporary case ID for pre-submission uploads
 *                   example:
 *                     caseId: "456e7890-e12b-34d5-a678-901234567890"
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: "2 documents uploaded successfully and associated with case CASE-1234567890-ABC123"
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
 *               file_validation_error:
 *                 summary: File Validation Error
 *                 value:
 *                   success: false
 *                   error: "Validation failed"
 *                   details:
 *                     validationErrors:
 *                       - "Body files.0.size: File size must be positive"
 *                       - "Body files.1.category: Invalid category"
 *                   timestamp: "2024-01-15T10:30:00Z"
 *                   path: "/api/v1/customer/case-submission/upload-documents"
 *                   statusCode: 400
 *               file_limit_error:
 *                 summary: File Limit Exceeded
 *                 value:
 *                   success: false
 *                   error: "Too many files"
 *                   details:
 *                     maxFiles: 10
 *                     providedFiles: 15
 *                   timestamp: "2024-01-15T10:30:00Z"
 *                   path: "/api/v1/customer/case-submission/upload-documents"
 *                   statusCode: 400
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
 *       404:
 *         description: Case or customer not found
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
 *           const response = await fetch('/api/v1/customer/case-submission/upload-documents', {
 *             method: 'POST',
 *             headers: {
 *               'Content-Type': 'application/json',
 *               'Authorization': `Bearer ${accessToken}`
 *             },
 *             body: JSON.stringify({
 *               customerId: '123e4567-e89b-12d3-a456-426614174000',
 *               caseId: '456e7890-e12b-34d5-a678-901234567890',
 *               associateWithCase: true,
 *               files: [
 *                 {
 *                   s3Key: 'documents/case-456/pathology_report.pdf',
 *                   filename: 'pathology_report.pdf',
 *                   mimetype: 'application/pdf',
 *                   size: 2048576,
 *                   category: 'pathology'
 *                 }
 *               ]
 *             })
 *           });
 *           const result = await response.json();
 *       - lang: 'cURL'
 *         source: |
 *           curl -X POST /api/v1/customer/case-submission/upload-documents \
 *             -H "Content-Type: application/json" \
 *             -H "Authorization: Bearer YOUR_TOKEN" \
 *             -d '{
 *               "customerId": "123e4567-e89b-12d3-a456-426614174000",
 *               "files": [{
 *                 "s3Key": "documents/case-456/pathology_report.pdf",
 *                 "filename": "pathology_report.pdf",
 *                 "mimetype": "application/pdf",
 *                 "size": 2048576,
 *                 "category": "pathology"
 *               }]
 *             }'
 */

export const POST = createApiHandler(
  async (context) => {
    const startTime = Date.now();
    
    try {
      const { user, validatedBody, request } = context;
      const { customerId, caseId, tempCaseId, associateWithCase, files } = validatedBody;

      // Authorization: Ensure user can upload files for this customer
      if (!authorizeCustomerAccess(user!, customerId)) {
        return createErrorResponse(
          'Access denied: Not authorized to upload documents for this customer',
          403,
          { customerId },
          request
        );
      }

      // Validate file limits and constraints
      if (files.length > 10) {
        return createErrorResponse(
          'Too many files',
          400,
          { maxFiles: 10, providedFiles: files.length },
          request
        );
      }

      // Check total file size (100MB limit)
      const totalSize = files.reduce((sum, file) => sum + file.size, 0);
      const maxTotalSize = 100 * 1024 * 1024; // 100MB
      if (totalSize > maxTotalSize) {
        return createErrorResponse(
          'Total file size exceeds limit',
          400,
          { 
            maxSize: maxTotalSize, 
            totalSize,
            maxSizeMB: 100,
            totalSizeMB: Math.round(totalSize / 1024 / 1024 * 100) / 100
          },
          request
        );
      }

      // Verify customer exists
      const customer = await prisma.customer.findUnique({
        where: { id: customerId }
      });

      if (!customer) {
        return createErrorResponse(
          'Customer not found',
          404,
          { customerId },
          request
        );
      }

      // Verify case exists if caseId provided
      let existingCase = null;
      if (caseId) {
        existingCase = await prisma.case.findUnique({
          where: { 
            id: caseId,
            customerId: customerId // Ensure case belongs to customer
          }
        });

        if (!existingCase) {
          return createErrorResponse(
            'Case not found or does not belong to customer',
            404,
            { caseId, customerId },
            request
          );
        }
      }

      // Process file uploads in transaction
      const result = await prisma.$transaction(async (tx) => {
        const uploadedFiles = [];

        for (const fileData of files) {
          // Verify S3 file exists (in production, this would check S3)
          // For now, we'll assume the S3 key is valid if it follows the pattern
          if (!fileData.s3Key || !fileData.s3Key.startsWith('documents/') && !fileData.s3Key.startsWith('temp/')) {
            throw new Error(`Invalid S3 key format: ${fileData.s3Key}`);
          }

          // Create uploaded file record
          const uploadedFile = await tx.uploadedFile.create({
            data: {
              id: uuidv4(),
              filename: fileData.filename,
              s3Key: fileData.s3Key,
              mimetype: fileData.mimetype,
              size: fileData.size,
              category: fileData.category,
              customerId: customerId,
              caseId: associateWithCase && existingCase ? existingCase.id : null,
              tempCaseId: tempCaseId || null,
              uploadedAt: new Date(),
            }
          });

          uploadedFiles.push({
            id: uploadedFile.id,
            s3Key: uploadedFile.s3Key,
            filename: uploadedFile.filename,
            size: uploadedFile.size,
            category: uploadedFile.category,
            uploadedAt: uploadedFile.uploadedAt.toISOString(),
          });
        }

        return uploadedFiles;
      });

      // Prepare case association information
      let caseAssociation = undefined;
      if (associateWithCase && existingCase) {
        caseAssociation = { caseId: existingCase.id };
      } else if (tempCaseId) {
        caseAssociation = { tempCaseId };
      }

      // If files are associated with an existing case, trigger processing
      if (associateWithCase && existingCase) {
        try {
          // Trigger file processing for AI analysis
          await triggerFileProcessing(existingCase.id, result.map(f => f.s3Key));
          console.log(`File processing triggered for case ${existingCase.caseNumber}`);
        } catch (error) {
          console.warn('Failed to trigger file processing:', error);
          // Don't fail the upload if processing trigger fails
        }
      }

      // Log successful upload
      console.log(`${result.length} documents uploaded successfully for customer ${customerId}`);

      // Prepare response
      const responseData: DocumentUploadResponse = {
        success: true,
        uploadedFiles: result,
        caseAssociation,
        message: `${result.length} document(s) uploaded successfully${
          existingCase ? ` and associated with case ${existingCase.caseNumber}` : 
          tempCaseId ? ` and prepared for case submission` : ''
        }`,
      };

      // Track upload metrics
      const duration = Date.now() - startTime;
      console.log(`Document upload API call completed in ${duration}ms`);

      return createSuccessResponse(responseData, 201);

    } catch (error) {
      console.error('Document upload failed:', error);

      // Handle specific errors
      if (error instanceof Error) {
        if (error.message.includes('Invalid S3 key')) {
          return createErrorResponse(
            'Invalid file location',
            400,
            { 
              error: error.message,
              message: 'One or more files have invalid storage locations'
            },
            context.request
          );
        }

        if (error.message.includes('File size')) {
          return createErrorResponse(
            'File size validation failed',
            400,
            { error: error.message },
            context.request
          );
        }

        if (error.message.includes('Unsupported file type')) {
          return createErrorResponse(
            'Unsupported file type',
            400,
            { 
              error: error.message,
              supportedTypes: ['application/pdf', 'image/jpeg', 'image/png', 'image/tiff']
            },
            context.request
          );
        }

        if (error.message.includes('Database constraint')) {
          return createErrorResponse(
            'File upload constraint violation',
            409,
            { message: 'Duplicate file or constraint violation' },
            context.request
          );
        }
      }

      return createErrorResponse(
        'Document upload failed due to server error',
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
    rateLimit: RATE_LIMITS.upload,
    validation: {
      body: DocumentUploadSchema,
    },
    allowedMethods: ['POST'],
    corsEnabled: true,
  }
);

/**
 * Trigger file processing for AI analysis
 */
async function triggerFileProcessing(caseId: string, s3Keys: string[]): Promise<void> {
  try {
    // In production, this would:
    // 1. Queue files for OCR and text extraction
    // 2. Trigger medical document classification
    // 3. Start AI-powered content analysis
    // 4. Update case status to 'processing'
    
    console.log(`File processing queued for case ${caseId}:`, s3Keys);
    
    // Mock implementation - update case status
    await prisma.case.update({
      where: { id: caseId },
      data: { 
        status: 'processing',
        updatedAt: new Date(),
      }
    });

  } catch (error) {
    console.error('Failed to trigger file processing:', error);
    throw error;
  }
}
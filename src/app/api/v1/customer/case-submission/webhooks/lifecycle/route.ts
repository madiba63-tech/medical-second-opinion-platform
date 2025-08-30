import { NextRequest } from 'next/server';
import { createApiHandler, createSuccessResponse, createErrorResponse, RATE_LIMITS } from '@/lib/api-utils';
import { WebhookEventSchema } from '@/lib/validations/caseSubmission';
import { CustomerLifecycleService } from '@/modules/customerLifecycle/customerLifecycleService';
import { CommunicationService } from '@/modules/customerLifecycle/communicationService';
import { AutomationService } from '@/modules/customerLifecycle/automationService';
import { prisma } from '@/lib/prisma';
import crypto from 'crypto';

/**
 * @swagger
 * /api/v1/customer/case-submission/webhooks/lifecycle:
 *   post:
 *     summary: Webhook endpoint for customer lifecycle events
 *     description: |
 *       Receives and processes customer lifecycle events triggered by case submissions
 *       and other platform activities. This webhook enables real-time processing of:
 *       - Case submission lifecycle events
 *       - Customer onboarding triggers
 *       - Communication automation events
 *       - Persona analysis updates
 *       - Health score changes
 *       - Segmentation updates
 *       
 *       The webhook includes signature verification for security and supports
 *       automatic retry mechanisms with exponential backoff.
 *     tags:
 *       - Webhooks
 *       - Customer Lifecycle
 *     security:
 *       - WebhookSignature: []
 *     parameters:
 *       - name: x-webhook-signature
 *         in: header
 *         required: true
 *         description: HMAC-SHA256 signature of the request body
 *         schema:
 *           type: string
 *         example: "sha256=a5b4c3d2e1f0123456789abcdef123456789"
 *       - name: x-webhook-timestamp
 *         in: header
 *         required: true
 *         description: Unix timestamp of when the webhook was sent
 *         schema:
 *           type: string
 *         example: "1705312200"
 *       - name: x-webhook-id
 *         in: header
 *         required: false
 *         description: Unique identifier for webhook delivery (for deduplication)
 *         schema:
 *           type: string
 *         example: "wh_1234567890abcdef"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - eventType
 *               - customerId
 *               - data
 *               - timestamp
 *             properties:
 *               eventType:
 *                 type: string
 *                 enum:
 *                   - case.submitted
 *                   - case.validated
 *                   - case.processing_started
 *                   - case.assigned
 *                   - case.completed
 *                   - customer.onboarded
 *                   - customer.reengaged
 *                   - communication.sent
 *                   - automation.triggered
 *                 description: Type of lifecycle event
 *                 example: "case.submitted"
 *               customerId:
 *                 type: string
 *                 format: uuid
 *                 description: Customer ID associated with the event
 *                 example: "123e4567-e89b-12d3-a456-426614174000"
 *               caseId:
 *                 type: string
 *                 format: uuid
 *                 description: Case ID if event is case-related
 *                 example: "456e7890-e12b-34d5-a678-901234567890"
 *               data:
 *                 type: object
 *                 description: Event-specific data payload
 *                 additionalProperties: true
 *                 example:
 *                   caseNumber: "CASE-1234567890-ABC123"
 *                   diseaseType: "Breast Cancer"
 *                   isFirstSubmission: true
 *                   submissionSource: "web"
 *               timestamp:
 *                 type: string
 *                 format: date-time
 *                 description: When the event occurred
 *                 example: "2024-01-15T10:30:00Z"
 *               retryCount:
 *                 type: integer
 *                 minimum: 0
 *                 default: 0
 *                 description: Number of retry attempts for this event
 *                 example: 0
 *           examples:
 *             case_submitted:
 *               summary: Case Submitted Event
 *               value:
 *                 eventType: "case.submitted"
 *                 customerId: "123e4567-e89b-12d3-a456-426614174000"
 *                 caseId: "456e7890-e12b-34d5-a678-901234567890"
 *                 data:
 *                   caseNumber: "CASE-1234567890-ABC123"
 *                   diseaseType: "Breast Cancer"
 *                   isFirstSubmission: true
 *                   submissionSource: "web"
 *                   personaType: "informed_advocator"
 *                 timestamp: "2024-01-15T10:30:00Z"
 *                 retryCount: 0
 *             customer_onboarded:
 *               summary: Customer Onboarded Event
 *               value:
 *                 eventType: "customer.onboarded"
 *                 customerId: "123e4567-e89b-12d3-a456-426614174000"
 *                 data:
 *                   onboardingMethod: "case_submission"
 *                   personaType: "cautious_researcher"
 *                   preferredChannel: "email"
 *                   healthScore: 25
 *                 timestamp: "2024-01-15T10:35:00Z"
 *                 retryCount: 0
 *             communication_sent:
 *               summary: Communication Sent Event
 *               value:
 *                 eventType: "communication.sent"
 *                 customerId: "123e4567-e89b-12d3-a456-426614174000"
 *                 data:
 *                   communicationType: "welcome_email"
 *                   channel: "email"
 *                   templateId: "template_onboarding_001"
 *                   successful: true
 *                 timestamp: "2024-01-15T10:36:00Z"
 *                 retryCount: 0
 *     responses:
 *       200:
 *         description: Webhook event processed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 eventId:
 *                   type: string
 *                   description: Unique identifier for the processed event
 *                   example: "evt_1234567890abcdef"
 *                 processed:
 *                   type: boolean
 *                   description: Whether the event was successfully processed
 *                   example: true
 *                 actions:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: Actions triggered by this event
 *                   example: ["lifecycle_updated", "communication_sent", "automation_triggered"]
 *                 processingTime:
 *                   type: number
 *                   description: Processing time in milliseconds
 *                   example: 150
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Invalid webhook payload or signature
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               invalid_signature:
 *                 summary: Invalid Signature
 *                 value:
 *                   success: false
 *                   error: "Invalid webhook signature"
 *                   timestamp: "2024-01-15T10:30:00Z"
 *                   path: "/api/v1/customer/case-submission/webhooks/lifecycle"
 *                   statusCode: 400
 *               expired_timestamp:
 *                 summary: Expired Timestamp
 *                 value:
 *                   success: false
 *                   error: "Webhook timestamp too old"
 *                   details:
 *                     maxAge: 300
 *                     receivedAge: 450
 *                   timestamp: "2024-01-15T10:30:00Z"
 *                   path: "/api/v1/customer/case-submission/webhooks/lifecycle"
 *                   statusCode: 400
 *       401:
 *         description: Authentication failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       409:
 *         description: Duplicate webhook event (already processed)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 duplicate:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Event already processed"
 *                 originalProcessedAt:
 *                   type: string
 *                   format: date-time
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
 *           const crypto = require('crypto');
 *           
 *           const payload = {
 *             eventType: 'case.submitted',
 *             customerId: '123e4567-e89b-12d3-a456-426614174000',
 *             caseId: '456e7890-e12b-34d5-a678-901234567890',
 *             data: {
 *               caseNumber: 'CASE-1234567890-ABC123',
 *               isFirstSubmission: true
 *             },
 *             timestamp: new Date().toISOString()
 *           };
 *           
 *           const body = JSON.stringify(payload);
 *           const timestamp = Math.floor(Date.now() / 1000);
 *           const signature = crypto
 *             .createHmac('sha256', webhookSecret)
 *             .update(timestamp + body)
 *             .digest('hex');
 *           
 *           const response = await fetch('/api/v1/customer/case-submission/webhooks/lifecycle', {
 *             method: 'POST',
 *             headers: {
 *               'Content-Type': 'application/json',
 *               'x-webhook-signature': `sha256=${signature}`,
 *               'x-webhook-timestamp': timestamp.toString()
 *             },
 *             body
 *           });
 *       - lang: 'cURL'
 *         source: |
 *           TIMESTAMP=$(date +%s)
 *           BODY='{"eventType":"case.submitted","customerId":"123e4567-e89b-12d3-a456-426614174000","data":{},"timestamp":"2024-01-15T10:30:00Z"}'
 *           SIGNATURE=$(echo -n "${TIMESTAMP}${BODY}" | openssl dgst -sha256 -hmac "$WEBHOOK_SECRET" -binary | xxd -p)
 *           
 *           curl -X POST /api/v1/customer/case-submission/webhooks/lifecycle \
 *             -H "Content-Type: application/json" \
 *             -H "x-webhook-signature: sha256=${SIGNATURE}" \
 *             -H "x-webhook-timestamp: ${TIMESTAMP}" \
 *             -d "$BODY"
 */

const customerLifecycleService = new CustomerLifecycleService();
const communicationService = new CommunicationService();
const automationService = new AutomationService();

// Webhook secret for signature verification
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || 'your-webhook-secret';
const MAX_WEBHOOK_AGE = 300; // 5 minutes in seconds

export const POST = createApiHandler(
  async (context) => {
    const startTime = Date.now();
    
    try {
      const { validatedBody, request } = context;
      const { eventType, customerId, caseId, data, timestamp, retryCount } = validatedBody;

      // Verify webhook signature
      const signatureHeader = request.headers.get('x-webhook-signature');
      const timestampHeader = request.headers.get('x-webhook-timestamp');
      const webhookId = request.headers.get('x-webhook-id');

      if (!signatureHeader || !timestampHeader) {
        return createErrorResponse(
          'Missing required webhook headers',
          400,
          { 
            required: ['x-webhook-signature', 'x-webhook-timestamp'],
            received: { signatureHeader: !!signatureHeader, timestampHeader: !!timestampHeader }
          },
          request
        );
      }

      // Verify timestamp is not too old
      const webhookTimestamp = parseInt(timestampHeader);
      const currentTimestamp = Math.floor(Date.now() / 1000);
      const age = currentTimestamp - webhookTimestamp;

      if (age > MAX_WEBHOOK_AGE) {
        return createErrorResponse(
          'Webhook timestamp too old',
          400,
          { 
            maxAge: MAX_WEBHOOK_AGE,
            receivedAge: age,
            message: 'Webhook must be processed within 5 minutes of generation'
          },
          request
        );
      }

      // Verify signature
      const body = JSON.stringify(validatedBody);
      const expectedSignature = crypto
        .createHmac('sha256', WEBHOOK_SECRET)
        .update(timestampHeader + body)
        .digest('hex');
      
      const receivedSignature = signatureHeader.replace('sha256=', '');

      if (!crypto.timingSafeEqual(Buffer.from(expectedSignature, 'hex'), Buffer.from(receivedSignature, 'hex'))) {
        return createErrorResponse(
          'Invalid webhook signature',
          401,
          { message: 'Signature verification failed' },
          request
        );
      }

      // Check for duplicate events if webhookId provided
      if (webhookId) {
        const existingEvent = await prisma.webhookEvent.findUnique({
          where: { webhookId }
        });

        if (existingEvent) {
          return createSuccessResponse({
            duplicate: true,
            message: 'Event already processed',
            originalProcessedAt: existingEvent.processedAt.toISOString(),
          });
        }
      }

      // Process the webhook event
      const actions: string[] = [];
      let eventId: string;

      // Store webhook event for tracking
      const webhookEvent = await prisma.webhookEvent.create({
        data: {
          webhookId: webhookId || `wh_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          eventType,
          customerId,
          caseId,
          payload: data,
          timestamp: new Date(timestamp),
          retryCount,
          processedAt: new Date(),
        }
      });

      eventId = webhookEvent.id;

      // Process different event types
      switch (eventType) {
        case 'case.submitted':
          await processCaseSubmittedEvent(customerId, caseId, data, actions);
          break;

        case 'case.validated':
          await processCaseValidatedEvent(customerId, caseId, data, actions);
          break;

        case 'case.processing_started':
          await processCaseProcessingStartedEvent(customerId, caseId, data, actions);
          break;

        case 'case.assigned':
          await processCaseAssignedEvent(customerId, caseId, data, actions);
          break;

        case 'case.completed':
          await processCaseCompletedEvent(customerId, caseId, data, actions);
          break;

        case 'customer.onboarded':
          await processCustomerOnboardedEvent(customerId, data, actions);
          break;

        case 'customer.reengaged':
          await processCustomerReengagedEvent(customerId, data, actions);
          break;

        case 'communication.sent':
          await processCommunicationSentEvent(customerId, data, actions);
          break;

        case 'automation.triggered':
          await processAutomationTriggeredEvent(customerId, data, actions);
          break;

        default:
          console.warn(`Unknown event type: ${eventType}`);
          actions.push('event_logged');
      }

      // Log successful processing
      const processingTime = Date.now() - startTime;
      console.log(`Webhook event ${eventType} processed successfully for customer ${customerId} in ${processingTime}ms`);

      return createSuccessResponse({
        eventId,
        processed: true,
        actions,
        processingTime,
      });

    } catch (error) {
      console.error('Webhook processing failed:', error);

      // Handle specific errors
      if (error instanceof Error) {
        if (error.message.includes('Customer not found')) {
          return createErrorResponse(
            'Customer not found',
            404,
            { customerId: context.validatedBody?.customerId },
            context.request
          );
        }

        if (error.message.includes('Case not found')) {
          return createErrorResponse(
            'Case not found',
            404,
            { 
              customerId: context.validatedBody?.customerId,
              caseId: context.validatedBody?.caseId 
            },
            context.request
          );
        }

        if (error.message.includes('Database')) {
          return createErrorResponse(
            'Database error during webhook processing',
            503,
            { message: 'Temporary database issue, please retry' },
            context.request
          );
        }
      }

      return createErrorResponse(
        'Webhook processing failed due to server error',
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
    requireAuth: false, // Webhooks use signature verification instead
    rateLimit: RATE_LIMITS.webhook,
    validation: {
      body: WebhookEventSchema,
    },
    allowedMethods: ['POST'],
    corsEnabled: false, // Webhooks typically don't need CORS
  }
);

/**
 * Process case submitted event
 */
async function processCaseSubmittedEvent(
  customerId: string, 
  caseId: string | undefined, 
  data: any, 
  actions: string[]
): Promise<void> {
  try {
    // Update customer lifecycle stage if first submission
    if (data.isFirstSubmission) {
      await customerLifecycleService.updateCustomerStage(customerId, {
        stage: 'onboarding',
        timestamp: new Date(),
        reason: 'First case submission via webhook'
      });
      actions.push('lifecycle_updated_onboarding');
    } else {
      await customerLifecycleService.updateCustomerStage(customerId, {
        stage: 'active',
        timestamp: new Date(),
        reason: 'Case submission via webhook'
      });
      actions.push('lifecycle_updated_active');
    }

    // Trigger appropriate communication
    const communicationType = data.isFirstSubmission ? 'onboarding' : 'active';
    await communicationService.sendLifecycleMessage(customerId, communicationType, {
      caseNumber: data.caseNumber,
      diseaseType: data.diseaseType,
    });
    actions.push('communication_triggered');

    // Log case event
    if (caseId) {
      await logCaseLifecycleEvent(caseId, 'submitted', data);
      actions.push('case_event_logged');
    }

  } catch (error) {
    console.error('Failed to process case submitted event:', error);
    throw error;
  }
}

/**
 * Process other event types (simplified implementations)
 */
async function processCaseValidatedEvent(customerId: string, caseId: string | undefined, data: any, actions: string[]): Promise<void> {
  actions.push('case_validation_processed');
}

async function processCaseProcessingStartedEvent(customerId: string, caseId: string | undefined, data: any, actions: string[]): Promise<void> {
  if (caseId) {
    await logCaseLifecycleEvent(caseId, 'processing_started', data);
    actions.push('case_processing_logged');
  }
}

async function processCaseAssignedEvent(customerId: string, caseId: string | undefined, data: any, actions: string[]): Promise<void> {
  if (caseId) {
    await logCaseLifecycleEvent(caseId, 'assigned', data);
    actions.push('case_assignment_logged');
  }
  
  // Send assignment notification
  await communicationService.sendLifecycleMessage(customerId, 'case_assigned', {
    professionalName: data.professionalName,
    caseNumber: data.caseNumber,
  });
  actions.push('assignment_notification_sent');
}

async function processCaseCompletedEvent(customerId: string, caseId: string | undefined, data: any, actions: string[]): Promise<void> {
  if (caseId) {
    await logCaseLifecycleEvent(caseId, 'completed', data);
    actions.push('case_completion_logged');
  }
  
  // Update customer lifecycle stage
  await customerLifecycleService.updateCustomerStage(customerId, {
    stage: 'satisfied_customer',
    timestamp: new Date(),
    reason: 'Case completed successfully'
  });
  actions.push('lifecycle_updated_satisfied');
}

async function processCustomerOnboardedEvent(customerId: string, data: any, actions: string[]): Promise<void> {
  actions.push('customer_onboarding_processed');
}

async function processCustomerReengagedEvent(customerId: string, data: any, actions: string[]): Promise<void> {
  actions.push('customer_reengagement_processed');
}

async function processCommunicationSentEvent(customerId: string, data: any, actions: string[]): Promise<void> {
  actions.push('communication_logged');
}

async function processAutomationTriggeredEvent(customerId: string, data: any, actions: string[]): Promise<void> {
  actions.push('automation_logged');
}

/**
 * Log case lifecycle event
 */
async function logCaseLifecycleEvent(caseId: string, eventType: string, data: any): Promise<void> {
  try {
    // In production, this would create detailed event logs
    console.log(`Case lifecycle event: ${caseId} - ${eventType}`, data);
  } catch (error) {
    console.error('Failed to log case lifecycle event:', error);
  }
}
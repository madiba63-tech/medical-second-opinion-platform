const express = require('express');
const cors = require('cors');
const { body, param, query, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');
const cron = require('node-cron');
const winston = require('winston');
const _ = require('lodash');
const moment = require('moment');
const Queue = require('bull');
const Redis = require('ioredis');
const { PrismaClient } = require('../../src/generated/prisma');

// Initialize services
const app = express();
const PORT = process.env.PORT || 3010;
const JWT_SECRET = process.env.JWT_SECRET || 'workflow-engine-jwt-secret-2025';
const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/secondopinion?schema=public';
const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

// Initialize Redis connection
const redis = new Redis(REDIS_URL, {
  retryDelayOnFailover: 100,
  maxRetriesPerRequest: 3
});

// Initialize job queues
const workflowQueue = new Queue('workflow processing', REDIS_URL);
const slaMonitoringQueue = new Queue('sla monitoring', REDIS_URL);
const escalationQueue = new Queue('case escalation', REDIS_URL);

// Initialize Prisma client
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: DATABASE_URL,
    },
  },
});

// Configure Winston logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ],
});

// Service URLs
const NOTIFICATION_SERVICE_URL = process.env.NOTIFICATION_SERVICE_URL || 'http://localhost:3005';
const ADMIN_SERVICE_URL = process.env.ADMIN_SERVICE_URL || 'http://localhost:3009';
const PROFESSIONAL_SERVICE_URL = process.env.PROFESSIONAL_SERVICE_URL || 'http://localhost:3004';

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Access token required',
      code: 'TOKEN_MISSING'
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    logger.error('Token verification failed:', error);
    return res.status(403).json({
      success: false,
      error: 'Invalid or expired token',
      code: 'TOKEN_INVALID'
    });
  }
};

// Workflow Definitions
const WORKFLOW_DEFINITIONS = {
  case_processing: {
    name: 'Medical Case Processing',
    steps: [
      { id: 'document_upload', name: 'Document Upload', timeout: 48 * 60 * 60 * 1000 },
      { id: 'ai_analysis', name: 'AI Analysis', timeout: 30 * 60 * 1000 },
      { id: 'professional_assignment', name: 'Professional Assignment', timeout: 24 * 60 * 60 * 1000 },
      { id: 'professional_review', name: 'Professional Review', timeout: 72 * 60 * 60 * 1000 },
      { id: 'quality_check', name: 'Quality Assurance', timeout: 24 * 60 * 60 * 1000 },
      { id: 'delivery', name: 'Opinion Delivery', timeout: 4 * 60 * 60 * 1000 }
    ],
    escalationLevels: ['supervisor', 'quality_manager', 'admin']
  },
  professional_onboarding: {
    name: 'Professional Onboarding',
    steps: [
      { id: 'welcome_email', name: 'Welcome Communication', timeout: 1 * 60 * 60 * 1000 },
      { id: 'account_setup', name: 'Account Setup', timeout: 24 * 60 * 60 * 1000 },
      { id: 'training_materials', name: 'Training Materials', timeout: 72 * 60 * 60 * 1000 },
      { id: 'first_case_assignment', name: 'First Case Assignment', timeout: 168 * 60 * 60 * 1000 },
      { id: 'performance_review', name: '30-Day Review', timeout: 720 * 60 * 60 * 1000 }
    ],
    escalationLevels: ['hr_manager', 'quality_manager']
  },
  peer_review: {
    name: 'Peer Review Process',
    steps: [
      { id: 'reviewer_assignment', name: 'Assign Distinguished Professional', timeout: 24 * 60 * 60 * 1000 },
      { id: 'review_completion', name: 'Peer Review', timeout: 48 * 60 * 60 * 1000 },
      { id: 'feedback_delivery', name: 'Feedback Processing', timeout: 4 * 60 * 60 * 1000 }
    ],
    escalationLevels: ['quality_manager', 'medical_director']
  },
  case_exception: {
    name: 'Case Exception Handling',
    steps: [
      { id: 'exception_detection', name: 'Exception Detection', timeout: 1 * 60 * 60 * 1000 },
      { id: 'triage', name: 'Exception Triage', timeout: 4 * 60 * 60 * 1000 },
      { id: 'resolution', name: 'Exception Resolution', timeout: 24 * 60 * 60 * 1000 },
      { id: 'follow_up', name: 'Follow-up Verification', timeout: 12 * 60 * 60 * 1000 }
    ],
    escalationLevels: ['supervisor', 'admin']
  }
};

// SLA Definitions (in milliseconds)
const SLA_DEFINITIONS = {
  'FILES_UPLOADED': { target: 30 * 60 * 1000, warning: 20 * 60 * 1000 }, // 30 min for AI analysis
  'AI_ANALYSIS_COMPLETE': { target: 24 * 60 * 60 * 1000, warning: 18 * 60 * 60 * 1000 }, // 24h for assignment
  'ASSIGNED_TO_PROFESSIONAL': { target: 72 * 60 * 60 * 1000, warning: 60 * 60 * 60 * 1000 }, // 72h for review
  'IN_REVIEW': { target: 48 * 60 * 60 * 1000, warning: 36 * 60 * 60 * 1000 }, // 48h for completion
  'OPINION_READY_FOR_SIGNATURE': { target: 4 * 60 * 60 * 1000, warning: 2 * 60 * 60 * 1000 }, // 4h for signature
  'OPINION_SIGNED': { target: 2 * 60 * 60 * 1000, warning: 1 * 60 * 60 * 1000 } // 2h for delivery
};

// Workflow execution functions
const executeWorkflowStep = async (workflowId, stepId, data) => {
  logger.info(`Executing workflow step: ${workflowId}:${stepId}`, data);

  switch (`${workflowId}:${stepId}`) {
    case 'professional_onboarding:welcome_email':
      await sendWelcomeEmail(data);
      break;
    case 'professional_onboarding:account_setup':
      await setupProfessionalAccount(data);
      break;
    case 'case_processing:ai_analysis':
      await triggerAIAnalysis(data);
      break;
    case 'case_processing:professional_assignment':
      await assignProfessional(data);
      break;
    case 'peer_review:reviewer_assignment':
      await assignPeerReviewer(data);
      break;
    case 'case_exception:exception_detection':
      await detectCaseExceptions(data);
      break;
    default:
      logger.warn(`Unknown workflow step: ${workflowId}:${stepId}`);
  }
};

// Workflow step implementations
const sendWelcomeEmail = async (data) => {
  try {
    await axios.post(`${NOTIFICATION_SERVICE_URL}/api/v1/notifications/send`, {
      recipient: data.professionalEmail,
      type: 'professional_welcome',
      template: 'professional_onboarding_welcome',
      data: {
        professionalName: data.professionalName,
        level: data.level,
        onboardingSteps: ['account_setup', 'training_materials', 'first_case']
      }
    });
    logger.info('Welcome email sent successfully');
  } catch (error) {
    logger.error('Failed to send welcome email:', error);
    throw error;
  }
};

const setupProfessionalAccount = async (data) => {
  try {
    // Update professional account with onboarding status
    await prisma.medicalProfessional.update({
      where: { id: data.professionalId },
      data: {
        onboardingStatus: 'account_setup_complete',
        onboardingCompletedSteps: ['welcome_email', 'account_setup']
      }
    });
    logger.info('Professional account setup completed');
  } catch (error) {
    logger.error('Failed to setup professional account:', error);
    throw error;
  }
};

const triggerAIAnalysis = async (data) => {
  try {
    await axios.post('http://localhost:3003/api/v1/analysis/case', {
      caseId: data.caseId,
      priority: data.urgency === 'EMERGENCY' ? 'high' : 'normal'
    });
    logger.info('AI analysis triggered successfully');
  } catch (error) {
    logger.error('Failed to trigger AI analysis:', error);
    throw error;
  }
};

const assignProfessional = async (data) => {
  try {
    await axios.post('http://localhost:3007/api/v1/cases/auto-assign', {
      caseId: data.caseId,
      requiredLevel: data.professionalLevel,
      specialty: data.specialty
    });
    logger.info('Professional assignment completed');
  } catch (error) {
    logger.error('Failed to assign professional:', error);
    throw error;
  }
};

const assignPeerReviewer = async (data) => {
  try {
    const distinguishedProfessionals = await prisma.medicalProfessional.findMany({
      where: {
        level: 'DISTINGUISHED',
        vetted: true,
        status: 'active',
        subspecialties: {
          contains: data.specialty
        }
      },
      take: 5
    });

    if (distinguishedProfessionals.length > 0) {
      const reviewer = _.sample(distinguishedProfessionals);
      await prisma.peerReview.create({
        data: {
          secondOpinionId: data.secondOpinionId,
          caseId: data.caseId,
          reviewerId: reviewer.id,
          status: 'assigned',
          assignedAt: new Date(),
          dueDate: new Date(Date.now() + 48 * 60 * 60 * 1000) // 48 hours
        }
      });
      logger.info('Peer reviewer assigned successfully');
    } else {
      throw new Error('No distinguished professionals available for peer review');
    }
  } catch (error) {
    logger.error('Failed to assign peer reviewer:', error);
    throw error;
  }
};

const detectCaseExceptions = async (data) => {
  const exceptions = [];
  
  // Check for orphaned cases
  const orphanedCases = await prisma.medicalCase.findMany({
    where: {
      assignedProfessionalId: null,
      status: { in: ['FILES_UPLOADED', 'QUESTIONNAIRE_COMPLETED', 'PAYMENT_CONFIRMED'] },
      createdAt: { lte: new Date(Date.now() - 24 * 60 * 60 * 1000) }
    }
  });

  // Check for SLA breaches
  const now = new Date();
  for (const [status, sla] of Object.entries(SLA_DEFINITIONS)) {
    const breachedCases = await prisma.medicalCase.findMany({
      where: {
        status: status,
        updatedAt: { lte: new Date(now.getTime() - sla.target) }
      }
    });
    
    if (breachedCases.length > 0) {
      exceptions.push({
        type: 'sla_breach',
        status: status,
        cases: breachedCases,
        severity: 'high'
      });
    }
  }

  // Create exception records
  for (const exception of exceptions) {
    await prisma.caseException.create({
      data: {
        type: exception.type,
        severity: exception.severity,
        description: `${exception.type} detected for status ${exception.status}`,
        affectedCaseIds: exception.cases.map(c => c.id),
        status: 'open',
        detectedAt: new Date()
      }
    });
  }

  logger.info(`Detected ${exceptions.length} case exceptions`);
};

// API Routes

// Health Check
app.get('/health', async (req, res) => {
  try {
    const activeJobs = {
      workflow: await workflowQueue.count(),
      slaMonitoring: await slaMonitoringQueue.count(),
      escalation: await escalationQueue.count()
    };

    res.status(200).json({
      status: 'operational',
      service: 'workflow-engine-service',
      version: '1.0.0',
      features: [
        'workflow-orchestration',
        'sla-monitoring',
        'automatic-escalation',
        'process-automation',
        'job-queue-processing',
        'exception-handling',
        'peer-review-automation',
        'onboarding-workflows'
      ],
      workflows: Object.keys(WORKFLOW_DEFINITIONS),
      activeJobs,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(200).json({
      status: 'operational',
      service: 'workflow-engine-service',
      version: '1.0.0',
      workflows: Object.keys(WORKFLOW_DEFINITIONS),
      activeJobs: { workflow: 0, slaMonitoring: 0, escalation: 0 },
      timestamp: new Date().toISOString()
    });
  }
});

// Trigger Workflow
app.post('/api/v1/workflows/trigger', [
  body('workflowType').isIn(Object.keys(WORKFLOW_DEFINITIONS)),
  body('entityId').isUUID(),
  body('data').isObject()
], authenticateToken, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array(),
        code: 'VALIDATION_ERROR'
      });
    }

    const { workflowType, entityId, data } = req.body;
    const workflowDefinition = WORKFLOW_DEFINITIONS[workflowType];

    // Create workflow instance
    const workflowInstance = await prisma.workflowInstance.create({
      data: {
        id: uuidv4(),
        workflowType: workflowType,
        entityId: entityId,
        status: 'active',
        currentStep: workflowDefinition.steps[0].id,
        stepIndex: 0,
        data: JSON.stringify(data),
        createdAt: new Date(),
        createdBy: req.user.id
      }
    });

    // Add first step to queue
    await workflowQueue.add('execute_step', {
      workflowInstanceId: workflowInstance.id,
      workflowType: workflowType,
      stepId: workflowDefinition.steps[0].id,
      data: data
    }, {
      delay: 0,
      attempts: 3,
      backoff: 'exponential'
    });

    logger.info(`Workflow ${workflowType} triggered for entity ${entityId}`);

    res.status(200).json({
      success: true,
      data: {
        workflowInstanceId: workflowInstance.id,
        workflowType: workflowType,
        currentStep: workflowInstance.currentStep,
        status: workflowInstance.status
      }
    });

  } catch (error) {
    logger.error('Workflow trigger error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to trigger workflow',
      code: 'WORKFLOW_TRIGGER_ERROR'
    });
  }
});

// Get Workflow Status
app.get('/api/v1/workflows/:workflowInstanceId', [
  param('workflowInstanceId').isUUID()
], authenticateToken, async (req, res) => {
  try {
    const { workflowInstanceId } = req.params;

    const workflowInstance = await prisma.workflowInstance.findUnique({
      where: { id: workflowInstanceId },
      include: {
        workflowSteps: {
          orderBy: { startedAt: 'asc' }
        }
      }
    });

    if (!workflowInstance) {
      return res.status(404).json({
        success: false,
        error: 'Workflow instance not found',
        code: 'WORKFLOW_NOT_FOUND'
      });
    }

    const workflowDefinition = WORKFLOW_DEFINITIONS[workflowInstance.workflowType];

    res.status(200).json({
      success: true,
      data: {
        workflowInstance: {
          ...workflowInstance,
          data: JSON.parse(workflowInstance.data || '{}')
        },
        definition: workflowDefinition,
        progress: {
          currentStepIndex: workflowInstance.stepIndex,
          totalSteps: workflowDefinition.steps.length,
          percentage: Math.round((workflowInstance.stepIndex / workflowDefinition.steps.length) * 100)
        }
      }
    });

  } catch (error) {
    logger.error('Workflow status fetch error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch workflow status',
      code: 'WORKFLOW_STATUS_ERROR'
    });
  }
});

// Monitor SLA Compliance
app.get('/api/v1/sla/monitor', authenticateToken, async (req, res) => {
  try {
    const slaStatus = {};
    const now = new Date();

    for (const [status, sla] of Object.entries(SLA_DEFINITIONS)) {
      const warningCases = await prisma.medicalCase.count({
        where: {
          status: status,
          updatedAt: {
            lte: new Date(now.getTime() - sla.warning),
            gt: new Date(now.getTime() - sla.target)
          }
        }
      });

      const breachedCases = await prisma.medicalCase.count({
        where: {
          status: status,
          updatedAt: { lte: new Date(now.getTime() - sla.target) }
        }
      });

      slaStatus[status] = {
        target: sla.target / (60 * 60 * 1000), // Convert to hours
        warning: sla.warning / (60 * 60 * 1000),
        warningCount: warningCases,
        breachedCount: breachedCases,
        compliance: breachedCases === 0 ? 100 : Math.max(0, 100 - (breachedCases * 10))
      };
    }

    const overallCompliance = _.mean(Object.values(slaStatus).map(s => s.compliance));

    res.status(200).json({
      success: true,
      data: {
        overallCompliance: Math.round(overallCompliance),
        statusBreakdown: slaStatus,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    logger.error('SLA monitoring error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to monitor SLA compliance',
      code: 'SLA_MONITORING_ERROR'
    });
  }
});

// Job Queue Processors

// Workflow step processor
workflowQueue.process('execute_step', async (job) => {
  const { workflowInstanceId, workflowType, stepId, data } = job.data;
  
  try {
    // Record step start
    await prisma.workflowStep.create({
      data: {
        workflowInstanceId: workflowInstanceId,
        stepId: stepId,
        status: 'running',
        startedAt: new Date()
      }
    });

    // Execute the step
    await executeWorkflowStep(workflowType, stepId, data);

    // Mark step as completed
    await prisma.workflowStep.updateMany({
      where: {
        workflowInstanceId: workflowInstanceId,
        stepId: stepId
      },
      data: {
        status: 'completed',
        completedAt: new Date()
      }
    });

    // Move to next step
    const workflowDefinition = WORKFLOW_DEFINITIONS[workflowType];
    const workflowInstance = await prisma.workflowInstance.findUnique({
      where: { id: workflowInstanceId }
    });

    const nextStepIndex = workflowInstance.stepIndex + 1;
    
    if (nextStepIndex < workflowDefinition.steps.length) {
      const nextStep = workflowDefinition.steps[nextStepIndex];
      
      await prisma.workflowInstance.update({
        where: { id: workflowInstanceId },
        data: {
          currentStep: nextStep.id,
          stepIndex: nextStepIndex
        }
      });

      // Schedule next step
      await workflowQueue.add('execute_step', {
        workflowInstanceId: workflowInstanceId,
        workflowType: workflowType,
        stepId: nextStep.id,
        data: data
      }, {
        delay: 5000, // 5 second delay between steps
        attempts: 3
      });
    } else {
      // Workflow completed
      await prisma.workflowInstance.update({
        where: { id: workflowInstanceId },
        data: {
          status: 'completed',
          completedAt: new Date()
        }
      });
      logger.info(`Workflow ${workflowType} completed for instance ${workflowInstanceId}`);
    }

  } catch (error) {
    logger.error(`Workflow step failed: ${workflowType}:${stepId}`, error);
    
    await prisma.workflowStep.updateMany({
      where: {
        workflowInstanceId: workflowInstanceId,
        stepId: stepId
      },
      data: {
        status: 'failed',
        error: error.message,
        completedAt: new Date()
      }
    });

    throw error;
  }
});

// SLA monitoring processor  
slaMonitoringQueue.process('check_sla', async (job) => {
  await detectCaseExceptions({});
});

// Scheduled Tasks

// SLA monitoring every 15 minutes
cron.schedule('*/15 * * * *', async () => {
  logger.info('Running SLA compliance check');
  await slaMonitoringQueue.add('check_sla', {}, { attempts: 3 });
});

// Exception detection every hour
cron.schedule('0 * * * *', async () => {
  logger.info('Running case exception detection');
  await workflowQueue.add('execute_step', {
    workflowInstanceId: uuidv4(),
    workflowType: 'case_exception',
    stepId: 'exception_detection',
    data: {}
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`⚡ Workflow Engine Service v1.0 running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🚀 Trigger workflow: POST /api/v1/workflows/trigger`);
  console.log(`📈 Workflow status: GET /api/v1/workflows/{id}`);
  console.log(`⏰ SLA monitoring: GET /api/v1/sla/monitor`);
  console.log(`🔄 Job queues: workflow, sla-monitoring, escalation`);
  console.log(`📋 Supported workflows: ${Object.keys(WORKFLOW_DEFINITIONS).join(', ')}`);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully');
  await workflowQueue.close();
  await slaMonitoringQueue.close();
  await escalationQueue.close();
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('SIGINT received, shutting down gracefully');
  await workflowQueue.close();
  await slaMonitoringQueue.close();
  await escalationQueue.close();
  await prisma.$disconnect();
  process.exit(0);
});
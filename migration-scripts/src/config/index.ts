import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

export const config = {
  // Source Database (SQLite - Original Monolith)
  source: {
    type: 'sqlite' as const,
    database: process.env.SOURCE_DATABASE_PATH || path.join(__dirname, '../../prisma/dev.db'),
  },

  // Target Databases (PostgreSQL - Microservices)
  targets: {
    identity: {
      type: 'postgresql' as const,
      url: process.env.IDENTITY_DATABASE_URL || 'postgresql://postgres:postgres@localhost:5433/secondopinion_identity',
    },
    cases: {
      type: 'postgresql' as const,
      url: process.env.CASES_DATABASE_URL || 'postgresql://postgres:postgres@localhost:5434/secondopinion_cases',
    },
    ai: {
      type: 'postgresql' as const,
      url: process.env.AI_DATABASE_URL || 'postgresql://postgres:postgres@localhost:5435/secondopinion_ai',
    },
    professionals: {
      type: 'postgresql' as const,
      url: process.env.PROFESSIONALS_DATABASE_URL || 'postgresql://postgres:postgres@localhost:5436/secondopinion_professionals',
    },
    notifications: {
      type: 'postgresql' as const,
      url: process.env.NOTIFICATIONS_DATABASE_URL || 'postgresql://postgres:postgres@localhost:5437/secondopinion_notifications',
    },
  },

  // Migration Settings
  migration: {
    batchSize: parseInt(process.env.MIGRATION_BATCH_SIZE || '1000', 10),
    delayMs: parseInt(process.env.MIGRATION_DELAY_MS || '100', 10),
    maxRetries: parseInt(process.env.MIGRATION_MAX_RETRIES || '3', 10),
    backupBeforeMigration: process.env.BACKUP_BEFORE_MIGRATION === 'true',
    dryRun: process.env.DRY_RUN === 'true',
  },

  // Logging
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    file: process.env.LOG_FILE || 'migration.log',
    console: process.env.LOG_CONSOLE !== 'false',
  },

  // Validation
  validation: {
    enabled: process.env.VALIDATION_ENABLED !== 'false',
    strictMode: process.env.STRICT_MODE === 'true',
    tolerancePercentage: parseFloat(process.env.TOLERANCE_PERCENTAGE || '0.1'),
  },

  // Export/Import Settings
  export: {
    outputDir: process.env.EXPORT_OUTPUT_DIR || path.join(__dirname, '../../exports'),
    format: (process.env.EXPORT_FORMAT as 'json' | 'csv' | 'sql') || 'json',
    includeMetadata: process.env.INCLUDE_METADATA !== 'false',
  },

  // Data Transformation Rules
  transformation: {
    // User data transformation
    users: {
      defaultRole: 'user',
      defaultStatus: 'active',
      hashPasswords: true,
      generateCustomerIds: true,
    },

    // Case data transformation
    cases: {
      defaultStatus: 'DRAFT',
      defaultPriority: 'NORMAL',
      generateCaseNumbers: true,
      preserveTimestamps: true,
    },

    // Professional data transformation
    professionals: {
      defaultLevel: 'RESIDENT',
      defaultStatus: 'PENDING_VERIFICATION',
      requireLicense: true,
      generateProfessionalIds: true,
    },

    // Notification preferences
    notifications: {
      defaultEmailEnabled: true,
      defaultSmsEnabled: true,
      defaultPushEnabled: true,
      defaultInAppEnabled: true,
    },
  },

  // Field Mappings (Old Schema -> New Schema)
  fieldMappings: {
    // User/Customer mappings
    user: {
      id: 'id',
      email: 'email',
      firstName: 'firstName',
      lastName: 'lastName',
      phone: 'phone',
      dateOfBirth: 'dateOfBirth',
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },

    // Case mappings
    case: {
      id: 'id',
      title: 'title',
      description: 'description',
      status: 'status',
      priority: 'priority',
      category: 'category',
      patientName: ['firstName', 'lastName'], // Split into separate fields
      patientEmail: 'email',
      patientPhone: 'phone',
      patientDateOfBirth: 'dateOfBirth',
      symptoms: 'chiefComplaint',
      medicalHistory: 'medicalHistory',
      currentMedications: 'currentMedications',
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },

    // Document mappings
    document: {
      id: 'id',
      filename: 'originalName',
      path: 'storagePath',
      type: 'documentType',
      size: 'fileSize',
      uploadedAt: 'createdAt',
    },
  },

  // Data Relationships
  relationships: {
    // How to link data across services
    userToCases: 'customerId', // Link cases to customers via customerId
    caseToDocuments: 'caseId',
    userToPreferences: 'recipientId',
    caseToAnalysis: 'caseId',
    caseToProfessional: 'caseId',
  },

  // Services Configuration (for testing connectivity)
  services: {
    identity: process.env.IDENTITY_SERVICE_URL || 'http://localhost:3001',
    cases: process.env.CASE_SERVICE_URL || 'http://localhost:3002',
    ai: process.env.AI_SERVICE_URL || 'http://localhost:3003',
    professional: process.env.PROFESSIONAL_SERVICE_URL || 'http://localhost:3004',
    notification: process.env.NOTIFICATION_SERVICE_URL || 'http://localhost:3005',
  },
};
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { ConnectionManager } from '../database/connections.js';
import { config } from '../config/index.js';
import { logger, migrationLogger, PerformanceTimer } from '../utils/logger.js';

interface SourceUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  dateOfBirth: string | null;
  password?: string;
  createdAt: string;
  updatedAt: string;
  // Additional fields that might exist in the monolith
  hashedPassword?: string;
  verified?: boolean;
  role?: string;
  status?: string;
  metadata?: string; // JSON string
}

interface TargetUser {
  id: string;
  email: string;
  hashedPassword: string;
  role: string;
  status: string;
  isVerified: boolean;
  twoFactorEnabled: boolean;
  lastLoginAt: Date | null;
  metadata: any;
  createdAt: Date;
  updatedAt: Date;
}

interface TargetCustomer {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  dateOfBirth: Date | null;
  preferredChannel: string;
  metadata: any;
  createdAt: Date;
  updatedAt: Date;
}

export class UserMigrator {
  private connectionManager: ConnectionManager;
  private errors: Array<{ recordId: string; error: string }> = [];
  private migrationStats = {
    totalProcessed: 0,
    usersCreated: 0,
    customersCreated: 0,
    preferencesCreated: 0,
    errors: 0,
    skipped: 0,
  };

  constructor(connectionManager: ConnectionManager) {
    this.connectionManager = connectionManager;
  }

  async migrate(): Promise<void> {
    const timer = new PerformanceTimer('UserMigration');
    const migrationName = 'User Migration';

    try {
      logger.info('Starting user migration process...');

      // Get total count for progress tracking
      const sourceDb = this.connectionManager.getSourceConnection();
      const totalUsers = await sourceDb.count('User'); // Assuming table name is 'User'
      
      if (totalUsers === 0) {
        logger.warn('No users found in source database');
        return;
      }

      migrationLogger.startMigration(migrationName, totalUsers);

      // Migrate users in batches
      let offset = 0;
      const batchSize = config.migration.batchSize;

      while (offset < totalUsers) {
        const batchTimer = new PerformanceTimer(`UserBatch_${offset}`);

        // Fetch batch of users from source
        const sourceUsers = await this.fetchSourceUserBatch(offset, batchSize);
        
        if (sourceUsers.length === 0) {
          break;
        }

        // Process batch
        await this.processBatch(sourceUsers);

        const batchTime = batchTimer.end();
        this.migrationStats.totalProcessed += sourceUsers.length;

        migrationLogger.batchProgress(
          migrationName,
          this.migrationStats.totalProcessed,
          totalUsers,
          batchTime
        );

        offset += batchSize;

        // Add delay between batches if configured
        if (config.migration.delayMs > 0) {
          await new Promise(resolve => setTimeout(resolve, config.migration.delayMs));
        }
      }

      // Create notification preferences for all migrated users
      await this.createNotificationPreferences();

      const totalTime = timer.end();
      migrationLogger.migrationComplete(migrationName, totalUsers, totalTime, this.errors.length);

      // Log migration statistics
      logger.info('User migration completed', {
        stats: this.migrationStats,
        errors: this.errors.length,
        errorRate: `${((this.errors.length / totalUsers) * 100).toFixed(2)}%`,
      });

      // Log errors if any
      if (this.errors.length > 0) {
        logger.warn('Migration completed with errors', {
          errorCount: this.errors.length,
          errors: this.errors.slice(0, 10), // Log first 10 errors
        });
      }

    } catch (error) {
      logger.error('User migration failed', {
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        stats: this.migrationStats,
      });
      throw error;
    }
  }

  private async fetchSourceUserBatch(offset: number, limit: number): Promise<SourceUser[]> {
    const sourceDb = this.connectionManager.getSourceConnection();
    
    const sql = `
      SELECT 
        id, email, firstName, lastName, phone, dateOfBirth,
        password, hashedPassword, verified, role, status,
        createdAt, updatedAt
      FROM User 
      ORDER BY createdAt ASC 
      LIMIT ? OFFSET ?
    `;

    return sourceDb.query<SourceUser>(sql, [limit, offset]);
  }

  private async processBatch(sourceUsers: SourceUser[]): Promise<void> {
    const identityDb = this.connectionManager.getTargetConnection('identity');

    for (const sourceUser of sourceUsers) {
      try {
        await this.migrateUser(sourceUser);
      } catch (error) {
        this.migrationStats.errors++;
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        
        this.errors.push({
          recordId: sourceUser.id,
          error: errorMessage,
        });

        migrationLogger.migrationError('UserMigration', error as Error, sourceUser.id);

        // Continue with next user unless in strict mode
        if (!config.validation.strictMode) {
          continue;
        } else {
          throw error;
        }
      }
    }
  }

  private async migrateUser(sourceUser: SourceUser): Promise<void> {
    const identityDb = this.connectionManager.getTargetConnection('identity');

    // Check if user already exists
    const existingUser = await identityDb.queryFirst(
      'SELECT id FROM users WHERE email = $1',
      [sourceUser.email]
    );

    if (existingUser) {
      logger.debug('User already exists, skipping', { email: sourceUser.email });
      this.migrationStats.skipped++;
      return;
    }

    if (config.migration.dryRun) {
      logger.info('DRY RUN: Would migrate user', { email: sourceUser.email });
      return;
    }

    try {
      await identityDb.beginTransaction();

      // 1. Create user in Identity Service
      const targetUser = await this.transformAndCreateUser(sourceUser);
      this.migrationStats.usersCreated++;

      // 2. Create customer in Identity Service
      const targetCustomer = await this.transformAndCreateCustomer(sourceUser, targetUser.id);
      this.migrationStats.customersCreated++;

      await identityDb.commitTransaction();

      migrationLogger.dataTransformation('UserMigration', 'UserCreated', sourceUser.id, {
        userId: targetUser.id,
        customerId: targetCustomer.id,
        email: sourceUser.email,
      });

    } catch (error) {
      await identityDb.rollbackTransaction();
      throw error;
    }
  }

  private async transformAndCreateUser(sourceUser: SourceUser): Promise<TargetUser> {
    const identityDb = this.connectionManager.getTargetConnection('identity');

    // Hash password if not already hashed
    let hashedPassword = sourceUser.hashedPassword;
    if (!hashedPassword && sourceUser.password) {
      hashedPassword = await bcrypt.hash(sourceUser.password, 12);
    } else if (!hashedPassword) {
      // Generate a random password for users without passwords
      const randomPassword = uuidv4();
      hashedPassword = await bcrypt.hash(randomPassword, 12);
      logger.warn('Generated random password for user without password', {
        userId: sourceUser.id,
        email: sourceUser.email,
      });
    }

    // Parse metadata if exists
    let metadata = {};
    if (sourceUser.metadata) {
      try {
        metadata = JSON.parse(sourceUser.metadata);
      } catch (error) {
        logger.warn('Failed to parse user metadata', {
          userId: sourceUser.id,
          metadata: sourceUser.metadata,
        });
      }
    }

    const targetUser: Omit<TargetUser, 'id'> = {
      email: sourceUser.email,
      hashedPassword,
      role: sourceUser.role || config.transformation.users.defaultRole,
      status: sourceUser.status || config.transformation.users.defaultStatus,
      isVerified: sourceUser.verified ?? true,
      twoFactorEnabled: false,
      lastLoginAt: null,
      metadata,
      createdAt: new Date(sourceUser.createdAt),
      updatedAt: new Date(sourceUser.updatedAt),
    };

    const createdUser = await identityDb.insert<TargetUser>('users', targetUser);
    return createdUser;
  }

  private async transformAndCreateCustomer(sourceUser: SourceUser, userId: string): Promise<TargetCustomer> {
    const identityDb = this.connectionManager.getTargetConnection('identity');

    // Parse date of birth
    let dateOfBirth: Date | null = null;
    if (sourceUser.dateOfBirth) {
      dateOfBirth = new Date(sourceUser.dateOfBirth);
      if (isNaN(dateOfBirth.getTime())) {
        dateOfBirth = null;
        logger.warn('Invalid date of birth, setting to null', {
          userId: sourceUser.id,
          dateOfBirth: sourceUser.dateOfBirth,
        });
      }
    }

    const targetCustomer: Omit<TargetCustomer, 'id'> = {
      userId,
      firstName: sourceUser.firstName,
      lastName: sourceUser.lastName,
      email: sourceUser.email,
      phone: sourceUser.phone,
      dateOfBirth,
      preferredChannel: 'EMAIL', // Default communication channel
      metadata: {},
      createdAt: new Date(sourceUser.createdAt),
      updatedAt: new Date(sourceUser.updatedAt),
    };

    const createdCustomer = await identityDb.insert<TargetCustomer>('customers', targetCustomer);
    return createdCustomer;
  }

  private async createNotificationPreferences(): Promise<void> {
    const identityDb = this.connectionManager.getTargetConnection('identity');
    const notificationDb = this.connectionManager.getTargetConnection('notifications');

    logger.info('Creating notification preferences for migrated users...');

    // Get all customers from identity service
    const customers = await identityDb.query<{ id: string; email: string; phone: string | null }>(
      'SELECT id, email, phone FROM customers'
    );

    for (const customer of customers) {
      try {
        // Check if preferences already exist
        const existingPrefs = await notificationDb.queryFirst(
          'SELECT id FROM recipient_preferences WHERE recipient_id = $1 AND recipient_type = $2',
          [customer.id, 'CUSTOMER']
        );

        if (!existingPrefs) {
          const preferences = {
            recipient_id: customer.id,
            recipient_type: 'CUSTOMER',
            email_enabled: config.transformation.notifications.defaultEmailEnabled,
            sms_enabled: config.transformation.notifications.defaultSmsEnabled,
            push_enabled: config.transformation.notifications.defaultPushEnabled,
            in_app_enabled: config.transformation.notifications.defaultInAppEnabled,
            case_updates: true,
            assignments: true,
            reminders: true,
            system_alerts: true,
            marketing: false,
            security_alerts: true,
            billing: true,
            primary_email: customer.email,
            primary_phone: customer.phone,
            created_at: new Date(),
            updated_at: new Date(),
          };

          await notificationDb.insert('recipient_preferences', preferences);
          this.migrationStats.preferencesCreated++;
        }
      } catch (error) {
        logger.error('Failed to create notification preferences', {
          customerId: customer.id,
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    }

    logger.info('Notification preferences created', {
      count: this.migrationStats.preferencesCreated,
    });
  }

  getMigrationStats() {
    return { ...this.migrationStats };
  }

  getErrors() {
    return [...this.errors];
  }
}
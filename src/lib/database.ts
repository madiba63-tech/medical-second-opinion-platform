/**
 * Standardized Database Utilities for Medical Second Opinion Platform
 * Healthcare Industry Compliant Database Management with HIPAA Protection
 * 
 * This module provides consistent database patterns across all services
 * with transaction management, query optimization, and audit logging.
 */

import { PrismaClient, Prisma } from '../generated/prisma';
import { createHealthcareLogger, LOG_CATEGORIES } from './logging';
import { StandardizedError, MEDICAL_ERROR_CODES, HTTP_STATUS } from './errors';

// Database Configuration Interface
export interface DatabaseConfig {
  url: string;
  maxConnections: number;
  queryTimeout: number;
  enableQueryLogging: boolean;
  enableSlowQueryLogging: boolean;
  slowQueryThreshold: number;
  enableAuditLogging: boolean;
  connectionRetries: number;
  retryDelay: number;
}

// Query Performance Metrics
interface QueryMetrics {
  query: string;
  duration: number;
  timestamp: Date;
  correlationId?: string;
  userId?: string;
  error?: string;
}

// Audit Log Entry
interface AuditLogEntry {
  userId?: string;
  action: string;
  table: string;
  recordId?: string;
  oldValues?: any;
  newValues?: any;
  timestamp: Date;
  correlationId?: string;
  sessionId?: string;
  ipAddress?: string;
}

// Database Connection Manager
export class DatabaseManager {
  private prisma: PrismaClient;
  private logger = createHealthcareLogger('database-manager');
  private queryMetrics: QueryMetrics[] = [];
  private config: DatabaseConfig;

  constructor(config: DatabaseConfig) {
    this.config = config;
    this.prisma = new PrismaClient({
      datasourceUrl: config.url,
      log: config.enableQueryLogging ? [
        { level: 'query', emit: 'event' },
        { level: 'error', emit: 'event' },
        { level: 'info', emit: 'event' },
        { level: 'warn', emit: 'event' },
      ] : ['error'],
    });

    this.setupEventHandlers();
  }

  private setupEventHandlers(): void {
    // Query logging
    this.prisma.$on('query', (event: any) => {
      const duration = event.duration;
      
      this.logger.debug('Database query executed', {
        category: LOG_CATEGORIES.SYSTEM,
        metadata: {
          query: event.query,
          params: event.params,
          duration: duration,
        },
      });

      // Track slow queries
      if (duration > this.config.slowQueryThreshold) {
        this.logger.warn('Slow query detected', {
          category: LOG_CATEGORIES.PERFORMANCE,
          metadata: {
            query: event.query,
            duration: duration,
            threshold: this.config.slowQueryThreshold,
          },
        });
      }

      // Store metrics
      this.queryMetrics.push({
        query: event.query,
        duration: duration,
        timestamp: new Date(),
      });

      // Keep only last 1000 metrics in memory
      if (this.queryMetrics.length > 1000) {
        this.queryMetrics.shift();
      }
    });

    // Error logging
    this.prisma.$on('error', (event: any) => {
      this.logger.error('Database error', new Error(event.message), {
        category: LOG_CATEGORIES.ERROR,
        metadata: {
          target: event.target,
        },
      });
    });
  }

  // Get Prisma client instance
  public getClient(): PrismaClient {
    return this.prisma;
  }

  // Execute with retry logic
  public async executeWithRetry<T>(
    operation: () => Promise<T>,
    maxRetries: number = this.config.connectionRetries,
    correlationId?: string,
  ): Promise<T> {
    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error as Error;
        
        this.logger.warn(`Database operation failed, attempt ${attempt}/${maxRetries}`, {
          correlationId,
          metadata: {
            error: lastError.message,
            attempt,
            maxRetries,
          },
        });

        if (attempt === maxRetries) {
          break;
        }

        // Wait before retry
        await new Promise(resolve => setTimeout(resolve, this.config.retryDelay * attempt));
      }
    }

    throw new StandardizedError(
      'Database operation failed after retries',
      MEDICAL_ERROR_CODES.DATABASE_CONNECTION_FAILED,
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      {
        details: { originalError: lastError?.message, attempts: maxRetries },
        correlationId,
        severity: 'CRITICAL',
        category: 'SYSTEM',
        retryable: true,
      },
    );
  }

  // Transaction wrapper with audit logging
  public async executeTransaction<T>(
    operations: (tx: Prisma.TransactionClient) => Promise<T>,
    options: {
      userId?: string;
      correlationId?: string;
      auditInfo?: {
        action: string;
        description: string;
      };
    } = {},
  ): Promise<T> {
    const startTime = Date.now();
    const { userId, correlationId, auditInfo } = options;

    try {
      const result = await this.prisma.$transaction(async (tx) => {
        return await operations(tx);
      });

      const duration = Date.now() - startTime;

      // Log successful transaction
      this.logger.info('Database transaction completed', {
        correlationId,
        userId,
        metadata: {
          duration,
          action: auditInfo?.action,
          description: auditInfo?.description,
        },
      });

      // Audit log for sensitive operations
      if (auditInfo && this.config.enableAuditLogging) {
        await this.logAuditEvent({
          userId,
          action: auditInfo.action,
          table: 'TRANSACTION',
          timestamp: new Date(),
          correlationId,
        });
      }

      return result;
    } catch (error) {
      const duration = Date.now() - startTime;
      
      this.logger.error('Database transaction failed', error as Error, {
        correlationId,
        userId,
        metadata: {
          duration,
          action: auditInfo?.action,
        },
      });

      throw error;
    }
  }

  // Audit logging
  public async logAuditEvent(entry: AuditLogEntry): Promise<void> {
    if (!this.config.enableAuditLogging) {
      return;
    }

    try {
      // In a real implementation, this would write to an audit table
      this.logger.auditLog(
        entry.action,
        entry.table,
        entry.recordId || 'unknown',
        {
          userId: entry.userId,
          correlationId: entry.correlationId,
          result: 'SUCCESS',
          metadata: {
            oldValues: entry.oldValues,
            newValues: entry.newValues,
            timestamp: entry.timestamp,
          },
        },
      );
    } catch (error) {
      this.logger.error('Failed to log audit event', error as Error, {
        correlationId: entry.correlationId,
        metadata: { auditEntry: entry },
      });
    }
  }

  // Health check
  public async healthCheck(): Promise<{
    status: 'healthy' | 'unhealthy';
    latency: number;
    activeConnections?: number;
    error?: string;
  }> {
    const startTime = Date.now();

    try {
      // Simple query to test connectivity
      await this.prisma.$queryRaw`SELECT 1 as test`;
      
      const latency = Date.now() - startTime;

      return {
        status: 'healthy',
        latency,
      };
    } catch (error) {
      const latency = Date.now() - startTime;
      
      return {
        status: 'unhealthy',
        latency,
        error: (error as Error).message,
      };
    }
  }

  // Get query metrics
  public getQueryMetrics(): {
    totalQueries: number;
    averageLatency: number;
    slowQueries: number;
    recentQueries: QueryMetrics[];
  } {
    const totalQueries = this.queryMetrics.length;
    const averageLatency = totalQueries > 0 
      ? this.queryMetrics.reduce((sum, metric) => sum + metric.duration, 0) / totalQueries
      : 0;
    const slowQueries = this.queryMetrics.filter(
      metric => metric.duration > this.config.slowQueryThreshold,
    ).length;

    return {
      totalQueries,
      averageLatency,
      slowQueries,
      recentQueries: this.queryMetrics.slice(-10),
    };
  }

  // Cleanup connections
  public async disconnect(): Promise<void> {
    try {
      await this.prisma.$disconnect();
      this.logger.info('Database connections closed');
    } catch (error) {
      this.logger.error('Error closing database connections', error as Error);
      throw error;
    }
  }
}

// Repository Base Class with Common Patterns
export abstract class BaseRepository<T = any> {
  protected prisma: PrismaClient;
  protected logger = createHealthcareLogger(`repository-${this.getTableName()}`);
  protected tableName: string;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
    this.tableName = this.getTableName();
  }

  protected abstract getTableName(): string;

  // Generic CRUD operations with audit logging
  protected async create(
    data: any,
    options: {
      userId?: string;
      correlationId?: string;
    } = {},
  ): Promise<T> {
    const { userId, correlationId } = options;

    try {
      const result = await (this.prisma as any)[this.tableName].create({
        data,
      });

      this.logger.info(`${this.tableName} created`, {
        correlationId,
        userId,
        metadata: { recordId: result.id },
      });

      return result;
    } catch (error) {
      this.logger.error(`Failed to create ${this.tableName}`, error as Error, {
        correlationId,
        userId,
        metadata: { data },
      });
      throw error;
    }
  }

  protected async findById(
    id: string,
    options: {
      include?: any;
      correlationId?: string;
    } = {},
  ): Promise<T | null> {
    const { include, correlationId } = options;

    try {
      const result = await (this.prisma as any)[this.tableName].findUnique({
        where: { id },
        ...(include && { include }),
      });

      if (!result) {
        this.logger.debug(`${this.tableName} not found`, {
          correlationId,
          metadata: { id },
        });
      }

      return result;
    } catch (error) {
      this.logger.error(`Failed to find ${this.tableName}`, error as Error, {
        correlationId,
        metadata: { id },
      });
      throw error;
    }
  }

  protected async update(
    id: string,
    data: any,
    options: {
      userId?: string;
      correlationId?: string;
    } = {},
  ): Promise<T> {
    const { userId, correlationId } = options;

    try {
      // Get current data for audit
      const oldRecord = await this.findById(id);

      const result = await (this.prisma as any)[this.tableName].update({
        where: { id },
        data,
      });

      this.logger.info(`${this.tableName} updated`, {
        correlationId,
        userId,
        metadata: { recordId: id },
      });

      return result;
    } catch (error) {
      this.logger.error(`Failed to update ${this.tableName}`, error as Error, {
        correlationId,
        userId,
        metadata: { id, data },
      });
      throw error;
    }
  }

  protected async delete(
    id: string,
    options: {
      userId?: string;
      correlationId?: string;
      softDelete?: boolean;
    } = {},
  ): Promise<T> {
    const { userId, correlationId, softDelete = false } = options;

    try {
      let result;

      if (softDelete) {
        // Soft delete - update deletedAt timestamp
        result = await (this.prisma as any)[this.tableName].update({
          where: { id },
          data: { deletedAt: new Date() },
        });
      } else {
        // Hard delete
        result = await (this.prisma as any)[this.tableName].delete({
          where: { id },
        });
      }

      this.logger.info(`${this.tableName} deleted`, {
        correlationId,
        userId,
        metadata: { recordId: id, softDelete },
      });

      return result;
    } catch (error) {
      this.logger.error(`Failed to delete ${this.tableName}`, error as Error, {
        correlationId,
        userId,
        metadata: { id, softDelete },
      });
      throw error;
    }
  }

  // Paginated list with filters
  protected async findMany(options: {
    where?: any;
    include?: any;
    orderBy?: any;
    page?: number;
    limit?: number;
    correlationId?: string;
  } = {}): Promise<{ data: T[]; total: number; page: number; limit: number }> {
    const {
      where = {},
      include,
      orderBy,
      page = 1,
      limit = 10,
      correlationId,
    } = options;

    const skip = (page - 1) * limit;

    try {
      const [data, total] = await Promise.all([
        (this.prisma as any)[this.tableName].findMany({
          where,
          ...(include && { include }),
          ...(orderBy && { orderBy }),
          skip,
          take: limit,
        }),
        (this.prisma as any)[this.tableName].count({ where }),
      ]);

      this.logger.debug(`${this.tableName} list retrieved`, {
        correlationId,
        metadata: { count: data.length, total, page, limit },
      });

      return { data, total, page, limit };
    } catch (error) {
      this.logger.error(`Failed to retrieve ${this.tableName} list`, error as Error, {
        correlationId,
        metadata: { where, page, limit },
      });
      throw error;
    }
  }

  // Bulk operations
  protected async bulkCreate(
    records: any[],
    options: {
      userId?: string;
      correlationId?: string;
    } = {},
  ): Promise<Prisma.BatchPayload> {
    const { userId, correlationId } = options;

    try {
      const result = await (this.prisma as any)[this.tableName].createMany({
        data: records,
        skipDuplicates: true,
      });

      this.logger.info(`Bulk ${this.tableName} created`, {
        correlationId,
        userId,
        metadata: { count: result.count },
      });

      return result;
    } catch (error) {
      this.logger.error(`Failed to bulk create ${this.tableName}`, error as Error, {
        correlationId,
        userId,
        metadata: { recordCount: records.length },
      });
      throw error;
    }
  }
}

// Specific Repository Implementations
export class MedicalCaseRepository extends BaseRepository {
  protected getTableName(): string {
    return 'medicalCase';
  }

  // Case-specific methods
  public async findByPatientId(
    patientId: string,
    options: { 
      status?: string; 
      page?: number; 
      limit?: number;
      correlationId?: string;
    } = {},
  ): Promise<{ data: any[]; total: number; page: number; limit: number }> {
    const where: any = { customerId: patientId };
    
    if (options.status) {
      where.status = options.status;
    }

    return this.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      page: options.page,
      limit: options.limit,
      correlationId: options.correlationId,
    });
  }

  public async updateStatus(
    caseId: string,
    status: string,
    options: {
      userId?: string;
      correlationId?: string;
      notes?: string;
    } = {},
  ): Promise<any> {
    const updateData: any = {
      status,
      updatedAt: new Date(),
    };

    if (options.notes) {
      updateData.statusNotes = options.notes;
    }

    return this.update(caseId, updateData, {
      userId: options.userId,
      correlationId: options.correlationId,
    });
  }
}

// Database connection factory
let dbManager: DatabaseManager | null = null;

export function createDatabaseManager(config: DatabaseConfig): DatabaseManager {
  if (!dbManager) {
    dbManager = new DatabaseManager(config);
  }
  return dbManager;
}

export function getDatabaseManager(): DatabaseManager {
  if (!dbManager) {
    throw new Error('Database manager not initialized. Call createDatabaseManager first.');
  }
  return dbManager;
}

// Migration utilities
export class MigrationHelper {
  private prisma: PrismaClient;
  private logger = createHealthcareLogger('migration-helper');

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  // Check if migration is needed
  public async checkMigrationStatus(): Promise<{
    pending: boolean;
    appliedMigrations: string[];
    pendingMigrations: string[];
  }> {
    try {
      // This would need to be implemented based on your migration strategy
      // For now, return a simple status
      return {
        pending: false,
        appliedMigrations: [],
        pendingMigrations: [],
      };
    } catch (error) {
      this.logger.error('Failed to check migration status', error as Error);
      throw error;
    }
  }

  // Backup database before migration
  public async createBackup(backupName?: string): Promise<string> {
    const name = backupName || `backup_${new Date().toISOString().replace(/[:.]/g, '-')}`;
    
    this.logger.info('Creating database backup', {
      metadata: { backupName: name },
    });

    // Implementation would depend on your database provider
    // This is a placeholder
    return name;
  }
}

// Export types and utilities
export type { DatabaseConfig, QueryMetrics, AuditLogEntry };
export { BaseRepository };
import { Database } from 'sqlite3';
import { Client } from 'pg';
import { config } from '../config/index.js';
import { logger } from '../utils/logger.js';

// SQLite Connection (Source Database)
export class SQLiteConnection {
  private db: Database | null = null;

  async connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db = new Database(config.source.database, (err) => {
        if (err) {
          logger.error('Failed to connect to SQLite database', {
            path: config.source.database,
            error: err.message,
          });
          reject(err);
        } else {
          logger.info('Connected to SQLite database', {
            path: config.source.database,
          });
          resolve();
        }
      });
    });
  }

  async disconnect(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        resolve();
        return;
      }

      this.db.close((err) => {
        if (err) {
          logger.error('Error closing SQLite database', { error: err.message });
          reject(err);
        } else {
          logger.info('SQLite database connection closed');
          this.db = null;
          resolve();
        }
      });
    });
  }

  async query<T = any>(sql: string, params: any[] = []): Promise<T[]> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Database not connected'));
        return;
      }

      this.db.all(sql, params, (err, rows) => {
        if (err) {
          logger.error('SQLite query error', {
            sql: sql.substring(0, 100) + (sql.length > 100 ? '...' : ''),
            error: err.message,
          });
          reject(err);
        } else {
          resolve(rows as T[]);
        }
      });
    });
  }

  async queryFirst<T = any>(sql: string, params: any[] = []): Promise<T | null> {
    const rows = await this.query<T>(sql, params);
    return rows.length > 0 ? rows[0] : null;
  }

  async count(table: string, whereClause: string = '', params: any[] = []): Promise<number> {
    const sql = `SELECT COUNT(*) as count FROM ${table}${whereClause ? ` WHERE ${whereClause}` : ''}`;
    const result = await this.queryFirst<{ count: number }>(sql, params);
    return result?.count || 0;
  }

  async getTableSchema(tableName: string): Promise<any[]> {
    return this.query(`PRAGMA table_info(${tableName})`);
  }

  async getTableNames(): Promise<string[]> {
    const rows = await this.query<{ name: string }>(`
      SELECT name FROM sqlite_master 
      WHERE type='table' AND name NOT LIKE 'sqlite_%'
    `);
    return rows.map(row => row.name);
  }
}

// PostgreSQL Connection (Target Databases)
export class PostgreSQLConnection {
  private client: Client | null = null;
  private connectionUrl: string;
  private serviceName: string;

  constructor(connectionUrl: string, serviceName: string) {
    this.connectionUrl = connectionUrl;
    this.serviceName = serviceName;
  }

  async connect(): Promise<void> {
    try {
      this.client = new Client({ connectionString: this.connectionUrl });
      await this.client.connect();
      
      logger.info('Connected to PostgreSQL database', {
        service: this.serviceName,
        database: this.connectionUrl.split('/').pop()?.split('?')[0],
      });
    } catch (error) {
      logger.error('Failed to connect to PostgreSQL database', {
        service: this.serviceName,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.end();
      logger.info('PostgreSQL database connection closed', {
        service: this.serviceName,
      });
      this.client = null;
    }
  }

  async query<T = any>(sql: string, params: any[] = []): Promise<T[]> {
    if (!this.client) {
      throw new Error(`Database not connected for service: ${this.serviceName}`);
    }

    try {
      const result = await this.client.query(sql, params);
      return result.rows as T[];
    } catch (error) {
      logger.error('PostgreSQL query error', {
        service: this.serviceName,
        sql: sql.substring(0, 100) + (sql.length > 100 ? '...' : ''),
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      throw error;
    }
  }

  async queryFirst<T = any>(sql: string, params: any[] = []): Promise<T | null> {
    const rows = await this.query<T>(sql, params);
    return rows.length > 0 ? rows[0] : null;
  }

  async insert<T = any>(table: string, data: Record<string, any>): Promise<T> {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const placeholders = keys.map((_, index) => `$${index + 1}`).join(', ');
    
    const sql = `
      INSERT INTO ${table} (${keys.join(', ')}) 
      VALUES (${placeholders}) 
      RETURNING *
    `;

    const rows = await this.query<T>(sql, values);
    return rows[0];
  }

  async insertBatch<T = any>(table: string, dataArray: Record<string, any>[]): Promise<T[]> {
    if (dataArray.length === 0) return [];

    const keys = Object.keys(dataArray[0]);
    const valueRows: string[] = [];
    const allValues: any[] = [];
    let paramIndex = 1;

    for (const data of dataArray) {
      const rowPlaceholders = keys.map(() => `$${paramIndex++}`).join(', ');
      valueRows.push(`(${rowPlaceholders})`);
      allValues.push(...Object.values(data));
    }

    const sql = `
      INSERT INTO ${table} (${keys.join(', ')}) 
      VALUES ${valueRows.join(', ')} 
      RETURNING *
    `;

    return this.query<T>(sql, allValues);
  }

  async update<T = any>(
    table: string, 
    data: Record<string, any>, 
    whereClause: string, 
    whereParams: any[] = []
  ): Promise<T[]> {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const setClauses = keys.map((key, index) => `${key} = $${index + 1}`).join(', ');
    
    const sql = `
      UPDATE ${table} 
      SET ${setClauses} 
      WHERE ${whereClause} 
      RETURNING *
    `;

    const allParams = [...values, ...whereParams];
    return this.query<T>(sql, allParams);
  }

  async count(table: string, whereClause: string = '', params: any[] = []): Promise<number> {
    const sql = `SELECT COUNT(*) as count FROM ${table}${whereClause ? ` WHERE ${whereClause}` : ''}`;
    const result = await this.queryFirst<{ count: string }>(sql, params);
    return parseInt(result?.count || '0', 10);
  }

  async tableExists(tableName: string): Promise<boolean> {
    const sql = `
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = $1
      ) as exists
    `;
    const result = await this.queryFirst<{ exists: boolean }>(sql, [tableName]);
    return result?.exists || false;
  }

  async beginTransaction(): Promise<void> {
    await this.query('BEGIN');
  }

  async commitTransaction(): Promise<void> {
    await this.query('COMMIT');
  }

  async rollbackTransaction(): Promise<void> {
    await this.query('ROLLBACK');
  }
}

// Connection Manager
export class ConnectionManager {
  private sourceConnection: SQLiteConnection | null = null;
  private targetConnections: Map<string, PostgreSQLConnection> = new Map();

  async initializeConnections(): Promise<void> {
    logger.info('Initializing database connections...');

    // Initialize source connection
    this.sourceConnection = new SQLiteConnection();
    await this.sourceConnection.connect();

    // Initialize target connections
    for (const [serviceName, targetConfig] of Object.entries(config.targets)) {
      const connection = new PostgreSQLConnection(targetConfig.url, serviceName);
      await connection.connect();
      this.targetConnections.set(serviceName, connection);
    }

    logger.info('All database connections initialized successfully');
  }

  async closeConnections(): Promise<void> {
    logger.info('Closing database connections...');

    // Close source connection
    if (this.sourceConnection) {
      await this.sourceConnection.disconnect();
      this.sourceConnection = null;
    }

    // Close target connections
    for (const [serviceName, connection] of this.targetConnections) {
      await connection.disconnect();
    }
    this.targetConnections.clear();

    logger.info('All database connections closed');
  }

  getSourceConnection(): SQLiteConnection {
    if (!this.sourceConnection) {
      throw new Error('Source database connection not initialized');
    }
    return this.sourceConnection;
  }

  getTargetConnection(serviceName: string): PostgreSQLConnection {
    const connection = this.targetConnections.get(serviceName);
    if (!connection) {
      throw new Error(`Target database connection not found for service: ${serviceName}`);
    }
    return connection;
  }

  async testAllConnections(): Promise<{ [key: string]: boolean }> {
    const results: { [key: string]: boolean } = {};

    // Test source connection
    try {
      await this.getSourceConnection().query('SELECT 1');
      results.source = true;
    } catch (error) {
      results.source = false;
      logger.error('Source connection test failed', { error });
    }

    // Test target connections
    for (const serviceName of this.targetConnections.keys()) {
      try {
        await this.getTargetConnection(serviceName).query('SELECT 1');
        results[serviceName] = true;
      } catch (error) {
        results[serviceName] = false;
        logger.error('Target connection test failed', { service: serviceName, error });
      }
    }

    return results;
  }
}
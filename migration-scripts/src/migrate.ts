#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import inquirer from 'inquirer';
import { ConnectionManager } from './database/connections.js';
import { UserMigrator } from './migrators/UserMigrator.js';
import { logger, migrationLogger, PerformanceTimer } from './utils/logger.js';
import { config } from './config/index.js';

const program = new Command();

program
  .version('1.0.0')
  .description('Second Opinion Platform - Data Migration Tool')
  .option('-d, --dry-run', 'Perform a dry run without making changes')
  .option('-v, --verbose', 'Enable verbose logging')
  .option('-f, --force', 'Skip confirmation prompts')
  .option('-s, --service <service>', 'Migrate specific service only (identity, cases, ai, professionals, notifications)')
  .option('--skip-validation', 'Skip data validation')
  .option('--batch-size <size>', 'Override default batch size', '1000')
  .parse(process.argv);

const options = program.opts();

async function main() {
  console.log(chalk.blue.bold('Second Opinion Platform - Data Migration Tool'));
  console.log(chalk.gray('Migrating from SQLite monolith to PostgreSQL microservices\n'));

  // Override config with command line options
  if (options.dryRun) {
    config.migration.dryRun = true;
    console.log(chalk.yellow('DRY RUN MODE: No changes will be made\n'));
  }

  if (options.verbose) {
    config.logging.level = 'debug';
  }

  if (options.batchSize) {
    config.migration.batchSize = parseInt(options.batchSize, 10);
  }

  if (options.skipValidation) {
    config.validation.enabled = false;
  }

  const connectionManager = new ConnectionManager();
  const totalTimer = new PerformanceTimer('TotalMigration');

  try {
    // Initialize database connections
    console.log(chalk.blue('Initializing database connections...'));
    await connectionManager.initializeConnections();

    // Test all connections
    console.log(chalk.blue('Testing database connections...'));
    const connectionTests = await connectionManager.testAllConnections();
    
    for (const [name, success] of Object.entries(connectionTests)) {
      if (success) {
        console.log(chalk.green(`✓ ${name} database connection: OK`));
      } else {
        console.log(chalk.red(`✗ ${name} database connection: FAILED`));
      }
    }

    const failedConnections = Object.entries(connectionTests).filter(([_, success]) => !success);
    if (failedConnections.length > 0) {
      console.log(chalk.red('\nSome database connections failed. Please check your configuration.'));
      process.exit(1);
    }

    // Display migration configuration
    console.log(chalk.blue('\nMigration Configuration:'));
    console.log(`  Batch Size: ${config.migration.batchSize}`);
    console.log(`  Delay between batches: ${config.migration.delayMs}ms`);
    console.log(`  Max retries: ${config.migration.maxRetries}`);
    console.log(`  Dry run: ${config.migration.dryRun ? 'Yes' : 'No'}`);
    console.log(`  Validation enabled: ${config.validation.enabled ? 'Yes' : 'No'}`);
    console.log(`  Strict mode: ${config.validation.strictMode ? 'Yes' : 'No'}`);

    // Get source database statistics
    console.log(chalk.blue('\nSource Database Statistics:'));
    const sourceStats = await getSourceDatabaseStats(connectionManager);
    for (const [table, count] of Object.entries(sourceStats)) {
      console.log(`  ${table}: ${count} records`);
    }

    const totalRecords = Object.values(sourceStats).reduce((sum, count) => sum + count, 0);
    console.log(chalk.bold(`  Total: ${totalRecords} records\n`));

    // Confirmation prompt (unless --force is used)
    if (!options.force && !config.migration.dryRun) {
      const answers = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'proceed',
          message: 'Do you want to proceed with the migration?',
          default: false,
        },
      ]);

      if (!answers.proceed) {
        console.log(chalk.yellow('Migration cancelled by user.'));
        process.exit(0);
      }
    }

    // Start migration process
    console.log(chalk.green('\nStarting migration process...\n'));

    const migrationResults = {
      users: { success: false, stats: null, error: null },
      // Add other migrators here as they're implemented
    };

    // 1. Migrate Users (Identity Service)
    if (!options.service || options.service === 'identity') {
      console.log(chalk.blue('Migrating users and customers...'));
      try {
        const userMigrator = new UserMigrator(connectionManager);
        await userMigrator.migrate();
        migrationResults.users.success = true;
        migrationResults.users.stats = userMigrator.getMigrationStats();
        console.log(chalk.green('✓ User migration completed successfully\n'));
      } catch (error) {
        migrationResults.users.error = error instanceof Error ? error.message : 'Unknown error';
        console.log(chalk.red('✗ User migration failed\n'));
        if (config.validation.strictMode) {
          throw error;
        }
      }
    }

    // TODO: Add other service migrations
    // 2. Migrate Cases (Case Management Service)
    // 3. Migrate AI Analysis (AI Analysis Service) 
    // 4. Migrate Professionals (Professional Service)
    // 5. Migrate Notifications (Notification Service)

    // Generate migration report
    const totalTime = totalTimer.end();
    await generateMigrationReport(migrationResults, totalTime);

    console.log(chalk.green.bold('\nMigration process completed!'));
    console.log(chalk.gray(`Total time: ${totalTime}ms`));

  } catch (error) {
    logger.error('Migration process failed', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    });

    console.log(chalk.red.bold('\nMigration process failed!'));
    console.log(chalk.red(error instanceof Error ? error.message : 'Unknown error'));
    process.exit(1);

  } finally {
    // Always close database connections
    try {
      await connectionManager.closeConnections();
    } catch (error) {
      logger.error('Error closing database connections', { error });
    }
  }
}

async function getSourceDatabaseStats(connectionManager: ConnectionManager): Promise<Record<string, number>> {
  const sourceDb = connectionManager.getSourceConnection();
  const stats: Record<string, number> = {};

  try {
    // Get all table names
    const tableNames = await sourceDb.getTableNames();
    
    for (const tableName of tableNames) {
      try {
        const count = await sourceDb.count(tableName);
        stats[tableName] = count;
      } catch (error) {
        logger.warn(`Failed to get count for table ${tableName}`, { error });
        stats[tableName] = 0;
      }
    }
  } catch (error) {
    logger.error('Failed to get source database statistics', { error });
  }

  return stats;
}

async function generateMigrationReport(results: any, totalTime: number): Promise<void> {
  console.log(chalk.blue.bold('\n=== MIGRATION REPORT ===\n'));

  let totalSuccess = 0;
  let totalFailed = 0;
  let totalRecords = 0;

  for (const [service, result] of Object.entries(results)) {
    if (result.success) {
      totalSuccess++;
      console.log(chalk.green(`✓ ${service.toUpperCase()}`));
      if (result.stats) {
        const stats = result.stats as any;
        console.log(`   Records processed: ${stats.totalProcessed || 0}`);
        console.log(`   Records created: ${Object.values(stats).filter((v) => typeof v === 'number').reduce((sum: number, v: number) => sum + v, 0) - (stats.totalProcessed || 0)}`);
        console.log(`   Errors: ${stats.errors || 0}`);
        totalRecords += stats.totalProcessed || 0;
      }
    } else {
      totalFailed++;
      console.log(chalk.red(`✗ ${service.toUpperCase()}`));
      if (result.error) {
        console.log(chalk.red(`   Error: ${result.error}`));
      }
    }
    console.log('');
  }

  console.log(chalk.blue.bold('SUMMARY:'));
  console.log(`  Services migrated successfully: ${totalSuccess}`);
  console.log(`  Services failed: ${totalFailed}`);
  console.log(`  Total records processed: ${totalRecords}`);
  console.log(`  Total time: ${Math.round(totalTime / 1000)}s`);
  console.log(`  Average throughput: ${Math.round(totalRecords / (totalTime / 1000))} records/sec`);

  // Save detailed report to file
  const reportData = {
    timestamp: new Date().toISOString(),
    totalTime,
    totalRecords,
    results,
    config: {
      batchSize: config.migration.batchSize,
      dryRun: config.migration.dryRun,
      strictMode: config.validation.strictMode,
    },
  };

  // TODO: Save report to file in exports directory
  logger.info('Migration report generated', reportData);
}

// Handle process termination gracefully
process.on('SIGINT', () => {
  console.log(chalk.yellow('\nReceived SIGINT. Shutting down gracefully...'));
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log(chalk.yellow('\nReceived SIGTERM. Shutting down gracefully...'));
  process.exit(0);
});

// Run the migration
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    console.error(chalk.red('Unhandled error:'), error);
    process.exit(1);
  });
}
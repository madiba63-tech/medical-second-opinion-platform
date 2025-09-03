#!/usr/bin/env node

/**
 * Test Manager Agent
 * Comprehensive testing automation for Second Opinion Platform
 * 
 * Usage:
 *   node agents/test-manager.js --help
 *   node agents/test-manager.js health
 *   node agents/test-manager.js full
 *   node agents/test-manager.js watch
 */

const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { spawn, exec } = require('child_process');
const EventEmitter = require('events');

class TestManager extends EventEmitter {
  constructor() {
    super();
    this.config = {
      environment: 'development',
      services: {
        frontend: { port: 4000, name: 'Frontend' },
        identity: { port: 4001, name: 'Patient Identity' },
        cases: { port: 4002, name: 'Case Management' },
        ai: { port: 4003, name: 'AI Analysis' },
        professionals: { port: 4004, name: 'Professional Service' },
        notifications: { port: 4005, name: 'Notifications' },
        recruitment: { port: 4006, name: 'Professional Recruitment' },
        billing: { port: 4007, name: 'Payment & Billing' },
        workplace: { port: 4008, name: 'Professional Workplace' },
        admin: { port: 4009, name: 'Admin Management' },
        workflow: { port: 4010, name: 'Workflow Engine' }
      },
      database: {
        host: 'localhost',
        port: 5433,
        name: 'secondopinion_dev',
        user: 'dev_user'
      },
      redis: {
        host: 'localhost',
        port: 6380,
        password: 'dev_redis_password'
      },
      testData: {
        user: {
          email: 'testuser@secondopinion.dev',
          password: 'TestUser123!',
          name: 'Test User'
        },
        professional: {
          email: 'testdoc@secondopinion.dev',
          password: 'TestDoc123!',
          name: 'Dr. Test Professional'
        }
      },
      timeouts: {
        service: 5000,
        test: 10000,
        startup: 30000
      }
    };
    
    this.results = [];
    this.isRunning = false;
    this.watchMode = false;
    this.tokens = {};
    
    this.setupEventHandlers();
  }
  
  setupEventHandlers() {
    this.on('test:start', (testName) => {
      this.log(`🧪 Starting test: ${testName}`, 'info');
    });
    
    this.on('test:pass', (testName, duration) => {
      this.log(`✅ PASS: ${testName} (${duration}ms)`, 'success');
    });
    
    this.on('test:fail', (testName, error, duration) => {
      this.log(`❌ FAIL: ${testName} (${duration}ms) - ${error}`, 'error');
    });
    
    this.on('suite:complete', (summary) => {
      this.generateReport(summary);
    });
  }
  
  log(message, type = 'info') {
    const timestamp = new Date().toISOString().substr(11, 8);
    const colors = {
      info: '\x1b[36m',     // Cyan
      success: '\x1b[32m',  // Green  
      error: '\x1b[31m',    // Red
      warning: '\x1b[33m',  // Yellow
      reset: '\x1b[0m'
    };
    
    const color = colors[type] || colors.info;
    console.log(`${color}[${timestamp}] ${message}${colors.reset}`);
  }
  
  async makeRequest(method, url, data = null, headers = {}, timeout = this.config.timeouts.service) {
    const startTime = Date.now();
    try {
      const requestConfig = {
        method,
        url,
        timeout,
        validateStatus: () => true // Don't throw on non-2xx status
      };
      
      // Only add Content-Type and data for requests that have a body
      if (data !== null) {
        requestConfig.data = data;
        requestConfig.headers = {
          'Content-Type': 'application/json',
          ...headers
        };
      } else {
        requestConfig.headers = headers;
      }
      
      const response = await axios(requestConfig);
      
      const duration = Date.now() - startTime;
      return { 
        success: response.status >= 200 && response.status < 300,
        data: response.data, 
        status: response.status,
        duration
      };
    } catch (error) {
      const duration = Date.now() - startTime;
      return { 
        success: false, 
        error: error.message, 
        duration,
        timeout: error.code === 'ECONNABORTED'
      };
    }
  }
  
  async testServiceHealth(serviceName, port) {
    const testName = `health_${serviceName}`;
    this.emit('test:start', testName);
    const startTime = Date.now();
    
    try {
      const result = await this.makeRequest('GET', `http://localhost:${port}/health`);
      const duration = Date.now() - startTime;
      
      if (result.success) {
        this.emit('test:pass', testName, duration);
        this.results.push({ test: testName, status: 'PASS', duration });
        return true;
      } else {
        this.emit('test:fail', testName, `HTTP ${result.status}`, duration);
        this.results.push({ test: testName, status: 'FAIL', error: `HTTP ${result.status}`, duration });
        return false;
      }
    } catch (error) {
      const duration = Date.now() - startTime;
      this.emit('test:fail', testName, error.message, duration);
      this.results.push({ test: testName, status: 'FAIL', error: error.message, duration });
      return false;
    }
  }
  
  async testUserAuthentication() {
    const testName = 'user_authentication';
    this.emit('test:start', testName);
    const startTime = Date.now();
    
    try {
      // Test registration
      const registerResult = await this.makeRequest('POST', 
        'http://localhost:4001/api/v1/auth/register',
        {
          email: this.config.testData.user.email,
          password: this.config.testData.user.password,
          name: this.config.testData.user.name,
          confirmPassword: this.config.testData.user.password
        }
      );
      
      // Test login
      const loginResult = await this.makeRequest('POST',
        'http://localhost:4001/api/v1/auth/login',
        {
          email: this.config.testData.user.email,
          password: this.config.testData.user.password
        }
      );
      
      const duration = Date.now() - startTime;
      
      if (loginResult.success && loginResult.data.token) {
        this.tokens.user = loginResult.data.token;
        this.emit('test:pass', testName, duration);
        this.results.push({ test: testName, status: 'PASS', duration });
        return true;
      } else {
        this.emit('test:fail', testName, 'Login failed or no token', duration);
        this.results.push({ test: testName, status: 'FAIL', error: 'Login failed', duration });
        return false;
      }
    } catch (error) {
      const duration = Date.now() - startTime;
      this.emit('test:fail', testName, error.message, duration);
      this.results.push({ test: testName, status: 'FAIL', error: error.message, duration });
      return false;
    }
  }
  
  async testCaseSubmission() {
    if (!this.tokens.user) {
      this.results.push({ test: 'case_submission', status: 'SKIP', error: 'No user token' });
      return false;
    }
    
    const testName = 'case_submission';
    this.emit('test:start', testName);
    const startTime = Date.now();
    
    try {
      const result = await this.makeRequest('POST',
        'http://localhost:4002/api/v1/cases',
        {
          title: 'Automated Test Case',
          description: 'Test case submission via test manager agent',
          urgency: 'MEDIUM',
          symptoms: ['automated testing', 'system verification'],
          medicalHistory: 'Test patient medical history'
        },
        { 'Authorization': `Bearer ${this.tokens.user}` }
      );
      
      const duration = Date.now() - startTime;
      
      if (result.success) {
        this.emit('test:pass', testName, duration);
        this.results.push({ test: testName, status: 'PASS', duration });
        return result.data;
      } else {
        this.emit('test:fail', testName, `HTTP ${result.status}`, duration);
        this.results.push({ test: testName, status: 'FAIL', error: `HTTP ${result.status}`, duration });
        return false;
      }
    } catch (error) {
      const duration = Date.now() - startTime;
      this.emit('test:fail', testName, error.message, duration);
      this.results.push({ test: testName, status: 'FAIL', error: error.message, duration });
      return false;
    }
  }
  
  async testProfessionalWorkflow() {
    const testName = 'professional_workflow';
    this.emit('test:start', testName);
    const startTime = Date.now();
    
    try {
      // Test professional registration
      const registerResult = await this.makeRequest('POST',
        'http://localhost:4006/api/v1/professionals/register',
        {
          email: this.config.testData.professional.email,
          password: this.config.testData.professional.password,
          name: this.config.testData.professional.name,
          licenseNumber: 'TEST-MD-001',
          specialization: 'General Medicine',
          yearsOfExperience: 5,
          confirmPassword: this.config.testData.professional.password
        }
      );
      
      const duration = Date.now() - startTime;
      
      if (registerResult.success) {
        this.emit('test:pass', testName, duration);
        this.results.push({ test: testName, status: 'PASS', duration });
        return true;
      } else {
        this.emit('test:fail', testName, `Registration failed: HTTP ${registerResult.status}`, duration);
        this.results.push({ test: testName, status: 'FAIL', error: 'Registration failed', duration });
        return false;
      }
    } catch (error) {
      const duration = Date.now() - startTime;
      this.emit('test:fail', testName, error.message, duration);
      this.results.push({ test: testName, status: 'FAIL', error: error.message, duration });
      return false;
    }
  }
  
  async testNotificationSystem() {
    const testName = 'notification_system';
    this.emit('test:start', testName);
    const startTime = Date.now();
    
    try {
      const result = await this.makeRequest('POST',
        'http://localhost:4005/api/v1/notifications/send',
        {
          recipient: this.config.testData.user.email,
          type: 'EMAIL',
          template: 'test_notification',
          data: {
            name: 'Test Manager Agent',
            message: 'Automated notification test'
          }
        }
      );
      
      const duration = Date.now() - startTime;
      
      if (result.success) {
        this.emit('test:pass', testName, duration);
        this.results.push({ test: testName, status: 'PASS', duration });
        return true;
      } else {
        this.emit('test:fail', testName, `HTTP ${result.status}`, duration);
        this.results.push({ test: testName, status: 'FAIL', error: `HTTP ${result.status}`, duration });
        return false;
      }
    } catch (error) {
      const duration = Date.now() - startTime;
      this.emit('test:fail', testName, error.message, duration);
      this.results.push({ test: testName, status: 'FAIL', error: error.message, duration });
      return false;
    }
  }
  
  async checkEnvironmentStatus() {
    this.log('🏥 Checking development environment status...', 'info');
    
    // Check Docker containers
    return new Promise((resolve) => {
      exec('docker ps --format "table {{.Names}}\\t{{.Status}}" | grep second-opinion', (error, stdout) => {
        if (!error && stdout) {
          this.log('Docker containers status:', 'info');
          console.log(stdout);
        }
        
        // Check if development script is available
        const devScript = path.join(process.cwd(), 'scripts/start-dev.sh');
        if (fs.existsSync(devScript)) {
          this.log('✅ Development startup script available', 'success');
        } else {
          this.log('⚠️ Development startup script not found', 'warning');
        }
        
        resolve();
      });
    });
  }
  
  async runHealthCheck() {
    this.log('🔍 Running comprehensive health check...', 'info');
    this.results = [];
    
    await this.checkEnvironmentStatus();
    
    // Test all service health endpoints
    const healthPromises = Object.entries(this.config.services).map(([key, service]) =>
      this.testServiceHealth(key, service.port)
    );
    
    const healthResults = await Promise.all(healthPromises);
    const healthyServices = healthResults.filter(result => result).length;
    const totalServices = Object.keys(this.config.services).length;
    
    this.log(`Health check complete: ${healthyServices}/${totalServices} services healthy`, 
      healthyServices === totalServices ? 'success' : 'warning');
    
    return { healthy: healthyServices, total: totalServices, results: this.results };
  }
  
  async runFullTestSuite() {
    this.log('🧪 Starting full test suite...', 'info');
    this.results = [];
    this.isRunning = true;
    
    try {
      // 1. Health checks
      await this.runHealthCheck();
      
      // 2. Authentication tests
      await this.testUserAuthentication();
      
      // 3. Case management tests
      await this.testCaseSubmission();
      
      // 4. Professional workflow tests
      await this.testProfessionalWorkflow();
      
      // 5. Notification system tests
      await this.testNotificationSystem();
      
      // Generate summary
      const passed = this.results.filter(r => r.status === 'PASS').length;
      const failed = this.results.filter(r => r.status === 'FAIL').length;
      const skipped = this.results.filter(r => r.status === 'SKIP').length;
      const total = this.results.length;
      
      const summary = {
        total,
        passed,
        failed,
        skipped,
        successRate: total > 0 ? ((passed / total) * 100).toFixed(1) : '0'
      };
      
      this.emit('suite:complete', summary);
      return summary;
      
    } finally {
      this.isRunning = false;
    }
  }
  
  generateReport(summary) {
    const report = {
      timestamp: new Date().toISOString(),
      environment: this.config.environment,
      agent: 'test-manager',
      summary,
      results: this.results,
      configuration: {
        services: Object.keys(this.config.services).length,
        timeouts: this.config.timeouts
      }
    };
    
    // Save detailed report
    const reportFile = `test-manager-report-${Date.now()}.json`;
    fs.writeFileSync(reportFile, JSON.stringify(report, null, 2));
    
    // Display summary
    console.log(`
╔══════════════════════════════════════╗
║           TEST SUMMARY               ║
╠══════════════════════════════════════╣
║ Total Tests: ${String(summary.total).padStart(23)} ║
║ Passed:      ${String(summary.passed).padStart(23)} ║
║ Failed:      ${String(summary.failed).padStart(23)} ║
║ Skipped:     ${String(summary.skipped).padStart(23)} ║
║ Success Rate: ${String(summary.successRate + '%').padStart(22)} ║
╚══════════════════════════════════════╝

📄 Detailed report: ${reportFile}
`);
    
    if (summary.failed > 0) {
      console.log('❌ Failed Tests:');
      this.results.filter(r => r.status === 'FAIL').forEach(test => {
        console.log(`   - ${test.test}: ${test.error || 'Unknown error'}`);
      });
    }
  }
  
  async startWatchMode() {
    this.log('👀 Starting watch mode - monitoring development environment...', 'info');
    this.watchMode = true;
    
    const runCheck = async () => {
      if (!this.isRunning) {
        const health = await this.runHealthCheck();
        
        if (health.healthy < health.total) {
          this.log(`⚠️ Services down: ${health.total - health.healthy}/${health.total}`, 'warning');
        } else {
          this.log(`✅ All services healthy (${health.healthy}/${health.total})`, 'success');
        }
      }
    };
    
    // Initial check
    await runCheck();
    
    // Check every 30 seconds
    const interval = setInterval(async () => {
      if (!this.watchMode) {
        clearInterval(interval);
        return;
      }
      await runCheck();
    }, 30000);
    
    // Handle graceful shutdown
    process.on('SIGINT', () => {
      this.log('🛑 Stopping watch mode...', 'info');
      this.watchMode = false;
      clearInterval(interval);
      process.exit(0);
    });
  }
  
  showHelp() {
    console.log(`
🤖 Test Manager Agent - Second Opinion Platform Testing

USAGE:
  node agents/test-manager.js <command> [options]

COMMANDS:
  health              Run health checks on all services
  full                Run complete test suite
  watch               Monitor environment continuously
  auth                Test authentication workflows only
  cases               Test case management workflows only
  professionals       Test professional workflows only
  notifications       Test notification system only
  help                Show this help message

OPTIONS:
  --verbose           Enable verbose logging
  --timeout <ms>      Set request timeout (default: 5000)
  --config <file>     Use custom configuration file

EXAMPLES:
  node agents/test-manager.js health
  node agents/test-manager.js full --verbose
  node agents/test-manager.js watch
  
ENVIRONMENT:
  Development services expected on ports 4000-4010
  Database: PostgreSQL dev (localhost:5433)
  Cache: Redis dev (localhost:6380)

For more information, see: docs/DEVELOPMENT_TESTING_GUIDE.md
`);
  }
}

// CLI handling
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  
  const testManager = new TestManager();
  
  // Handle command line options
  if (args.includes('--verbose')) {
    testManager.config.verbose = true;
  }
  
  const timeoutIndex = args.indexOf('--timeout');
  if (timeoutIndex !== -1 && args[timeoutIndex + 1]) {
    testManager.config.timeouts.service = parseInt(args[timeoutIndex + 1]);
  }
  
  switch (command) {
    case 'health':
      const health = await testManager.runHealthCheck();
      process.exit(health.healthy === health.total ? 0 : 1);
      break;
      
    case 'full':
      const summary = await testManager.runFullTestSuite();
      process.exit(summary.failed === 0 ? 0 : 1);
      break;
      
    case 'watch':
      await testManager.startWatchMode();
      break;
      
    case 'auth':
      await testManager.testUserAuthentication();
      break;
      
    case 'cases':
      await testManager.testUserAuthentication();
      await testManager.testCaseSubmission();
      break;
      
    case 'professionals':
      await testManager.testProfessionalWorkflow();
      break;
      
    case 'notifications':
      await testManager.testNotificationSystem();
      break;
      
    case 'help':
    case '--help':
    case '-h':
      testManager.showHelp();
      break;
      
    default:
      if (!command) {
        testManager.showHelp();
      } else {
        console.error(`❌ Unknown command: ${command}`);
        testManager.showHelp();
        process.exit(1);
      }
  }
}

// Export for programmatic use
module.exports = TestManager;

// Run CLI if called directly
if (require.main === module) {
  main().catch(error => {
    console.error('❌ Test Manager failed:', error.message);
    process.exit(1);
  });
}
# Test Manager Agent

## Overview

The Test Manager Agent is an intelligent testing automation system for the Second Opinion Platform. It provides comprehensive testing capabilities with autonomous monitoring, reporting, and alerting.

## Features

### 🤖 **Autonomous Testing**
- **Health Monitoring**: Continuous service health checks
- **Full Test Suites**: Complete workflow testing
- **Smart Reporting**: Detailed test reports with analytics
- **Watch Mode**: Real-time environment monitoring

### 🎯 **Test Scenarios**
- **Service Health**: All 10 microservices health verification
- **Authentication**: User registration, login, token validation
- **Case Management**: Case submission, retrieval, status tracking
- **Professional Workflows**: Registration, authentication, assignment
- **Notifications**: Multi-channel notification delivery
- **Integration**: End-to-end workflow testing

### 📊 **Reporting & Analytics**
- **Real-time Results**: Live test execution feedback
- **Detailed Reports**: JSON reports with timing and error data
- **Success Metrics**: Pass/fail rates and performance tracking
- **Historical Data**: Test result trends and analysis

## Usage

### Quick Commands

```bash
# Run comprehensive health check
node agents/test-manager.js health

# Execute full test suite
node agents/test-manager.js full

# Start continuous monitoring
node agents/test-manager.js watch

# Test specific workflows
node agents/test-manager.js auth
node agents/test-manager.js cases
node agents/test-manager.js professionals
```

### Advanced Usage

```bash
# Verbose output
node agents/test-manager.js full --verbose

# Custom timeout
node agents/test-manager.js health --timeout 10000

# Show help
node agents/test-manager.js help
```

## Agent Architecture

### Core Components

1. **TestManager Class**: Main agent orchestrator
2. **Service Health Checker**: Monitors microservice availability
3. **Workflow Tester**: Tests complex user journeys
4. **Report Generator**: Creates detailed test reports
5. **Watch Monitor**: Continuous environment monitoring

### Event System

The agent uses an event-driven architecture:

```javascript
// Test lifecycle events
testManager.on('test:start', (testName) => {});
testManager.on('test:pass', (testName, duration) => {});
testManager.on('test:fail', (testName, error, duration) => {});
testManager.on('suite:complete', (summary) => {});
```

### Configuration

Default configuration for development environment:

```javascript
{
  environment: 'development',
  services: {
    frontend: { port: 4000, name: 'Frontend' },
    identity: { port: 4001, name: 'Patient Identity' },
    cases: { port: 4002, name: 'Case Management' },
    // ... all 10 services
  },
  timeouts: {
    service: 5000,
    test: 10000,
    startup: 30000
  }
}
```

## Test Scenarios

### 1. Health Check
```bash
node agents/test-manager.js health
```
- Tests all 10 microservice health endpoints
- Verifies Docker container status
- Checks database and Redis connectivity
- **Exit code 0**: All healthy, **Exit code 1**: Issues detected

### 2. Full Test Suite
```bash
node agents/test-manager.js full
```
- Complete end-to-end testing
- User authentication workflows
- Case submission and management
- Professional registration and workflows
- Notification system testing
- **Result**: Detailed JSON report generated

### 3. Watch Mode
```bash
node agents/test-manager.js watch
```
- Continuous monitoring every 30 seconds
- Real-time health status updates
- Automatic alerting on service failures
- **Ctrl+C** to stop monitoring

### 4. Targeted Testing
```bash
# Test authentication only
node agents/test-manager.js auth

# Test case workflows only
node agents/test-manager.js cases

# Test professional workflows
node agents/test-manager.js professionals

# Test notification system
node agents/test-manager.js notifications
```

## Report Format

The agent generates comprehensive JSON reports:

```json
{
  "timestamp": "2025-01-15T10:30:00Z",
  "environment": "development",
  "agent": "test-manager",
  "summary": {
    "total": 15,
    "passed": 14,
    "failed": 1,
    "skipped": 0,
    "successRate": "93.3%"
  },
  "results": [
    {
      "test": "health_identity",
      "status": "PASS",
      "duration": 234
    }
  ],
  "configuration": {
    "services": 10,
    "timeouts": {
      "service": 5000,
      "test": 10000
    }
  }
}
```

## Integration

### CI/CD Integration

```yaml
# .github/workflows/test.yml
- name: Run Test Manager
  run: node agents/test-manager.js full
  
- name: Upload Test Results
  uses: actions/upload-artifact@v2
  with:
    name: test-results
    path: test-manager-report-*.json
```

### Development Workflow

```bash
# Pre-commit hook
echo "node agents/test-manager.js health" >> .git/hooks/pre-commit

# Daily health check
echo "0 9 * * * cd /path/to/project && node agents/test-manager.js full" | crontab
```

### Monitoring Integration

```javascript
// Custom monitoring
const TestManager = require('./agents/test-manager');
const testManager = new TestManager();

testManager.on('test:fail', (testName, error) => {
  // Send alert to Slack/Discord/Email
  sendAlert(`Test failed: ${testName} - ${error}`);
});

await testManager.runFullTestSuite();
```

## Error Handling

The agent provides detailed error information:

### Common Issues

1. **Service Unavailable**:
   ```
   ❌ FAIL: health_identity (5000ms) - HTTP 503
   ```

2. **Authentication Failure**:
   ```
   ❌ FAIL: user_authentication (2341ms) - Login failed or no token
   ```

3. **Timeout Errors**:
   ```
   ❌ FAIL: case_submission (10000ms) - Request timeout
   ```

### Troubleshooting

1. **Check environment**:
   ```bash
   ./scripts/start-dev.sh
   node agents/test-manager.js health
   ```

2. **Verify services**:
   ```bash
   docker ps | grep second-opinion
   ```

3. **Check logs**:
   ```bash
   tail -f logs/*.log
   ```

## Extending the Agent

### Adding New Tests

```javascript
async testCustomWorkflow() {
  const testName = 'custom_workflow';
  this.emit('test:start', testName);
  const startTime = Date.now();
  
  try {
    // Your test logic here
    const result = await this.makeRequest('POST', 'http://localhost:4001/api/custom');
    
    const duration = Date.now() - startTime;
    
    if (result.success) {
      this.emit('test:pass', testName, duration);
      this.results.push({ test: testName, status: 'PASS', duration });
      return true;
    } else {
      throw new Error(`HTTP ${result.status}`);
    }
  } catch (error) {
    const duration = Date.now() - startTime;
    this.emit('test:fail', testName, error.message, duration);
    this.results.push({ test: testName, status: 'FAIL', error: error.message, duration });
    return false;
  }
}
```

### Custom Configuration

```javascript
// Custom config file
const customConfig = {
  services: {
    // Override default service ports
    identity: { port: 5001, name: 'Custom Identity Service' }
  },
  testData: {
    // Custom test data
    user: { email: 'custom@test.com' }
  }
};

const testManager = new TestManager();
Object.assign(testManager.config, customConfig);
```

## Best Practices

1. **Regular Health Checks**: Run health checks before development sessions
2. **Full Suite Before Commits**: Execute full test suite before code commits
3. **Watch Mode for Development**: Use watch mode during active development
4. **Monitor Test Reports**: Review test reports for performance trends
5. **Alert Integration**: Set up alerts for critical test failures

## Support

- **Documentation**: `docs/DEVELOPMENT_TESTING_GUIDE.md`
- **Test Scripts**: `test-development-environment.js`, `test-manual-scenarios.sh`
- **Agent Code**: `agents/test-manager.js`
- **Reports**: Auto-generated `test-manager-report-*.json`
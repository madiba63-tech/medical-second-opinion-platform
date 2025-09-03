#!/usr/bin/env node

/**
 * Development Environment Testing Script
 * Tests all major scenarios in the Second Opinion Platform
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Development environment configuration
const CONFIG = {
  FRONTEND_URL: 'http://localhost:4000',
  SERVICES: {
    PATIENT_IDENTITY: 'http://localhost:4001',
    CASE_MANAGEMENT: 'http://localhost:4002',
    AI_ANALYSIS: 'http://localhost:4003',
    PROFESSIONAL_SERVICE: 'http://localhost:4004',
    NOTIFICATION: 'http://localhost:4005',
    PROFESSIONAL_RECRUITMENT: 'http://localhost:4006',
    PAYMENT_BILLING: 'http://localhost:4007',
    PROFESSIONAL_WORKPLACE: 'http://localhost:4008',
    ADMIN_MANAGEMENT: 'http://localhost:4009',
    WORKFLOW_ENGINE: 'http://localhost:4010'
  },
  TEST_USER: {
    email: 'test@secondopinion.dev',
    password: 'TestPassword123!',
    name: 'Test User'
  },
  TEST_PROFESSIONAL: {
    email: 'doctor@secondopinion.dev',
    password: 'DocPassword123!',
    name: 'Dr. Test Professional',
    license: 'MD123456'
  }
};

let testResults = [];
let authToken = null;
let professionalToken = null;

// Utility functions
const log = (message, type = 'info') => {
  const timestamp = new Date().toISOString();
  const prefix = type === 'error' ? '❌' : type === 'success' ? '✅' : 'ℹ️';
  console.log(`${prefix} [${timestamp}] ${message}`);
};

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const makeRequest = async (method, url, data = null, headers = {}) => {
  try {
    const response = await axios({
      method,
      url,
      data,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      timeout: 10000
    });
    return { success: true, data: response.data, status: response.status };
  } catch (error) {
    return { 
      success: false, 
      error: error.message, 
      status: error.response?.status,
      data: error.response?.data 
    };
  }
};

// Test scenarios
const testHealthChecks = async () => {
  log('🏥 Testing Service Health Checks...');
  
  for (const [serviceName, url] of Object.entries(CONFIG.SERVICES)) {
    const result = await makeRequest('GET', `${url}/health`);
    
    if (result.success) {
      log(`${serviceName}: Healthy`, 'success');
      testResults.push({ test: `${serviceName}_health`, status: 'PASS' });
    } else {
      log(`${serviceName}: Unhealthy - ${result.error}`, 'error');
      testResults.push({ test: `${serviceName}_health`, status: 'FAIL', error: result.error });
    }
    
    await sleep(500); // Rate limiting
  }
};

const testUserRegistrationAndLogin = async () => {
  log('👤 Testing User Registration & Login...');
  
  // Test user registration
  const registerResult = await makeRequest('POST', `${CONFIG.SERVICES.PATIENT_IDENTITY}/api/v1/auth/register`, {
    email: CONFIG.TEST_USER.email,
    password: CONFIG.TEST_USER.password,
    name: CONFIG.TEST_USER.name,
    confirmPassword: CONFIG.TEST_USER.password
  });
  
  if (registerResult.success) {
    log('User registration: Success', 'success');
    testResults.push({ test: 'user_registration', status: 'PASS' });
  } else {
    log(`User registration: Failed - ${registerResult.error}`, 'error');
    testResults.push({ test: 'user_registration', status: 'FAIL', error: registerResult.error });
  }
  
  // Test user login
  const loginResult = await makeRequest('POST', `${CONFIG.SERVICES.PATIENT_IDENTITY}/api/v1/auth/login`, {
    email: CONFIG.TEST_USER.email,
    password: CONFIG.TEST_USER.password
  });
  
  if (loginResult.success && loginResult.data.token) {
    authToken = loginResult.data.token;
    log('User login: Success', 'success');
    testResults.push({ test: 'user_login', status: 'PASS' });
  } else {
    log(`User login: Failed - ${loginResult.error}`, 'error');
    testResults.push({ test: 'user_login', status: 'FAIL', error: loginResult.error });
  }
};

const testCaseSubmission = async () => {
  if (!authToken) {
    log('Skipping case submission - no auth token', 'error');
    return;
  }
  
  log('📋 Testing Case Submission...');
  
  const caseData = {
    title: 'Test Medical Case',
    description: 'Patient experiencing chest pain and shortness of breath',
    urgency: 'MEDIUM',
    symptoms: ['chest pain', 'shortness of breath', 'fatigue'],
    medicalHistory: 'Hypertension, diabetes type 2',
    currentMedications: ['Lisinopril', 'Metformin']
  };
  
  const result = await makeRequest('POST', `${CONFIG.SERVICES.CASE_MANAGEMENT}/api/v1/cases`, caseData, {
    'Authorization': `Bearer ${authToken}`
  });
  
  if (result.success) {
    log('Case submission: Success', 'success');
    testResults.push({ test: 'case_submission', status: 'PASS', caseId: result.data.caseId });
    return result.data.caseId;
  } else {
    log(`Case submission: Failed - ${result.error}`, 'error');
    testResults.push({ test: 'case_submission', status: 'FAIL', error: result.error });
    return null;
  }
};

const testProfessionalRegistration = async () => {
  log('👨‍⚕️ Testing Professional Registration...');
  
  const professionalData = {
    email: CONFIG.TEST_PROFESSIONAL.email,
    password: CONFIG.TEST_PROFESSIONAL.password,
    name: CONFIG.TEST_PROFESSIONAL.name,
    licenseNumber: CONFIG.TEST_PROFESSIONAL.license,
    specialization: 'Cardiology',
    yearsOfExperience: 10,
    medicalSchool: 'Harvard Medical School',
    confirmPassword: CONFIG.TEST_PROFESSIONAL.password
  };
  
  const result = await makeRequest('POST', `${CONFIG.SERVICES.PROFESSIONAL_RECRUITMENT}/api/v1/professionals/register`, professionalData);
  
  if (result.success) {
    log('Professional registration: Success', 'success');
    testResults.push({ test: 'professional_registration', status: 'PASS' });
  } else {
    log(`Professional registration: Failed - ${result.error}`, 'error');
    testResults.push({ test: 'professional_registration', status: 'FAIL', error: result.error });
  }
  
  // Test professional login
  const loginResult = await makeRequest('POST', `${CONFIG.SERVICES.PROFESSIONAL_SERVICE}/api/v1/auth/login`, {
    email: CONFIG.TEST_PROFESSIONAL.email,
    password: CONFIG.TEST_PROFESSIONAL.password
  });
  
  if (loginResult.success && loginResult.data.token) {
    professionalToken = loginResult.data.token;
    log('Professional login: Success', 'success');
    testResults.push({ test: 'professional_login', status: 'PASS' });
  } else {
    log(`Professional login: Failed - ${loginResult.error}`, 'error');
    testResults.push({ test: 'professional_login', status: 'FAIL', error: loginResult.error });
  }
};

const testNotificationSystem = async () => {
  log('📢 Testing Notification System...');
  
  const notificationData = {
    recipient: CONFIG.TEST_USER.email,
    type: 'EMAIL',
    template: 'welcome',
    data: {
      name: CONFIG.TEST_USER.name,
      message: 'Welcome to Second Opinion Platform!'
    }
  };
  
  const result = await makeRequest('POST', `${CONFIG.SERVICES.NOTIFICATION}/api/v1/notifications/send`, notificationData);
  
  if (result.success) {
    log('Notification sending: Success', 'success');
    testResults.push({ test: 'notification_system', status: 'PASS' });
  } else {
    log(`Notification sending: Failed - ${result.error}`, 'error');
    testResults.push({ test: 'notification_system', status: 'FAIL', error: result.error });
  }
};

const testWorkflowEngine = async (caseId) => {
  if (!caseId) {
    log('Skipping workflow test - no case ID', 'error');
    return;
  }
  
  log('🔄 Testing Workflow Engine...');
  
  const workflowData = {
    caseId: caseId,
    workflowType: 'CASE_REVIEW',
    priority: 'MEDIUM',
    assignedTo: CONFIG.TEST_PROFESSIONAL.email
  };
  
  const result = await makeRequest('POST', `${CONFIG.SERVICES.WORKFLOW_ENGINE}/api/v1/workflows/start`, workflowData);
  
  if (result.success) {
    log('Workflow initiation: Success', 'success');
    testResults.push({ test: 'workflow_engine', status: 'PASS' });
  } else {
    log(`Workflow initiation: Failed - ${result.error}`, 'error');
    testResults.push({ test: 'workflow_engine', status: 'FAIL', error: result.error });
  }
};

const testPaymentSystem = async () => {
  if (!authToken) {
    log('Skipping payment test - no auth token', 'error');
    return;
  }
  
  log('💳 Testing Payment System...');
  
  const paymentData = {
    amount: 25000, // $250.00 in cents
    currency: 'USD',
    description: 'Second Opinion Consultation Fee',
    paymentMethod: 'test_card'
  };
  
  const result = await makeRequest('POST', `${CONFIG.SERVICES.PAYMENT_BILLING}/api/v1/payments/create-intent`, paymentData, {
    'Authorization': `Bearer ${authToken}`
  });
  
  if (result.success) {
    log('Payment intent creation: Success', 'success');
    testResults.push({ test: 'payment_system', status: 'PASS' });
  } else {
    log(`Payment intent creation: Failed - ${result.error}`, 'error');
    testResults.push({ test: 'payment_system', status: 'FAIL', error: result.error });
  }
};

const generateTestReport = () => {
  log('📊 Generating Test Report...');
  
  const passed = testResults.filter(r => r.status === 'PASS').length;
  const failed = testResults.filter(r => r.status === 'FAIL').length;
  const total = testResults.length;
  
  const report = {
    timestamp: new Date().toISOString(),
    environment: 'development',
    summary: {
      total,
      passed,
      failed,
      successRate: `${((passed / total) * 100).toFixed(1)}%`
    },
    results: testResults
  };
  
  // Save report to file
  fs.writeFileSync('development-test-report.json', JSON.stringify(report, null, 2));
  
  console.log(`
📋 TEST SUMMARY
===============
Total Tests: ${total}
Passed: ✅ ${passed}
Failed: ❌ ${failed}
Success Rate: ${report.summary.successRate}

📄 Detailed report saved to: development-test-report.json
`);
  
  if (failed > 0) {
    console.log('❌ Failed Tests:');
    testResults.filter(r => r.status === 'FAIL').forEach(test => {
      console.log(`   - ${test.test}: ${test.error || 'Unknown error'}`);
    });
  }
};

// Main execution
const runAllTests = async () => {
  console.log(`
🚀 SECOND OPINION PLATFORM - DEVELOPMENT TESTING
===============================================
Testing all major scenarios in development environment
Environment: Development (ports 4000-4010)
`);
  
  try {
    await testHealthChecks();
    await sleep(2000);
    
    await testUserRegistrationAndLogin();
    await sleep(2000);
    
    const caseId = await testCaseSubmission();
    await sleep(2000);
    
    await testProfessionalRegistration();
    await sleep(2000);
    
    await testNotificationSystem();
    await sleep(2000);
    
    await testWorkflowEngine(caseId);
    await sleep(2000);
    
    await testPaymentSystem();
    await sleep(1000);
    
    generateTestReport();
    
  } catch (error) {
    log(`Critical error during testing: ${error.message}`, 'error');
    process.exit(1);
  }
};

// Handle command line arguments
if (require.main === module) {
  runAllTests().catch(error => {
    console.error('Test execution failed:', error);
    process.exit(1);
  });
}

module.exports = { runAllTests, CONFIG };
#!/usr/bin/env node

/**
 * Professional Portal End-to-End Test
 * Tests the complete professional portal functionality
 */

const fs = require('fs');
const https = require('https');

console.log('🩺 Professional Portal Comprehensive Test Suite');
console.log('================================================\n');

// Test configuration
const PROFESSIONAL_SERVICE_URL = 'http://localhost:4014';
const FRONTEND_URL = 'http://localhost:4000';
const TEST_CREDENTIALS = {
  email: 'dr.smith@hospital.com',
  password: 'doctor123'
};

let testResults = {
  passed: 0,
  failed: 0,
  total: 0
};

// Helper functions
function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const requestOptions = {
      hostname: urlObj.hostname,
      port: urlObj.port,
      path: urlObj.pathname + urlObj.search,
      method: options.method || 'GET',
      headers: options.headers || {}
    };

    const req = (urlObj.protocol === 'https:' ? https : require('http')).request(requestOptions, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const jsonData = data ? JSON.parse(data) : null;
          resolve({ status: res.statusCode, data: jsonData, headers: res.headers });
        } catch (error) {
          resolve({ status: res.statusCode, data: data, headers: res.headers });
        }
      });
    });

    req.on('error', reject);
    
    if (options.body) {
      req.write(typeof options.body === 'string' ? options.body : JSON.stringify(options.body));
    }
    
    req.end();
  });
}

function test(description, fn) {
  testResults.total++;
  try {
    console.log(`🔬 Testing: ${description}`);
    const result = fn();
    if (result === true || result === undefined) {
      console.log('  ✅ PASSED\n');
      testResults.passed++;
      return true;
    } else {
      console.log(`  ❌ FAILED: ${result}\n`);
      testResults.failed++;
      return false;
    }
  } catch (error) {
    console.log(`  ❌ FAILED: ${error.message}\n`);
    testResults.failed++;
    return false;
  }
}

async function asyncTest(description, fn) {
  testResults.total++;
  try {
    console.log(`🔬 Testing: ${description}`);
    const result = await fn();
    if (result === true || result === undefined) {
      console.log('  ✅ PASSED\n');
      testResults.passed++;
      return true;
    } else {
      console.log(`  ❌ FAILED: ${result}\n`);
      testResults.failed++;
      return false;
    }
  } catch (error) {
    console.log(`  ❌ FAILED: ${error.message}\n`);
    testResults.failed++;
    return false;
  }
}

function printSummary() {
  console.log('\n📊 Test Results Summary');
  console.log('=======================');
  console.log(`Total Tests: ${testResults.total}`);
  console.log(`✅ Passed: ${testResults.passed}`);
  console.log(`❌ Failed: ${testResults.failed}`);
  console.log(`Success Rate: ${((testResults.passed / testResults.total) * 100).toFixed(1)}%\n`);

  if (testResults.failed > 0) {
    console.log('❌ Some tests failed. Please check the output above for details.');
    process.exit(1);
  } else {
    console.log('🎉 All tests passed! Professional portal is working correctly.');
    process.exit(0);
  }
}

// Test suite
async function runTests() {
  console.log('Starting Professional Portal Test Suite...\n');

  // Test 1: Frontend accessibility
  await asyncTest('Frontend is accessible at http://localhost:4000/professional', async () => {
    try {
      const response = await makeRequest(`${FRONTEND_URL}/professional`);
      if (response.status === 200) {
        return true;
      }
      return `Expected status 200, got ${response.status}`;
    } catch (error) {
      return `Network error: ${error.message}`;
    }
  });

  // Test 2: Professional service is running
  await asyncTest('Professional service is running on port 4014', async () => {
    try {
      const response = await makeRequest(`${PROFESSIONAL_SERVICE_URL}/health`);
      if (response.status === 200) {
        return true;
      }
      return `Expected status 200, got ${response.status}`;
    } catch (error) {
      return `Network error: ${error.message}`;
    }
  });

  let authToken = null;

  // Test 3: Professional login functionality
  await asyncTest('Professional login with demo credentials', async () => {
    try {
      const response = await makeRequest(`${PROFESSIONAL_SERVICE_URL}/api/v1/professionals/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(TEST_CREDENTIALS)
      });

      if (response.status === 200 && response.data?.success && response.data?.data?.token) {
        authToken = response.data.data.token;
        console.log(`    Token received: ${authToken.substring(0, 20)}...`);
        return true;
      }
      return `Login failed. Status: ${response.status}, Success: ${response.data?.success}`;
    } catch (error) {
      return `Network error: ${error.message}`;
    }
  });

  // Test 4: Dashboard data retrieval
  await asyncTest('Dashboard data retrieval with authentication', async () => {
    if (!authToken) {
      return 'No auth token available from previous test';
    }

    try {
      const response = await makeRequest(`${PROFESSIONAL_SERVICE_URL}/api/v1/professionals/dashboard`, {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        }
      });

      if (response.status === 200 && response.data?.success) {
        const { professional, dashboard } = response.data.data;
        
        console.log(`    Professional: Dr. ${professional.firstName} ${professional.lastName}`);
        console.log(`    Expertise Level: ${professional.profile?.clinicalSeniority || 'N/A'}`);
        console.log(`    Primary Specialties: ${professional.profile?.primarySpecialty?.join(', ') || professional.specialization?.join(', ') || 'N/A'}`);
        console.log(`    Active Cases: ${dashboard?.activeCases?.length || 0}`);
        console.log(`    Recent Cases: ${dashboard?.recentCases?.length || 0}`);
        console.log(`    Available Cases: ${dashboard?.availableCasesCount || 0}`);
        console.log(`    Total Earnings: $${dashboard?.totalEarnings || 0}`);
        
        return true;
      }
      return `Dashboard request failed. Status: ${response.status}, Success: ${response.data?.success}`;
    } catch (error) {
      return `Network error: ${error.message}`;
    }
  });

  // Test 5: Professional data structure validation
  await asyncTest('Professional data structure validation', async () => {
    if (!authToken) {
      return 'No auth token available';
    }

    try {
      const response = await makeRequest(`${PROFESSIONAL_SERVICE_URL}/api/v1/professionals/dashboard`, {
        method: 'GET',
        headers: { 
          'Authorization': `Bearer ${authToken}`
        }
      });

      const { professional, dashboard } = response.data.data;
      
      // Validate required fields
      const requiredFields = ['id', 'professionalId', 'firstName', 'lastName', 'email'];
      for (const field of requiredFields) {
        if (!professional[field]) {
          return `Missing required professional field: ${field}`;
        }
      }

      // Validate dashboard structure
      if (typeof dashboard?.availableCasesCount !== 'number') {
        return 'Dashboard missing availableCasesCount';
      }

      if (typeof dashboard?.totalEarnings !== 'number') {
        return 'Dashboard missing totalEarnings';
      }

      if (!Array.isArray(dashboard?.recentCases)) {
        return 'Dashboard recentCases is not an array';
      }

      if (!Array.isArray(dashboard?.activeCases)) {
        return 'Dashboard activeCases is not an array';
      }

      return true;
    } catch (error) {
      return `Error: ${error.message}`;
    }
  });

  // Test 6: Invalid login credentials
  await asyncTest('Invalid login credentials handling', async () => {
    try {
      const response = await makeRequest(`${PROFESSIONAL_SERVICE_URL}/api/v1/professionals/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'invalid@example.com', password: 'wrongpassword' })
      });

      if (response.status === 401 || (response.status === 200 && !response.data?.success)) {
        return true;
      }
      return `Expected authentication failure, got status ${response.status}`;
    } catch (error) {
      return `Network error: ${error.message}`;
    }
  });

  // Test 7: Unauthorized dashboard access
  await asyncTest('Unauthorized dashboard access protection', async () => {
    try {
      const response = await makeRequest(`${PROFESSIONAL_SERVICE_URL}/api/v1/professionals/dashboard`, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer invalid_token' }
      });

      if (response.status === 401 || response.status === 403) {
        return true;
      }
      return `Expected unauthorized status, got ${response.status}`;
    } catch (error) {
      return `Network error: ${error.message}`;
    }
  });

  // Test 8: Frontend component structure validation
  test('Frontend component file exists and is readable', () => {
    const frontendFile = '/Users/Nils/Cursor/second-opinion/src/app/professional/page.tsx';
    if (!fs.existsSync(frontendFile)) {
      return 'Professional portal component file does not exist';
    }

    const content = fs.readFileSync(frontendFile, 'utf8');
    
    // Check for essential components
    const requiredComponents = [
      'ProfessionalPortal',
      'handleLogin',
      'fetchDashboardData',
      'Active Cases',
      'Recent Cases',
      'My Account',
      'My Profile', 
      'My Remuneration'
    ];

    for (const component of requiredComponents) {
      if (!content.includes(component)) {
        return `Missing required component: ${component}`;
      }
    }

    return true;
  });

  console.log('🏁 All tests completed!\n');
  printSummary();
}

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n\n⚠️  Tests interrupted by user');
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  console.log(`\n\n💥 Uncaught exception: ${error.message}`);
  process.exit(1);
});

// Run the tests
runTests().catch((error) => {
  console.error('💥 Test suite failed:', error);
  process.exit(1);
});
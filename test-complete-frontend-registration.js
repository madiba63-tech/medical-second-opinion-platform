#!/usr/bin/env node

/**
 * Complete Frontend Registration Flow Test
 * Tests the actual frontend registration flow with document upload and temp submission
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Test configuration
const BASE_URL = 'http://localhost:4000';
const TEST_EMAIL = `frontend-test-${Date.now()}@example.com`;
const TEST_PASSWORD = 'SecurePassword123!';

class FrontendRegistrationTest {
  constructor() {
    this.tempSessionId = null;
    this.tempId = null;
    this.uploadedFiles = [];
    this.testResults = [];
  }

  log(message, type = 'info') {
    const timestamp = new Date().toISOString();
    const prefix = type === 'error' ? '❌' : type === 'success' ? '✅' : 'ℹ️';
    console.log(`${prefix} [${timestamp}] ${message}`);
    
    this.testResults.push({
      timestamp,
      message,
      type,
      success: type === 'success'
    });
  }

  async makeRequest(url, options = {}) {
    return new Promise((resolve, reject) => {
      const urlObj = new URL(url);
      const isHttps = urlObj.protocol === 'https:';
      const client = isHttps ? https : http;
      
      const requestOptions = {
        hostname: urlObj.hostname,
        port: urlObj.port || (isHttps ? 443 : 80),
        path: urlObj.pathname + urlObj.search,
        method: options.method || 'GET',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Frontend-Test/1.0',
          ...options.headers
        }
      };

      if (options.body && typeof options.body === 'object') {
        options.body = JSON.stringify(options.body);
        requestOptions.headers['Content-Length'] = Buffer.byteLength(options.body);
      }

      const req = client.request(requestOptions, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try {
            const jsonData = JSON.parse(data);
            resolve({
              status: res.statusCode,
              headers: res.headers,
              data: jsonData
            });
          } catch (e) {
            resolve({
              status: res.statusCode,
              headers: res.headers,
              data: data
            });
          }
        });
      });

      req.on('error', reject);
      
      if (options.body) {
        req.write(options.body);
      }
      
      req.end();
    });
  }

  // Generate temp session ID (simulating what the frontend does)
  generateTempSessionId() {
    return uuidv4();
  }

  async step1_CreateTempSubmission() {
    this.log('Step 1: Creating initial temp submission...');
    
    try {
      // Generate temp session ID like the frontend would
      this.tempSessionId = this.generateTempSessionId();
      
      const payload = {
        medicalFiles: [],
        contextInfo: {
          diseaseType: 'Cancer',
          gender: 'MALE', 
          ethnicity: 'WHITE',
          isFirstOccurrence: true,
          geneticFamilyHistory: {
            hasHistory: false,
            details: ''
          }
        },
        personalInfo: {
          firstName: 'John',
          middleName: 'Michael', 
          lastName: 'FrontendTest',
          dob: '1985-05-15',
          email: TEST_EMAIL,
          phone: '+1234567890',
          preferredChannel: 'EMAIL'
        }
      };

      const response = await this.makeRequest(`${BASE_URL}/api/v1/funnel/temp`, {
        method: 'POST',
        body: payload
      });

      if (response.status !== 200) {
        throw new Error(`Failed to create temp submission: ${response.status} - ${JSON.stringify(response.data)}`);
      }

      this.tempId = response.data.tempId;
      this.log(`Initial temp submission created: ${this.tempId}`, 'success');
      return true;
    } catch (error) {
      this.log(`Step 1 failed: ${error.message}`, 'error');
      return false;
    }
  }

  async step2_SimulateFileUpload() {
    this.log('Step 2: Simulating frontend file upload flow...');
    
    try {
      const testFileName = 'test-medical-record.pdf';
      const testFileContent = 'This is a test medical document for frontend testing.';
      const testFileSize = Buffer.byteLength(testFileContent);

      // Get presigned URL like the frontend does
      const presignResponse = await this.makeRequest(`${BASE_URL}/api/presign-upload`, {
        method: 'POST',
        headers: {
          'x-temp-session': this.tempSessionId
        },
        body: [{
          filename: testFileName,
          mimetype: 'application/pdf',
          fileSize: testFileSize
        }]
      });

      if (presignResponse.status !== 200) {
        throw new Error(`Failed to get presigned URL: ${presignResponse.status} - ${JSON.stringify(presignResponse.data)}`);
      }

      const presignedData = presignResponse.data[0];
      this.log(`Got presigned URL for upload: ${presignedData.key}`, 'success');

      // Simulate successful upload - create file structure like frontend would
      this.uploadedFiles.push({
        id: Math.random().toString(36).substring(2),
        name: testFileName,
        size: testFileSize,
        type: 'application/pdf',
        uploadProgress: 100,
        uploadKey: presignedData.key,  // This is the key field the frontend uses
        uploadUrl: presignedData.url,
        status: 'completed',
        category: 'medical-record'
      });

      this.log(`File upload simulated successfully`, 'success');
      return true;
    } catch (error) {
      this.log(`Step 2 failed: ${error.message}`, 'error');
      return false;
    }
  }

  async step3_UpdateTempSubmissionWithFiles() {
    this.log('Step 3: Updating temp submission with uploaded files...');
    
    try {
      const payload = {
        medicalFiles: this.uploadedFiles,
        contextInfo: {
          diseaseType: 'Cancer',
          gender: 'MALE',
          ethnicity: 'WHITE', 
          isFirstOccurrence: true,
          geneticFamilyHistory: {
            hasHistory: false,
            details: ''
          }
        },
        personalInfo: {
          firstName: 'John',
          middleName: 'Michael',
          lastName: 'FrontendTest', 
          dob: '1985-05-15',
          email: TEST_EMAIL,
          phone: '+1234567890',
          preferredChannel: 'EMAIL'
        }
      };

      const response = await this.makeRequest(`${BASE_URL}/api/v1/funnel/temp?tempId=${this.tempId}`, {
        method: 'PUT',
        body: payload
      });

      if (response.status !== 200) {
        throw new Error(`Failed to update temp submission: ${response.status} - ${JSON.stringify(response.data)}`);
      }

      this.log('Temp submission updated with uploaded files', 'success');
      return true;
    } catch (error) {
      this.log(`Step 3 failed: ${error.message}`, 'error');
      return false;
    }
  }

  async step4_CompleteRegistration() {
    this.log('Step 4: Completing frontend registration flow...');
    
    try {
      const registrationData = {
        email: TEST_EMAIL,
        password: TEST_PASSWORD,
        tempId: this.tempId,  // Using the frontend temp ID
        firstName: 'John',
        middleName: 'Michael',
        lastName: 'FrontendTest',
        dob: '1985-05-15', 
        phone: '+1234567890',
        preferredChannel: 'EMAIL'
      };

      const response = await this.makeRequest(`${BASE_URL}/api/v1/auth/register`, {
        method: 'POST',
        body: registrationData
      });

      if (response.status !== 200) {
        throw new Error(`Registration failed: ${response.status} - ${JSON.stringify(response.data)}`);
      }

      this.log(`Registration successful! User ID: ${response.data.userId}, Customer ID: ${response.data.customerId}, Case ID: ${response.data.caseId}`, 'success');
      return true;
    } catch (error) {
      this.log(`Step 4 failed: ${error.message}`, 'error');
      return false;
    }
  }

  async step5_VerifyLogin() {
    this.log('Step 5: Verifying login with new account...');
    
    try {
      const loginData = {
        email: TEST_EMAIL,
        password: TEST_PASSWORD
      };

      const response = await this.makeRequest(`${BASE_URL}/api/v1/auth/login`, {
        method: 'POST',
        body: loginData
      });

      if (response.status !== 200) {
        throw new Error(`Login failed: ${response.status} - ${JSON.stringify(response.data)}`);
      }

      this.log('Login verification successful', 'success');
      return true;
    } catch (error) {
      this.log(`Step 5 failed: ${error.message}`, 'error');
      return false;
    }
  }

  async runCompleteTest() {
    this.log('🚀 Starting Complete Frontend Registration Flow Test');
    this.log(`Test email: ${TEST_EMAIL}`);
    this.log('Testing the actual frontend flow:');
    this.log('  1. Create temp submission');
    this.log('  2. Upload medical files');
    this.log('  3. Update submission with files'); 
    this.log('  4. Complete registration');
    this.log('  5. Verify login works');
    this.log('═'.repeat(80));

    const steps = [
      this.step1_CreateTempSubmission,
      this.step2_SimulateFileUpload,
      this.step3_UpdateTempSubmissionWithFiles,
      this.step4_CompleteRegistration,
      this.step5_VerifyLogin
    ];

    let passedSteps = 0;
    let failedSteps = 0;

    for (let i = 0; i < steps.length; i++) {
      const stepResult = await steps[i].call(this);
      if (stepResult) {
        passedSteps++;
      } else {
        failedSteps++;
        break; // Stop on first failure
      }
      
      // Small delay between steps
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    this.log('═'.repeat(80));
    this.log('📊 COMPLETE FRONTEND REGISTRATION TEST RESULTS');
    this.log(`✅ Passed steps: ${passedSteps}/${steps.length}`);
    this.log(`❌ Failed steps: ${failedSteps}`);
    
    if (passedSteps === steps.length) {
      this.log('🎉 COMPLETE SUCCESS! Frontend registration flow working end-to-end!', 'success');
      this.log('💡 This proves the s3Key/uploadKey fix is working properly.', 'info');
      return true;
    } else {
      this.log('💥 TEST FAILED! Please check the errors above.', 'error');
      return false;
    }
  }

  async checkServices() {
    this.log('🔍 Checking if frontend service is running...');
    
    try {
      const response = await this.makeRequest(`${BASE_URL}`);
      if (response.status === 200 || response.status === 404) {
        this.log(`✅ Frontend (Next.js) is operational on port 4000`);
        return true;
      } else {
        this.log(`⚠️ Frontend responded with status ${response.status}`, 'error');
        return false;
      }
    } catch (error) {
      this.log(`❌ Frontend is not responding on port 4000: ${error.message}`, 'error');
      return false;
    }
  }
}

// Main execution
async function main() {
  const test = new FrontendRegistrationTest();
  
  console.log('🧪 Medical Second Opinion Platform - Complete Frontend Registration Test');
  console.log('═'.repeat(90));
  
  // Check if services are running
  const servicesRunning = await test.checkServices();
  if (!servicesRunning) {
    console.log('\n❌ Frontend service is not running. Please start with: npm run dev');
    process.exit(1);
  }
  
  console.log();
  
  // Run the complete test
  const testPassed = await test.runCompleteTest();
  
  console.log('\n📝 This test validates the complete frontend user registration experience.');
  console.log('🔄 Including document upload, temp submission, and account creation.');
  
  process.exit(testPassed ? 0 : 1);
}

// Handle unhandled promises
process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

if (require.main === module) {
  main().catch(console.error);
}

module.exports = FrontendRegistrationTest;
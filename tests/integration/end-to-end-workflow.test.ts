// End-to-End Workflow Integration Tests
// Testing complete patient journey across all microservices

import axios, { AxiosInstance } from 'axios';
import { describe, test, beforeAll, afterAll, expect } from '@jest/globals';
import fs from 'fs';
import path from 'path';

interface TestServices {
  identity: AxiosInstance;
  cases: AxiosInstance;
  ai: AxiosInstance;
  professional: AxiosInstance;
  notification: AxiosInstance;
}

interface TestContext {
  patient: {
    email: string;
    password: string;
    userId?: string;
    customerId?: string;
    accessToken?: string;
  };
  professional: {
    email: string;
    password: string;
    userId?: string;
    professionalId?: string;
    accessToken?: string;
  };
  case: {
    id?: string;
    caseNumber?: string;
    documentId?: string;
    analysisId?: string;
  };
}

describe('Second Opinion Platform - End-to-End Integration Tests', () => {
  let services: TestServices;
  let context: TestContext;

  beforeAll(async () => {
    // Initialize service clients
    services = {
      identity: axios.create({
        baseURL: process.env.IDENTITY_SERVICE_URL || 'http://localhost:3001',
        timeout: 30000,
      }),
      cases: axios.create({
        baseURL: process.env.CASE_SERVICE_URL || 'http://localhost:3002',
        timeout: 30000,
      }),
      ai: axios.create({
        baseURL: process.env.AI_SERVICE_URL || 'http://localhost:3003',
        timeout: 30000,
      }),
      professional: axios.create({
        baseURL: process.env.PROFESSIONAL_SERVICE_URL || 'http://localhost:3004',
        timeout: 30000,
      }),
      notification: axios.create({
        baseURL: process.env.NOTIFICATION_SERVICE_URL || 'http://localhost:3005',
        timeout: 30000,
      }),
    };

    // Initialize test context
    context = {
      patient: {
        email: `test.patient.${Date.now()}@example.com`,
        password: 'TestPassword123!',
      },
      professional: {
        email: `test.professional.${Date.now()}@example.com`,
        password: 'TestPassword123!',
      },
      case: {},
    };

    // Wait for all services to be healthy
    await waitForServicesHealth();
  });

  afterAll(async () => {
    // Cleanup test data if needed
    console.log('Integration tests completed');
  });

  describe('1. Patient Identity Management', () => {
    test('should register a new patient', async () => {
      const registrationData = {
        email: context.patient.email,
        password: context.patient.password,
        firstName: 'John',
        lastName: 'Doe',
        dateOfBirth: '1985-06-15',
        phone: '+1234567890',
        preferredChannel: 'EMAIL',
      };

      const response = await services.identity.post('/api/v1/auth/register', registrationData);
      
      expect(response.status).toBe(201);
      expect(response.data.success).toBe(true);
      expect(response.data.userId).toBeDefined();
      expect(response.data.customerId).toBeDefined();

      context.patient.userId = response.data.userId;
      context.patient.customerId = response.data.customerId;
    });

    test('should login patient and receive JWT token', async () => {
      const loginData = {
        email: context.patient.email,
        password: context.patient.password,
      };

      const response = await services.identity.post('/api/v1/auth/login', loginData);
      
      expect(response.status).toBe(200);
      expect(response.data.success).toBe(true);
      expect(response.data.accessToken).toBeDefined();
      expect(response.data.user.email).toBe(context.patient.email);

      context.patient.accessToken = response.data.accessToken;
    });

    test('should get patient profile', async () => {
      const response = await services.identity.get('/api/v1/profile/me', {
        headers: {
          Authorization: `Bearer ${context.patient.accessToken}`,
        },
      });

      expect(response.status).toBe(200);
      expect(response.data.success).toBe(true);
      expect(response.data.profile.email).toBe(context.patient.email);
    });
  });

  describe('2. Professional Registration and Verification', () => {
    test('should register a medical professional', async () => {
      const professionalData = {
        email: context.professional.email,
        password: context.professional.password,
        firstName: 'Dr. Jane',
        lastName: 'Smith',
        title: 'MD',
        level: 'ATTENDING',
        specializations: [
          {
            specialty: 'CARDIOLOGY',
            level: 'BOARD_CERTIFIED',
            boardName: 'American Board of Internal Medicine',
          },
        ],
        licenses: [
          {
            licenseNumber: 'MD123456',
            licenseType: 'MD',
            issuingState: 'CA',
            issuingCountry: 'US',
            issuedDate: '2015-01-01',
            expirationDate: '2025-12-31',
          },
        ],
      };

      const response = await services.professional.post('/api/v1/professionals/register', professionalData);
      
      expect(response.status).toBe(201);
      expect(response.data.success).toBe(true);
      expect(response.data.professionalId).toBeDefined();

      context.professional.professionalId = response.data.professionalId;
    });

    test('should login professional', async () => {
      const loginData = {
        email: context.professional.email,
        password: context.professional.password,
      };

      const response = await services.professional.post('/api/v1/auth/login', loginData);
      
      expect(response.status).toBe(200);
      expect(response.data.success).toBe(true);
      expect(response.data.accessToken).toBeDefined();

      context.professional.accessToken = response.data.accessToken;
    });
  });

  describe('3. Medical Case Management', () => {
    test('should create a medical case', async () => {
      const caseData = {
        firstName: 'John',
        lastName: 'Doe',
        dateOfBirth: '1985-06-15',
        email: context.patient.email,
        title: 'Chest Pain Evaluation',
        description: 'Patient experiencing intermittent chest pain for 2 weeks',
        chiefComplaint: 'Chest pain with shortness of breath',
        category: 'CARDIOLOGY',
        priority: 'HIGH',
        medicalHistory: [
          {
            condition: 'Hypertension',
            diagnosedDate: '2020-01-15',
            notes: 'Well controlled with medication',
          },
        ],
        currentMedications: [
          {
            name: 'Lisinopril',
            dosage: '10mg',
            frequency: 'Once daily',
          },
        ],
      };

      const response = await services.cases.post('/api/v1/cases', caseData, {
        headers: {
          Authorization: `Bearer ${context.patient.accessToken}`,
          'X-Customer-ID': context.patient.customerId,
        },
      });
      
      expect(response.status).toBe(201);
      expect(response.data.success).toBe(true);
      expect(response.data.case.id).toBeDefined();
      expect(response.data.case.caseNumber).toBeDefined();

      context.case.id = response.data.case.id;
      context.case.caseNumber = response.data.case.caseNumber;
    });

    test('should upload medical document to case', async () => {
      // Create a mock medical document
      const mockDocument = Buffer.from('Mock ECG report content for testing');
      const formData = new FormData();
      formData.append('file', new Blob([mockDocument], { type: 'application/pdf' }), 'ecg-report.pdf');
      formData.append('documentType', 'LAB_RESULT');
      formData.append('description', 'ECG Report showing cardiac rhythm');

      const response = await services.cases.post(`/api/v1/documents/upload/${context.case.id}`, formData, {
        headers: {
          Authorization: `Bearer ${context.patient.accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      
      expect(response.status).toBe(201);
      expect(response.data.success).toBe(true);
      expect(response.data.document.id).toBeDefined();

      context.case.documentId = response.data.document.id;
    });

    test('should retrieve case details', async () => {
      const response = await services.cases.get(`/api/v1/cases/${context.case.id}`, {
        headers: {
          Authorization: `Bearer ${context.patient.accessToken}`,
        },
      });

      expect(response.status).toBe(200);
      expect(response.data.success).toBe(true);
      expect(response.data.case.id).toBe(context.case.id);
      expect(response.data.case.documents).toHaveLength(1);
    });
  });

  describe('4. AI Analysis Integration', () => {
    test('should request AI analysis of medical case', async () => {
      const analysisRequest = {
        caseId: context.case.id,
        analysisType: 'DIFFERENTIAL_DIAGNOSIS',
        priority: 'HIGH',
        patientContext: {
          age: 38,
          gender: 'M',
          symptoms: ['chest pain', 'shortness of breath'],
        },
        specificQuestions: [
          'What are the most likely diagnoses based on the symptoms?',
          'What additional tests would you recommend?',
        ],
      };

      const response = await services.ai.post('/api/v1/analysis/case', analysisRequest, {
        headers: {
          Authorization: `Bearer ${context.patient.accessToken}`,
          'X-Service-Token': 'internal-service-token',
        },
      });
      
      expect(response.status).toBe(202); // Accepted for async processing
      expect(response.data.success).toBe(true);
      expect(response.data.analysisId).toBeDefined();

      context.case.analysisId = response.data.analysisId;
    });

    test('should poll for AI analysis results', async () => {
      // Poll for analysis completion (with timeout)
      let analysisComplete = false;
      let attempts = 0;
      const maxAttempts = 10;

      while (!analysisComplete && attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds
        
        const response = await services.ai.get(`/api/v1/analysis/${context.case.analysisId}`, {
          headers: {
            Authorization: `Bearer ${context.patient.accessToken}`,
          },
        });

        if (response.data.analysis.status === 'COMPLETED') {
          analysisComplete = true;
          expect(response.data.analysis.results).toBeDefined();
          expect(response.data.analysis.confidence).toBeGreaterThan(0);
        }
        
        attempts++;
      }

      expect(analysisComplete).toBe(true);
    });

    test('should retrieve AI insights for the case', async () => {
      const response = await services.ai.get(`/api/v1/insights/${context.case.id}`, {
        headers: {
          Authorization: `Bearer ${context.patient.accessToken}`,
        },
      });

      expect(response.status).toBe(200);
      expect(response.data.success).toBe(true);
      expect(response.data.insights).toBeDefined();
      expect(Array.isArray(response.data.insights)).toBe(true);
    });
  });

  describe('5. Case Assignment to Professional', () => {
    test('should assign case to professional', async () => {
      const assignmentData = {
        caseId: context.case.id,
        professionalId: context.professional.professionalId,
        assignmentType: 'primary',
        specialization: 'CARDIOLOGY',
        priority: 'HIGH',
        estimatedHours: 2,
        notes: 'Urgent cardiology consultation needed',
      };

      const response = await services.cases.post('/api/v1/assignments', assignmentData, {
        headers: {
          'X-Service-Token': 'internal-service-token', // System assignment
        },
      });
      
      expect(response.status).toBe(201);
      expect(response.data.success).toBe(true);
      expect(response.data.assignment.id).toBeDefined();
    });

    test('professional should see assigned case', async () => {
      const response = await services.professional.get('/api/v1/assignments/my-cases', {
        headers: {
          Authorization: `Bearer ${context.professional.accessToken}`,
        },
      });

      expect(response.status).toBe(200);
      expect(response.data.success).toBe(true);
      expect(response.data.assignments).toHaveLength(1);
      expect(response.data.assignments[0].caseId).toBe(context.case.id);
    });

    test('should update case status to in review', async () => {
      const statusUpdate = {
        status: 'PROFESSIONAL_REVIEWING',
        reason: 'Professional has started reviewing the case',
        notes: 'Initial assessment in progress',
      };

      const response = await services.cases.patch(`/api/v1/cases/${context.case.id}/status`, statusUpdate, {
        headers: {
          Authorization: `Bearer ${context.professional.accessToken}`,
        },
      });

      expect(response.status).toBe(200);
      expect(response.data.success).toBe(true);
      expect(response.data.case.status).toBe('PROFESSIONAL_REVIEWING');
    });
  });

  describe('6. Notification System Integration', () => {
    test('should send case status notification to patient', async () => {
      const notificationData = {
        recipientId: context.patient.customerId,
        recipientType: 'CUSTOMER',
        type: 'CASE_UPDATE',
        channel: 'EMAIL',
        title: 'Case Status Updated',
        message: `Your case ${context.case.caseNumber} is now being reviewed by a medical professional.`,
        contextId: context.case.id,
        contextType: 'case',
        priority: 'NORMAL',
      };

      const response = await services.notification.post('/api/v1/notifications/send', notificationData, {
        headers: {
          'X-Service-Token': 'internal-service-token',
        },
      });
      
      expect(response.status).toBe(201);
      expect(response.data.success).toBe(true);
      expect(response.data.notificationId).toBeDefined();
    });

    test('should retrieve patient notifications', async () => {
      const response = await services.notification.get('/api/v1/notifications', {
        headers: {
          Authorization: `Bearer ${context.patient.accessToken}`,
        },
        params: {
          recipientId: context.patient.customerId,
        },
      });

      expect(response.status).toBe(200);
      expect(response.data.success).toBe(true);
      expect(response.data.notifications).toBeDefined();
      expect(response.data.notifications.length).toBeGreaterThan(0);
    });
  });

  describe('7. Complete Patient Journey Validation', () => {
    test('should validate complete case workflow', async () => {
      // Verify case exists and has all expected components
      const caseResponse = await services.cases.get(`/api/v1/cases/${context.case.id}`, {
        headers: {
          Authorization: `Bearer ${context.patient.accessToken}`,
        },
      });

      expect(caseResponse.data.case).toMatchObject({
        id: context.case.id,
        caseNumber: context.case.caseNumber,
        status: 'PROFESSIONAL_REVIEWING',
        category: 'CARDIOLOGY',
        priority: 'HIGH',
      });

      // Verify documents are attached
      expect(caseResponse.data.case.documents).toHaveLength(1);
      
      // Verify AI analysis exists
      expect(context.case.analysisId).toBeDefined();
      
      // Verify professional assignment exists
      const assignmentsResponse = await services.cases.get(`/api/v1/cases/${context.case.id}/assignments`, {
        headers: {
          Authorization: `Bearer ${context.patient.accessToken}`,
        },
      });
      expect(assignmentsResponse.data.assignments).toHaveLength(1);
    });

    test('should validate service health and metrics', async () => {
      // Check all services are healthy
      const healthChecks = await Promise.all([
        services.identity.get('/health'),
        services.cases.get('/health'),
        services.ai.get('/health'),
        services.professional.get('/health'),
        services.notification.get('/health'),
      ]);

      healthChecks.forEach((healthResponse, index) => {
        expect(healthResponse.status).toBe(200);
        expect(healthResponse.data.status).toBe('healthy');
      });
    });
  });

  // Helper function to wait for all services to be healthy
  async function waitForServicesHealth(): Promise<void> {
    const maxWaitTime = 120000; // 2 minutes
    const checkInterval = 5000; // 5 seconds
    const startTime = Date.now();

    while (Date.now() - startTime < maxWaitTime) {
      try {
        const healthChecks = await Promise.allSettled([
          services.identity.get('/health'),
          services.cases.get('/health'),
          services.ai.get('/health'),
          services.professional.get('/health'),
          services.notification.get('/health'),
        ]);

        const allHealthy = healthChecks.every(
          (result) => result.status === 'fulfilled' && result.value.data.status === 'healthy'
        );

        if (allHealthy) {
          console.log('All services are healthy and ready for testing');
          return;
        }
      } catch (error) {
        // Services not ready yet, continue waiting
      }

      await new Promise(resolve => setTimeout(resolve, checkInterval));
    }

    throw new Error('Services did not become healthy within the expected time');
  }
});
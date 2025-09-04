/**
 * Standardized Testing Utilities for Medical Second Opinion Platform
 * Healthcare Industry Compliant Testing with HIPAA Protection
 * 
 * This module provides consistent testing patterns across all services
 * with mock data generation, test fixtures, and healthcare-specific test utilities.
 */

import { faker } from '@faker-js/faker';
import { UserRole, Permission, JWTPayload } from './auth';
import { PrismaClient } from '../generated/prisma';

// Test Environment Configuration
export interface TestConfig {
  testDatabase?: string;
  enableTestLogging?: boolean;
  testDataRetentionHours?: number;
  hipaaTestMode?: boolean;
  mockExternalServices?: boolean;
}

// Test Data Generators
export class TestDataGenerator {
  private static instance: TestDataGenerator;
  
  public static getInstance(): TestDataGenerator {
    if (!TestDataGenerator.instance) {
      TestDataGenerator.instance = new TestDataGenerator();
    }
    return TestDataGenerator.instance;
  }

  private constructor() {
    // Seed faker for consistent test data
    faker.seed(12345);
  }

  // Patient Test Data
  public generatePatientData(overrides?: Partial<any>): any {
    return {
      id: faker.datatype.uuid(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email().toLowerCase(),
      dateOfBirth: faker.date.between({ from: '1930-01-01', to: '2010-01-01' }),
      gender: faker.helpers.arrayElement(['MALE', 'FEMALE', 'PREFER_NOT_TO_SAY']),
      phone: faker.phone.number('+1##########'),
      preferredLanguage: faker.helpers.arrayElement(['ENGLISH', 'GERMAN']),
      hashedPassword: '$2a$12$test.hashed.password.for.testing.only',
      emailVerified: true,
      phoneVerified: false,
      twoFactorEnabled: true,
      twoFactorMethod: 'EMAIL',
      createdAt: faker.date.recent({ days: 30 }),
      updatedAt: new Date(),
      ...overrides,
    };
  }

  // Professional Test Data
  public generateProfessionalData(overrides?: Partial<any>): any {
    return {
      id: faker.datatype.uuid(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email().toLowerCase(),
      title: faker.helpers.arrayElement(['DR', 'PROF', 'MR', 'MS']),
      specialization: faker.helpers.arrayElements([
        'CARDIOLOGY', 'ONCOLOGY', 'NEUROLOGY', 'RADIOLOGY', 'PATHOLOGY'
      ], { min: 1, max: 3 }),
      yearsOfExperience: faker.number.int({ min: 1, max: 40 }),
      licenseNumber: `MD${faker.number.int({ min: 100000, max: 999999 })}`,
      licenseExpirationDate: faker.date.future({ years: 2 }),
      credentialsVerified: true,
      availability: true,
      rating: faker.number.float({ min: 3.5, max: 5.0, fractionDigits: 1 }),
      maxCasesPerWeek: faker.number.int({ min: 5, max: 20 }),
      hashedPassword: '$2a$12$test.hashed.password.for.testing.only',
      createdAt: faker.date.recent({ days: 60 }),
      updatedAt: new Date(),
      ...overrides,
    };
  }

  // Medical Case Test Data
  public generateMedicalCaseData(patientId?: string, overrides?: Partial<any>): any {
    const caseNumber = `CASE-${faker.string.alphanumeric(8).toUpperCase()}-${faker.string.alphanumeric(4).toUpperCase()}`;
    
    return {
      id: faker.datatype.uuid(),
      caseNumber,
      customerId: patientId || faker.datatype.uuid(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email().toLowerCase(),
      dateOfBirth: faker.date.between({ from: '1930-01-01', to: '2010-01-01' }),
      title: `Second Opinion Request - ${caseNumber}`,
      description: faker.lorem.paragraph({ min: 3, max: 8 }),
      category: faker.helpers.arrayElement(['ONCOLOGY', 'CARDIOLOGY', 'NEUROLOGY']),
      status: faker.helpers.arrayElement(['DRAFT', 'PENDING', 'IN_PROGRESS', 'COMPLETED']),
      priority: faker.helpers.arrayElement(['LOW', 'NORMAL', 'HIGH', 'URGENT']),
      requestedProfessionalLevel: faker.helpers.arrayElement(['JUNIOR', 'SENIOR', 'EXPERT', 'DISTINGUISHED']),
      talentPool: 'ONCOLOGY_SENIOR',
      consentAccepted: true,
      createdAt: faker.date.recent({ days: 14 }),
      updatedAt: new Date(),
      ...overrides,
    };
  }

  // File Upload Test Data
  public generateFileData(caseId?: string, overrides?: Partial<any>): any {
    return {
      id: faker.datatype.uuid(),
      caseId: caseId || faker.datatype.uuid(),
      filename: faker.system.fileName({ extensionCount: 1 }).replace(/\.[^/.]+$/, '.pdf'),
      s3Key: `cases/${caseId || faker.datatype.uuid()}/${faker.datatype.uuid()}-test-file.pdf`,
      mimetype: faker.helpers.arrayElement([
        'application/pdf', 'image/jpeg', 'image/png', 'application/dicom'
      ]),
      size: faker.number.int({ min: 1024, max: 10 * 1024 * 1024 }), // 1KB to 10MB
      category: faker.helpers.arrayElement([
        'MEDICAL_REPORT', 'PATHOLOGY', 'LABORATORY', 'IMAGING'
      ]),
      encrypted: true,
      virusScanStatus: 'CLEAN',
      createdAt: faker.date.recent({ days: 7 }),
      metadata: {
        originalName: faker.system.fileName(),
        uploadedBy: faker.datatype.uuid(),
        uploadedAt: new Date().toISOString(),
      },
      ...overrides,
    };
  }

  // JWT Test Payload
  public generateJWTPayload(role: UserRole = UserRole.PATIENT, overrides?: Partial<JWTPayload>): JWTPayload {
    const userId = faker.datatype.uuid();
    const sessionId = faker.datatype.uuid();
    const now = Math.floor(Date.now() / 1000);

    // Get role-based permissions
    const rolePermissions = {
      [UserRole.PATIENT]: [Permission.CREATE_CASE, Permission.READ_OWN_CASES, Permission.UPLOAD_FILES],
      [UserRole.PROFESSIONAL]: [Permission.READ_ALL_CASES, Permission.USE_AI_ANALYSIS, Permission.READ_PHI],
      [UserRole.ADMIN]: Object.values(Permission),
      [UserRole.SUPPORT]: [Permission.READ_ALL_CASES, Permission.AUDIT_ACCESS],
      [UserRole.SYSTEM]: [Permission.SYSTEM_CONFIG, Permission.USE_AI_ANALYSIS],
    };

    return {
      sub: userId,
      email: faker.internet.email().toLowerCase(),
      role,
      permissions: rolePermissions[role] || [],
      sessionId,
      iat: now,
      exp: now + 900, // 15 minutes
      iss: 'medical-platform',
      aud: 'medical-users',
      twoFactorVerified: true,
      patientId: role === UserRole.PATIENT ? userId : undefined,
      professionalId: role === UserRole.PROFESSIONAL ? userId : undefined,
      ...overrides,
    };
  }

  // Generate HIPAA-compliant test data (no real PHI)
  public generateHIPAACompliantData(): any {
    return {
      patientId: `TEST-${faker.string.alphanumeric(8).toUpperCase()}`,
      mrn: `MRN${faker.number.int({ min: 1000000, max: 9999999 })}`,
      age: faker.number.int({ min: 18, max: 90 }),
      gender: faker.helpers.arrayElement(['M', 'F', 'O']),
      zipCode: faker.location.zipCode().substring(0, 3) + 'XX', // Partially masked
      symptoms: faker.helpers.arrayElements([
        'chest pain', 'shortness of breath', 'fatigue', 'dizziness', 'headache'
      ], { min: 1, max: 3 }),
      medications: faker.helpers.arrayElements([
        'Lisinopril', 'Metformin', 'Atorvastatin', 'Amlodipine', 'Metoprolol'
      ], { min: 0, max: 4 }),
      allergies: faker.helpers.arrayElements([
        'Penicillin', 'Peanuts', 'Latex', 'None known'
      ], { min: 1, max: 2 }),
    };
  }
}

// Test Fixtures and Utilities
export class TestFixtures {
  private prisma: PrismaClient;
  private testDataGenerator = TestDataGenerator.getInstance();

  constructor(prismaClient?: PrismaClient) {
    this.prisma = prismaClient || new PrismaClient();
  }

  // Database Setup and Cleanup
  public async setupDatabase(): Promise<void> {
    // In a real implementation, this would set up a test database
    // and run migrations specific to testing
    await this.prisma.$connect();
  }

  public async cleanupDatabase(): Promise<void> {
    // Clean up test data in reverse dependency order
    const tables = [
      'uploadedFile',
      'casePayment',
      'medicalCase',
      'customerSession',
      'customerNotification',
      'customer',
      'professional',
    ];

    for (const table of tables) {
      try {
        await (this.prisma as any)[table].deleteMany({
          where: {
            OR: [
              { email: { contains: '@test.com' } },
              { id: { contains: 'test-' } },
            ],
          },
        });
      } catch (error) {
        // Table might not exist or might be empty
        console.warn(`Could not clean table ${table}:`, error);
      }
    }
  }

  public async disconnectDatabase(): Promise<void> {
    await this.prisma.$disconnect();
  }

  // Create Test Entities
  public async createTestPatient(overrides?: Partial<any>): Promise<any> {
    const patientData = this.testDataGenerator.generatePatientData({
      email: `test-patient-${Date.now()}@test.com`,
      ...overrides,
    });

    return this.prisma.customer.create({ data: patientData });
  }

  public async createTestProfessional(overrides?: Partial<any>): Promise<any> {
    const professionalData = this.testDataGenerator.generateProfessionalData({
      email: `test-professional-${Date.now()}@test.com`,
      ...overrides,
    });

    return this.prisma.professional.create({ data: professionalData });
  }

  public async createTestCase(patientId?: string, overrides?: Partial<any>): Promise<any> {
    const patient = patientId ? { id: patientId } : await this.createTestPatient();
    const caseData = this.testDataGenerator.generateMedicalCaseData(patient.id, overrides);

    return this.prisma.medicalCase.create({ data: caseData });
  }

  public async createTestFile(caseId?: string, overrides?: Partial<any>): Promise<any> {
    const medicalCase = caseId ? { id: caseId } : await this.createTestCase();
    const fileData = this.testDataGenerator.generateFileData(medicalCase.id, overrides);

    return this.prisma.uploadedFile.create({ data: fileData });
  }
}

// Mock Services
export class MockServices {
  // Mock external API responses
  public static mockAIAnalysisResponse(): any {
    return {
      analysisId: faker.datatype.uuid(),
      confidence: faker.number.float({ min: 0.7, max: 0.95, fractionDigits: 2 }),
      insights: [
        {
          category: 'diagnosis',
          finding: faker.lorem.sentence(),
          confidence: faker.number.float({ min: 0.6, max: 0.9, fractionDigits: 2 }),
        },
        {
          category: 'recommendation',
          finding: faker.lorem.sentence(),
          confidence: faker.number.float({ min: 0.7, max: 0.95, fractionDigits: 2 }),
        },
      ],
      processingTime: faker.number.int({ min: 1000, max: 5000 }),
      model: 'gpt-4-medical',
    };
  }

  // Mock email service responses
  public static mockEmailResponse(success: boolean = true): any {
    return {
      messageId: faker.datatype.uuid(),
      success,
      timestamp: new Date().toISOString(),
      recipient: faker.internet.email(),
      subject: faker.lorem.words(5),
      error: success ? null : 'Mock email sending error',
    };
  }

  // Mock payment service responses
  public static mockPaymentResponse(status: 'SUCCESS' | 'FAILED' | 'PENDING' = 'SUCCESS'): any {
    return {
      transactionId: faker.datatype.uuid(),
      status,
      amount: faker.number.float({ min: 50.00, max: 500.00, fractionDigits: 2 }),
      currency: 'EUR',
      timestamp: new Date().toISOString(),
      paymentMethod: 'card',
      error: status === 'FAILED' ? 'Mock payment failure' : null,
    };
  }
}

// Test Assertions and Utilities
export class TestAssertions {
  // Assert HIPAA compliance
  public static assertHIPAACompliance(data: any): void {
    const dataString = JSON.stringify(data).toLowerCase();
    
    // Check for common PHI patterns
    const phiPatterns = [
      /\b\d{3}-\d{2}-\d{4}\b/, // SSN
      /\b[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}\b/, // Real email (test emails are OK)
      /\b\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})\b/, // Phone numbers
    ];

    phiPatterns.forEach((pattern, index) => {
      if (pattern.test(dataString)) {
        const patternNames = ['SSN', 'Email', 'Phone'];
        throw new Error(`Potential PHI violation: ${patternNames[index]} pattern detected in test data`);
      }
    });
  }

  // Assert API response structure
  public static assertAPIResponse(response: any, expectedStructure: any): void {
    expect(response).toHaveProperty('success');
    expect(response).toHaveProperty('timestamp');
    
    if (response.success) {
      expect(response).toHaveProperty('data');
      
      // Check specific structure if provided
      if (expectedStructure) {
        Object.keys(expectedStructure).forEach(key => {
          expect(response.data).toHaveProperty(key);
        });
      }
    } else {
      expect(response).toHaveProperty('error');
      expect(response).toHaveProperty('code');
    }
  }

  // Assert pagination structure
  public static assertPaginationResponse(response: any): void {
    expect(response.data).toBeInstanceOf(Array);
    expect(response.metadata).toHaveProperty('pagination');
    
    const pagination = response.metadata.pagination;
    expect(pagination).toHaveProperty('page');
    expect(pagination).toHaveProperty('limit');
    expect(pagination).toHaveProperty('total');
    expect(pagination).toHaveProperty('totalPages');
    expect(pagination).toHaveProperty('hasNextPage');
    expect(pagination).toHaveProperty('hasPreviousPage');
  }

  // Assert audit log entry
  public static assertAuditLog(logEntry: any, expectedAction: string): void {
    expect(logEntry).toHaveProperty('userId');
    expect(logEntry).toHaveProperty('action', expectedAction);
    expect(logEntry).toHaveProperty('timestamp');
    expect(logEntry).toHaveProperty('result');
    expect(['SUCCESS', 'FAILURE', 'DENIED']).toContain(logEntry.result);
  }
}

// Test Environment Setup
export class TestEnvironment {
  private static fixtures: TestFixtures;

  public static async setup(config: TestConfig = {}): Promise<void> {
    // Set test environment variables
    process.env.NODE_ENV = 'test';
    process.env.JWT_SECRET = 'test-jwt-secret-32-characters-long';
    process.env.ENCRYPTION_KEY = 'test-encryption-key-64-characters-long-for-testing-purposes';
    
    if (config.testDatabase) {
      process.env.DATABASE_URL = config.testDatabase;
    }

    // Initialize test fixtures
    TestEnvironment.fixtures = new TestFixtures();
    await TestEnvironment.fixtures.setupDatabase();

    console.log('Test environment initialized');
  }

  public static async cleanup(): Promise<void> {
    if (TestEnvironment.fixtures) {
      await TestEnvironment.fixtures.cleanupDatabase();
      await TestEnvironment.fixtures.disconnectDatabase();
    }
    
    console.log('Test environment cleaned up');
  }

  public static getFixtures(): TestFixtures {
    return TestEnvironment.fixtures;
  }
}

// Test Helper Functions
export const testHelpers = {
  // Wait for async operations
  async waitFor(condition: () => boolean | Promise<boolean>, timeout: number = 5000): Promise<void> {
    const start = Date.now();
    
    while (Date.now() - start < timeout) {
      if (await condition()) {
        return;
      }
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    throw new Error(`Condition not met within ${timeout}ms`);
  },

  // Generate test JWT token
  generateTestToken(payload?: Partial<JWTPayload>): string {
    const generator = TestDataGenerator.getInstance();
    const jwtPayload = generator.generateJWTPayload(UserRole.PATIENT, payload);
    
    // Simple test token (not using real JWT for tests)
    return Buffer.from(JSON.stringify(jwtPayload)).toString('base64');
  },

  // Mock HTTP requests
  mockRequest(method: string, url: string, data?: any, headers?: any): any {
    return {
      method,
      url,
      body: data,
      headers: {
        'content-type': 'application/json',
        'x-correlation-id': faker.datatype.uuid(),
        ...headers,
      },
      ip: faker.internet.ip(),
      get: (header: string) => headers?.[header.toLowerCase()],
    };
  },

  // Mock HTTP response
  mockResponse(): any {
    const response = {
      status: jest.fn(() => response),
      json: jest.fn(() => response),
      send: jest.fn(() => response),
      end: jest.fn(() => response),
    };
    return response;
  },

  // Generate test file buffer
  generateTestFileBuffer(size: number = 1024): Buffer {
    return Buffer.alloc(size, 'test-file-content');
  },

  // Validate test data structure
  validateTestData(data: any, schema: any): boolean {
    // Simple validation for test data
    return Object.keys(schema).every(key => 
      data.hasOwnProperty(key) && typeof data[key] === typeof schema[key]
    );
  },
};

// Export all test utilities
export {
  TestDataGenerator,
  TestFixtures,
  MockServices,
  TestAssertions,
  TestEnvironment,
  testHelpers,
};

// Common test setup for Jest
export const jestSetup = {
  beforeAll: async () => {
    await TestEnvironment.setup();
  },
  
  afterAll: async () => {
    await TestEnvironment.cleanup();
  },
  
  beforeEach: () => {
    // Reset mocks before each test
    jest.clearAllMocks();
  },
  
  afterEach: async () => {
    // Clean up test data after each test
    const fixtures = TestEnvironment.getFixtures();
    await fixtures.cleanupDatabase();
  },
};

// Re-export for convenience
export default {
  TestDataGenerator,
  TestFixtures,
  MockServices,
  TestAssertions,
  TestEnvironment,
  testHelpers,
  jestSetup,
};
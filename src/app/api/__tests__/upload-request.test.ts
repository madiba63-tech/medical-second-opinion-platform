import { NextRequest } from 'next/server'
import { POST } from '../upload-request/route'

// Mock Prisma
jest.mock('@/lib/prisma', () => ({
  prisma: {
    $transaction: jest.fn(),
    customer: {
      create: jest.fn(),
    },
    case: {
      create: jest.fn(),
    },
    uploadedFile: {
      createMany: jest.fn(),
    },
  },
}))

// Mock fetch for async operations
global.fetch = jest.fn()

describe('/api/upload-request', () => {
  const createMockRequest = (body: any) => {
    return new NextRequest('http://localhost:3000/api/upload-request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
  }

  const mockPrisma = require('@/lib/prisma').prisma

  beforeEach(() => {
    jest.clearAllMocks()
    ;(global.fetch as jest.Mock).mockResolvedValue({ ok: true })
  })

  it('creates a case successfully with valid data', async () => {
    const mockCustomer = {
      id: 'customer-123',
      customerId: 'CUST-123',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
    }

    const mockCase = {
      id: 'case-123',
      caseNumber: 'CASE-123456789',
      customerId: 'customer-123',
    }

    mockPrisma.$transaction.mockResolvedValue({
      caseId: 'CASE-123456789',
    })

    mockPrisma.customer.create.mockResolvedValue(mockCustomer)
    mockPrisma.case.create.mockResolvedValue(mockCase)

    const validRequest = {
      personalInfo: {
        firstName: 'John',
        middleName: '',
        lastName: 'Doe',
        dob: '1990-01-01',
        email: 'john.doe@example.com',
        phone: '+1234567890',
      },
      medicalFiles: [
        {
          name: 'test.pdf',
          size: 1024,
          type: 'application/pdf',
          category: "Doctor's Letter",
          s3Key: 'uploads/test.pdf',
        },
      ],
      contextInfo: {
        ethnicity: 'White/Caucasian',
        gender: 'Male',
        diseaseType: 'Prostate Cancer',
        isFirstOccurrence: true,
        geneticFamilyHistory: ['Parents'],
      },
      consentAccepted: true,
      paymentId: 'txn_12345',
    }

    const request = createMockRequest(validRequest)
    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(201)
    expect(data.success).toBe(true)
    expect(data.caseId).toBe('CASE-123456789')
    expect(data.message).toBe('Second opinion request submitted successfully')

    // Verify transaction was called
    expect(mockPrisma.$transaction).toHaveBeenCalled()
  })

  it('validates required fields correctly', async () => {
    const invalidRequest = {
      personalInfo: {
        firstName: '', // Missing required field
        lastName: 'Doe',
        dob: '1990-01-01',
        email: 'invalid-email', // Invalid email
        phone: '+1234567890',
      },
      medicalFiles: [],
      contextInfo: {},
      consentAccepted: false, // Missing consent
      paymentId: '',
    }

    const request = createMockRequest(invalidRequest)
    const response = await POST(request)

    expect(response.status).toBe(400)
    const data = await response.json()
    expect(data.error).toBe('Validation error')
  })

  it('handles missing consent', async () => {
    const requestWithoutConsent = {
      personalInfo: {
        firstName: 'John',
        lastName: 'Doe',
        dob: '1990-01-01',
        email: 'john.doe@example.com',
        phone: '+1234567890',
      },
      medicalFiles: [],
      contextInfo: {},
      consentAccepted: false,
      paymentId: 'txn_12345',
    }

    const request = createMockRequest(requestWithoutConsent)
    const response = await POST(request)

    expect(response.status).toBe(400)
  })

  it('handles database transaction errors gracefully', async () => {
    mockPrisma.$transaction.mockRejectedValue(new Error('Database error'))

    const validRequest = {
      personalInfo: {
        firstName: 'John',
        lastName: 'Doe',
        dob: '1990-01-01',
        email: 'john.doe@example.com',
        phone: '+1234567890',
      },
      medicalFiles: [],
      contextInfo: {},
      consentAccepted: true,
      paymentId: 'txn_12345',
    }

    const request = createMockRequest(validRequest)
    const response = await POST(request)

    expect(response.status).toBe(500)
    const data = await response.json()
    expect(data.error).toBe('Internal server error')
  })

  it('processes multiple medical files correctly', async () => {
    mockPrisma.$transaction.mockResolvedValue({
      caseId: 'CASE-123456789',
    })

    const requestWithMultipleFiles = {
      personalInfo: {
        firstName: 'John',
        lastName: 'Doe',
        dob: '1990-01-01',
        email: 'john.doe@example.com',
        phone: '+1234567890',
      },
      medicalFiles: [
        {
          name: 'doctor-letter.pdf',
          size: 1024,
          type: 'application/pdf',
          category: "Doctor's Letter",
          s3Key: 'uploads/doctor-letter.pdf',
        },
        {
          name: 'lab-report.pdf',
          size: 2048,
          type: 'application/pdf',
          category: 'Lab Report',
          s3Key: 'uploads/lab-report.pdf',
        },
        {
          name: 'xray.jpg',
          size: 512,
          type: 'image/jpeg',
          category: 'Image',
          s3Key: 'uploads/xray.jpg',
        },
      ],
      contextInfo: {
        ethnicity: 'White/Caucasian',
        gender: 'Male',
        diseaseType: 'Prostate Cancer',
        isFirstOccurrence: true,
        geneticFamilyHistory: ['Parents'],
      },
      consentAccepted: true,
      paymentId: 'txn_12345',
    }

    const request = createMockRequest(requestWithMultipleFiles)
    const response = await POST(request)

    expect(response.status).toBe(201)
    expect(mockPrisma.$transaction).toHaveBeenCalled()
  })

  it('triggers async operations after successful case creation', async () => {
    mockPrisma.$transaction.mockResolvedValue({
      caseId: 'CASE-123456789',
    })

    const validRequest = {
      personalInfo: {
        firstName: 'John',
        lastName: 'Doe',
        dob: '1990-01-01',
        email: 'john.doe@example.com',
        phone: '+1234567890',
      },
      medicalFiles: [],
      contextInfo: {},
      consentAccepted: true,
      paymentId: 'txn_12345',
    }

    const request = createMockRequest(validRequest)
    await POST(request)

    // Verify that async operations were triggered
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/ai-analysis'),
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: expect.stringContaining('"caseId"'),
      })
    )

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/acknowledgement'),
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: expect.stringContaining('"caseId"'),
      })
    )

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/payment-confirmation'),
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: expect.stringContaining('"caseId"'),
      })
    )
  })

  it('handles empty medical files array', async () => {
    mockPrisma.$transaction.mockResolvedValue({
      caseId: 'CASE-123456789',
    })

    const requestWithoutFiles = {
      personalInfo: {
        firstName: 'John',
        lastName: 'Doe',
        dob: '1990-01-01',
        email: 'john.doe@example.com',
        phone: '+1234567890',
      },
      medicalFiles: [],
      contextInfo: {},
      consentAccepted: true,
      paymentId: 'txn_12345',
    }

    const request = createMockRequest(requestWithoutFiles)
    const response = await POST(request)

    expect(response.status).toBe(201)
    expect(mockPrisma.$transaction).toHaveBeenCalled()
  })

  it('validates medical file structure', async () => {
    const requestWithInvalidFiles = {
      personalInfo: {
        firstName: 'John',
        lastName: 'Doe',
        dob: '1990-01-01',
        email: 'john.doe@example.com',
        phone: '+1234567890',
      },
      medicalFiles: [
        {
          name: 'test.pdf',
          // Missing required fields
        },
      ],
      contextInfo: {},
      consentAccepted: true,
      paymentId: 'txn_12345',
    }

    const request = createMockRequest(requestWithInvalidFiles)
    const response = await POST(request)

    expect(response.status).toBe(400)
  })
})

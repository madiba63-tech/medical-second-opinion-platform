import { CustomerRepository } from '../repository'

// Mock Prisma
jest.mock('@/lib/prisma', () => ({
  prisma: {
    customer: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      count: jest.fn(),
      aggregate: jest.fn(),
    },
    case: {
      findMany: jest.fn(),
      deleteMany: jest.fn(),
    },
    uploadedFile: {
      deleteMany: jest.fn(),
    },
    caseAssignment: {
      deleteMany: jest.fn(),
    },
    aIAnalysis: {
      deleteMany: jest.fn(),
    },
    medicalOpinion: {
      deleteMany: jest.fn(),
    },
    professionalPayment: {
      deleteMany: jest.fn(),
    },
    $transaction: jest.fn(),
  },
}))

describe('Repository Tests', () => {
  const mockPrisma = require('@/lib/prisma').prisma
  let customerRepository: CustomerRepository

  beforeEach(() => {
    jest.clearAllMocks()
    customerRepository = new CustomerRepository()
  })

  describe('CustomerRepository', () => {
    describe('create', () => {
      it('should create a customer successfully', async () => {
        const customerData = {
          firstName: 'John',
          lastName: 'Doe',
          dateOfBirth: new Date('1990-01-01'),
          email: 'john.doe@example.com',
          phone: '+1234567890',
          preferredChannel: 'EMAIL' as const,
          emailNotifications: true,
          smsNotifications: false,
        }

        const mockCustomer = {
          id: 'customer-123',
          customerId: 'CUST-123',
          ...customerData,
          createdAt: new Date(),
          updatedAt: new Date(),
        }

        mockPrisma.customer.create.mockResolvedValue(mockCustomer)

        const result = await customerRepository.create(customerData)

        expect(result).toEqual(mockCustomer)
        expect(mockPrisma.customer.create).toHaveBeenCalledWith({
          data: customerData
        })
      })

      it('should handle database errors when creating customer', async () => {
        const customerData = {
          firstName: 'John',
          lastName: 'Doe',
          dateOfBirth: new Date('1990-01-01'),
          email: 'john.doe@example.com',
          phone: '+1234567890',
          preferredChannel: 'EMAIL' as const,
          emailNotifications: true,
          smsNotifications: false,
        }

        mockPrisma.customer.create.mockRejectedValue(new Error('Database connection failed'))

        await expect(customerRepository.create(customerData))
          .rejects.toThrow('Database connection failed')
      })
    })

    describe('findById', () => {
      it('should retrieve a customer by ID successfully', async () => {
        const customerId = 'customer-123'
        const mockCustomer = {
          id: customerId,
          customerId: 'CUST-123',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          phone: '+1234567890',
          dateOfBirth: new Date('1990-01-01'),
          createdAt: new Date(),
          updatedAt: new Date(),
          cases: [],
        }

        mockPrisma.customer.findUnique.mockResolvedValue(mockCustomer)

        const result = await customerRepository.findById(customerId)

        expect(result).toEqual(mockCustomer)
        expect(mockPrisma.customer.findUnique).toHaveBeenCalledWith({
          where: { id: customerId },
          include: {
            cases: {
              select: {
                id: true,
                caseNumber: true,
                status: true,
                createdAt: true,
              },
              orderBy: { createdAt: 'desc' },
            },
          },
        })
      })

      it('should return null for non-existent customer', async () => {
        const customerId = 'non-existent-id'

        mockPrisma.customer.findUnique.mockResolvedValue(null)

        const result = await customerRepository.findById(customerId)

        expect(result).toBeNull()
      })

      it('should handle database errors when retrieving customer', async () => {
        const customerId = 'customer-123'

        mockPrisma.customer.findUnique.mockRejectedValue(new Error('Database error'))

        await expect(customerRepository.findById(customerId))
          .rejects.toThrow('Database error')
      })
    })

    describe('findByEmail', () => {
      it('should retrieve a customer by email successfully', async () => {
        const email = 'john.doe@example.com'
        const mockCustomer = {
          id: 'customer-123',
          customerId: 'CUST-123',
          firstName: 'John',
          lastName: 'Doe',
          email,
          phone: '+1234567890',
          dateOfBirth: new Date('1990-01-01'),
          createdAt: new Date(),
          updatedAt: new Date(),
          cases: [],
        }

        mockPrisma.customer.findUnique.mockResolvedValue(mockCustomer)

        const result = await customerRepository.findByEmail(email)

        expect(result).toEqual(mockCustomer)
        expect(mockPrisma.customer.findUnique).toHaveBeenCalledWith({
          where: { email },
          include: {
            cases: {
              select: {
                id: true,
                caseNumber: true,
                status: true,
                createdAt: true,
              },
              orderBy: { createdAt: 'desc' },
            },
          },
        })
      })
    })

    describe('findAll', () => {
      it('should retrieve all customers with pagination', async () => {
        const mockCustomers = [
          {
            id: 'customer-1',
            customerId: 'CUST-001',
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            createdAt: new Date(),
            _count: { cases: 2 },
          },
          {
            id: 'customer-2',
            customerId: 'CUST-002',
            firstName: 'Jane',
            lastName: 'Smith',
            email: 'jane.smith@example.com',
            createdAt: new Date(),
            _count: { cases: 1 },
          },
        ]

        mockPrisma.customer.findMany.mockResolvedValue(mockCustomers)
        mockPrisma.customer.count.mockResolvedValue(2)

        const result = await customerRepository.findAll({}, 1, 20)

        expect(result).toEqual({
          customers: mockCustomers,
          total: 2,
          page: 1,
          totalPages: 1,
        })
      })

      it('should filter customers by search term', async () => {
        const mockCustomers = [
          {
            id: 'customer-1',
            customerId: 'CUST-001',
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            createdAt: new Date(),
            _count: { cases: 2 },
          },
        ]

        mockPrisma.customer.findMany.mockResolvedValue(mockCustomers)
        mockPrisma.customer.count.mockResolvedValue(1)

        const result = await customerRepository.findAll({ search: 'John' }, 1, 20)

        expect(result.customers).toEqual(mockCustomers)
        expect(mockPrisma.customer.findMany).toHaveBeenCalledWith({
          where: {
            OR: [
              { firstName: { contains: 'John', mode: 'insensitive' } },
              { lastName: { contains: 'John', mode: 'insensitive' } },
              { email: { contains: 'John', mode: 'insensitive' } },
            ],
          },
          include: {
            _count: {
              select: {
                cases: true,
              },
            },
          },
          orderBy: { createdAt: 'desc' },
          skip: 0,
          take: 20,
        })
      })
    })

    describe('update', () => {
      it('should update a customer successfully', async () => {
        const customerId = 'customer-123'
        const updateData = {
          firstName: 'Jane',
          lastName: 'Smith',
          phone: '+1987654321',
        }

        const mockUpdatedCustomer = {
          id: customerId,
          customerId: 'CUST-123',
          ...updateData,
          email: 'john.doe@example.com',
          dateOfBirth: new Date('1990-01-01'),
          createdAt: new Date(),
          updatedAt: new Date(),
        }

        mockPrisma.customer.update.mockResolvedValue(mockUpdatedCustomer)

        const result = await customerRepository.update(customerId, updateData)

        expect(result).toEqual(mockUpdatedCustomer)
        expect(mockPrisma.customer.update).toHaveBeenCalledWith({
          where: { id: customerId },
          data: updateData,
        })
      })
    })

    describe('delete', () => {
      it('should delete a customer and all related data', async () => {
        const customerId = 'customer-123'
        const mockDeletedCustomer = {
          id: customerId,
          firstName: 'John',
          lastName: 'Doe',
        }

        const mockCases = [
          { id: 'case-1' },
          { id: 'case-2' },
        ]

        mockPrisma.$transaction.mockImplementation(async (callback) => {
          return await callback(mockPrisma)
        })

        mockPrisma.case.findMany.mockResolvedValue(mockCases)
        mockPrisma.customer.delete.mockResolvedValue(mockDeletedCustomer)

        const result = await customerRepository.delete(customerId)

        expect(result).toEqual(mockDeletedCustomer)
        expect(mockPrisma.$transaction).toHaveBeenCalled()
        expect(mockPrisma.case.findMany).toHaveBeenCalledWith({
          where: { customerId },
          select: { id: true },
        })
      })
    })

    describe('getStatistics', () => {
      it('should return customer statistics', async () => {
        mockPrisma.customer.count
          .mockResolvedValueOnce(100) // totalCustomers
          .mockResolvedValueOnce(75)  // customersWithCases

        mockPrisma.customer.aggregate.mockResolvedValue({
          _avg: {
            _count: {
              cases: 2.5,
            },
          },
        })

        const result = await customerRepository.getStatistics()

        expect(result).toEqual({
          total: 100,
          withCases: 75,
          averageCasesPerCustomer: 2.5,
        })
      })
    })
  })
})


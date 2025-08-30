import { prisma } from '@/lib/prisma';

export interface CustomerFilters {
  email?: string;
  dateFrom?: Date;
  dateTo?: Date;
  search?: string;
}

export class CustomerRepository {
  /**
   * Create a new customer
   */
  async create(data: {
    firstName: string;
    middleName?: string;
    lastName: string;
    dateOfBirth: Date;
    email: string;
    phone?: string;
    preferredChannel: 'EMAIL' | 'SMS';
    emailNotifications: boolean;
    smsNotifications: boolean;
  }) {
    return await prisma.customer.create({
      data,
    });
  }

  /**
   * Get customer by ID
   */
  async findById(id: string) {
    return await prisma.customer.findUnique({
      where: { id },
      include: {
        cases: {
          select: {
            id: true,
            caseNumber: true,
            createdAt: true,
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    });
  }

  /**
   * Get customer by email
   */
  async findByEmail(email: string) {
    return await prisma.customer.findUnique({
      where: { email },
      include: {
        cases: {
          select: {
            id: true,
            caseNumber: true,
            createdAt: true,
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    });
  }

  /**
   * Get all customers with filtering and pagination
   */
  async findAll(
    filters: CustomerFilters = {},
    page: number = 1,
    limit: number = 20
  ): Promise<{
    customers: any[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    const skip = (page - 1) * limit;
    
    // Build where clause
    const where: any = {};
    
    if (filters.email) {
      where.email = { contains: filters.email, mode: 'insensitive' };
    }
    
    if (filters.dateFrom || filters.dateTo) {
      where.createdAt = {};
      if (filters.dateFrom) {
        where.createdAt.gte = filters.dateFrom;
      }
      if (filters.dateTo) {
        where.createdAt.lte = filters.dateTo;
      }
    }
    
    if (filters.search) {
      where.OR = [
        { firstName: { contains: filters.search, mode: 'insensitive' } },
        { lastName: { contains: filters.search, mode: 'insensitive' } },
        { email: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    const [customers, total] = await Promise.all([
      prisma.customer.findMany({
        where,
        include: {
          _count: {
            select: {
              cases: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.customer.count({ where }),
    ]);

    return {
      customers,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  /**
   * Update customer data
   */
  async update(id: string, data: Partial<{
    firstName: string;
    middleName: string;
    lastName: string;
    dateOfBirth: Date;
    email: string;
    phone: string;
    preferredChannel: 'EMAIL' | 'SMS';
    emailNotifications: boolean;
    smsNotifications: boolean;
  }>) {
    return await prisma.customer.update({
      where: { id },
      data,
    });
  }

  /**
   * Delete customer and all related data
   */
  async delete(id: string) {
    return await prisma.$transaction(async (tx) => {
      // Delete all cases for this customer
      const cases = await tx.case.findMany({
        where: { customerId: id },
        select: { id: true },
      });

      for (const caseRecord of cases) {
        // Delete related files
        await tx.uploadedFile.deleteMany({
          where: { caseId: caseRecord.id },
        });

        // Delete case assignments
        await tx.caseAssignment.deleteMany({
          where: { caseId: caseRecord.id },
        });

        // Delete AI analyses
        await tx.aIAnalysis.deleteMany({
          where: { caseId: caseRecord.id },
        });

        // Delete medical opinions
        await tx.medicalOpinion.deleteMany({
          where: { caseId: caseRecord.id },
        });

        // Delete professional payments
        await tx.professionalPayment.deleteMany({
          where: { caseId: caseRecord.id },
        });
      }

      // Delete all cases
      await tx.case.deleteMany({
        where: { customerId: id },
      });

      // Finally delete the customer
      return await tx.customer.delete({
        where: { id },
      });
    });
  }

  /**
   * Get customer statistics
   */
  async getStatistics() {
    const [
      totalCustomers,
      customersWithCases,
      averageCasesPerCustomer,
    ] = await Promise.all([
      prisma.customer.count(),
      prisma.customer.count({
        where: {
          cases: {
            some: {},
          },
        },
      }),
      prisma.customer.aggregate({
        _avg: {
          _count: {
            cases: true,
          },
        },
      }),
    ]);

    return {
      total: totalCustomers,
      withCases: customersWithCases,
      averageCasesPerCustomer: averageCasesPerCustomer._avg._count?.cases || 0,
    };
  }
}

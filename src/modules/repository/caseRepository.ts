import { prisma } from '@/lib/prisma';
import { z } from 'zod';

export interface CaseFilters {
  status?: string;
  customerId?: string;
  dateFrom?: Date;
  dateTo?: Date;
  search?: string;
}

export interface CaseWithRelations {
  id: string;
  caseNumber: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  dateOfBirth: Date;
  email: string;
  phone?: string;
  ethnicity?: string;
  gender?: string;
  diseaseType?: string;
  isFirstOccurrence?: boolean;
  geneticFamilyHistory?: string;
  paymentId?: string;
  consentAccepted: boolean;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  customerId: string;
  files: Array<{
    id: string;
    fileName: string;
    originalName: string;
    fileSize: number;
    mimeType: string;
    category: string;
    s3Key: string;
    createdAt: Date;
  }>;
  customer?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  assignments?: Array<{
    id: string;
    professionalId: string;
    status: string;
    assignedAt: Date;
    completedAt?: Date;
    professional?: {
      id: string;
      firstName: string;
      lastName: string;
      specialty: string;
    };
  }>;
}

export class CaseRepository {
  /**
   * Create a new case
   */
  async create(data: {
    firstName: string;
    middleName?: string;
    lastName: string;
    dateOfBirth: Date;
    email: string;
    phone?: string;
    ethnicity?: string;
    gender?: string;
    diseaseType?: string;
    isFirstOccurrence?: boolean;
    geneticFamilyHistory?: string;
    paymentId?: string;
    consentAccepted: boolean;
    customerId: string;
  }) {
    return await prisma.case.create({
      data: {
        ...data,
        geneticFamilyHistory: data.geneticFamilyHistory ? JSON.stringify(data.geneticFamilyHistory) : null,
        status: 'submitted',
      },
    });
  }

  /**
   * Get case by ID with all relations
   */
  async findById(id: string): Promise<CaseWithRelations | null> {
    return await prisma.case.findUnique({
      where: { id },
      include: {
        files: true,
        customer: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        assignments: {
          include: {
            professional: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                specialty: true,
              },
            },
          },
        },
      },
    });
  }

  /**
   * Get case by case number
   */
  async findByCaseNumber(caseNumber: string): Promise<CaseWithRelations | null> {
    return await prisma.case.findUnique({
      where: { caseNumber },
      include: {
        files: true,
        customer: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        assignments: {
          include: {
            professional: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                specialty: true,
              },
            },
          },
        },
      },
    });
  }

  /**
   * Get all cases with filtering and pagination
   */
  async findAll(
    filters: CaseFilters = {},
    page: number = 1,
    limit: number = 20
  ): Promise<{
    cases: CaseWithRelations[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    const skip = (page - 1) * limit;
    
    // Build where clause
    const where: any = {};
    
    if (filters.status) {
      where.status = filters.status;
    }
    
    if (filters.customerId) {
      where.customerId = filters.customerId;
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
        { firstName: { contains: filters.search } },
        { lastName: { contains: filters.search } },
        { email: { contains: filters.search } },
        { caseNumber: { contains: filters.search } },
      ];
    }

    const [cases, total] = await Promise.all([
      prisma.case.findMany({
        where,
        include: {
          files: true,
          customer: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
          assignments: {
            include: {
              professional: {
                select: {
                  id: true,
                  firstName: true,
                  lastName: true,
                  specialty: true,
                },
              },
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.case.count({ where }),
    ]);

    return {
      cases,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  /**
   * Update case status
   */
  async updateStatus(id: string, status: string) {
    return await prisma.case.update({
      where: { id },
      data: { status },
    });
  }

  /**
   * Update case data
   */
  async update(id: string, data: Partial<{
    firstName: string;
    middleName: string;
    lastName: string;
    dateOfBirth: Date;
    email: string;
    phone: string;
    ethnicity: string;
    gender: string;
    diseaseType: string;
    isFirstOccurrence: boolean;
    geneticFamilyHistory: string;
    status: string;
  }>) {
    return await prisma.case.update({
      where: { id },
      data: {
        ...data,
        geneticFamilyHistory: data.geneticFamilyHistory ? JSON.stringify(data.geneticFamilyHistory) : undefined,
      },
    });
  }

  /**
   * Delete case and all related data
   */
  async delete(id: string) {
    return await prisma.$transaction(async (tx) => {
      // Delete related files
      await tx.uploadedFile.deleteMany({
        where: { caseId: id },
      });

      // Delete case assignments
      await tx.caseAssignment.deleteMany({
        where: { caseId: id },
      });

      // Delete AI analyses
      await tx.aIAnalysis.deleteMany({
        where: { caseId: id },
      });

      // Delete medical opinions
      await tx.medicalOpinion.deleteMany({
        where: { caseId: id },
      });

      // Delete professional payments
      await tx.professionalPayment.deleteMany({
        where: { caseId: id },
      });

      // Finally delete the case
      return await tx.case.delete({
        where: { id },
      });
    });
  }

  /**
   * Get case statistics
   */
  async getStatistics() {
    const [
      totalCases,
      submittedCases,
      inProgressCases,
      completedCases,
      rejectedCases,
    ] = await Promise.all([
      prisma.case.count(),
      prisma.case.count({ where: { status: 'submitted' } }),
      prisma.case.count({ where: { status: 'in_progress' } }),
      prisma.case.count({ where: { status: 'completed' } }),
      prisma.case.count({ where: { status: 'rejected' } }),
    ]);

    return {
      total: totalCases,
      submitted: submittedCases,
      inProgress: inProgressCases,
      completed: completedCases,
      rejected: rejectedCases,
    };
  }

  /**
   * Get cases by status
   */
  async getCasesByStatus(status: string, limit: number = 10) {
    return await prisma.case.findMany({
      where: { status },
      include: {
        customer: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        files: {
          select: {
            id: true,
            fileName: true,
            category: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  }
}

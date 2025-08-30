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
  createdAt: Date;
  updatedAt: Date;
  customerId: string;
  uploadedFiles: Array<{
    id: string;
    filename: string;
    s3Key: string;
    mimetype: string;
    size: number;
    category: string;
    createdAt: Date;
  }>;
  customer?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  caseAssignments?: Array<{
    id: string;
    professionalId: string;
    // status field not available in current schema
    assignedAt: Date;
    completedAt?: Date;
    professional?: {
      id: string;
      firstName: string;
      lastName: string;
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
        caseNumber: `CASE-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
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
        uploadedFiles: true,
        customer: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        caseAssignments: {
          include: {
            professional: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
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
        uploadedFiles: true,
        customer: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        caseAssignments: {
          include: {
            professional: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
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
    
    // Note: status filtering disabled until status field is added to schema
    
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
          uploadedFiles: true,
          customer: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
          caseAssignments: {
            include: {
              professional: {
                select: {
                  id: true,
                  firstName: true,
                  lastName: true,
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

  // Status updates disabled until status field is added to schema

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
    // status field not available in current schema
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
    const totalCases = await prisma.case.count();
    
    return {
      total: totalCases,
      // Status-based stats disabled until schema includes status field
    };
  }

  /**
   * Get cases by status
   */
  async getRecentCases(limit: number = 10) {
    return await prisma.case.findMany({
      include: {
        customer: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        uploadedFiles: {
          select: {
            id: true,
            filename: true,
            category: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  }
}

import { prisma } from '@/lib/prisma';

export interface ProfessionalFilters {
  specialty?: string;
  status?: string;
  dateFrom?: Date;
  dateTo?: Date;
  search?: string;
}

export class ProfessionalRepository {
  /**
   * Create a new professional
   */
  async create(data: {
    professionalId: string;
    firstName: string;
    lastName: string;
    email: string;
    specialty: string;
    licenseNumber: string;
    status: string;
  }) {
    return await prisma.medicalProfessional.create({
      data,
    });
  }

  /**
   * Get professional by ID
   */
  async findById(id: string) {
    return await prisma.medicalProfessional.findUnique({
      where: { id },
      include: {
        assignments: {
          include: {
            case: {
              select: {
                id: true,
                caseNumber: true,
                firstName: true,
                lastName: true,
                status: true,
              },
            },
          },
          orderBy: { assignedAt: 'desc' },
        },
        opinions: {
          include: {
            case: {
              select: {
                id: true,
                caseNumber: true,
                firstName: true,
                lastName: true,
              },
            },
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    });
  }

  /**
   * Get professional by email
   */
  async findByEmail(email: string) {
    return await prisma.medicalProfessional.findUnique({
      where: { email },
    });
  }

  /**
   * Get all professionals with filtering and pagination
   */
  async findAll(
    filters: ProfessionalFilters = {},
    page: number = 1,
    limit: number = 20
  ): Promise<{
    professionals: any[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    const skip = (page - 1) * limit;
    
    // Build where clause
    const where: any = {};
    
    if (filters.specialty) {
      where.specialty = filters.specialty;
    }
    
    if (filters.status) {
      where.status = filters.status;
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
        { specialty: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    const [professionals, total] = await Promise.all([
      prisma.medicalProfessional.findMany({
        where,
        include: {
          _count: {
            select: {
              assignments: true,
              opinions: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.medicalProfessional.count({ where }),
    ]);

    return {
      professionals,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  /**
   * Update professional data
   */
  async update(id: string, data: Partial<{
    firstName: string;
    lastName: string;
    email: string;
    specialty: string;
    licenseNumber: string;
    status: string;
  }>) {
    return await prisma.medicalProfessional.update({
      where: { id },
      data,
    });
  }

  /**
   * Update professional status
   */
  async updateStatus(id: string, status: string) {
    return await prisma.medicalProfessional.update({
      where: { id },
      data: { status },
    });
  }

  /**
   * Delete professional and all related data
   */
  async delete(id: string) {
    return await prisma.$transaction(async (tx) => {
      // Delete case assignments
      await tx.caseAssignment.deleteMany({
        where: { professionalId: id },
      });

      // Delete medical opinions
      await tx.medicalOpinion.deleteMany({
        where: { professionalId: id },
      });

      // Delete professional payments
      await tx.professionalPayment.deleteMany({
        where: { professionalId: id },
      });

      // Finally delete the professional
      return await tx.medicalProfessional.delete({
        where: { id },
      });
    });
  }

  /**
   * Get professional statistics
   */
  async getStatistics() {
    const [
      totalProfessionals,
      activeProfessionals,
      professionalsBySpecialty,
      averageAssignmentsPerProfessional,
    ] = await Promise.all([
      prisma.medicalProfessional.count(),
      prisma.medicalProfessional.count({ where: { status: 'active' } }),
      prisma.medicalProfessional.groupBy({
        by: ['specialty'],
        _count: {
          id: true,
        },
      }),
      prisma.medicalProfessional.aggregate({
        _avg: {
          _count: {
            assignments: true,
          },
        },
      }),
    ]);

    return {
      total: totalProfessionals,
      active: activeProfessionals,
      bySpecialty: professionalsBySpecialty.reduce((acc, item) => {
        acc[item.specialty] = item._count.id;
        return acc;
      }, {} as Record<string, number>),
      averageAssignments: averageAssignmentsPerProfessional._avg._count?.assignments || 0,
    };
  }

  /**
   * Get professionals by specialty
   */
  async findBySpecialty(specialty: string) {
    return await prisma.medicalProfessional.findMany({
      where: { 
        specialty,
        status: 'active',
      },
      include: {
        _count: {
          select: {
            assignments: true,
            opinions: true,
          },
        },
      },
      orderBy: { lastName: 'asc' },
    });
  }

  /**
   * Get available professionals for case assignment
   */
  async getAvailableProfessionals(specialty?: string) {
    const where: any = {
      status: 'active',
    };

    if (specialty) {
      where.specialty = specialty;
    }

    return await prisma.medicalProfessional.findMany({
      where,
      include: {
        _count: {
          select: {
            assignments: {
              where: {
                status: 'in_progress',
              },
            },
          },
        },
      },
      orderBy: [
        { _count: { assignments: 'asc' } },
        { lastName: 'asc' },
      ],
    });
  }
}

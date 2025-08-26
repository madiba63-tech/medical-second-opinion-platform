import { prisma } from '@/lib/prisma';

export interface FileFilters {
  caseId?: string;
  category?: string;
  dateFrom?: Date;
  dateTo?: Date;
}

export class FileRepository {
  /**
   * Create a new file record
   */
  async create(data: {
    caseId: string;
    fileName: string;
    originalName: string;
    fileSize: number;
    mimeType: string;
    category: string;
    s3Key: string;
  }) {
    return await prisma.uploadedFile.create({
      data,
    });
  }

  /**
   * Get file by ID
   */
  async findById(id: string) {
    return await prisma.uploadedFile.findUnique({
      where: { id },
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
    });
  }

  /**
   * Get files by case ID
   */
  async findByCaseId(caseId: string) {
    return await prisma.uploadedFile.findMany({
      where: { caseId },
      orderBy: { createdAt: 'asc' },
    });
  }

  /**
   * Get all files with filtering
   */
  async findAll(filters: FileFilters = {}) {
    const where: any = {};

    if (filters.caseId) {
      where.caseId = filters.caseId;
    }

    if (filters.category) {
      where.category = filters.category;
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

    return await prisma.uploadedFile.findMany({
      where,
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
    });
  }

  /**
   * Update file data
   */
  async update(id: string, data: Partial<{
    fileName: string;
    originalName: string;
    category: string;
  }>) {
    return await prisma.uploadedFile.update({
      where: { id },
      data,
    });
  }

  /**
   * Delete file
   */
  async delete(id: string) {
    return await prisma.uploadedFile.delete({
      where: { id },
    });
  }

  /**
   * Delete all files for a case
   */
  async deleteByCaseId(caseId: string) {
    return await prisma.uploadedFile.deleteMany({
      where: { caseId },
    });
  }

  /**
   * Get file statistics
   */
  async getStatistics() {
    const [
      totalFiles,
      totalSize,
      filesByCategory,
    ] = await Promise.all([
      prisma.uploadedFile.count(),
      prisma.uploadedFile.aggregate({
        _sum: {
          fileSize: true,
        },
      }),
      prisma.uploadedFile.groupBy({
        by: ['category'],
        _count: {
          id: true,
        },
      }),
    ]);

    return {
      totalFiles,
      totalSize: totalSize._sum.fileSize || 0,
      filesByCategory: filesByCategory.reduce((acc, item) => {
        acc[item.category] = item._count.id;
        return acc;
      }, {} as Record<string, number>),
    };
  }
}

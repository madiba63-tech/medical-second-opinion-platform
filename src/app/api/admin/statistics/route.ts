import { NextRequest, NextResponse } from 'next/server';
import { CaseRepository } from '@/modules/repository/caseRepository';
import { CustomerRepository } from '@/modules/repository/customerRepository';
import { ProfessionalRepository } from '@/modules/repository/professionalRepository';
import { FileRepository } from '@/modules/repository/fileRepository';

const caseRepository = new CaseRepository();
const customerRepository = new CustomerRepository();
const professionalRepository = new ProfessionalRepository();
const fileRepository = new FileRepository();

export async function GET(req: NextRequest) {
  try {
    const [
      caseStats,
      customerStats,
      professionalStats,
      fileStats,
    ] = await Promise.all([
      caseRepository.getStatistics().catch(() => ({ total: 0, submitted: 0, inProgress: 0, completed: 0, rejected: 0 })),
      customerRepository.getStatistics().catch(() => ({ total: 0, active: 0, inactive: 0, churned: 0 })),
      professionalRepository.getStatistics().catch(() => ({ total: 0, active: 0, pending: 0, inactive: 0 })),
      fileRepository.getStatistics().catch(() => ({ totalFiles: 0, totalSize: 0, averageSize: 0 })),
    ]);

    const statistics = {
      cases: caseStats,
      customers: customerStats,
      professionals: professionalStats,
      files: fileStats,
      system: {
        totalCases: caseStats.total,
        totalCustomers: customerStats.total,
        totalProfessionals: professionalStats.total,
        totalFiles: fileStats.totalFiles,
        totalStorageUsed: fileStats.totalSize,
      },
    };
    
    return NextResponse.json(statistics);
  } catch (error) {
    console.error('Error fetching statistics:', error);
    
    // Return fallback data instead of error
    const fallbackStatistics = {
      cases: { total: 0, submitted: 0, inProgress: 0, completed: 0, rejected: 0 },
      customers: { total: 0, active: 0, inactive: 0, churned: 0 },
      professionals: { total: 0, active: 0, pending: 0, inactive: 0 },
      files: { totalFiles: 0, totalSize: 0, averageSize: 0 },
      system: {
        totalCases: 0,
        totalCustomers: 0,
        totalProfessionals: 0,
        totalFiles: 0,
        totalStorageUsed: 0,
      },
    };
    
    return NextResponse.json(fallbackStatistics);
  }
}

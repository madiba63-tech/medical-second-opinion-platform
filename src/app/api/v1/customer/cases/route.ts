import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const customerId = searchParams.get('customerId');
    
    if (!customerId) {
      return NextResponse.json(
        { error: 'Customer ID is required' },
        { status: 400 }
      );
    }

    const cases = await prisma.case.findMany({
      where: { customerId },
      include: {
        uploadedFiles: {
          select: {
            id: true,
            filename: true,
            category: true,
            size: true,
            createdAt: true,
          },
        },
        caseAssignments: {
          include: {
            professional: {
              select: {
                firstName: true,
                lastName: true,
                specialty: true,
              },
            },
          },
        },
        medicalOpinions: {
          where: { status: 'final' },
          select: {
            id: true,
            content: true,
            createdAt: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    const formattedCases = cases.map(caseItem => ({
      id: caseItem.id,
      caseNumber: caseItem.caseNumber,
      diseaseType: caseItem.diseaseType,
      status: getCaseStatus(caseItem),
      submittedDate: caseItem.createdAt,
      assignedTo: caseItem.caseAssignments[0]?.professional ? 
        `${caseItem.caseAssignments[0].professional.firstName} ${caseItem.caseAssignments[0].professional.lastName}` : 
        undefined,
      filesCount: caseItem.uploadedFiles.length,
      hasFinalOpinion: caseItem.medicalOpinions.length > 0,
      finalOpinionUrl: caseItem.medicalOpinions.length > 0 ? 
        `/api/v1/customer/cases/${caseItem.caseNumber}/opinion` : 
        undefined,
    }));

    return NextResponse.json({
      success: true,
      cases: formattedCases,
    });

  } catch (error) {
    console.error('Get customer cases error:', error);
    return NextResponse.json(
      { error: 'Failed to get customer cases' },
      { status: 500 }
    );
  }
}

function getCaseStatus(caseItem: any): string {
  // Determine status based on case assignments and opinions
  if (caseItem.medicalOpinions.length > 0) {
    return 'delivered';
  }
  
  if (caseItem.caseAssignments.length > 0) {
    const assignment = caseItem.caseAssignments[0];
    if (assignment.status === 'completed') {
      return 'peer_review';
    }
    if (assignment.status === 'in_progress') {
      return 'under_review';
    }
    if (assignment.status === 'assigned') {
      return 'assigned';
    }
  }
  
  if (caseItem.uploadedFiles.length > 0) {
    return 'processing';
  }
  
  return 'submitted';
}

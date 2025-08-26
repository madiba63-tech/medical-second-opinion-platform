import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';
import { ProfessionalApplication } from '@/types/professional';
import { calculateCompetencyScore } from '@/utils/competencyScoring';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const application = ProfessionalApplication.parse(body);

    // Check if professional already exists
    const existingProfessional = await prisma.medicalProfessional.findUnique({
      where: { email: application.email },
    });

    if (existingProfessional) {
      return NextResponse.json(
        { error: 'Professional with this email already exists' },
        { status: 409 }
      );
    }

    // Calculate competency score
    const competencyScore = calculateCompetencyScore(application);

    // Generate professional number
    const proNumber = `PRO-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Prepare documents array
    const documents = [
      application.governmentId,
      application.medicalDegree,
      application.residencyCertificate,
      application.fellowshipCertificate,
      application.boardCertification.certificate,
      application.licenseCertificate,
      application.goodStandingCertificate,
      application.cv,
      ...(application.additionalCertificates || []),
      ...(application.representativePublications || []),
      ...(application.malpracticeInsurance ? [application.malpracticeInsurance] : []),
    ];

    // Create professional record
    const professional = await prisma.medicalProfessional.create({
      data: {
        proNumber,
        firstName: application.firstName,
        middleName: application.middleName,
        lastName: application.lastName,
        dob: new Date(application.dob),
        email: application.email,
        phone: application.phone,
        nationality: application.nationality,
        licenseNumber: application.licenseNumber,
        licenseCountry: application.licenseCountry,
        licenseExpiry: new Date(application.licenseExpiry),
        vetted: false,
        level: competencyScore.level,
        cvUrl: application.cv.s3Key,
        documents: documents,
        subspecialties: JSON.stringify(application.subspecialties),
        yearsPractice: application.yearsPractice,
        publications: application.publications,
        trialInvolved: application.clinicalTrials.involved,
        leadership: application.leadershipRoles,
        societyMemberships: JSON.stringify(application.societyMemberships),
        score: competencyScore.totalScore,
      },
    });

    return NextResponse.json({
      success: true,
      professionalId: professional.id,
      proNumber: professional.proNumber,
      level: professional.level,
      score: professional.score,
      message: 'Application submitted successfully',
    });

  } catch (error) {
    console.error('Professional application error:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('validation')) {
        return NextResponse.json(
          { error: 'Invalid application data' },
          { status: 400 }
        );
      }
      
      if (error.message.includes('Unique constraint')) {
        return NextResponse.json(
          { error: 'Professional with this email already exists' },
          { status: 409 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Application submission failed. Please try again.' },
      { status: 500 }
    );
  }
}

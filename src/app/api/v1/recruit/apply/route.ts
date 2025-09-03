import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';
import { ProfessionalApplication } from '@/types/professional';
import { calculateCompetencyScore } from '@/utils/competencyScoring';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Received application data:', JSON.stringify(body, null, 2));

    // Helper function to get first file from array or single file
    const getFileRef = (fileData: any) => {
      if (!fileData) return null;
      if (Array.isArray(fileData)) {
        return fileData.length > 0 ? fileData[0] : null;
      }
      return fileData;
    };

    // Prepare the data for validation by transforming arrays to single objects where needed
    const transformedData = {
      ...body,
      // Handle field name mappings between different frontend systems
      dob: body.dob || body.dateOfBirth,
      yearsPractice: parseInt(body.yearsPractice || body.yearsIndependentPractice) || 0,
      publications: parseInt(body.publications || body.peerReviewedPublications) || 0,
      societyMemberships: body.societyMemberships || body.oncologySocieties || [],
      references: body.references || body.professionalReferences || [],
      noDisciplinaryProceedings: !!(body.noDisciplinaryProceedings || body.noActiveDisciplinary),
      dataProtectionAgreement: !!(body.dataProtectionAgreement || body.dataProtectionAgreed),
      licenseNumber: body.licenseNumber || body.medicalLicenseNumber,
      // Transform file arrays to single objects for validation
      medicalDegree: getFileRef(body.medicalDegree),
      residencyCertificate: getFileRef(body.residencyCertificate),
      fellowshipCertificate: getFileRef(body.fellowshipCertificate),
      licenseCertificate: getFileRef(body.licenseCertificate),
      goodStandingCertificate: getFileRef(body.goodStandingCertificate),
      cv: getFileRef(body.cv),
      malpracticeInsurance: getFileRef(body.malpracticeInsurance),
      // Transform boardCertification if it has certificate array
      boardCertification: body.boardCertification ? {
        number: body.boardCertification.number || body.boardCertificationNumber || '',
        certificate: getFileRef(body.boardCertification.certificate || body.boardCertification)
      } : { number: body.boardCertificationNumber || '', certificate: null },
      // Ensure required fields have defaults
      subspecialties: body.subspecialties || [],
      annualPatientLoad: parseInt(body.annualPatientLoad) || 0,
      previousSecondOpinions: parseInt(body.previousSecondOpinions || body.secondOpinionsGiven) || 0,
      clinicalTrials: body.clinicalTrials || { 
        involved: body.clinicalTrialInvolvement || false,
        description: body.clinicalTrialDetails || ''
      },
      conferencePresentations: body.conferencePresentations || { 
        involved: !!body.conferencePresentations,
        details: body.conferenceDetails || ''
      },
      teachingRoles: body.teachingRoles || { 
        involved: !!body.teachingRoles,
        details: body.teachingDetails || ''
      },
    };

    console.log('Transformed data for validation:', JSON.stringify(transformedData, null, 2));

    // Validate using relaxed validation that allows missing optional fields
    let application;
    try {
      application = ProfessionalApplication.parse(transformedData);
    } catch (validationError) {
      console.error('Detailed validation error:', validationError);
      console.error('Transformed data causing error:', JSON.stringify(transformedData, null, 2));
      return NextResponse.json(
        { 
          error: 'Invalid application data', 
          details: validationError,
          transformedData: transformedData // Include transformed data for debugging
        },
        { status: 400 }
      );
    }

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
    let competencyScore;
    try {
      competencyScore = calculateCompetencyScore(application);
      console.log('Competency score calculated:', competencyScore);
    } catch (scoringError) {
      console.error('Competency scoring error:', scoringError);
      return NextResponse.json(
        { error: 'Competency scoring failed', details: scoringError.message },
        { status: 500 }
      );
    }

    // Generate professional number
    const proNumber = `PRO-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Prepare documents array - safely handle potential null values
    const documents = [
      application.governmentId,
      application.medicalDegree,
      application.residencyCertificate,
      application.fellowshipCertificate,
      application.boardCertification?.certificate,
      application.licenseCertificate,
      application.goodStandingCertificate,
      application.cv,
      ...(body.additionalCertificates || []),
      ...(body.representativePublications || []),
      ...(application.malpracticeInsurance ? [application.malpracticeInsurance] : []),
    ].filter(Boolean); // Remove null/undefined values

    // Create professional record with safe field access
    let professional;
    try {
      console.log('Creating professional with data:', {
        proNumber,
        firstName: application.firstName,
        lastName: application.lastName,
        email: application.email,
        level: competencyScore.level,
        score: competencyScore.totalScore,
      });
      
      professional = await prisma.medicalProfessional.create({
        data: {
          proNumber,
          firstName: application.firstName,
          middleName: application.middleName || null,
          lastName: application.lastName,
          dob: new Date(application.dob),
          email: application.email,
          phone: application.phone || null,
          nationality: application.nationality,
          licenseNumber: application.licenseNumber,
          licenseCountry: application.licenseCountry,
          licenseExpiry: new Date(application.licenseExpiry),
          vetted: false,
          level: competencyScore.level,
          cvUrl: application.cv?.s3Key || null,
          documents: documents,
          subspecialties: JSON.stringify(application.subspecialties),
          yearsPractice: application.yearsPractice,
          publications: application.publications,
          trialInvolved: application.clinicalTrials?.involved || false,
          leadership: application.leadershipRoles || null,
          societyMemberships: JSON.stringify(application.societyMemberships),
          score: competencyScore.totalScore,
        },
      });
      console.log('Professional created successfully:', professional.id);
    } catch (dbError) {
      console.error('Database creation error:', dbError);
      return NextResponse.json(
        { error: 'Database operation failed', details: dbError.message },
        { status: 500 }
      );
    }

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

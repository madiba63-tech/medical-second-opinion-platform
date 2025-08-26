import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

export async function POST(
  request: NextRequest,
  { params }: { params: { caseNumber: string } }
) {
  try {
    const caseNumber = params.caseNumber;
    const body = await request.json();

    // Get the original case
    const originalCase = await prisma.case.findUnique({
      where: { caseNumber },
      include: {
        customer: true,
        uploadedFiles: true,
      },
    });

    if (!originalCase) {
      return NextResponse.json(
        { error: 'Original case not found' },
        { status: 404 }
      );
    }

    // Generate new case number
    const newCaseNumber = `CASE-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Create new case with data from original case and updates
    const newCase = await prisma.case.create({
      data: {
        caseNumber: newCaseNumber,
        customerId: originalCase.customerId,
        firstName: body.personalInfo?.firstName || originalCase.firstName,
        middleName: body.personalInfo?.middleName || originalCase.middleName,
        lastName: body.personalInfo?.lastName || originalCase.lastName,
        dateOfBirth: body.personalInfo?.dob ? new Date(body.personalInfo.dob) : originalCase.dateOfBirth,
        email: body.personalInfo?.email || originalCase.email,
        phone: body.personalInfo?.phone || originalCase.phone,
        ethnicity: body.contextInfo?.ethnicity || originalCase.ethnicity,
        gender: body.contextInfo?.gender || originalCase.gender,
        diseaseType: body.contextInfo?.diseaseType || originalCase.diseaseType,
        isFirstOccurrence: body.contextInfo?.isFirstOccurrence ?? originalCase.isFirstOccurrence,
        geneticFamilyHistory: body.contextInfo?.geneticFamilyHistory ? 
          JSON.stringify(body.contextInfo.geneticFamilyHistory) : originalCase.geneticFamilyHistory,
        consentAccepted: true,
      },
    });

    // Copy files from original case if no new files provided
    if (!body.medicalFiles || body.medicalFiles.length === 0) {
      // Copy original files to new case
      for (const file of originalCase.uploadedFiles) {
        await prisma.uploadedFile.create({
          data: {
            caseId: newCase.id,
            filename: file.filename,
            s3Key: file.s3Key,
            mimetype: file.mimetype,
            size: file.size,
            category: file.category,
          },
        });
      }
    } else {
      // Create new files
      await prisma.uploadedFile.createMany({
        data: body.medicalFiles.map((file: any) => ({
          caseId: newCase.id,
          filename: file.name,
          s3Key: file.s3Key,
          mimetype: file.type,
          size: file.size,
          category: file.category,
        })),
      });
    }

    // Create a reference to the original case (optional)
    await prisma.case.update({
      where: { id: newCase.id },
      data: {
        // You could add a field to track the original case
        // originalCaseId: originalCase.id,
      },
    });

    return NextResponse.json({
      success: true,
      newCaseId: newCase.id,
      newCaseNumber: newCase.caseNumber,
      originalCaseNumber: caseNumber,
      message: 'Case resubmitted successfully',
    });

  } catch (error) {
    console.error('Case resubmission error:', error);
    return NextResponse.json(
      { error: 'Failed to resubmit case' },
      { status: 500 }
    );
  }
}

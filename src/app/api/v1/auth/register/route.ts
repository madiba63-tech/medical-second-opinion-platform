import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';
import { RegisterPayload, CustomerProfile } from '@/types/auth';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      email, password, tempId, firstName, middleName, lastName, dob, 
      gender, countryOfResidence, ethnicity, phone, preferredChannel, languagePreference 
    } = RegisterPayload.parse(body);
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Start transaction
    const result = await prisma.$transaction(async (tx) => {
      // Create user
      const user = await tx.user.create({
        data: {
          email,
          hashedPassword,
        },
      });

      // Map frontend values to database enums
      const mapGender = (gender: string | undefined) => {
        switch (gender?.toLowerCase()) {
          case 'male': return 'MALE';
          case 'female': return 'FEMALE';
          case 'non-binary': return 'PREFER_NOT_TO_SAY';
          case 'other': return 'PREFER_NOT_TO_SAY';
          case "don't know / prefer not to tell": return 'PREFER_NOT_TO_SAY';
          default: return 'PREFER_NOT_TO_SAY';
        }
      };

      const mapLanguage = (language: string | undefined) => {
        switch (language?.toLowerCase()) {
          case 'english': return 'ENGLISH';
          case 'german': return 'GERMAN';
          default: return 'ENGLISH';
        }
      };

      const mapChannel = (channel: string | undefined) => {
        switch (channel?.toLowerCase()) {
          case 'email': return 'EMAIL';
          case 'sms': return 'SMS';
          case 'whatsapp': return 'WHATSAPP';
          default: return 'EMAIL';
        }
      };

      // Create customer profile with metadata for additional fields
      const customerMetadata = {
        countryOfResidence,
        ethnicity,
        registrationSource: 'web',
        enhancedQuestionnaire: true
      };

      const customer = await tx.customer.create({
        data: {
          firstName,
          middleName,
          lastName,
          dateOfBirth: new Date(dob),
          gender: mapGender(gender),
          email,
          phone,
          preferredChannel: mapChannel(preferredChannel),
          preferredLanguage: mapLanguage(languagePreference),
          metadata: customerMetadata,
          hashedPassword, // Customer also needs the hashed password
          user: {
            connect: { id: user.id },
          },
        },
      });

      // If tempId provided, create case from temp submission
      let caseId = null;
      if (tempId) {
        const tempSubmission = await tx.tempSubmission.findUnique({
          where: { id: tempId },
        });

        if (tempSubmission && tempSubmission.expiresAt > new Date()) {
          const payload = tempSubmission.payload as any;
          
          // Generate case number
          const caseNumber = `CASE-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
          
          // Create case
          const caseRecord = await tx.medicalCase.create({
            data: {
              caseNumber,
              customerId: customer.id,
              firstName,
              middleName,
              lastName,
              dateOfBirth: new Date(dob),
              email,
              phone,
              title: `Medical Second Opinion Case - ${payload.contextInfo?.cancerType || payload.contextInfo?.diseaseType || 'General'}`,
              description: `Second opinion request for ${payload.contextInfo?.cancerType || payload.contextInfo?.diseaseType || 'medical condition'}`,
              ethnicity: ethnicity,
              gender: gender,
              diseaseType: payload.contextInfo?.cancerType || payload.contextInfo?.diseaseType,
              isFirstOccurrence: payload.contextInfo?.isFirstOccurrence,
              geneticFamilyHistory: payload.contextInfo?.geneticFamilyHistory ? 
                JSON.stringify(payload.contextInfo.geneticFamilyHistory) : null,
              consentAccepted: true,
            },
          });

          // Create uploaded files
          if (payload.medicalFiles && payload.medicalFiles.length > 0) {
            await tx.uploadedFile.createMany({
              data: payload.medicalFiles.map((file: any) => ({
                caseId: caseRecord.id,
                filename: file.name,
                s3Key: file.s3Key || file.uploadKey || file.key,
                mimetype: file.type,
                size: file.size,
                category: file.category || 'medical-record',
              })),
            });
          }

          caseId = caseRecord.id;

          // Delete temp submission
          await tx.tempSubmission.delete({
            where: { id: tempId },
          });
        }
      }

      return { user, customer, caseId };
    });

    return NextResponse.json({
      success: true,
      userId: result.user.id,
      customerId: result.customer.id,
      caseId: result.caseId,
      message: 'Registration successful',
    });

  } catch (error) {
    console.error('Registration error:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('validation')) {
        return NextResponse.json(
          { error: 'Invalid registration data' },
          { status: 400 }
        );
      }
      
      if (error.message.includes('Unique constraint')) {
        return NextResponse.json(
          { error: 'User with this email already exists' },
          { status: 409 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Registration failed. Please try again.' },
      { status: 500 }
    );
  }
}

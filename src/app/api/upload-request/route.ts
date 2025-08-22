import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const uploadRequestSchema = z.object({
  personalInfo: z.object({
    firstName: z.string().min(1),
    middleName: z.string().optional(),
    lastName: z.string().min(1),
    dob: z.string().min(1),
    email: z.string().email(),
    phone: z.string().optional(),
  }),
  medicalFiles: z.array(z.object({
    name: z.string(),
    size: z.number(),
    type: z.string(),
    category: z.string(),
    s3Key: z.string(),
  })),
  contextInfo: z.object({
    ethnicity: z.string().optional(),
    gender: z.string().optional(),
    diseaseType: z.string().optional(),
    isFirstOccurrence: z.boolean().optional(),
    geneticFamilyHistory: z.array(z.string()).optional(),
  }),
  consentAccepted: z.boolean(),
  paymentId: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = uploadRequestSchema.parse(body);

    // Start a transaction
    const result = await prisma.$transaction(async (tx) => {
      // Create a temporary customer for now (until full customer auth is implemented)
      const tempCustomer = await tx.customer.create({
        data: {
          firstName: data.personalInfo.firstName,
          middleName: data.personalInfo.middleName,
          lastName: data.personalInfo.lastName,
          dateOfBirth: new Date(data.personalInfo.dob),
          email: data.personalInfo.email,
          phone: data.personalInfo.phone,
          passwordHash: "temp", // Temporary hash
          preferredContact: "email",
          emailNotifications: true,
          smsNotifications: false,
        },
      });

      // Create case record
      const caseRecord = await tx.case.create({
        data: {
          firstName: data.personalInfo.firstName,
          middleName: data.personalInfo.middleName,
          lastName: data.personalInfo.lastName,
          dateOfBirth: new Date(data.personalInfo.dob),
          email: data.personalInfo.email,
          phone: data.personalInfo.phone,
          ethnicity: data.contextInfo.ethnicity,
          gender: data.contextInfo.gender,
          diseaseType: data.contextInfo.diseaseType,
          isFirstOccurrence: data.contextInfo.isFirstOccurrence,
          geneticFamilyHistory: JSON.stringify(data.contextInfo.geneticFamilyHistory || []),
          paymentId: data.paymentId,
          consentAccepted: data.consentAccepted,
          customerId: tempCustomer.id, // Use the created customer ID
        },
      });

      // Create uploaded file records
      if (data.medicalFiles.length > 0) {
        await tx.uploadedFile.createMany({
          data: data.medicalFiles.map((file) => ({
            caseId: caseRecord.id,
            fileName: file.name,
            originalName: file.name,
            fileSize: file.size,
            mimeType: file.type,
            category: file.category,
            s3Key: file.s3Key,
          })),
        });
      }

      return caseRecord;
    });

    // Log data distribution to modules (for demonstration)
    console.log("Data distribution to modules:");
    console.log("Repository Module:", {
      caseId: result.id,
      files: data.medicalFiles,
      context: data.contextInfo,
    });
    console.log("Customer Lifecycle Module:", {
      caseId: result.id,
      personalInfo: data.personalInfo,
    });
    console.log("Invoicing Module:", {
      caseId: result.id,
      paymentId: data.paymentId,
    });

    // Generate case number for display (using created timestamp)
    const caseNumber = `CASE-${Date.now()}`;

    // Trigger AI analysis (async)
    fetch(`${req.nextUrl.origin}/api/ai-analysis`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        caseId: result.id,
        analysisType: "combined"
      }),
    }).catch(console.error);

    return NextResponse.json({
      caseId: caseNumber,
      message: "Request received"
    }, { status: 201 });

  } catch (error) {
    console.error("Error processing upload request:", error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

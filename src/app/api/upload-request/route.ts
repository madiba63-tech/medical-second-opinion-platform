import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { CustomerLifecycleModule } from "@/modules/customerLifecycle";

// Initialize Customer Lifecycle Module
const customerLifecycleModule = new CustomerLifecycleModule();

// Validation schemas
const personalInfoSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last name is required"),
  dob: z.string().min(1, "Date of birth is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
});

const medicalFileSchema = z.object({
  name: z.string(),
  size: z.number(),
  type: z.string(),
  category: z.enum(["Doctor's Letter", "Image", "Lab Report", "Other Document"]),
  s3Key: z.string(),
});

const medicalContextSchema = z.object({
  ethnicity: z.string().optional(),
  gender: z.string().optional(),
  diseaseType: z.string().optional(),
  isFirstOccurrence: z.boolean().optional(),
  geneticFamilyHistory: z.array(z.string()).optional(),
});

const uploadRequestSchema = z.object({
  personalInfo: personalInfoSchema,
  medicalFiles: z.array(medicalFileSchema),
  contextInfo: medicalContextSchema,
  consentAccepted: z.boolean(),
  paymentId: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const data = uploadRequestSchema.parse(await req.json());

    // Process case submission through Customer Lifecycle Module
    const result = await customerLifecycleModule.processCaseSubmission({
      personalInfo: {
        firstName: data.personalInfo.firstName,
        middleName: data.personalInfo.middleName,
        lastName: data.personalInfo.lastName,
        dateOfBirth: new Date(data.personalInfo.dob),
        email: data.personalInfo.email,
        phone: data.personalInfo.phone,
      },
      medicalFiles: data.medicalFiles,
      contextInfo: data.contextInfo,
      paymentId: data.paymentId,
      consentAccepted: data.consentAccepted,
    });

    // Log data distribution to modules (now using actual repository integration)
    console.log("Data distribution to modules:");
    console.log("Repository Module:", {
      caseId: result.caseId,
      caseNumber: result.caseNumber,
      files: data.medicalFiles,
      context: data.contextInfo,
    });
    console.log("Customer Lifecycle Module:", {
      caseId: result.caseId,
      caseNumber: result.caseNumber,
      customerId: result.customerId,
      personalInfo: data.personalInfo,
    });
    console.log("Invoicing Module:", {
      caseId: result.caseId,
      caseNumber: result.caseNumber,
      paymentId: data.paymentId,
    });

    // Trigger AI analysis (async)
    fetch(`${req.nextUrl.origin}/api/ai-analysis`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        caseId: result.caseId,
        caseNumber: result.caseNumber,
        analysisType: "combined"
      }),
    }).catch(console.error);

    return NextResponse.json({
      caseId: result.caseNumber,
      message: "Request received and stored in repository"
    }, { status: 201 });

  } catch (error) {
    console.error("Error processing upload request:", error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

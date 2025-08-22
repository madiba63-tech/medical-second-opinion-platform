import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const acknowledgementSchema = z.object({
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  caseId: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = acknowledgementSchema.parse(body);

    // Mock email sending
    const emailContent = {
      greeting: `Dear ${data.firstName} ${data.lastName},`,
      message: `Thank you for submitting your second opinion request. Your case number is ${data.caseId}.`,
      details: "Our medical team will review your case and contact you within 3-5 business days.",
      caseId: data.caseId
    };

    console.log("Sending acknowledgement email from Customer Lifecycle Module:");
    console.log(`To: ${data.email}`);
    console.log(`Subject: Second Opinion Request Received - Case ${data.caseId}`);
    console.log("Body:", emailContent);

    // In production, this would integrate with an email service like SendGrid, SES, etc.
    
    return NextResponse.json({
      success: true,
      message: "Acknowledgement email sent"
    });

  } catch (error) {
    console.error("Error sending acknowledgement:", error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to send acknowledgement" },
      { status: 500 }
    );
  }
}

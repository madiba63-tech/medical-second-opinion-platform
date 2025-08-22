import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const paymentConfirmationSchema = z.object({
  email: z.string().email(),
  paymentId: z.string(),
  caseId: z.string(),
  amount: z.string().optional().default("$299.00"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = paymentConfirmationSchema.parse(body);

    // Generate invoice number
    const invoiceNumber = `INV-${Date.now()}`;

    // Mock email sending
    const emailContent = {
      message: `Your payment has been successfully processed for case ${data.caseId}.`,
      paymentId: data.paymentId,
      amount: data.amount,
      invoiceNumber,
      details: "This confirms your payment for medical second opinion services.",
      caseId: data.caseId
    };

    console.log("Sending payment confirmation email from Invoicing Module:");
    console.log(`To: ${data.email}`);
    console.log(`Subject: Payment Confirmation - Second Opinion Case ${data.caseId}`);
    console.log("Body:", emailContent);

    // In production, this would integrate with an email service and payment processor
    
    return NextResponse.json({
      success: true,
      message: "Payment confirmation email sent",
      invoiceNumber
    });

  } catch (error) {
    console.error("Error sending payment confirmation:", error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to send payment confirmation" },
      { status: 500 }
    );
  }
}

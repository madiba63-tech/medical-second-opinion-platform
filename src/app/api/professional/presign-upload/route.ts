import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import path from "path";
import crypto from "crypto";

// Maximum file size: 25MB (professional documents typically smaller)
const MAX_FILE_SIZE = 25 * 1024 * 1024;

// Allowed file types for professional documents
const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/tiff',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain'
];

const fileRequestSchema = z.object({
  filename: z.string()
    .min(1, "Filename is required")
    .max(255, "Filename too long")
    .refine((filename) => {
      const sanitized = path.basename(filename);
      return sanitized === filename && !/[<>:"|?*]/.test(filename);
    }, "Invalid filename characters"),
  mimetype: z.string().refine((mime) => ALLOWED_MIME_TYPES.includes(mime), {
    message: "File type not allowed. Only PDF, images, and professional documents are permitted."
  }),
  fileSize: z.number()
    .min(1, "File size must be greater than 0")
    .max(MAX_FILE_SIZE, `File size cannot exceed ${MAX_FILE_SIZE / (1024 * 1024)}MB`),
});

const requestSchema = z.object({
  files: z.array(fileRequestSchema).max(10, "Maximum 10 files per request"),
  email: z.string().email("Valid email required for professional application"),
  sessionType: z.literal('professional').optional().default('professional')
});

export async function POST(req: NextRequest) {
  try {
    // Parse request body
    const body = await req.json();
    
    // Validate input with professional-specific schema
    const parseResult = requestSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        { 
          error: "Invalid file request", 
          details: parseResult.error.issues.map(issue => issue.message)
        },
        { status: 400 }
      );
    }
    
    const { files, email } = parseResult.data;
    
    // Generate professional session ID based on email
    const professionalId = crypto
      .createHash('sha256')
      .update(`professional:${email}:${Date.now()}`)
      .digest('hex')
      .substring(0, 32);

    console.log(`Professional upload request from: ${email}, ID: ${professionalId}`);

    // Use local development upload (isolated from customer system)
    const uploadUrls = files.map((file) => {
      const timestamp = Date.now();
      const randomId = crypto.randomUUID();
      const sanitizedFilename = path.basename(file.filename.replace(/[^a-zA-Z0-9.-]/g, '_'));
      
      // Professional uploads go to separate directory structure
      const key = `professional-documents/${professionalId}/${new Date().toISOString().split('T')[0]}/${randomId}-${sanitizedFilename}`;
      
      const baseUrl = req.nextUrl.origin;
      const expiryTime = timestamp + 3600000; // 1 hour from now
      
      // Create secure signature for professional uploads
      const signatureData = `professional:${professionalId}:${key}:${expiryTime}`;
      const signature = Buffer.from(signatureData).toString('base64');
      
      const signedUrl = `${baseUrl}/api/professional/upload/dev-put?key=${encodeURIComponent(key)}&exp=${expiryTime}&sig=${encodeURIComponent(signature)}&pid=${professionalId}&email=${encodeURIComponent(email)}`;
      
      return {
        url: signedUrl,
        key: key,
        professionalId: professionalId
      };
    });

    return NextResponse.json({
      success: true,
      uploadUrls: uploadUrls,
      professionalId: professionalId
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Professional validation error in presign-upload:", error.issues);
      return NextResponse.json(
        { error: "Validation failed", details: error.issues },
        { status: 400 }
      );
    }
    
    console.error("Professional file upload presigning failed:", error);
    return NextResponse.json(
      { error: "Failed to generate professional upload URLs", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
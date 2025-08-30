import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { z } from "zod";
import { authenticateRequest } from "@/lib/auth";
import path from "path";

// Maximum file size: 50MB
const MAX_FILE_SIZE = 50 * 1024 * 1024;

// Allowed file types for medical documents
const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/webp',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain'
];

const fileRequestSchema = z.object({
  filename: z.string()
    .min(1, "Filename is required")
    .max(255, "Filename too long")
    .refine((filename) => {
      // Prevent path traversal attacks
      const sanitized = path.basename(filename);
      return sanitized === filename && !/[<>:"|?*]/.test(filename);
    }, "Invalid filename characters"),
  mimetype: z.string().refine((mime) => ALLOWED_MIME_TYPES.includes(mime), {
    message: "File type not allowed. Only PDF, images, and documents are permitted."
  }),
  fileSize: z.number()
    .min(1, "File size must be greater than 0")
    .max(MAX_FILE_SIZE, `File size cannot exceed ${MAX_FILE_SIZE / (1024 * 1024)}MB`),
});

const requestSchema = z.array(fileRequestSchema).max(10, "Maximum 10 files per request");

export async function POST(req: NextRequest) {
  try {
    // Authenticate user first
    const authResult = await authenticateRequest(req);
    if (!authResult.success || !authResult.user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const body = await req.json();
    
    // Validate input with comprehensive schema
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
    
    const files = parseResult.data;

    // Check for S3 credentials
    const hasS3Credentials = 
      process.env.AWS_REGION && 
      process.env.AWS_ACCESS_KEY_ID && 
      process.env.AWS_SECRET_ACCESS_KEY && 
      process.env.S3_BUCKET_NAME;

    if (!hasS3Credentials) {
      // Secure local development fallback
      console.warn("S3 credentials not configured, using local development upload");
      
      const uploadUrls = files.map((file) => {
        const timestamp = Date.now();
        const randomId = crypto.randomUUID();
        // Sanitize filename to prevent path traversal
        const sanitizedFilename = path.basename(file.filename.replace(/[^a-zA-Z0-9.-]/g, '_'));
        const key = `uploads/${authResult.user!.id}/${new Date().toISOString().split('T')[0]}/${randomId}-${sanitizedFilename}`;
        
        const baseUrl = req.nextUrl.origin;
        const expiryTime = timestamp + 3600000; // 1 hour from now
        
        // Create secure signature for development
        const signatureData = `${authResult.user!.id}:${key}:${expiryTime}`;
        const signature = Buffer.from(signatureData).toString('base64');
        
        const signedUrl = `${baseUrl}/api/upload/dev-put?key=${encodeURIComponent(key)}&exp=${expiryTime}&sig=${encodeURIComponent(signature)}&uid=${authResult.user!.id}`;
        
        return {
          url: signedUrl,
          key: key
        };
      });

      return NextResponse.json(uploadUrls);
    }

    // Production S3 upload
    const s3Client = new S3Client({
      region: process.env.AWS_REGION!,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });

    const uploadUrls = await Promise.all(
      files.map(async (file) => {
        const timestamp = Date.now();
        const randomId = crypto.randomUUID();
        // Sanitize filename and organize by user
        const sanitizedFilename = path.basename(file.filename.replace(/[^a-zA-Z0-9.-]/g, '_'));
        const key = `uploads/${authResult.user!.id}/${new Date().toISOString().split('T')[0]}/${randomId}-${sanitizedFilename}`;

        const command = new PutObjectCommand({
          Bucket: process.env.S3_BUCKET_NAME!,
          Key: key,
          ContentType: file.mimetype,
          ContentLength: file.fileSize,
          Metadata: {
            'uploaded-by': authResult.user!.id,
            'original-filename': file.filename,
            'upload-timestamp': timestamp.toString()
          },
        });

        const signedUrl = await getSignedUrl(s3Client, command, {
          expiresIn: 3600, // 1 hour
        });

        return {
          url: signedUrl,
          key: key,
        };
      })
    );

    return NextResponse.json(uploadUrls);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.issues },
        { status: 400 }
      );
    }
    
    console.warn("File upload presigning failed");
    return NextResponse.json(
      { error: "Failed to generate upload URLs" },
      { status: 500 }
    );
  }
}

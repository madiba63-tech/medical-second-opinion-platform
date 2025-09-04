import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import path from "path";
import crypto from "crypto";
import { headers } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET && process.env.NODE_ENV === 'production') {
  throw new Error('JWT_SECRET must be set in production');
}

const PROFESSIONAL_SIGNATURE_SECRET = process.env.PROFESSIONAL_SIGNATURE_SECRET;
if (!PROFESSIONAL_SIGNATURE_SECRET) {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('PROFESSIONAL_SIGNATURE_SECRET must be set in production');
  }
  console.warn('Using default PROFESSIONAL_SIGNATURE_SECRET in development');
}

const effectiveJwtSecret = JWT_SECRET || 'dev-jwt-secret-for-development-32-chars';
const effectiveSignatureSecret = PROFESSIONAL_SIGNATURE_SECRET || 'professional-signature-secret-2025';

// Maximum file size: 25MB (professional documents typically smaller)
const MAX_FILE_SIZE = 25 * 1024 * 1024;

// Allowed file types for professional documents
const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/jpg', // Add jpg variant
  'image/png',
  'image/tiff',
  'image/tif', // Add tif variant
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain',
  'application/dicom' // For medical imaging documents
];

// Dangerous file extensions to explicitly block
const BLOCKED_EXTENSIONS = ['.exe', '.bat', '.cmd', '.com', '.scr', '.pif', '.vbs', '.js', '.jar', '.app', '.deb', '.pkg', '.dmg'];

const fileRequestSchema = z.object({
  filename: z.string()
    .min(1, "Filename is required")
    .max(255, "Filename too long")
    .refine((filename) => {
      const sanitized = path.basename(filename);
      const ext = path.extname(filename).toLowerCase();
      
      // Check for blocked extensions
      if (BLOCKED_EXTENSIONS.includes(ext)) {
        return false;
      }
      
      // Check for path traversal attempts
      if (filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
        return false;
      }
      
      return sanitized === filename && !/[<>:"|?*\x00-\x1f]/.test(filename);
    }, "Invalid filename or blocked file type"),
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

// Rate limiting map (in production, use Redis with TTL)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX_REQUESTS = 5; // Reduced for better security

// Clean up expired entries periodically to prevent memory leaks
setInterval(() => {
  const now = Date.now();
  for (const [key, record] of rateLimitMap.entries()) {
    if (now > record.resetTime) {
      rateLimitMap.delete(key);
    }
  }
}, 60 * 1000); // Clean up every minute

function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(identifier);
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(identifier, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }
  
  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }
  
  record.count++;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    // Optional authentication check (allow anonymous professional applications)
    const headersList = headers();
    const authHeader = headersList.get('authorization');
    let decodedToken = null;
    let userIdentifier = 'anonymous';
    
    if (authHeader?.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      
      try {
        decodedToken = jwt.verify(token, effectiveJwtSecret) as any;
        userIdentifier = decodedToken.sub || decodedToken.email || 'authenticated';
      } catch (jwtError) {
        console.warn('Invalid token provided for professional upload, proceeding as anonymous');
        // Continue as anonymous user
      }
    }
    
    // Rate limiting based on IP and user
    const clientIp = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    const rateLimitKey = `${clientIp}:${userIdentifier}`;
    
    if (!checkRateLimit(rateLimitKey)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      );
    }
    
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
    
    // Generate professional session ID with additional entropy
    const professionalId = crypto
      .createHash('sha256')
      .update(`professional:${email}:${Date.now()}:${Math.random()}:${userIdentifier}`)
      .digest('hex')
      .substring(0, 32);

    // Log professional upload request with sanitized email
    const sanitizedEmail = email.replace(/(?<=.{2}).(?=.*@)/g, '*');
    console.log(`Professional upload request from: ${sanitizedEmail}, ID: ${professionalId}`);

    // Use local development upload (isolated from customer system)
    const uploadUrls = files.map((file) => {
      const timestamp = Date.now();
      const randomId = crypto.randomUUID();
      const sanitizedFilename = path.basename(file.filename.replace(/[^a-zA-Z0-9.-]/g, '_'));
      
      // Professional uploads go to separate directory structure
      const key = `professional-documents/${professionalId}/${new Date().toISOString().split('T')[0]}/${randomId}-${sanitizedFilename}`;
      
      const baseUrl = req.nextUrl.origin;
      const expiryTime = timestamp + 1800000; // 30 minutes from now (reduced for security)
      
      // Create cryptographically secure signature for professional uploads
      const signatureData = `professional:${professionalId}:${key}:${expiryTime}:${email}`;
      const signature = crypto
        .createHmac('sha256', effectiveSignatureSecret)
        .update(signatureData)
        .digest('hex');
      
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
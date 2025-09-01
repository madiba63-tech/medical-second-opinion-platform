import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { existsSync } from 'fs';
import crypto from 'crypto';

const PROFESSIONAL_SIGNATURE_SECRET = process.env.PROFESSIONAL_SIGNATURE_SECRET || 'professional-signature-secret-2025';

// Allowed MIME types for security
const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'image/jpeg', 
  'image/png',
  'image/tiff',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain'
];

// File type detection based on magic numbers
function detectFileType(buffer: Buffer): string | null {
  if (buffer.length < 4) return null;
  
  const header = buffer.subarray(0, 4);
  
  // PDF
  if (header[0] === 0x25 && header[1] === 0x50 && header[2] === 0x44 && header[3] === 0x46) {
    return 'application/pdf';
  }
  
  // JPEG
  if (header[0] === 0xFF && header[1] === 0xD8) {
    return 'image/jpeg';
  }
  
  // PNG
  if (header[0] === 0x89 && header[1] === 0x50 && header[2] === 0x4E && header[3] === 0x47) {
    return 'image/png';
  }
  
  return null;
}

const PROFESSIONAL_UPLOAD_DIR = path.join(process.cwd(), 'professional-uploads');

export async function PUT(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const key = url.searchParams.get('key');
    const exp = url.searchParams.get('exp');
    const sig = url.searchParams.get('sig');
    const professionalId = url.searchParams.get('pid');
    const email = url.searchParams.get('email');

    console.log('Professional upload request - key:', key, 'professionalId:', professionalId, 'email:', email);

    if (!key || !exp || !sig || !professionalId || !email) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    // Verify cryptographic signature
    const expectedSigData = `professional:${professionalId}:${key}:${exp}:${email}`;
    const expectedSig = crypto
      .createHmac('sha256', PROFESSIONAL_SIGNATURE_SECRET)
      .update(expectedSigData)
      .digest('hex');
    
    if (sig !== encodeURIComponent(expectedSig)) {
      console.error('Professional upload signature mismatch');
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 403 }
      );
    }

    // Check expiry
    const expiryTime = parseInt(exp);
    if (Date.now() > expiryTime) {
      return NextResponse.json(
        { error: 'Upload URL expired' },
        { status: 410 }
      );
    }

    // Get file data
    const buffer = await req.arrayBuffer();
    const fileBuffer = Buffer.from(buffer);

    // Validate file size (25MB max for professionals)
    const MAX_SIZE = 25 * 1024 * 1024;
    if (fileBuffer.length > MAX_SIZE) {
      return NextResponse.json(
        { error: 'File too large' },
        { status: 413 }
      );
    }

    // Validate file content type
    const detectedType = detectFileType(fileBuffer);
    if (detectedType && !ALLOWED_MIME_TYPES.includes(detectedType)) {
      return NextResponse.json(
        { error: 'File type not allowed based on content analysis' },
        { status: 415 }
      );
    }
    
    // Prevent directory traversal attacks
    const sanitizedKey = key.replace(/\.\./g, '').replace(/[\/\\]/g, path.sep);
    if (sanitizedKey !== key) {
      return NextResponse.json(
        { error: 'Invalid file path' },
        { status: 400 }
      );
    }
    
    // Create professional-specific directory structure with additional validation
    const fullPath = path.resolve(PROFESSIONAL_UPLOAD_DIR, sanitizedKey);
    
    // Ensure the resolved path is still within the upload directory
    if (!fullPath.startsWith(path.resolve(PROFESSIONAL_UPLOAD_DIR))) {
      return NextResponse.json(
        { error: 'Invalid file path' },
        { status: 400 }
      );
    }
    
    const dir = path.dirname(fullPath);

    // Ensure directory exists
    if (!existsSync(dir)) {
      await mkdir(dir, { recursive: true });
    }

    // Save file in professional uploads directory
    await writeFile(fullPath, fileBuffer);

    console.log(`Professional file uploaded successfully to: ${fullPath}, size: ${fileBuffer.length} bytes, professional: ${email}`);

    return NextResponse.json({
      success: true,
      message: 'Professional file uploaded successfully',
      key: key,
      size: fileBuffer.length,
      professionalId: professionalId,
      email: email
    });

  } catch (error) {
    console.error('Professional upload error:', error);
    return NextResponse.json(
      { error: 'Professional upload failed', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
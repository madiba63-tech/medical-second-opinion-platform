import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { existsSync } from 'fs';

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

    // Verify signature
    const expectedSigData = `professional:${professionalId}:${key}:${exp}`;
    const expectedSig = Buffer.from(expectedSigData).toString('base64');
    
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

    // Create professional-specific directory structure
    const fullPath = path.join(PROFESSIONAL_UPLOAD_DIR, key);
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
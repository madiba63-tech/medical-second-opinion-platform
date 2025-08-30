import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";
import { z } from "zod";

const uploadParamsSchema = z.object({
  key: z.string(),
  exp: z.string(),
  sig: z.string()
});

const ACCEPTED_MIME_TYPES = [
  'application/pdf',
  'application/dicom',
  'image/tiff',
  'image/png',
  'image/jpeg'
];

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

export async function PUT(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const params = uploadParamsSchema.parse({
      key: url.searchParams.get('key'),
      exp: url.searchParams.get('exp'),
      sig: url.searchParams.get('sig')
    });

    // Simple signature verification (for development only)
    console.log('Upload request for:', { key: params.key, exp: params.exp, sig: params.sig });

    // Simple dev signature check
    if (params.sig !== 'dev') {
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 403 }
      );
    }

    // Check expiration (with some buffer for clock differences)
    const expiryTime = parseInt(params.exp);
    const currentTime = Date.now();
    if (currentTime > expiryTime + 60000) { // 1 minute buffer
      return NextResponse.json(
        { error: "URL expired" },
        { status: 403 }
      );
    }

    // Get file data
    const arrayBuffer = await req.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Validate file size
    if (buffer.length > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `File size exceeds ${MAX_FILE_SIZE / (1024 * 1024)}MB limit` },
        { status: 400 }
      );
    }

    // Validate content type
    const contentType = req.headers.get('content-type');
    if (!contentType || !ACCEPTED_MIME_TYPES.includes(contentType)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only PDF, DICOM, TIFF, PNG, and JPEG files are allowed.' },
        { status: 400 }
      );
    }

    // Additional file validation based on magic bytes
    const isValidFile = validateFileContent(buffer, contentType);
    if (!isValidFile) {
      return NextResponse.json(
        { error: 'File content does not match the declared file type' },
        { status: 400 }
      );
    }

    // Ensure uploads directory exists
    const uploadsDir = join(process.cwd(), '.uploads');
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true });
    }

    // Create subdirectory structure
    const keyParts = params.key.split('/');
    const fileName = keyParts.pop()!;
    const subDirs = keyParts.join('/');
    const fullSubDir = join(uploadsDir, subDirs);
    
    if (!existsSync(fullSubDir)) {
      await mkdir(fullSubDir, { recursive: true });
    }

    // Write file
    const filePath = join(fullSubDir, fileName);
    await writeFile(filePath, buffer);

    // Log upload for security monitoring
    console.log(`Medical document uploaded: ${params.key}, size: ${buffer.length}, type: ${contentType}`);

    return NextResponse.json(
      { 
        message: 'Medical document uploaded successfully',
        key: params.key,
        size: buffer.length,
        contentType
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error uploading medical document:", error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid upload parameters' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to upload medical document" },
      { status: 500 }
    );
  }
}

function validateFileContent(buffer: Buffer, declaredType: string): boolean {
  // Check magic bytes to validate file type
  const magicBytes = buffer.subarray(0, 16);
  
  switch (declaredType) {
    case 'application/pdf':
      // PDF files start with %PDF
      return magicBytes.subarray(0, 4).toString() === '%PDF';
    
    case 'image/jpeg':
      // JPEG files start with FFD8
      return magicBytes[0] === 0xFF && magicBytes[1] === 0xD8;
    
    case 'image/png':
      // PNG files start with 89504E47
      return magicBytes[0] === 0x89 && 
             magicBytes[1] === 0x50 && 
             magicBytes[2] === 0x4E && 
             magicBytes[3] === 0x47;
    
    case 'image/tiff':
      // TIFF files start with 4949 (little endian) or 4D4D (big endian)
      return (magicBytes[0] === 0x49 && magicBytes[1] === 0x49) ||
             (magicBytes[0] === 0x4D && magicBytes[1] === 0x4D);
    
    case 'application/dicom':
      // DICOM files have 'DICM' at offset 128
      if (buffer.length < 132) return false;
      const dicmBytes = buffer.subarray(128, 132);
      return dicmBytes.toString() === 'DICM';
    
    default:
      return false;
  }
}

import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

export async function PUT(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const key = url.searchParams.get('key');
    const exp = url.searchParams.get('exp');
    const sig = url.searchParams.get('sig');

    if (!key || !exp || !sig) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    // Simple signature verification (for development only)
    // For development, we'll just check that the signature is 'dev'
    // In production, this would use proper HMAC signing
    console.log('Upload request for:', { key, exp, sig });

    // Simple dev signature check
    if (sig !== 'dev') {
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 403 }
      );
    }

    // Check expiration (with some buffer for clock differences)
    const expiryTime = parseInt(exp);
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

    // Ensure uploads directory exists
    const uploadsDir = join(process.cwd(), '.uploads');
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true });
    }

    // Create subdirectory structure
    const keyParts = key.split('/');
    const fileName = keyParts.pop()!;
    const subDirs = keyParts.join('/');
    const fullSubDir = join(uploadsDir, subDirs);
    
    if (!existsSync(fullSubDir)) {
      await mkdir(fullSubDir, { recursive: true });
    }

    // Write file
    const filePath = join(fullSubDir, fileName);
    await writeFile(filePath, buffer);

    console.log(`File uploaded to local storage: ${key}`);

    return new NextResponse(null, { status: 200 });
  } catch (error) {
    console.error("Error uploading file to local storage:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}

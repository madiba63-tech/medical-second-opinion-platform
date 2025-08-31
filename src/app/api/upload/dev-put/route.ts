import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

export async function PUT(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const key = searchParams.get('key');
    const exp = searchParams.get('exp');
    const signature = searchParams.get('sig');
    const userId = searchParams.get('uid');
    const userType = searchParams.get('type');
    
    console.log('Dev upload request - key:', key, 'userId:', userId, 'userType:', userType);
    
    if (!key || !exp || !signature || !userId) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }
    
    // Validate expiry
    const expiryTime = parseInt(exp);
    if (Date.now() > expiryTime) {
      return NextResponse.json(
        { error: "Upload URL has expired" },
        { status: 403 }
      );
    }
    
    // Validate signature (basic validation for development)
    const expectedSignature = Buffer.from(`${userId}:${key}:${exp}`).toString('base64');
    if (signature !== expectedSignature) {
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 403 }
      );
    }
    
    // Read the file data
    const fileData = await req.arrayBuffer();
    const buffer = Buffer.from(fileData);
    
    if (buffer.length === 0) {
      return NextResponse.json(
        { error: "Empty file" },
        { status: 400 }
      );
    }
    
    // Create the file path for local storage
    const uploadsDir = join(process.cwd(), 'uploads');
    const filePath = join(uploadsDir, key);
    const fileDir = join(uploadsDir, key.substring(0, key.lastIndexOf('/')));
    
    // Ensure directories exist
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true });
    }
    
    if (!existsSync(fileDir)) {
      await mkdir(fileDir, { recursive: true });
    }
    
    // Write the file
    await writeFile(filePath, buffer);
    
    console.log(`File uploaded successfully to: ${filePath}, size: ${buffer.length} bytes`);
    
    return new NextResponse(null, { 
      status: 200,
      headers: {
        'Content-Type': 'text/plain',
      }
    });
    
  } catch (error) {
    console.error("Dev upload failed:", error);
    return NextResponse.json(
      { error: "Upload failed", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
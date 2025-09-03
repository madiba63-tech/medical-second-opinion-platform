import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ fileId: string }> }
) {
  try {
    const { fileId } = await params;

    // Get file information from database
    const file = await prisma.uploadedFile.findUnique({
      where: { id: fileId },
      include: {
        case: {
          include: {
            customer: true
          }
        }
      }
    });

    if (!file) {
      return NextResponse.json(
        { error: 'File not found' },
        { status: 404 }
      );
    }

    // In a real application, you would:
    // 1. Check if the user has permission to access this file
    // 2. Generate a signed URL for S3 or similar cloud storage
    // 3. Redirect to the signed URL or stream the file

    // For demo purposes, we'll create a mock file response
    const mockFileContent = `This is a mock file for ${file.filename}.
    
File Details:
- ID: ${file.id}
- Name: ${file.filename}
- Category: ${file.category}
- Size: ${file.size} bytes
- Case: ${file.case.caseNumber}
- Customer: ${file.case.customer.firstName} ${file.case.customer.lastName}

This would be the actual file content in a production environment.`;

    // Create response with appropriate headers
    const response = new NextResponse(mockFileContent);
    
    // Set headers for file download
    response.headers.set('Content-Type', file.mimetype || 'application/octet-stream');
    response.headers.set('Content-Disposition', `attachment; filename="${file.filename}"`);
    response.headers.set('Content-Length', file.size.toString());
    
    // Add security headers
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-XSS-Protection', '1; mode=block');

    return response;

  } catch (error) {
    console.error('File download error:', error);
    return NextResponse.json(
      { error: 'Failed to download file' },
      { status: 500 }
    );
  }
}

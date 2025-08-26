import { NextRequest, NextResponse } from 'next/server';
import { mockExtractTextFromPDF } from '@/utils/pdfProcessor';
import { mockAIExtractData } from '@/utils/aiAgent';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    if (file.type !== 'application/pdf') {
      return NextResponse.json(
        { error: 'Only PDF files are supported' },
        { status: 400 }
      );
    }

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File size must be less than 10MB' },
        { status: 400 }
      );
    }

    // Step 1: Extract text from PDF
    const extractedText = await mockExtractTextFromPDF(file);
    
    // Step 2: Use AI to extract structured data
    const extractedData = await mockAIExtractData(extractedText);

    return NextResponse.json({
      success: true,
      data: extractedData,
      metadata: {
        fileName: file.name,
        fileSize: file.size,
        pages: extractedText.pages,
        processingTime: '3 seconds'
      }
    });

  } catch (error) {
    console.error('AI document processing error:', error);
    
    return NextResponse.json(
      { error: 'Failed to process document with AI' },
      { status: 500 }
    );
  }
}

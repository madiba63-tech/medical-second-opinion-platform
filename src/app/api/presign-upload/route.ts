import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { z } from "zod";

const fileRequestSchema = z.object({
  filename: z.string(),
  mimetype: z.string(),
});

const requestSchema = z.array(fileRequestSchema);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const files = requestSchema.parse(body);

    // Check for S3 credentials
    const hasS3Credentials = 
      process.env.AWS_REGION && 
      process.env.AWS_ACCESS_KEY_ID && 
      process.env.AWS_SECRET_ACCESS_KEY && 
      process.env.S3_BUCKET_NAME;

    if (!hasS3Credentials) {
      // Local development fallback
      console.log("S3 credentials not found, using local development upload");
      
      const uploadUrls = files.map((file) => {
        const timestamp = Date.now();
        const randomId = Math.random().toString(36).substring(2);
        const key = `uploads/${new Date().toISOString().split('T')[0]}/${randomId}-${file.filename}`;
        
        const baseUrl = req.nextUrl.origin;
        const expiryTime = timestamp + 3600000; // 1 hour from now
        const simpleSig = 'dev'; // Simple signature for development
        const signedUrl = `${baseUrl}/api/upload/dev-put?key=${encodeURIComponent(key)}&exp=${expiryTime}&sig=${simpleSig}`;
        
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
        const randomId = Math.random().toString(36).substring(2);
        const key = `uploads/${new Date().toISOString().split('T')[0]}/${randomId}-${file.filename}`;

        const command = new PutObjectCommand({
          Bucket: process.env.S3_BUCKET_NAME!,
          Key: key,
          ContentType: file.mimetype,
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
    console.error("Error generating presigned URLs:", error);
    return NextResponse.json(
      { error: "Failed to generate upload URLs" },
      { status: 500 }
    );
  }
}

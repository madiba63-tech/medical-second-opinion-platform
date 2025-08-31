/**
 * Professional Upload System
 * Completely segregated from customer/patient upload processes
 */

interface ProfessionalUploadRequest {
  files: Array<{
    filename: string;
    mimetype: string;
    fileSize: number;
  }>;
  email: string;
}

interface ProfessionalUploadResponse {
  success: boolean;
  uploadUrls: Array<{
    url: string;
    key: string;
    professionalId: string;
  }>;
  professionalId: string;
}

export class ProfessionalUploadService {
  private static readonly API_BASE = '/api/professional';
  private static readonly MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB
  
  private static readonly ALLOWED_TYPES = [
    'application/pdf',
    'image/jpeg', 
    'image/png',
    'image/tiff',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain'
  ];

  /**
   * Get presigned URLs for professional document upload
   */
  static async getUploadUrls(files: File[], email: string): Promise<ProfessionalUploadResponse> {
    // Validate files
    for (const file of files) {
      if (file.size > this.MAX_FILE_SIZE) {
        throw new Error(`File ${file.name} exceeds 25MB limit`);
      }
      
      if (!this.ALLOWED_TYPES.includes(file.type)) {
        throw new Error(`File type ${file.type} not allowed for professional uploads`);
      }
    }

    const requestData: ProfessionalUploadRequest = {
      files: files.map(file => ({
        filename: file.name,
        mimetype: file.type,
        fileSize: file.size
      })),
      email
    };

    const response = await fetch(`${this.API_BASE}/presign-upload`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to get professional upload URLs');
    }

    return response.json();
  }

  /**
   * Upload files using presigned URLs
   */
  static async uploadFiles(files: File[], uploadUrls: ProfessionalUploadResponse): Promise<void> {
    const uploadPromises = files.map(async (file, index) => {
      const uploadData = uploadUrls.uploadUrls[index];
      
      const uploadResponse = await fetch(uploadData.url, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type
        }
      });

      if (!uploadResponse.ok) {
        const error = await uploadResponse.text();
        throw new Error(`Failed to upload ${file.name}: ${error}`);
      }
      
      console.log(`Professional file uploaded: ${file.name} (${uploadData.professionalId})`);
    });

    await Promise.all(uploadPromises);
  }

  /**
   * Complete upload process - get URLs and upload files
   */
  static async uploadProfessionalDocuments(files: File[], email: string): Promise<string> {
    console.log(`Starting professional upload for: ${email}, files: ${files.length}`);
    
    // Get upload URLs
    const uploadResponse = await this.getUploadUrls(files, email);
    
    // Upload files
    await this.uploadFiles(files, uploadResponse);
    
    console.log(`Professional upload completed for: ${email}, ID: ${uploadResponse.professionalId}`);
    
    return uploadResponse.professionalId;
  }
}

/**
 * Professional session management (isolated from customer sessions)
 */
export class ProfessionalSessionService {
  private static readonly SESSION_KEY = 'professional_application_session';
  
  static createSession(email: string, professionalId: string): void {
    const sessionData = {
      email,
      professionalId,
      startTime: Date.now(),
      type: 'professional_recruitment'
    };
    
    localStorage.setItem(this.SESSION_KEY, JSON.stringify(sessionData));
  }
  
  static getSession(): { email: string; professionalId: string } | null {
    try {
      const data = localStorage.getItem(this.SESSION_KEY);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }
  
  static clearSession(): void {
    localStorage.removeItem(this.SESSION_KEY);
  }
}
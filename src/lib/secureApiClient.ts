// Secure API client for professional recruitment with CSRF protection
export class SecureApiClient {
  private static instance: SecureApiClient;
  private csrfToken: string | null = null;
  private baseUrl: string;

  private constructor() {
    // Use environment-based API URLs instead of hardcoded localhost
    this.baseUrl = process.env.NODE_ENV === 'production' 
      ? 'https://api.yourdomain.com' // Update with actual production API
      : process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4004';
  }

  public static getInstance(): SecureApiClient {
    if (!SecureApiClient.instance) {
      SecureApiClient.instance = new SecureApiClient();
    }
    return SecureApiClient.instance;
  }

  private async getCsrfToken(): Promise<string> {
    if (!this.csrfToken) {
      try {
        const response = await fetch(`${this.baseUrl}/api/v1/csrf-token`, {
          method: 'GET',
          credentials: 'include'
        });
        const data = await response.json();
        this.csrfToken = data.token;
      } catch (error) {
        console.warn('CSRF token fetch failed, continuing without protection:', error);
        this.csrfToken = 'dev-token'; // Fallback for development
      }
    }
    return this.csrfToken;
  }

  private getAuthToken(): string | null {
    // In a real app, this would get the token from secure storage
    return localStorage.getItem('professionalAuthToken');
  }

  public async secureRequest(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<Response> {
    const csrfToken = await this.getCsrfToken();
    const authToken = this.getAuthToken();
    
    const headers = new Headers(options.headers);
    
    // Add CSRF protection
    if (csrfToken) {
      headers.set('X-CSRF-Token', csrfToken);
    }
    
    // Add authentication if available
    if (authToken) {
      headers.set('Authorization', `Bearer ${authToken}`);
    }
    
    // Add content type for JSON requests
    if (options.method !== 'GET' && !headers.get('Content-Type') && !(options.body instanceof FormData)) {
      headers.set('Content-Type', 'application/json');
    }

    const secureOptions: RequestInit = {
      ...options,
      headers,
      credentials: 'include',
    };

    const url = endpoint.startsWith('http') ? endpoint : `${this.baseUrl}${endpoint}`;
    
    try {
      const response = await fetch(url, secureOptions);
      
      // Handle authentication errors
      if (response.status === 401) {
        // Clear invalid token
        localStorage.removeItem('professionalAuthToken');
        throw new Error('Authentication required');
      }
      
      return response;
    } catch (error) {
      if (error instanceof Error && error.message.includes('CORS')) {
        throw new Error('Network security error: Invalid origin');
      }
      throw error;
    }
  }

  // Professional-specific API methods with input sanitization
  public async aiPrepopulate(formData: FormData, email: string): Promise<any> {
    // Sanitize email
    const sanitizedEmail = this.sanitizeEmail(email);
    if (!sanitizedEmail) {
      throw new Error('Invalid email format');
    }

    formData.append('email', sanitizedEmail);
    
    return this.secureRequest('/api/v1/candidates/ai-prepopulate', {
      method: 'POST',
      body: formData
    });
  }

  public async submitApplication(applicationData: any): Promise<any> {
    // Sanitize application data
    const sanitizedData = this.sanitizeApplicationData(applicationData);
    
    return this.secureRequest('/api/v1/candidates/apply', {
      method: 'POST',
      body: JSON.stringify(sanitizedData)
    });
  }

  private sanitizeEmail(email: string): string | null {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const trimmed = email.trim();
    return emailRegex.test(trimmed) ? trimmed : null;
  }

  private sanitizeApplicationData(data: any): any {
    // Deep clone and sanitize the data object
    const sanitized = JSON.parse(JSON.stringify(data));
    
    // Sanitize string fields
    const sanitizeString = (str: string): string => {
      if (typeof str !== 'string') return str;
      return str
        .trim()
        .replace(/<script[^>]*>.*?<\/script>/gi, '') // Remove script tags
        .replace(/[<>]/g, '') // Remove angle brackets
        .slice(0, 1000); // Limit length
    };

    // Apply sanitization to common fields
    if (sanitized.firstName) sanitized.firstName = sanitizeString(sanitized.firstName);
    if (sanitized.lastName) sanitized.lastName = sanitizeString(sanitized.lastName);
    if (sanitized.email) sanitized.email = this.sanitizeEmail(sanitized.email);
    if (sanitized.currentAffiliation) sanitized.currentAffiliation = sanitizeString(sanitized.currentAffiliation);

    return sanitized;
  }
}

export const secureApiClient = SecureApiClient.getInstance();
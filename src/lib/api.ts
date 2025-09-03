import { z } from 'zod';

// Microservice endpoints
const MICROSERVICES = {
  PATIENT_IDENTITY: 'http://localhost:3001',
  CASE_MANAGEMENT: 'http://localhost:3002',
  PROFESSIONAL: 'http://localhost:3003',
  PAYMENT_BILLING: 'http://localhost:3004',
  NOTIFICATION: 'http://localhost:3005',
  AI_ANALYSIS: 'http://localhost:3006',
  WORKFLOW_ENGINE: 'http://localhost:3010'
} as const;

// Types for API responses
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface CustomerProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  medicalHistory: string[];
  preferredLanguage: string;
  communicationPreferences: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
  memberSince: string;
  isActive: boolean;
}

export interface CaseData {
  id: string;
  caseNumber: string;
  customerId: string;
  title: string;
  description: string;
  status: 'pending' | 'in_review' | 'completed' | 'requires_action';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  submittedAt: string;
  expectedCompletion?: string;
  completedAt?: string;
  assignedProfessional?: {
    id: string;
    name: string;
    speciality: string;
    avatar?: string;
  };
  documents: {
    id: string;
    filename: string;
    fileType: string;
    uploadKey: string;
    category: string;
    uploadedAt: string;
  }[];
  aiAnalysis?: {
    confidenceScore: number;
    findings: string[];
    recommendations: string[];
  };
  finalOpinion?: {
    summary: string;
    recommendations: string[];
    fileUrl: string;
    completedAt: string;
  };
}

export interface NotificationData {
  id: string;
  userId: string;
  type: 'case_update' | 'payment' | 'system' | 'support';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
  actionUrl?: string;
  metadata?: Record<string, any>;
}

// Base API client class
class ApiClient {
  private baseUrl: string;
  private authToken: string | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    // Get auth token from localStorage in browser
    if (typeof window !== 'undefined') {
      this.authToken = localStorage.getItem('authToken');
    }
  }

  setAuthToken(token: string) {
    this.authToken = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('authToken', token);
    }
  }

  clearAuthToken() {
    this.authToken = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseUrl}${endpoint}`;
      const headers = new Headers(options.headers);
      
      headers.set('Content-Type', 'application/json');
      
      if (this.authToken) {
        headers.set('Authorization', `Bearer ${this.authToken}`);
      }

      const response = await fetch(url, {
        ...options,
        headers,
      });

      // Get raw response text for parsing
      const responseText = await response.text();
      
      let data = null;
      if (responseText) {
        try {
          data = JSON.parse(responseText);
        } catch (parseError) {
          // Log error details for debugging
          console.error('JSON Parse Error:', {
            url,
            status: response.status,
            contentType: response.headers.get('content-type'),
            error: parseError.message,
            responseLength: responseText.length,
            isHTML: responseText.toLowerCase().includes('<html>')
          });
          
          // Provide helpful error message based on the response type
          let errorMessage = 'Failed to parse server response as JSON.';
          if (responseText.toLowerCase().includes('<!doctype html>') || responseText.toLowerCase().includes('<html>')) {
            errorMessage = `Server returned HTML instead of JSON. This usually indicates a routing issue or server error. URL: ${url}, Status: ${response.status}`;
          } else if (responseText.length === 0) {
            errorMessage = `Server returned empty response. URL: ${url}, Status: ${response.status}`;
          } else if (response.status >= 500) {
            errorMessage = `Server error (${response.status}). The server may be down or experiencing issues.`;
          } else if (response.status === 404) {
            errorMessage = `API endpoint not found (404). The URL '${url}' may be incorrect or the endpoint may not exist.`;
          }
          
          throw new Error(errorMessage);
        }
      }

      if (!response.ok) {
        return {
          success: false,
          error: data?.message || data?.error || `HTTP ${response.status}: ${response.statusText}`,
        };
      }

      return {
        success: true,
        data,
      };
    } catch (error) {
      console.error('API Request failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error',
      };
    }
  }

  get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

// Individual service clients
export class PatientIdentityService extends ApiClient {
  constructor() {
    super(MICROSERVICES.PATIENT_IDENTITY);
  }

  async login(email: string, password: string): Promise<ApiResponse<{ token: string; user: CustomerProfile }>> {
    return this.post('/api/v1/auth/login', { email, password });
  }

  async register(userData: Partial<CustomerProfile> & { password: string }): Promise<ApiResponse<{ token: string; user: CustomerProfile }>> {
    return this.post('/api/v1/auth/register', userData);
  }

  async getProfile(): Promise<ApiResponse<CustomerProfile>> {
    return this.get('/api/v1/auth/me');
  }

  async updateProfile(data: Partial<CustomerProfile>): Promise<ApiResponse<CustomerProfile>> {
    return this.put('/api/v1/profile', data);
  }

  async logout(): Promise<ApiResponse<void>> {
    const result = await this.post('/api/v1/auth/logout');
    this.clearAuthToken();
    return result;
  }
}

export class CaseManagementService extends ApiClient {
  constructor() {
    super(MICROSERVICES.CASE_MANAGEMENT);
  }

  async getCases(customerId: string): Promise<ApiResponse<CaseData[]>> {
    return this.get(`/api/v1/cases?customerId=${customerId}`);
  }

  async getCase(caseId: string): Promise<ApiResponse<CaseData>> {
    return this.get(`/api/v1/cases/${caseId}`);
  }

  async createCase(caseData: Partial<CaseData>): Promise<ApiResponse<CaseData>> {
    return this.post('/api/v1/cases', caseData);
  }

  async updateCase(caseId: string, updates: Partial<CaseData>): Promise<ApiResponse<CaseData>> {
    return this.put(`/api/v1/cases/${caseId}`, updates);
  }

  async reopenCase(caseId: string, additionalInfo: string, preferSameProfessional: boolean): Promise<ApiResponse<CaseData>> {
    return this.post(`/api/v1/cases/${caseId}/reopen`, {
      additionalContext: additionalInfo,
      preferSameProfessional
    });
  }

  async submitSatisfactionRating(caseId: string, rating: number, feedback?: string): Promise<ApiResponse<void>> {
    return this.post(`/api/v1/cases/${caseId}/satisfaction`, { rating, feedback });
  }

  async uploadCaseDocument(caseId: string, file: File): Promise<ApiResponse<{ documentId: string; uploadKey: string }>> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('caseId', caseId);

    return fetch(`${this.baseUrl}/api/v1/cases/${caseId}/documents`, {
      method: 'POST',
      headers: {
        Authorization: this.authToken ? `Bearer ${this.authToken}` : '',
      },
      body: formData,
    })
    .then(async res => {
      const data = await res.json().catch(() => null);
      return res.ok ? { success: true, data } : { success: false, error: data?.error || 'Upload failed' };
    })
    .catch(error => ({ success: false, error: error.message }));
  }
}

export class NotificationService extends ApiClient {
  constructor() {
    super(MICROSERVICES.NOTIFICATION);
  }

  async getNotifications(userId: string): Promise<ApiResponse<NotificationData[]>> {
    return this.get(`/api/notifications?userId=${userId}`);
  }

  async markNotificationAsRead(notificationId: string): Promise<ApiResponse<void>> {
    return this.put(`/api/notifications/${notificationId}/read`);
  }

  async markAllAsRead(userId: string): Promise<ApiResponse<void>> {
    return this.put(`/api/notifications/read-all?userId=${userId}`);
  }

  // WebSocket connection for real-time notifications
  connectWebSocket(userId: string, onMessage: (notification: NotificationData) => void): WebSocket | null {
    if (typeof window === 'undefined') return null;

    try {
      const ws = new WebSocket(`ws://localhost:3005/ws?userId=${userId}&token=${this.authToken}`);
      
      ws.onmessage = (event) => {
        try {
          const notification = JSON.parse(event.data);
          onMessage(notification);
        } catch (error) {
          console.error('Failed to parse notification:', error);
        }
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      return ws;
    } catch (error) {
      console.error('Failed to connect to notification WebSocket:', error);
      return null;
    }
  }
}

export class PaymentBillingService extends ApiClient {
  constructor() {
    super(MICROSERVICES.PAYMENT_BILLING);
  }

  async createPaymentIntent(amount: number, caseId: string): Promise<ApiResponse<{ clientSecret: string }>> {
    return this.post('/api/payment/intent', { amount, caseId });
  }

  async getPaymentHistory(customerId: string): Promise<ApiResponse<any[]>> {
    return this.get(`/api/payments?customerId=${customerId}`);
  }

  async getInvoices(customerId: string): Promise<ApiResponse<any[]>> {
    return this.get(`/api/invoices?customerId=${customerId}`);
  }
}

// Service instances
export const patientIdentityService = new PatientIdentityService();
export const caseManagementService = new CaseManagementService();
export const notificationService = new NotificationService();
export const paymentBillingService = new PaymentBillingService();

// Auth context helper
export const setAuthToken = (token: string) => {
  patientIdentityService.setAuthToken(token);
  caseManagementService.setAuthToken(token);
  notificationService.setAuthToken(token);
  paymentBillingService.setAuthToken(token);
};

export const clearAuthToken = () => {
  patientIdentityService.clearAuthToken();
  caseManagementService.clearAuthToken();
  notificationService.clearAuthToken();
  paymentBillingService.clearAuthToken();
};

// Health check utility
export const checkServiceHealth = async () => {
  const services = Object.entries(MICROSERVICES);
  const healthChecks = await Promise.allSettled(
    services.map(async ([name, url]) => {
      try {
        const response = await fetch(`${url}/health`, { 
          method: 'GET',
          timeout: 5000 
        } as any);
        return {
          service: name,
          status: response.ok ? 'healthy' : 'unhealthy',
          url
        };
      } catch (error) {
        return {
          service: name,
          status: 'unreachable',
          url,
          error: error instanceof Error ? error.message : 'Unknown error'
        };
      }
    })
  );

  return healthChecks.map((result, index) => {
    if (result.status === 'fulfilled') {
      return result.value;
    }
    return {
      service: services[index][0],
      status: 'error',
      url: services[index][1],
      error: result.reason
    };
  });
};
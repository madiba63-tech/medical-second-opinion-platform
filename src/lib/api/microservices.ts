// Microservices API Client
// This file provides a clean interface for the Next.js frontend to interact with our microservices

const API_GATEWAY_URL = process.env.NEXT_PUBLIC_API_GATEWAY_URL || 'http://localhost:3000';
const IDENTITY_SERVICE_URL = process.env.NEXT_PUBLIC_IDENTITY_SERVICE_URL || 'http://localhost:3001';
const CASES_SERVICE_URL = process.env.NEXT_PUBLIC_CASES_SERVICE_URL || 'http://localhost:3002';
const PROFESSIONALS_SERVICE_URL = process.env.NEXT_PUBLIC_PROFESSIONALS_SERVICE_URL || 'http://localhost:3004';

// Types
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  emailVerified: boolean;
}

export interface MedicalCase {
  id: string;
  caseNumber: string;
  title: string;
  description: string;
  category: string;
  requestedProfessionalLevel: string;
  talentPool?: string;
  status: string;
  priority: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface Professional {
  id: string;
  firstName: string;
  lastName: string;
  title: string;
  specialization: string[];
  hospitalAffiliation: string;
  yearsOfExperience: number;
  rating?: number;
  totalReviews?: number;
  availableSlots?: number;
}

// API Client Class
class MicroservicesAPI {
  private getAuthHeaders(): Record<string, string> {
    const token = localStorage.getItem('accessToken');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  }

  private async handleResponse(response: Response) {
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || `HTTP error! status: ${response.status}`);
    }
    
    return data;
  }

  // Authentication Services
  async registerUser(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }): Promise<{ user: User; tokens: AuthTokens }> {
    const response = await fetch(`${IDENTITY_SERVICE_URL}/api/v1/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const result = await this.handleResponse(response);
    return result.data;
  }

  async loginUser(credentials: {
    email: string;
    password: string;
  }): Promise<{ user: User; tokens: AuthTokens }> {
    const response = await fetch(`${IDENTITY_SERVICE_URL}/api/v1/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const result = await this.handleResponse(response);
    return result.data;
  }

  async getCurrentUser(): Promise<User> {
    const response = await fetch(`${IDENTITY_SERVICE_URL}/api/v1/auth/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeaders(),
      },
    });

    const result = await this.handleResponse(response);
    return result.data.user;
  }

  async refreshToken(refreshToken: string): Promise<AuthTokens> {
    const response = await fetch(`${IDENTITY_SERVICE_URL}/api/v1/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });

    const result = await this.handleResponse(response);
    return result.data;
  }

  async logout(): Promise<void> {
    await fetch(`${IDENTITY_SERVICE_URL}/api/v1/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeaders(),
      },
    });
  }

  // Case Management Services
  async createCase(caseData: {
    title: string;
    description: string;
    chiefComplaint?: string;
    category: string;
    requestedProfessionalLevel?: 'JUNIOR' | 'SENIOR' | 'EXPERT' | 'DISTINGUISHED';
    priority?: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    email: string;
    phone?: string;
    medicalHistory?: string[];
    currentMedications?: string[];
    allergies?: string[];
    familyHistory?: string[];
    urgencyReason?: string;
  }): Promise<MedicalCase> {
    const response = await fetch(`${CASES_SERVICE_URL}/api/v1/cases`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeaders(),
      },
      body: JSON.stringify(caseData),
    });

    const result = await this.handleResponse(response);
    return result.data.case;
  }

  async getCases(filters?: {
    status?: string;
    category?: string;
    priority?: string;
    page?: number;
    limit?: number;
  }): Promise<{
    cases: MedicalCase[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  }> {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          params.append(key, value.toString());
        }
      });
    }

    const response = await fetch(`${CASES_SERVICE_URL}/api/v1/cases?${params}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeaders(),
      },
    });

    const result = await this.handleResponse(response);
    return result.data;
  }

  async getCase(caseId: string): Promise<{
    case: MedicalCase;
    documents: any[];
    statusHistory: any[];
    assignments: any[];
  }> {
    const response = await fetch(`${CASES_SERVICE_URL}/api/v1/cases/${caseId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeaders(),
      },
    });

    const result = await this.handleResponse(response);
    return result.data;
  }

  async updateCase(caseId: string, updates: Partial<MedicalCase>): Promise<MedicalCase> {
    const response = await fetch(`${CASES_SERVICE_URL}/api/v1/cases/${caseId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeaders(),
      },
      body: JSON.stringify(updates),
    });

    const result = await this.handleResponse(response);
    return result.data.case;
  }

  async uploadDocuments(caseId: string, files: File[]): Promise<any[]> {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });

    const response = await fetch(`${CASES_SERVICE_URL}/api/v1/cases/${caseId}/documents`, {
      method: 'POST',
      headers: {
        ...this.getAuthHeaders(),
      },
      body: formData,
    });

    const result = await this.handleResponse(response);
    return result.data.documents;
  }

  async submitCase(caseId: string): Promise<MedicalCase> {
    const response = await fetch(`${CASES_SERVICE_URL}/api/v1/cases/${caseId}/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeaders(),
      },
    });

    const result = await this.handleResponse(response);
    return result.data.case;
  }

  async getCaseStats(): Promise<any> {
    const response = await fetch(`${CASES_SERVICE_URL}/api/v1/cases/stats`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeaders(),
      },
    });

    const result = await this.handleResponse(response);
    return result.data.stats;
  }

  // Professional Services
  async registerProfessional(professionalData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    title: string;
    specialization: string[];
    licenseNumber: string;
    licenseState: string;
    hospitalAffiliation: string;
    yearsOfExperience: number;
  }): Promise<{ professional: Professional; tokens: AuthTokens }> {
    const response = await fetch(`${PROFESSIONALS_SERVICE_URL}/api/v1/professionals/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(professionalData),
    });

    const result = await this.handleResponse(response);
    return result.data;
  }

  async loginProfessional(credentials: {
    email: string;
    password: string;
  }): Promise<{ professional: Professional; tokens: AuthTokens }> {
    const response = await fetch(`${PROFESSIONALS_SERVICE_URL}/api/v1/professionals/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const result = await this.handleResponse(response);
    return result.data;
  }

  async getCurrentProfessional(): Promise<Professional> {
    const response = await fetch(`${PROFESSIONALS_SERVICE_URL}/api/v1/professionals/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeaders(),
      },
    });

    const result = await this.handleResponse(response);
    return result.data.professional;
  }

  async searchProfessionals(filters?: {
    specialization?: string[];
    minRating?: number;
    available?: boolean;
  }): Promise<Professional[]> {
    const params = new URLSearchParams();
    if (filters) {
      if (filters.specialization) {
        filters.specialization.forEach(spec => params.append('specialization', spec));
      }
      if (filters.minRating) params.append('minRating', filters.minRating.toString());
      if (filters.available !== undefined) params.append('available', filters.available.toString());
    }

    const response = await fetch(`${PROFESSIONALS_SERVICE_URL}/api/v1/professionals/search?${params}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await this.handleResponse(response);
    return result.data.professionals;
  }

  async updateProfessionalAvailability(availability: {
    availability: Record<string, { available: boolean; hours?: string }>;
    maxCaseLoad?: number;
  }): Promise<any> {
    const response = await fetch(`${PROFESSIONALS_SERVICE_URL}/api/v1/professionals/availability`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeaders(),
      },
      body: JSON.stringify(availability),
    });

    const result = await this.handleResponse(response);
    return result.data;
  }

  async getProfessionalStats(): Promise<any> {
    const response = await fetch(`${PROFESSIONALS_SERVICE_URL}/api/v1/professionals/stats`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeaders(),
      },
    });

    const result = await this.handleResponse(response);
    return result.data.stats;
  }

  // Platform Health
  async getPlatformHealth(): Promise<any> {
    const response = await fetch(`${API_GATEWAY_URL}/health/services`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await this.handleResponse(response);
    return result;
  }
}

// Export singleton instance
export const microservicesAPI = new MicroservicesAPI();

// Authentication Helper Functions
export const authHelpers = {
  setTokens: (tokens: AuthTokens) => {
    localStorage.setItem('accessToken', tokens.accessToken);
    localStorage.setItem('refreshToken', tokens.refreshToken);
  },

  getTokens: (): { accessToken: string | null; refreshToken: string | null } => {
    return {
      accessToken: localStorage.getItem('accessToken'),
      refreshToken: localStorage.getItem('refreshToken'),
    };
  },

  clearTokens: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('accessToken');
  },
};

// React Hooks for easy integration
export const useMicroservicesAuth = () => {
  const login = async (email: string, password: string, userType: 'patient' | 'professional' = 'patient') => {
    try {
      const result = userType === 'patient' 
        ? await microservicesAPI.loginUser({ email, password })
        : await microservicesAPI.loginProfessional({ email, password });
      
      authHelpers.setTokens(result.tokens);
      return result;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await microservicesAPI.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      authHelpers.clearTokens();
    }
  };

  return {
    login,
    logout,
    isAuthenticated: authHelpers.isAuthenticated(),
  };
};

export default microservicesAPI;
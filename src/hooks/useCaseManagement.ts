// React Hook for Case Management Integration with Microservices
import { useState, useEffect, useCallback } from 'react';
import { microservicesAPI, type MedicalCase } from '@/lib/api/microservices';

export interface CaseFormData {
  title: string;
  description: string;
  chiefComplaint?: string;
  category: string;
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
}

export interface CaseFilters {
  status?: string;
  category?: string;
  priority?: string;
  page?: number;
  limit?: number;
}

export const useCaseManagement = () => {
  const [cases, setCases] = useState<MedicalCase[]>([]);
  const [currentCase, setCurrentCase] = useState<MedicalCase | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });

  // Create a new case
  const createCase = useCallback(async (caseData: CaseFormData): Promise<MedicalCase | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const newCase = await microservicesAPI.createCase(caseData);
      setCases(prev => [newCase, ...prev]);
      return newCase;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create case';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Load cases with optional filters
  const loadCases = useCallback(async (filters?: CaseFilters) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await microservicesAPI.getCases(filters);
      setCases(response.cases);
      setPagination(response.pagination);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load cases';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load a specific case with details
  const loadCase = useCallback(async (caseId: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await microservicesAPI.getCase(caseId);
      setCurrentCase(response.case);
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load case';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Update a case
  const updateCase = useCallback(async (caseId: string, updates: Partial<MedicalCase>): Promise<MedicalCase | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const updatedCase = await microservicesAPI.updateCase(caseId, updates);
      
      // Update in cases list if present
      setCases(prev => prev.map(c => c.id === caseId ? updatedCase : c));
      
      // Update current case if it's the same
      if (currentCase?.id === caseId) {
        setCurrentCase(updatedCase);
      }
      
      return updatedCase;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update case';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, [currentCase]);

  // Upload documents to a case
  const uploadDocuments = useCallback(async (caseId: string, files: File[]) => {
    setLoading(true);
    setError(null);
    
    try {
      const documents = await microservicesAPI.uploadDocuments(caseId, files);
      return documents;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to upload documents';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Submit a case for review
  const submitCase = useCallback(async (caseId: string): Promise<MedicalCase | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const submittedCase = await microservicesAPI.submitCase(caseId);
      
      // Update in cases list
      setCases(prev => prev.map(c => c.id === caseId ? submittedCase : c));
      
      // Update current case if it's the same
      if (currentCase?.id === caseId) {
        setCurrentCase(submittedCase);
      }
      
      return submittedCase;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to submit case';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, [currentCase]);

  // Get case statistics
  const loadCaseStats = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const stats = await microservicesAPI.getCaseStats();
      return stats;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load case statistics';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Clear current case
  const clearCurrentCase = useCallback(() => {
    setCurrentCase(null);
  }, []);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Auto-load cases on mount
  useEffect(() => {
    loadCases();
  }, []);

  return {
    // State
    cases,
    currentCase,
    loading,
    error,
    pagination,
    
    // Actions
    createCase,
    loadCases,
    loadCase,
    updateCase,
    uploadDocuments,
    submitCase,
    loadCaseStats,
    clearCurrentCase,
    clearError,
  };
};

// Additional hook for case form management
export const useCaseForm = (initialData?: Partial<CaseFormData>) => {
  const [formData, setFormData] = useState<CaseFormData>({
    title: '',
    description: '',
    chiefComplaint: '',
    category: 'GENERAL_MEDICINE',
    priority: 'NORMAL',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    phone: '',
    medicalHistory: [],
    currentMedications: [],
    allergies: [],
    familyHistory: [],
    urgencyReason: '',
    ...initialData,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateField = useCallback((field: keyof CaseFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error for this field when updated
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  }, [errors]);

  const validateForm = useCallback((): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Case title is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Case description is required';
    }

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const resetForm = useCallback(() => {
    setFormData({
      title: '',
      description: '',
      chiefComplaint: '',
      category: 'GENERAL_MEDICINE',
      priority: 'NORMAL',
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      email: '',
      phone: '',
      medicalHistory: [],
      currentMedications: [],
      allergies: [],
      familyHistory: [],
      urgencyReason: '',
      ...initialData,
    });
    setErrors({});
  }, [initialData]);

  return {
    formData,
    errors,
    updateField,
    validateForm,
    resetForm,
    isValid: Object.keys(errors).length === 0,
  };
};

export default useCaseManagement;
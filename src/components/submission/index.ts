// Enhanced Case Submission Components
// Comprehensive submission form with persona-adaptive UI

// Main form component
export { EnhancedCaseSubmissionForm } from './EnhancedCaseSubmissionForm';

// UI components
export { PersonaAdaptiveUI, usePersonaTheme, PersonaStyledDiv } from './PersonaAdaptiveUI';
export { SubmissionProgress, SimpleProgress } from './SubmissionProgress';
export { DocumentUpload } from './DocumentUpload';
export { ValidationFeedback, useValidationFeedback } from './ValidationFeedback';

// Types and interfaces
export type {
  CustomerPersona,
  PersonaProfile,
  PersonaUIConfiguration,
  CustomerLifecycleData
} from '@/types/persona';

export type {
  CaseSubmissionRequest,
  CaseSubmissionResponse,
  ValidationRequest,
  ValidationResponse,
  DocumentUploadRequest,
  DocumentUploadResponse
} from '@/lib/validations/caseSubmission';

// Component prop types
export interface SubmissionComponentProps {
  persona?: CustomerPersona | null;
  className?: string;
  disabled?: boolean;
  onNext?: () => void;
  onPrev?: () => void;
  onUpdate?: (data: any) => void;
}

export interface DocumentUploadProps extends SubmissionComponentProps {
  files: string[];
  onFilesChange: (files: string[]) => void;
  maxFiles?: number;
  maxFileSize?: number;
  allowedTypes?: string[];
  customerId?: string;
  tempCaseId?: string;
}

export interface ValidationFeedbackProps extends SubmissionComponentProps {
  errors: Record<string, string[]>;
  warnings: Record<string, string[]>;
  isValidating: boolean;
  currentStep?: string;
  showSummary?: boolean;
  autoHide?: boolean;
  onErrorClick?: (field: string) => void;
  realTimeValidation?: boolean;
}

export interface ProgressStep {
  id: string;
  title: string;
  personaSpecific?: Partial<Record<CustomerPersona, { title?: string; description?: string }>>;
}

export interface SubmissionProgressProps extends SubmissionComponentProps {
  steps: ProgressStep[];
  currentStep: number;
  completedSteps: number;
  onStepClick?: (stepIndex: number) => void;
  validationErrors?: Record<string, string[]>;
  variant?: 'horizontal' | 'vertical' | 'compact';
  showLabels?: boolean;
  showProgress?: boolean;
  animated?: boolean;
}

// Style imports
import './submission-styles.css';

// Utility functions
export const getPersonaColor = (persona?: CustomerPersona | null, variant: 'primary' | 'secondary' | 'accent' = 'primary'): string => {
  const colorMap = {
    informed_advocator: {
      primary: '#3B82F6',
      secondary: '#10B981',
      accent: '#8B5CF6',
    },
    cautious_researcher: {
      primary: '#059669',
      secondary: '#0EA5E9',
      accent: '#F59E0B',
    },
    tech_savvy_optimizer: {
      primary: '#6366F1',
      secondary: '#EC4899',
      accent: '#10B981',
    },
  };

  return colorMap[persona || 'informed_advocator'][variant];
};

export const getPersonaSpacing = (persona?: CustomerPersona | null, size: 'compact' | 'standard' | 'spacious' = 'standard'): string => {
  const spacingMap = {
    informed_advocator: { compact: '0.75rem', standard: '1.5rem', spacious: '2rem' },
    cautious_researcher: { compact: '1rem', standard: '2rem', spacious: '2.5rem' },
    tech_savvy_optimizer: { compact: '0.5rem', standard: '1rem', spacious: '1.5rem' },
  };

  return spacingMap[persona || 'informed_advocator'][size];
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone);
};

export const calculateAge = (dateOfBirth: string): number => {
  const dob = new Date(dateOfBirth);
  const now = new Date();
  const age = (now.getTime() - dob.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
  return Math.floor(age);
};

export const isValidAge = (age: number): boolean => {
  return age >= 13 && age <= 150;
};

export const generateId = (prefix: string = 'id'): string => {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Constants
export const PERSONA_COLORS = {
  informed_advocator: '#3B82F6',
  cautious_researcher: '#059669',
  tech_savvy_optimizer: '#6366F1',
} as const;

export const FILE_CATEGORIES = [
  { value: 'medical_records', label: 'Medical Records', description: 'Hospital records, physician notes' },
  { value: 'lab_results', label: 'Lab Results', description: 'Blood work, urine tests, biopsies' },
  { value: 'imaging', label: 'Medical Imaging', description: 'X-rays, CT scans, MRIs, ultrasounds' },
  { value: 'pathology', label: 'Pathology Reports', description: 'Tissue analysis, tumor reports' },
  { value: 'genetic_tests', label: 'Genetic Tests', description: 'DNA analysis, hereditary screening' },
  { value: 'other', label: 'Other', description: 'Additional relevant documents' },
] as const;

export const MAX_FILE_SIZE_MB = 50;
export const MAX_FILES_PER_SUBMISSION = 20;
export const SUPPORTED_FILE_TYPES = ['pdf', 'jpg', 'jpeg', 'png', 'gif', 'bmp', 'tiff', 'dicom'] as const;

export const VALIDATION_DEBOUNCE_MS = 300;
export const UPLOAD_CHUNK_SIZE_MB = 5;
export const MAX_RETRY_ATTEMPTS = 3;

// Error messages
export const ERROR_MESSAGES = {
  REQUIRED_FIELD: 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email address',
  INVALID_PHONE: 'Please enter a valid phone number',
  INVALID_DATE: 'Please enter a valid date',
  AGE_TOO_YOUNG: 'Patient must be at least 13 years old',
  AGE_TOO_OLD: 'Please enter a valid date of birth',
  FILE_TOO_LARGE: `File size must be less than ${MAX_FILE_SIZE_MB}MB`,
  INVALID_FILE_TYPE: `File type not supported. Allowed types: ${SUPPORTED_FILE_TYPES.join(', ')}`,
  TOO_MANY_FILES: `Maximum ${MAX_FILES_PER_SUBMISSION} files allowed`,
  UPLOAD_FAILED: 'File upload failed. Please try again.',
  NETWORK_ERROR: 'Network error. Please check your connection and try again.',
  CONSENT_REQUIRED: 'You must accept the terms and conditions to continue',
} as const;
'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { z } from 'zod';
import { 
  CaseSubmissionSchema, 
  PatientInfoSchema, 
  MedicalContextSchema,
  type CaseSubmissionRequest 
} from '@/lib/validations/caseSubmission';

interface ValidationRule {
  field: string;
  validator: (value: any, formData?: any) => Promise<string | null> | string | null;
  dependencies?: string[];
  debounceMs?: number;
  severity: 'error' | 'warning' | 'info';
}

interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string[]>;
  warnings: Record<string, string[]>;
  info: Record<string, string[]>;
}

interface ValidationContext {
  formData: Partial<CaseSubmissionRequest>;
  currentStep: string;
  previousValidations: Record<string, ValidationResult>;
}

interface UseSubmissionValidationOptions {
  realTime?: boolean;
  debounceMs?: number;
  validateOnBlur?: boolean;
  customRules?: ValidationRule[];
}

interface UseSubmissionValidationReturn {
  // Validation state
  validationErrors: Record<string, string[]>;
  validationWarnings: Record<string, string[]>;
  validationInfo: Record<string, string[]>;
  isValidating: boolean;
  isValid: boolean;
  
  // Validation actions
  validateField: (field: string, value: any, formData?: Partial<CaseSubmissionRequest>) => Promise<void>;
  validateStep: (stepId: string, formData: Partial<CaseSubmissionRequest>) => Promise<boolean>;
  validateForm: (formData: Partial<CaseSubmissionRequest>) => Promise<boolean>;
  clearValidation: (field?: string) => void;
  clearAllValidation: () => void;
  
  // Utilities
  getFieldErrors: (field: string) => string[];
  getFieldWarnings: (field: string) => string[];
  hasFieldErrors: (field: string) => boolean;
  getValidationSummary: () => { totalErrors: number; totalWarnings: number; fields: string[] };
}

// Built-in validation rules
const BUILT_IN_RULES: ValidationRule[] = [
  // Email validation with duplicate check
  {
    field: 'email',
    validator: async (email: string, formData) => {
      if (!email) return 'Email is required';
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return 'Please enter a valid email address';
      }
      
      // Check for duplicate email (simulated API call)
      try {
        const response = await fetch('/api/v1/customer/case-submission/validate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, checkDuplicates: true }),
        });
        
        if (response.ok) {
          const result = await response.json();
          if (result.duplicateCheck?.hasDuplicates) {
            return 'An account with this email already exists';
          }
        }
      } catch (error) {
        // Non-blocking validation error
        console.warn('Email validation API error:', error);
      }
      
      return null;
    },
    debounceMs: 500,
    severity: 'error',
  },
  
  // Phone number validation
  {
    field: 'phone',
    validator: (phone: string) => {
      if (!phone) return null; // Optional field
      
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
      if (!phoneRegex.test(phone)) {
        return 'Please enter a valid phone number';
      }
      
      return null;
    },
    severity: 'error',
  },
  
  // Date of birth validation
  {
    field: 'dateOfBirth',
    validator: (dob: string) => {
      if (!dob) return 'Date of birth is required';
      
      const date = new Date(dob);
      const now = new Date();
      
      if (isNaN(date.getTime())) {
        return 'Please enter a valid date';
      }
      
      const age = (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
      
      if (age < 0) {
        return 'Date of birth cannot be in the future';
      }
      
      if (age > 150) {
        return 'Please enter a valid date of birth';
      }
      
      if (age < 13) {
        return 'Patient must be at least 13 years old';
      }
      
      return null;
    },
    severity: 'error',
  },
  
  // Disease type validation with suggestions
  {
    field: 'diseaseType',
    validator: async (diseaseType: string) => {
      if (!diseaseType || diseaseType.trim().length === 0) {
        return 'Please specify the medical condition or disease type';
      }
      
      if (diseaseType.length < 3) {
        return 'Disease type must be at least 3 characters';
      }
      
      return null;
    },
    severity: 'error',
  },
  
  // File upload validation
  {
    field: 'uploadedFiles',
    validator: (files: string[]) => {
      if (!files || files.length === 0) {
        return 'Please upload at least one medical document';
      }
      
      if (files.length > 20) {
        return 'Maximum 20 files allowed';
      }
      
      return null;
    },
    severity: 'error',
  },
  
  // Consent validation
  {
    field: 'consentAccepted',
    validator: (consent: boolean) => {
      if (!consent) {
        return 'You must accept the terms and conditions to continue';
      }
      return null;
    },
    severity: 'error',
  },
  
  // Warning rules
  {
    field: 'middleName',
    validator: (middleName: string, formData) => {
      if (!middleName && formData?.firstName && formData?.lastName) {
        return 'Adding a middle name can help with accurate patient identification';
      }
      return null;
    },
    dependencies: ['firstName', 'lastName'],
    severity: 'warning',
  },
  
  {
    field: 'geneticFamilyHistory',
    validator: (history: string, formData) => {
      if (!history && formData?.diseaseType) {
        const cancerTypes = ['cancer', 'tumor', 'oncology', 'malignant'];
        const hasCancer = cancerTypes.some(type => 
          formData.diseaseType!.toLowerCase().includes(type)
        );
        
        if (hasCancer) {
          return 'Family medical history is important for cancer cases and can improve diagnosis accuracy';
        }
      }
      return null;
    },
    dependencies: ['diseaseType'],
    severity: 'warning',
  },
];

// Step validation schemas
const STEP_SCHEMAS = {
  upload: z.object({
    uploadedFiles: z.array(z.string()).min(1, 'At least one file is required'),
  }),
  
  context: MedicalContextSchema.extend({
    diseaseType: z.string().min(1, 'Disease type is required'),
  }),
  
  personal: PatientInfoSchema,
  
  consent: z.object({
    consentAccepted: z.boolean().refine(val => val === true, 'Consent must be accepted'),
  }),
  
  all: CaseSubmissionSchema,
};

export function useSubmissionValidation({
  realTime = true,
  debounceMs = 300,
  validateOnBlur = true,
  customRules = [],
}: UseSubmissionValidationOptions = {}): UseSubmissionValidationReturn {
  
  const [validationErrors, setValidationErrors] = useState<Record<string, string[]>>({});
  const [validationWarnings, setValidationWarnings] = useState<Record<string, string[]>>({});
  const [validationInfo, setValidationInfo] = useState<Record<string, string[]>>({});
  const [isValidating, setIsValidating] = useState(false);

  const debounceTimersRef = useRef<Record<string, NodeJS.Timeout>>({});
  const validationCacheRef = useRef<Record<string, any>>({});
  
  const allRules = [...BUILT_IN_RULES, ...customRules];

  // Clear debounce timer for a field
  const clearDebounceTimer = (field: string) => {
    if (debounceTimersRef.current[field]) {
      clearTimeout(debounceTimersRef.current[field]);
      delete debounceTimersRef.current[field];
    }
  };

  // Clear all timers on unmount
  useEffect(() => {
    return () => {
      Object.values(debounceTimersRef.current).forEach(clearTimeout);
    };
  }, []);

  const isValid = Object.keys(validationErrors).length === 0;

  // Validate a single field
  const validateField = useCallback(async (
    field: string, 
    value: any, 
    formData: Partial<CaseSubmissionRequest> = {}
  ) => {
    const fieldRules = allRules.filter(rule => rule.field === field);
    
    if (fieldRules.length === 0) return;

    // Clear existing timer for this field
    clearDebounceTimer(field);

    // Check if value is the same as cached value
    const cacheKey = `${field}:${JSON.stringify(value)}:${JSON.stringify(formData)}`;
    if (validationCacheRef.current[cacheKey]) {
      return;
    }

    const validateFieldInternal = async () => {
      setIsValidating(true);
      
      try {
        const errors: string[] = [];
        const warnings: string[] = [];
        const info: string[] = [];

        for (const rule of fieldRules) {
          try {
            const result = await rule.validator(value, formData);
            
            if (result) {
              switch (rule.severity) {
                case 'error':
                  errors.push(result);
                  break;
                case 'warning':
                  warnings.push(result);
                  break;
                case 'info':
                  info.push(result);
                  break;
              }
            }
          } catch (error) {
            console.warn(`Validation error for field ${field}:`, error);
            // Don't add validation errors for failed validators
          }
        }

        // Update validation state
        setValidationErrors(prev => ({
          ...prev,
          [field]: errors.length > 0 ? errors : (() => {
            const { [field]: _, ...rest } = prev;
            return rest;
          })(),
        }));

        setValidationWarnings(prev => ({
          ...prev,
          [field]: warnings.length > 0 ? warnings : (() => {
            const { [field]: _, ...rest } = prev;
            return rest;
          })(),
        }));

        setValidationInfo(prev => ({
          ...prev,
          [field]: info.length > 0 ? info : (() => {
            const { [field]: _, ...rest } = prev;
            return rest;
          })(),
        }));

        // Cache the result
        validationCacheRef.current[cacheKey] = { errors, warnings, info };

      } finally {
        setIsValidating(false);
      }
    };

    // Apply debouncing if specified
    const effectiveDebounce = fieldRules.find(rule => rule.debounceMs)?.debounceMs || debounceMs;
    
    if (realTime && effectiveDebounce > 0) {
      debounceTimersRef.current[field] = setTimeout(validateFieldInternal, effectiveDebounce);
    } else {
      await validateFieldInternal();
    }
  }, [allRules, realTime, debounceMs]);

  // Validate a step
  const validateStep = useCallback(async (
    stepId: string, 
    formData: Partial<CaseSubmissionRequest>
  ): Promise<boolean> => {
    setIsValidating(true);
    
    try {
      const schema = STEP_SCHEMAS[stepId as keyof typeof STEP_SCHEMAS];
      
      if (!schema) {
        console.warn(`No validation schema found for step: ${stepId}`);
        return true;
      }

      // Clear existing validation for this step
      const stepFields = Object.keys(schema.shape || {});
      stepFields.forEach(field => {
        setValidationErrors(prev => {
          const { [field]: _, ...rest } = prev;
          return rest;
        });
      });

      try {
        await schema.parseAsync(formData);
        
        // Run custom field validations for step fields
        await Promise.all(
          stepFields.map(field => 
            validateField(field, formData[field as keyof typeof formData], formData)
          )
        );
        
        return true;
        
      } catch (error) {
        if (error instanceof z.ZodError) {
          const stepErrors: Record<string, string[]> = {};
          
          error.errors.forEach(err => {
            const field = err.path[0]?.toString();
            if (field) {
              if (!stepErrors[field]) stepErrors[field] = [];
              stepErrors[field].push(err.message);
            }
          });
          
          setValidationErrors(prev => ({ ...prev, ...stepErrors }));
        }
        
        return false;
      }
      
    } finally {
      setIsValidating(false);
    }
  }, [validateField]);

  // Validate entire form
  const validateForm = useCallback(async (
    formData: Partial<CaseSubmissionRequest>
  ): Promise<boolean> => {
    setIsValidating(true);
    
    try {
      // Clear all existing validation
      setValidationErrors({});
      setValidationWarnings({});
      setValidationInfo({});
      
      try {
        await CaseSubmissionSchema.parseAsync(formData);
        
        // Run all custom field validations
        await Promise.all(
          Object.keys(formData).map(field => 
            validateField(field, formData[field as keyof typeof formData], formData)
          )
        );
        
        return Object.keys(validationErrors).length === 0;
        
      } catch (error) {
        if (error instanceof z.ZodError) {
          const formErrors: Record<string, string[]> = {};
          
          error.errors.forEach(err => {
            const field = err.path[0]?.toString();
            if (field) {
              if (!formErrors[field]) formErrors[field] = [];
              formErrors[field].push(err.message);
            }
          });
          
          setValidationErrors(formErrors);
        }
        
        return false;
      }
      
    } finally {
      setIsValidating(false);
    }
  }, [validateField, validationErrors]);

  // Clear validation for a field
  const clearValidation = useCallback((field?: string) => {
    if (field) {
      clearDebounceTimer(field);
      
      setValidationErrors(prev => {
        const { [field]: _, ...rest } = prev;
        return rest;
      });
      
      setValidationWarnings(prev => {
        const { [field]: _, ...rest } = prev;
        return rest;
      });
      
      setValidationInfo(prev => {
        const { [field]: _, ...rest } = prev;
        return rest;
      });
      
      // Clear cache for this field
      Object.keys(validationCacheRef.current)
        .filter(key => key.startsWith(`${field}:`))
        .forEach(key => delete validationCacheRef.current[key]);
    }
  }, []);

  // Clear all validation
  const clearAllValidation = useCallback(() => {
    // Clear all timers
    Object.values(debounceTimersRef.current).forEach(clearTimeout);
    debounceTimersRef.current = {};
    
    // Clear validation state
    setValidationErrors({});
    setValidationWarnings({});
    setValidationInfo({});
    setIsValidating(false);
    
    // Clear cache
    validationCacheRef.current = {};
  }, []);

  // Utility functions
  const getFieldErrors = useCallback((field: string): string[] => {
    return validationErrors[field] || [];
  }, [validationErrors]);

  const getFieldWarnings = useCallback((field: string): string[] => {
    return validationWarnings[field] || [];
  }, [validationWarnings]);

  const hasFieldErrors = useCallback((field: string): boolean => {
    return (validationErrors[field] || []).length > 0;
  }, [validationErrors]);

  const getValidationSummary = useCallback(() => {
    const errorFields = Object.keys(validationErrors);
    const warningFields = Object.keys(validationWarnings);
    
    return {
      totalErrors: errorFields.reduce((sum, field) => sum + validationErrors[field].length, 0),
      totalWarnings: warningFields.reduce((sum, field) => sum + validationWarnings[field].length, 0),
      fields: [...new Set([...errorFields, ...warningFields])],
    };
  }, [validationErrors, validationWarnings]);

  return {
    // Validation state
    validationErrors,
    validationWarnings,
    validationInfo,
    isValidating,
    isValid,
    
    // Validation actions
    validateField,
    validateStep,
    validateForm,
    clearValidation,
    clearAllValidation,
    
    // Utilities
    getFieldErrors,
    getFieldWarnings,
    hasFieldErrors,
    getValidationSummary,
  };
}

// Utility hook for form field validation
export function useFieldValidation(
  field: string, 
  value: any, 
  formData?: Partial<CaseSubmissionRequest>,
  options: { debounce?: number; realTime?: boolean } = {}
) {
  const { validateField, getFieldErrors, getFieldWarnings, hasFieldErrors, isValidating } = useSubmissionValidation({
    realTime: options.realTime ?? true,
    debounceMs: options.debounce ?? 300,
  });

  useEffect(() => {
    if (value !== undefined && value !== null) {
      validateField(field, value, formData);
    }
  }, [field, value, formData, validateField]);

  return {
    errors: getFieldErrors(field),
    warnings: getFieldWarnings(field),
    hasErrors: hasFieldErrors(field),
    isValidating,
  };
}
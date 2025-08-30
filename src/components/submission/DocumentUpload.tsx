'use client';

import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { useDocumentUpload } from '@/hooks/useDocumentUpload';
import { usePersonaTheme, PersonaStyledDiv } from './PersonaAdaptiveUI';
import type { CustomerPersona } from '@/types/persona';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  s3Key?: string;
  uploadProgress?: number;
  uploadStatus: 'pending' | 'uploading' | 'completed' | 'error';
  errorMessage?: string;
  category?: FileCategory;
  previewUrl?: string;
}

type FileCategory = 'medical_records' | 'lab_results' | 'imaging' | 'pathology' | 'genetic_tests' | 'other';

interface DocumentUploadProps {
  files: string[]; // S3 keys from parent form
  onFilesChange: (files: string[]) => void;
  onNext: () => void;
  persona?: CustomerPersona | null;
  maxFiles?: number;
  maxFileSize?: number; // in MB
  allowedTypes?: string[];
  className?: string;
  disabled?: boolean;
  customerId?: string;
  tempCaseId?: string;
}

interface FilePreviewProps {
  file: UploadedFile;
  onRemove: () => void;
  onCategoryChange: (category: FileCategory) => void;
  persona?: CustomerPersona | null;
  disabled?: boolean;
}

const FILE_CATEGORIES: { value: FileCategory; label: string; description: string }[] = [
  { value: 'medical_records', label: 'Medical Records', description: 'Hospital records, physician notes' },
  { value: 'lab_results', label: 'Lab Results', description: 'Blood work, urine tests, biopsies' },
  { value: 'imaging', label: 'Medical Imaging', description: 'X-rays, CT scans, MRIs, ultrasounds' },
  { value: 'pathology', label: 'Pathology Reports', description: 'Tissue analysis, tumor reports' },
  { value: 'genetic_tests', label: 'Genetic Tests', description: 'DNA analysis, hereditary screening' },
  { value: 'other', label: 'Other', description: 'Additional relevant documents' },
];

const ALLOWED_TYPES = {
  pdf: ['application/pdf'],
  image: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/bmp'],
  dicom: ['application/dicom', '.dcm'],
  document: ['application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
};

const MAX_FILE_SIZE_MB = 50;
const MAX_FILES = 20;

export function DocumentUpload({
  files = [],
  onFilesChange,
  onNext,
  persona,
  maxFiles = MAX_FILES,
  maxFileSize = MAX_FILE_SIZE_MB,
  allowedTypes = ['pdf', 'jpg', 'jpeg', 'png', 'dicom'],
  className = '',
  disabled = false,
  customerId,
  tempCaseId,
}: DocumentUploadProps) {
  const theme = usePersonaTheme(persona);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);
  
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragActive, setIsDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const {
    uploadFiles,
    validateFile,
    getUploadProgress,
    cancelUpload,
    error: uploadError,
    isUploading: hookIsUploading
  } = useDocumentUpload();

  // Sync with parent component
  useEffect(() => {
    const completedFiles = uploadedFiles
      .filter(file => file.uploadStatus === 'completed' && file.s3Key)
      .map(file => file.s3Key!);
    
    if (JSON.stringify(completedFiles) !== JSON.stringify(files)) {
      onFilesChange(completedFiles);
    }
  }, [uploadedFiles, files, onFilesChange]);

  const acceptedFileTypes = useMemo(() => {
    return allowedTypes.reduce((acc, type) => {
      if (ALLOWED_TYPES[type as keyof typeof ALLOWED_TYPES]) {
        return [...acc, ...ALLOWED_TYPES[type as keyof typeof ALLOWED_TYPES]];
      }
      return acc;
    }, [] as string[]).join(',');
  }, [allowedTypes]);

  const totalFileSize = useMemo(() => {
    return uploadedFiles.reduce((total, file) => total + file.size, 0);
  }, [uploadedFiles]);

  const canAddMoreFiles = uploadedFiles.length < maxFiles && !disabled;

  const validateFileBeforeUpload = useCallback((file: File): string | null => {
    // File size check
    if (file.size > maxFileSize * 1024 * 1024) {
      return `File size must be less than ${maxFileSize}MB`;
    }

    // File type check
    const isValidType = allowedTypes.some(type => {
      if (ALLOWED_TYPES[type as keyof typeof ALLOWED_TYPES]) {
        return ALLOWED_TYPES[type as keyof typeof ALLOWED_TYPES].some(mimeType => 
          file.type === mimeType || file.name.toLowerCase().endsWith(type)
        );
      }
      return false;
    });

    if (!isValidType) {
      return `File type not supported. Allowed types: ${allowedTypes.join(', ')}`;
    }

    // Duplicate check
    const isDuplicate = uploadedFiles.some(existing => 
      existing.name === file.name && existing.size === file.size
    );
    
    if (isDuplicate) {
      return 'A file with the same name and size already exists';
    }

    return null;
  }, [allowedTypes, maxFileSize, uploadedFiles]);

  const handleFileSelect = useCallback(async (files: FileList) => {
    if (!files.length || !canAddMoreFiles) return;

    const filesToProcess = Array.from(files).slice(0, maxFiles - uploadedFiles.length);
    const newFiles: UploadedFile[] = [];

    // Validate and prepare files
    for (const file of filesToProcess) {
      const validationError = validateFileBeforeUpload(file);
      const fileId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      const uploadedFile: UploadedFile = {
        id: fileId,
        name: file.name,
        size: file.size,
        type: file.type,
        uploadStatus: validationError ? 'error' : 'pending',
        errorMessage: validationError || undefined,
        category: 'medical_records', // default category
        previewUrl: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
      };

      newFiles.push(uploadedFile);
    }

    setUploadedFiles(prev => [...prev, ...newFiles]);

    // Start uploading valid files
    const validFiles = newFiles.filter(f => f.uploadStatus !== 'error');
    if (validFiles.length > 0) {
      setIsUploading(true);
      
      try {
        const fileObjects = filesToProcess
          .filter((_, index) => validFiles.includes(newFiles[index]))
          .map((file, index) => ({ file, metadata: { id: validFiles[index].id } }));

        const uploadResults = await uploadFiles(fileObjects, {
          customerId,
          tempCaseId,
          associateWithCase: false,
        });

        // Update file statuses based on upload results
        setUploadedFiles(prev => prev.map(file => {
          const result = uploadResults.find(r => r.metadata?.id === file.id);
          if (result) {
            return {
              ...file,
              uploadStatus: result.success ? 'completed' : 'error',
              s3Key: result.s3Key,
              errorMessage: result.success ? undefined : result.error,
            };
          }
          return file;
        }));
      } catch (error) {
        console.error('Upload failed:', error);
        setUploadedFiles(prev => prev.map(file => 
          validFiles.some(vf => vf.id === file.id)
            ? { ...file, uploadStatus: 'error', errorMessage: 'Upload failed' }
            : file
        ));
      } finally {
        setIsUploading(false);
      }
    }
  }, [
    canAddMoreFiles,
    maxFiles,
    uploadedFiles.length,
    validateFileBeforeUpload,
    uploadFiles,
    customerId,
    tempCaseId
  ]);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (canAddMoreFiles) {
      setIsDragActive(true);
    }
  }, [canAddMoreFiles]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Only set drag inactive if we're leaving the drop zone entirely
    if (!dropZoneRef.current?.contains(e.relatedTarget as Node)) {
      setIsDragActive(false);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (canAddMoreFiles && e.dataTransfer.files) {
      handleFileSelect(e.dataTransfer.files);
    }
  }, [canAddMoreFiles, handleFileSelect]);

  const removeFile = useCallback((fileId: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
  }, []);

  const updateFileCategory = useCallback((fileId: string, category: FileCategory) => {
    setUploadedFiles(prev => prev.map(file =>
      file.id === fileId ? { ...file, category } : file
    ));
  }, []);

  const completedFiles = uploadedFiles.filter(f => f.uploadStatus === 'completed');
  const hasValidFiles = completedFiles.length > 0;

  const getPersonaSpecificContent = () => {
    switch (persona) {
      case 'cautious_researcher':
        return {
          title: 'Share Your Medical Documents Safely',
          description: 'Upload your medical files securely. We use bank-level encryption to protect your privacy.',
          helpText: 'All files are encrypted and only accessible by qualified medical professionals.',
        };
      case 'tech_savvy_optimizer':
        return {
          title: 'Upload Medical Documents',
          description: 'Drag & drop files or click to browse. AI will analyze format compatibility in real-time.',
          helpText: 'Supports PDF, DICOM, and common image formats. Maximum 50MB per file.',
        };
      case 'informed_advocator':
        return {
          title: 'Medical Document Upload',
          description: 'Upload comprehensive medical records for expert analysis and second opinion.',
          helpText: 'Include all relevant medical records, lab results, and imaging for the most accurate review.',
        };
      default:
        return {
          title: 'Upload Medical Documents',
          description: 'Share your medical files securely for professional review.',
          helpText: 'Supported formats: PDF, JPG, PNG, DICOM. Maximum 50MB per file.',
        };
    }
  };

  const content = getPersonaSpecificContent();

  return (
    <PersonaStyledDiv persona={persona} className={`document-upload ${className}`}>
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            {content.title}
          </h2>
          <p className="text-gray-600 mb-4">
            {content.description}
          </p>
        </div>

        {/* Upload Area */}
        <div
          ref={dropZoneRef}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
            isDragActive
              ? 'border-primary bg-primary bg-opacity-5 scale-102'
              : disabled
              ? 'border-gray-200 bg-gray-50'
              : canAddMoreFiles
              ? 'border-gray-300 hover:border-primary hover:bg-gray-50'
              : 'border-gray-200 bg-gray-50'
          }`}
          role="button"
          aria-label="Upload medical documents"
          tabIndex={canAddMoreFiles ? 0 : -1}
          onKeyDown={(e) => {
            if ((e.key === 'Enter' || e.key === ' ') && canAddMoreFiles) {
              e.preventDefault();
              fileInputRef.current?.click();
            }
          }}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept={acceptedFileTypes}
            onChange={(e) => e.target.files && handleFileSelect(e.target.files)}
            className="sr-only"
            disabled={!canAddMoreFiles}
            aria-describedby="file-upload-description"
          />

          {isUploading || hookIsUploading ? (
            <div className="space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto" />
              <div className="text-primary font-medium">
                Uploading files...
              </div>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <svg
                  className={`mx-auto h-12 w-12 transition-colors duration-200 ${
                    isDragActive
                      ? 'text-primary'
                      : canAddMoreFiles
                      ? 'text-gray-400'
                      : 'text-gray-300'
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
              </div>

              {canAddMoreFiles ? (
                <>
                  <div className="space-y-2">
                    <div className="text-lg font-medium text-gray-900">
                      {isDragActive ? 'Drop files here' : 'Drag & drop your medical files'}
                    </div>
                    <div className="text-gray-500">
                      or{' '}
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="text-primary hover:text-primary-dark font-medium focus:outline-none focus:underline"
                        type="button"
                      >
                        browse to upload
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 text-sm text-gray-500" id="file-upload-description">
                    <div>{content.helpText}</div>
                    <div className="mt-2">
                      {uploadedFiles.length} of {maxFiles} files uploaded
                      {totalFileSize > 0 && (
                        <span className="ml-2">
                          ({(totalFileSize / (1024 * 1024)).toFixed(1)} MB total)
                        </span>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <div className="space-y-2">
                  <div className="text-lg font-medium text-gray-700">
                    Maximum files reached
                  </div>
                  <div className="text-gray-500 text-sm">
                    You have uploaded {uploadedFiles.length} of {maxFiles} allowed files
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Upload Error */}
        {uploadError && (
          <div className="alert-error p-4 rounded-lg">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-3 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <div>
                <h4 className="font-medium">Upload Error</h4>
                <p className="text-sm mt-1">{uploadError}</p>
              </div>
            </div>
          </div>
        )}

        {/* File List */}
        {uploadedFiles.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">
              Uploaded Files ({uploadedFiles.length})
            </h3>
            
            <div className="space-y-3">
              {uploadedFiles.map(file => (
                <FilePreview
                  key={file.id}
                  file={file}
                  onRemove={() => removeFile(file.id)}
                  onCategoryChange={(category) => updateFileCategory(file.id, category)}
                  persona={persona}
                  disabled={disabled}
                />
              ))}
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center pt-6">
          <div className="text-sm text-gray-500">
            {hasValidFiles
              ? `${completedFiles.length} file${completedFiles.length !== 1 ? 's' : ''} ready for review`
              : 'Upload at least one medical document to continue'
            }
          </div>
          
          <button
            onClick={onNext}
            disabled={!hasValidFiles || isUploading}
            className="btn-primary px-8 py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            aria-describedby="next-button-description"
          >
            Continue
          </button>
          
          <div id="next-button-description" className="sr-only">
            {hasValidFiles
              ? 'Continue to medical context step'
              : 'Upload medical documents before continuing'
            }
          </div>
        </div>
      </div>
    </PersonaStyledDiv>
  );
}

function FilePreview({ file, onRemove, onCategoryChange, persona, disabled }: FilePreviewProps) {
  const theme = usePersonaTheme(persona);
  const [showDetails, setShowDetails] = useState(false);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = () => {
    const iconClass = "w-8 h-8 flex-shrink-0";
    
    if (file.type.includes('pdf')) {
      return (
        <svg className={`${iconClass} text-red-600`} fill="currentColor" viewBox="0 0 24 24">
          <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
        </svg>
      );
    }
    
    if (file.type.includes('image')) {
      return file.previewUrl ? (
        <img
          src={file.previewUrl}
          alt={`Preview of ${file.name}`}
          className={`${iconClass} object-cover rounded`}
          onError={(e) => {
            // Fallback to generic image icon
            e.currentTarget.style.display = 'none';
          }}
        />
      ) : (
        <svg className={`${iconClass} text-blue-600`} fill="currentColor" viewBox="0 0 24 24">
          <path d="M8.5,13.5L11,16.5L14.5,12L19,18H5M21,19V5C21,3.89 20.1,3 19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19Z" />
        </svg>
      );
    }
    
    return (
      <svg className={`${iconClass} text-gray-600`} fill="currentColor" viewBox="0 0 24 24">
        <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
      </svg>
    );
  };

  const getStatusIcon = () => {
    switch (file.uploadStatus) {
      case 'completed':
        return (
          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'uploading':
        return (
          <svg className="w-5 h-5 text-blue-600 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        );
      case 'error':
        return (
          <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  return (
    <div className={`file-preview border rounded-lg p-4 transition-all duration-200 ${
      file.uploadStatus === 'error' ? 'border-red-200 bg-red-50' : 
      file.uploadStatus === 'completed' ? 'border-green-200 bg-green-50' :
      'border-gray-200 bg-white hover:border-gray-300'
    }`}>
      <div className="flex items-start space-x-4">
        {/* File Icon */}
        <div className="flex-shrink-0">
          {getFileIcon()}
        </div>

        {/* File Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 min-w-0">
              <h4 className="text-sm font-medium text-gray-900 truncate">
                {file.name}
              </h4>
              {getStatusIcon()}
            </div>
            
            {!disabled && (
              <button
                onClick={onRemove}
                className="text-gray-400 hover:text-red-600 transition-colors duration-200 p-1"
                aria-label={`Remove ${file.name}`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          <div className="mt-1 text-sm text-gray-500">
            {formatFileSize(file.size)} • {file.type || 'Unknown type'}
          </div>

          {file.uploadStatus === 'uploading' && file.uploadProgress !== undefined && (
            <div className="mt-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">Uploading...</span>
                <span className="text-gray-500">{file.uploadProgress}%</span>
              </div>
              <div className="mt-1 w-full bg-gray-200 rounded-full h-1.5">
                <div 
                  className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${file.uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {file.uploadStatus === 'error' && file.errorMessage && (
            <div className="mt-2 text-sm text-red-600">
              {file.errorMessage}
            </div>
          )}

          {file.uploadStatus === 'completed' && !disabled && (
            <div className="mt-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Document Category
              </label>
              <select
                value={file.category || 'medical_records'}
                onChange={(e) => onCategoryChange(e.target.value as FileCategory)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-primary focus:border-primary"
                disabled={disabled}
              >
                {FILE_CATEGORIES.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label} - {category.description}
                  </option>
                ))}
              </select>
            </div>
          )}

          {persona === 'tech_savvy_optimizer' && file.uploadStatus === 'completed' && (
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="mt-2 text-xs text-primary hover:text-primary-dark font-medium"
            >
              {showDetails ? 'Hide' : 'Show'} technical details
            </button>
          )}

          {showDetails && (
            <div className="mt-2 p-2 bg-gray-100 rounded text-xs text-gray-600">
              <div>S3 Key: {file.s3Key}</div>
              <div>Upload ID: {file.id}</div>
              <div>MIME Type: {file.type}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
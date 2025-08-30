'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import type { DocumentUploadRequest, DocumentUploadResponse } from '@/lib/validations/caseSubmission';

interface FileUploadResult {
  success: boolean;
  s3Key?: string;
  fileId?: string;
  error?: string;
  metadata?: Record<string, any>;
}

interface UploadProgress {
  fileId: string;
  filename: string;
  progress: number;
  status: 'pending' | 'uploading' | 'completed' | 'failed' | 'cancelled';
  error?: string;
}

interface FileMetadata {
  category?: string;
  customerId?: string;
  tempCaseId?: string;
  [key: string]: any;
}

interface UseDocumentUploadOptions {
  maxFileSize?: number; // in MB
  allowedTypes?: string[];
  autoUpload?: boolean;
  chunkSize?: number; // for chunked uploads
  maxRetries?: number;
  onProgress?: (progress: UploadProgress[]) => void;
  onComplete?: (results: FileUploadResult[]) => void;
  onError?: (error: string, fileId?: string) => void;
}

interface UseDocumentUploadReturn {
  // Upload state
  isUploading: boolean;
  uploadProgress: UploadProgress[];
  completedUploads: FileUploadResult[];
  error: string | null;
  
  // Upload actions
  uploadFiles: (
    files: { file: File; metadata?: FileMetadata }[], 
    options?: { customerId?: string; tempCaseId?: string; associateWithCase?: boolean }
  ) => Promise<FileUploadResult[]>;
  uploadSingleFile: (
    file: File, 
    metadata?: FileMetadata
  ) => Promise<FileUploadResult>;
  cancelUpload: (fileId: string) => void;
  cancelAllUploads: () => void;
  retryUpload: (fileId: string) => Promise<FileUploadResult | null>;
  
  // File validation
  validateFile: (file: File) => { isValid: boolean; error?: string };
  validateFiles: (files: File[]) => { valid: File[]; invalid: { file: File; error: string }[] };
  
  // Progress utilities
  getTotalProgress: () => number;
  getUploadStatus: (fileId: string) => UploadProgress | null;
  clearCompleted: () => void;
  clearAll: () => void;
}

// File type mappings
const FILE_TYPE_MAPPINGS: Record<string, string[]> = {
  pdf: ['application/pdf'],
  image: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/bmp', 'image/tiff'],
  dicom: ['application/dicom', 'application/octet-stream'],
  document: [
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain',
    'application/rtf'
  ],
};

// Default options
const DEFAULT_OPTIONS: Required<UseDocumentUploadOptions> = {
  maxFileSize: 50, // 50MB
  allowedTypes: ['pdf', 'image', 'dicom'],
  autoUpload: false,
  chunkSize: 5 * 1024 * 1024, // 5MB chunks
  maxRetries: 3,
  onProgress: () => {},
  onComplete: () => {},
  onError: () => {},
};

export function useDocumentUpload(userOptions: UseDocumentUploadOptions = {}): UseDocumentUploadReturn {
  const options = { ...DEFAULT_OPTIONS, ...userOptions };
  
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<UploadProgress[]>([]);
  const [completedUploads, setCompletedUploads] = useState<FileUploadResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  const abortControllersRef = useRef<Map<string, AbortController>>(new Map());
  const retryCountsRef = useRef<Map<string, number>>(new Map());

  // Generate unique file ID
  const generateFileId = useCallback(() => {
    return `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  // Clean up abort controllers on unmount
  useEffect(() => {
    return () => {
      abortControllersRef.current.forEach(controller => controller.abort());
      abortControllersRef.current.clear();
    };
  }, []);

  // Validate a single file
  const validateFile = useCallback((file: File): { isValid: boolean; error?: string } => {
    // Check file size
    if (file.size > options.maxFileSize * 1024 * 1024) {
      return {
        isValid: false,
        error: `File size must be less than ${options.maxFileSize}MB`
      };
    }

    // Check file type
    const isValidType = options.allowedTypes.some(type => {
      const mimeTypes = FILE_TYPE_MAPPINGS[type] || [];
      return mimeTypes.includes(file.type) || 
             file.name.toLowerCase().endsWith(`.${type}`);
    });

    if (!isValidType) {
      return {
        isValid: false,
        error: `File type not supported. Allowed types: ${options.allowedTypes.join(', ')}`
      };
    }

    // Check for empty files
    if (file.size === 0) {
      return {
        isValid: false,
        error: 'File cannot be empty'
      };
    }

    return { isValid: true };
  }, [options.maxFileSize, options.allowedTypes]);

  // Validate multiple files
  const validateFiles = useCallback((files: File[]) => {
    const valid: File[] = [];
    const invalid: { file: File; error: string }[] = [];

    files.forEach(file => {
      const validation = validateFile(file);
      if (validation.isValid) {
        valid.push(file);
      } else {
        invalid.push({ file, error: validation.error! });
      }
    });

    return { valid, invalid };
  }, [validateFile]);

  // Update upload progress
  const updateProgress = useCallback((fileId: string, updates: Partial<UploadProgress>) => {
    setUploadProgress(prev => {
      const existing = prev.find(p => p.fileId === fileId);
      if (existing) {
        const updated = prev.map(p => p.fileId === fileId ? { ...p, ...updates } : p);
        options.onProgress(updated);
        return updated;
      } else {
        const newProgress = prev.concat({ fileId, filename: '', progress: 0, status: 'pending', ...updates });
        options.onProgress(newProgress);
        return newProgress;
      }
    });
  }, [options]);

  // Get presigned upload URL
  const getPresignedUrl = useCallback(async (
    filename: string,
    contentType: string,
    metadata: FileMetadata = {}
  ): Promise<{ uploadUrl: string; s3Key: string }> => {
    const authToken = localStorage.getItem('auth_token');
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    
    // Only add authorization if we have a valid token
    if (authToken && authToken.trim() && authToken !== 'null' && authToken !== 'undefined') {
      headers['Authorization'] = `Bearer ${authToken}`;
    }
    
    const response = await fetch('/api/presign-upload', {
      method: 'POST',
      headers,
      body: JSON.stringify([{
        filename,
        mimetype: contentType,
      }]),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Failed to get upload URL: ${response.status}`);
    }

    const result = await response.json();
    // The API returns an array, so we take the first item
    const apiResponse = result[0];
    // Map the API response format to what the hook expects
    return {
      uploadUrl: apiResponse.url,
      s3Key: apiResponse.key
    };
  }, []);

  // Upload file with chunking support
  const uploadFileChunked = useCallback(async (
    file: File,
    uploadUrl: string,
    fileId: string,
    signal: AbortSignal
  ): Promise<void> => {
    const chunkSize = options.chunkSize;
    const totalChunks = Math.ceil(file.size / chunkSize);
    
    if (file.size <= chunkSize) {
      // Direct upload for small files
      const response = await fetch(uploadUrl, {
        method: 'PUT',
        body: file,
        signal,
        headers: {
          'Content-Type': file.type,
        },
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.status}`);
      }

      updateProgress(fileId, { progress: 100, status: 'completed' });
      return;
    }

    // Chunked upload for large files
    for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
      if (signal.aborted) {
        throw new Error('Upload cancelled');
      }

      const start = chunkIndex * chunkSize;
      const end = Math.min(start + chunkSize, file.size);
      const chunk = file.slice(start, end);

      const chunkUploadUrl = `${uploadUrl}&partNumber=${chunkIndex + 1}`;
      
      const response = await fetch(chunkUploadUrl, {
        method: 'PUT',
        body: chunk,
        signal,
        headers: {
          'Content-Type': file.type,
          'Content-Range': `bytes ${start}-${end - 1}/${file.size}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Chunk upload failed: ${response.status}`);
      }

      const progress = Math.round(((chunkIndex + 1) / totalChunks) * 100);
      updateProgress(fileId, { progress, status: 'uploading' });
    }

    updateProgress(fileId, { progress: 100, status: 'completed' });
  }, [options.chunkSize, updateProgress]);

  // Upload single file
  const uploadSingleFile = useCallback(async (
    file: File,
    metadata: FileMetadata = {}
  ): Promise<FileUploadResult> => {
    const fileId = generateFileId();
    
    // Validate file
    const validation = validateFile(file);
    if (!validation.isValid) {
      const result: FileUploadResult = { success: false, error: validation.error };
      options.onError(validation.error!, fileId);
      return result;
    }

    // Initialize progress tracking
    updateProgress(fileId, {
      fileId,
      filename: file.name,
      progress: 0,
      status: 'pending',
    });

    // Create abort controller
    const abortController = new AbortController();
    abortControllersRef.current.set(fileId, abortController);

    try {
      setError(null);
      updateProgress(fileId, { status: 'uploading', progress: 5 });

      // Get presigned URL
      const { uploadUrl, s3Key } = await getPresignedUrl(file.name, file.type, metadata);
      updateProgress(fileId, { progress: 10 });

      // Upload file
      await uploadFileChunked(file, uploadUrl, fileId, abortController.signal);

      // Only notify API if user is authenticated, otherwise handle as anonymous upload
      const authToken = localStorage.getItem('auth_token');
      let result: FileUploadResult;
      
      if (authToken && authToken.trim() && authToken !== 'null' && authToken !== 'undefined') {
        // Authenticated user - notify API of successful upload
        try {
          const response = await fetch('/api/v1/customer/case-submission/upload-documents', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${authToken}`,
            },
            body: JSON.stringify({
              files: [{
                s3Key,
                filename: file.name,
                mimetype: file.type,
                size: file.size,
                category: metadata.category || 'medical_records',
              }],
              customerId: metadata.customerId,
              tempCaseId: metadata.tempCaseId,
              associateWithCase: false,
            }),
            signal: abortController.signal,
          });

          if (!response.ok) {
            throw new Error('Failed to register file upload');
          }

          const uploadResponse: DocumentUploadResponse = await response.json();
          const uploadedFile = uploadResponse.uploadedFiles[0];

          result = {
            success: true,
            s3Key: uploadedFile.s3Key,
            fileId: uploadedFile.id,
            metadata: { ...metadata, uploadResponse },
          };
        } catch (error) {
          // If API call fails, fall back to anonymous handling
          console.warn('API registration failed, treating as anonymous upload:', error);
          result = {
            success: true,
            s3Key,
            fileId: generateFileId(),
            metadata: { ...metadata, anonymous: true },
          };
        }
      } else {
        // Anonymous upload - just store file reference locally
        console.log('Anonymous upload completed:', { s3Key, filename: file.name });
        result = {
          success: true,
          s3Key,
          fileId: generateFileId(),
          metadata: { ...metadata, anonymous: true },
        };
      }

      setCompletedUploads(prev => [...prev, result]);
      updateProgress(fileId, { status: 'completed', progress: 100 });

      return result;

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Upload failed';
      
      if (errorMessage.includes('cancelled') || errorMessage.includes('aborted')) {
        updateProgress(fileId, { status: 'cancelled', error: 'Upload cancelled' });
        return { success: false, error: 'Upload cancelled' };
      }

      updateProgress(fileId, { status: 'failed', error: errorMessage });
      setError(errorMessage);
      options.onError(errorMessage, fileId);

      return { success: false, error: errorMessage };

    } finally {
      abortControllersRef.current.delete(fileId);
      retryCountsRef.current.delete(fileId);
    }
  }, [generateFileId, validateFile, updateProgress, getPresignedUrl, uploadFileChunked, options]);

  // Upload multiple files
  const uploadFiles = useCallback(async (
    files: { file: File; metadata?: FileMetadata }[],
    uploadOptions: { customerId?: string; tempCaseId?: string; associateWithCase?: boolean } = {}
  ): Promise<FileUploadResult[]> => {
    if (files.length === 0) {
      return [];
    }

    setIsUploading(true);
    setError(null);

    try {
      // Validate all files first
      const fileValidation = validateFiles(files.map(f => f.file));
      
      if (fileValidation.invalid.length > 0) {
        const errors = fileValidation.invalid.map(inv => `${inv.file.name}: ${inv.error}`);
        setError(errors.join(', '));
      }

      // Upload valid files
      const uploadPromises = files
        .filter(f => fileValidation.valid.includes(f.file))
        .map(({ file, metadata = {} }) => 
          uploadSingleFile(file, { 
            ...metadata, 
            ...uploadOptions 
          })
        );

      const results = await Promise.allSettled(uploadPromises);
      
      const successfulUploads = results
        .map(result => result.status === 'fulfilled' ? result.value : null)
        .filter((result): result is FileUploadResult => result !== null);

      options.onComplete(successfulUploads);
      return successfulUploads;

    } finally {
      setIsUploading(false);
    }
  }, [validateFiles, uploadSingleFile, options]);

  // Cancel upload
  const cancelUpload = useCallback((fileId: string) => {
    const controller = abortControllersRef.current.get(fileId);
    if (controller) {
      controller.abort();
      updateProgress(fileId, { status: 'cancelled', error: 'Upload cancelled by user' });
    }
  }, [updateProgress]);

  // Cancel all uploads
  const cancelAllUploads = useCallback(() => {
    abortControllersRef.current.forEach((controller, fileId) => {
      controller.abort();
      updateProgress(fileId, { status: 'cancelled', error: 'All uploads cancelled' });
    });
    
    abortControllersRef.current.clear();
    setIsUploading(false);
  }, [updateProgress]);

  // Retry upload
  const retryUpload = useCallback(async (fileId: string): Promise<FileUploadResult | null> => {
    const progress = uploadProgress.find(p => p.fileId === fileId);
    if (!progress || progress.status !== 'failed') {
      return null;
    }

    const retryCount = retryCountsRef.current.get(fileId) || 0;
    if (retryCount >= options.maxRetries) {
      setError(`Maximum retry attempts (${options.maxRetries}) exceeded for file`);
      return null;
    }

    retryCountsRef.current.set(fileId, retryCount + 1);
    
    // Reset progress and retry
    updateProgress(fileId, { status: 'pending', progress: 0, error: undefined });
    
    // Note: We'd need the original file and metadata to retry
    // This is a simplified implementation - in practice, you'd store these
    setError('Retry functionality requires storing original file data');
    return null;
  }, [uploadProgress, options.maxRetries, updateProgress]);

  // Get total progress across all uploads
  const getTotalProgress = useCallback((): number => {
    if (uploadProgress.length === 0) return 0;
    
    const totalProgress = uploadProgress.reduce((sum, progress) => sum + progress.progress, 0);
    return Math.round(totalProgress / uploadProgress.length);
  }, [uploadProgress]);

  // Get upload status for specific file
  const getUploadStatus = useCallback((fileId: string): UploadProgress | null => {
    return uploadProgress.find(p => p.fileId === fileId) || null;
  }, [uploadProgress]);

  // Clear completed uploads
  const clearCompleted = useCallback(() => {
    setUploadProgress(prev => prev.filter(p => p.status !== 'completed'));
    setCompletedUploads([]);
  }, []);

  // Clear all uploads and state
  const clearAll = useCallback(() => {
    cancelAllUploads();
    setUploadProgress([]);
    setCompletedUploads([]);
    setError(null);
    retryCountsRef.current.clear();
  }, [cancelAllUploads]);

  return {
    // Upload state
    isUploading,
    uploadProgress,
    completedUploads,
    error,
    
    // Upload actions
    uploadFiles,
    uploadSingleFile,
    cancelUpload,
    cancelAllUploads,
    retryUpload,
    
    // File validation
    validateFile,
    validateFiles,
    
    // Progress utilities
    getTotalProgress,
    getUploadStatus,
    clearCompleted,
    clearAll,
  };
}

// Utility hook for drag-and-drop file handling
export function useFileDrop(
  onFileDrop: (files: FileList) => void,
  options: { accept?: string[]; maxFiles?: number; disabled?: boolean } = {}
) {
  const [isDragActive, setIsDragActive] = useState(false);
  const [isDragReject, setIsDragReject] = useState(false);

  const handleDragEnter = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (options.disabled) return;
    
    setIsDragActive(true);
    
    // Check if dragged items are valid
    if (e.dataTransfer?.items) {
      const hasInvalidFiles = Array.from(e.dataTransfer.items).some(item => {
        if (item.kind !== 'file') return true;
        
        if (options.accept && options.accept.length > 0) {
          return !options.accept.some(type => item.type.includes(type));
        }
        
        return false;
      });
      
      setIsDragReject(hasInvalidFiles);
    }
  }, [options.disabled, options.accept]);

  const handleDragLeave = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    setIsDragReject(false);
  }, []);

  const handleDragOver = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsDragActive(false);
    setIsDragReject(false);
    
    if (options.disabled || !e.dataTransfer?.files) return;
    
    const files = e.dataTransfer.files;
    const fileArray = Array.from(files);
    
    // Limit number of files if specified
    const limitedFiles = options.maxFiles 
      ? fileArray.slice(0, options.maxFiles)
      : fileArray;
    
    if (limitedFiles.length > 0) {
      // Create a new FileList with limited files
      const dt = new DataTransfer();
      limitedFiles.forEach(file => dt.items.add(file));
      onFileDrop(dt.files);
    }
  }, [options.disabled, options.maxFiles, onFileDrop]);

  return {
    isDragActive,
    isDragReject,
    dragEvents: {
      onDragEnter: handleDragEnter,
      onDragLeave: handleDragLeave,
      onDragOver: handleDragOver,
      onDrop: handleDrop,
    },
  };
}
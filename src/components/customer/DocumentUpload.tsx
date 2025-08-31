'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { 
  Upload, 
  File, 
  X, 
  AlertCircle, 
  CheckCircle, 
  Eye,
  Download,
  Trash2
} from 'lucide-react';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadProgress: number;
  uploadKey?: string;
  uploadUrl?: string;
  status: 'uploading' | 'completed' | 'error';
  errorMessage?: string;
  category?: 'medical-record' | 'lab-result' | 'imaging' | 'other';
}

interface DocumentUploadProps {
  caseId?: string;
  onUploadComplete?: (files: UploadedFile[]) => void;
  maxFiles?: number;
  maxFileSize?: number;
  className?: string;
}

const ACCEPTED_FORMATS = {
  'application/pdf': ['.pdf'],
  'application/dicom': ['.dcm', '.dicom'],
  'image/tiff': ['.tif', '.tiff'],
  'image/png': ['.png'],
  'image/jpeg': ['.jpg', '.jpeg']
};

const FORMAT_DESCRIPTIONS = {
  'application/pdf': 'PDF documents',
  'application/dicom': 'DICOM medical images',
  'image/tiff': 'TIFF images',
  'image/png': 'PNG images',
  'image/jpeg': 'JPEG images'
};

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

export default function DocumentUpload({
  caseId,
  onUploadComplete,
  maxFiles = 10,
  maxFileSize = MAX_FILE_SIZE,
  className = ''
}: DocumentUploadProps) {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Notify parent component when files are updated
  useEffect(() => {
    if (onUploadComplete && files.length > 0) {
      onUploadComplete(files);
    }
  }, [files, onUploadComplete]);

  const validateFile = useCallback((file: File): { valid: boolean; error?: string } => {
    // Check file size
    if (file.size > maxFileSize) {
      return {
        valid: false,
        error: `File size exceeds ${Math.round(maxFileSize / (1024 * 1024))}MB limit`
      };
    }

    // Check file type
    const isValidType = Object.keys(ACCEPTED_FORMATS).some(mimeType => {
      if (file.type === mimeType) return true;
      const extensions = ACCEPTED_FORMATS[mimeType as keyof typeof ACCEPTED_FORMATS];
      return extensions.some(ext => file.name.toLowerCase().endsWith(ext));
    });

    if (!isValidType) {
      return {
        valid: false,
        error: 'File format not supported. Please upload PDF, DICOM, TIFF, PNG, or JPEG files only.'
      };
    }

    return { valid: true };
  }, [maxFileSize]);

  const categorizeFile = (file: File): UploadedFile['category'] => {
    const name = file.name.toLowerCase();
    const type = file.type;

    if (type === 'application/dicom' || name.includes('dicom') || name.includes('scan')) {
      return 'imaging';
    }
    if (name.includes('lab') || name.includes('test') || name.includes('result')) {
      return 'lab-result';
    }
    if (name.includes('record') || name.includes('history') || type === 'application/pdf') {
      return 'medical-record';
    }
    return 'other';
  };

  const uploadFile = async (file: File): Promise<void> => {
    const fileId = Math.random().toString(36).substring(2);
    
    const uploadedFile: UploadedFile = {
      id: fileId,
      name: file.name,
      size: file.size,
      type: file.type,
      uploadProgress: 0,
      status: 'uploading',
      category: categorizeFile(file)
    };

    setFiles(prev => [...prev, uploadedFile]);

    try {
      // If we have a caseId, upload directly to the Case Management Service
      if (caseId) {
        const { caseManagementService } = await import('@/lib/api');
        const response = await caseManagementService.uploadCaseDocument(caseId, file);
        
        if (response.success) {
          setFiles(prev => prev.map(f => 
            f.id === fileId 
              ? { ...f, status: 'completed', uploadProgress: 100, uploadKey: response.data?.uploadKey }
              : f
          ));
          return;
        } else {
          throw new Error(response.error || 'Failed to upload to case management service');
        }
      }

      // Fallback to presigned URL approach
      const tempSession = sessionStorage.getItem('temp_session_id') || localStorage.getItem('temp_session_id');
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      
      // Add temp session header for anonymous users
      if (tempSession) {
        headers['x-temp-session'] = tempSession;
      }
      
      const presignResponse = await fetch('/api/presign-upload', {
        method: 'POST',
        headers,
        body: JSON.stringify([{
          filename: file.name,
          mimetype: file.type,
          fileSize: file.size
        }])
      });

      if (!presignResponse.ok) {
        throw new Error('Failed to get upload URL');
      }

      const presignedUrls = await presignResponse.json();
      const { url: uploadUrl, key: uploadKey } = presignedUrls[0];

      // Update file with upload details
      setFiles(prev => prev.map(f => 
        f.id === fileId 
          ? { ...f, uploadUrl, uploadKey }
          : f
      ));

      // Upload file with progress tracking
      const xhr = new XMLHttpRequest();

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const progress = Math.round((event.loaded / event.total) * 100);
          setFiles(prev => prev.map(f => 
            f.id === fileId 
              ? { ...f, uploadProgress: progress }
              : f
          ));
        }
      };

      xhr.onload = () => {
        if (xhr.status === 200) {
          setFiles(prev => prev.map(f => 
            f.id === fileId 
              ? { ...f, status: 'completed', uploadProgress: 100 }
              : f
          ));
        } else {
          setFiles(prev => prev.map(f => 
            f.id === fileId 
              ? { ...f, status: 'error', errorMessage: 'Upload failed' }
              : f
          ));
        }
      };

      xhr.onerror = () => {
        setFiles(prev => prev.map(f => 
          f.id === fileId 
            ? { ...f, status: 'error', errorMessage: 'Network error during upload' }
            : f
        ));
      };

      xhr.open('PUT', uploadUrl);
      xhr.setRequestHeader('Content-Type', file.type);
      xhr.send(file);

    } catch (error) {
      setFiles(prev => prev.map(f => 
        f.id === fileId 
          ? { 
              ...f, 
              status: 'error', 
              errorMessage: error instanceof Error ? error.message : 'Upload failed' 
            }
          : f
      ));
    }
  };

  const handleFiles = useCallback(async (fileList: FileList) => {
    if (files.length + fileList.length > maxFiles) {
      alert(`Maximum ${maxFiles} files allowed`);
      return;
    }

    setIsUploading(true);

    const newFiles = Array.from(fileList);
    const validFiles: File[] = [];

    // Validate all files first
    for (const file of newFiles) {
      const validation = validateFile(file);
      if (!validation.valid) {
        alert(`${file.name}: ${validation.error}`);
      } else {
        validFiles.push(file);
      }
    }

    // Upload valid files
    try {
      await Promise.all(validFiles.map(file => uploadFile(file)));
    } finally {
      setIsUploading(false);
    }
  }, [files.length, maxFiles, validateFile]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragIn = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setDragActive(true);
    }
  }, []);

  const handleDragOut = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  }, [handleFiles]);

  const removeFile = (fileId: string) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const retryUpload = (fileId: string) => {
    const file = files.find(f => f.id === fileId);
    if (file) {
      // Create a new File object and retry upload
      // This is a simplified approach - in practice, you'd need to store the original file
      console.log('Retry upload for:', file.name);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getCategoryColor = (category: UploadedFile['category']) => {
    switch (category) {
      case 'medical-record': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'lab-result': return 'bg-green-50 text-green-700 border-green-200';
      case 'imaging': return 'bg-purple-50 text-purple-700 border-purple-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getCategoryLabel = (category: UploadedFile['category']) => {
    switch (category) {
      case 'medical-record': return 'Medical Record';
      case 'lab-result': return 'Lab Result';
      case 'imaging': return 'Medical Imaging';
      default: return 'Other';
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Upload Area */}
      <div
        className={`
          relative border-2 border-dashed rounded-lg p-6 text-center transition-colors
          ${dragActive 
            ? 'border-blue-400 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400'
          }
        `}
        onDragEnter={handleDragIn}
        onDragLeave={handleDragOut}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={Object.keys(ACCEPTED_FORMATS).join(',')}
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
          className="hidden"
        />
        
        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        
        <div className="space-y-2">
          <p className="text-lg font-medium text-gray-900">
            Drop medical documents here
          </p>
          <p className="text-sm text-gray-500">
            or{' '}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-blue-600 hover:text-blue-500 font-medium"
            >
              browse your files
            </button>
          </p>
        </div>
        
        <div className="mt-4 text-xs text-gray-500">
          <p className="font-medium mb-1">Accepted formats:</p>
          <p>{Object.values(FORMAT_DESCRIPTIONS).join(', ')}</p>
          <p className="mt-1">Max file size: {Math.round(maxFileSize / (1024 * 1024))}MB</p>
        </div>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="mt-6 space-y-3">
          <h4 className="text-sm font-medium text-gray-900">
            Uploaded Documents ({files.length}/{maxFiles})
          </h4>
          
          {files.map((file) => (
            <div
              key={file.id}
              className="flex items-center justify-between p-3 bg-white border rounded-lg shadow-sm"
            >
              <div className="flex items-center space-x-3 flex-1">
                <File className="h-8 w-8 text-gray-400" />
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {file.name}
                    </p>
                    <span className={`
                      inline-flex px-2 py-1 text-xs font-medium border rounded-full
                      ${getCategoryColor(file.category)}
                    `}>
                      {getCategoryLabel(file.category)}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-4 mt-1">
                    <p className="text-xs text-gray-500">
                      {formatFileSize(file.size)}
                    </p>
                    
                    {file.status === 'uploading' && (
                      <div className="flex-1 max-w-xs">
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${file.uploadProgress}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-500 min-w-0">
                            {file.uploadProgress}%
                          </span>
                        </div>
                      </div>
                    )}
                    
                    {file.status === 'completed' && (
                      <div className="flex items-center space-x-1">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-xs text-green-600">Complete</span>
                      </div>
                    )}
                    
                    {file.status === 'error' && (
                      <div className="flex items-center space-x-1">
                        <AlertCircle className="h-4 w-4 text-red-500" />
                        <span className="text-xs text-red-600">
                          {file.errorMessage}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {file.status === 'completed' && (
                  <>
                    <button
                      type="button"
                      className="p-1 text-gray-400 hover:text-gray-600"
                      title="Preview"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      className="p-1 text-gray-400 hover:text-gray-600"
                      title="Download"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                  </>
                )}
                
                {file.status === 'error' && (
                  <button
                    type="button"
                    onClick={() => retryUpload(file.id)}
                    className="px-2 py-1 text-xs text-blue-600 hover:text-blue-500"
                  >
                    Retry
                  </button>
                )}
                
                <button
                  type="button"
                  onClick={() => removeFile(file.id)}
                  className="p-1 text-gray-400 hover:text-red-600"
                  title="Remove"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Summary */}
      {files.length > 0 && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">
              Total files: {files.length}
            </span>
            <span className="text-gray-600">
              Completed: {files.filter(f => f.status === 'completed').length}
            </span>
            <span className="text-gray-600">
              Failed: {files.filter(f => f.status === 'error').length}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
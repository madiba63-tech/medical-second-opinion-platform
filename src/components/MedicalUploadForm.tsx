"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { MedicalFile, FILE_CATEGORIES } from "@/types/form";

const ACCEPTED_TYPES = {
  "application/pdf": [".pdf"],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
  "image/tiff": [".tif", ".tiff"],
  "application/dicom": [".dcm"],
};

interface Props {
  formData: any;
  updateFormData: (data: any) => void;
  nextStep: () => void;
  prevStep: () => void;
}

export default function MedicalUploadForm({ formData, updateFormData, nextStep, prevStep }: Props) {
  // Defensive programming: ensure files is always an array
  const initialFiles = formData?.medicalFiles || [];
  const [files, setFiles] = useState<MedicalFile[]>(initialFiles);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ [fileName: string]: number }>({});

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles: MedicalFile[] = acceptedFiles.map(file => ({
      name: file.name,
      size: file.size,
      type: file.type,
      category: "Other Document", // Default category
      s3Key: "", // Will be set after upload
      file, // Keep reference for upload
    }));
    
    setFiles(prev => [...prev, ...newFiles].slice(0, 10)); // Max 10 files
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_TYPES as any,
    maxFiles: 10,
    maxSize: 50 * 1024 * 1024, // 50MB
  });

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const updateFileCategory = (index: number, category: typeof FILE_CATEGORIES[number]) => {
    setFiles(prev => prev.map((file, i) => 
      i === index ? { ...file, category } : file
    ));
  };

  const uploadFiles = async () => {
    if (files.length === 0) {
      alert("Please upload at least one file");
      return;
    }

    const filesToUpload = files.filter(f => f.file && !f.s3Key);
    if (filesToUpload.length === 0) {
      // All files already uploaded
      updateFormData({ medicalFiles: files });
      nextStep();
      return;
    }

    setUploading(true);
    setUploadProgress({});

    try {
      // Get presigned URLs
      const presignResponse = await fetch("/api/presign-upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          filesToUpload.map(f => ({
            filename: f.name,
            mimetype: f.type,
          }))
        ),
      });

      if (!presignResponse.ok) {
        throw new Error("Failed to get upload URLs");
      }

      const presignData = await presignResponse.json();

      // Upload files in parallel
      const uploadPromises = filesToUpload.map(async (fileData, index) => {
        const { url, key } = presignData[index];
        const file = fileData.file!;

        // Simulate progress
        setUploadProgress(prev => ({ ...prev, [file.name]: 0 }));
        
        const progressInterval = setInterval(() => {
          setUploadProgress(prev => ({
            ...prev,
            [file.name]: Math.min((prev[file.name] || 0) + Math.random() * 30, 90)
          }));
        }, 200);

        try {
          const uploadResponse = await fetch(url, {
            method: "PUT",
            headers: { "Content-Type": file.type },
            body: file,
          });

          clearInterval(progressInterval);

          if (!uploadResponse.ok) {
            throw new Error(`Upload failed for ${file.name}`);
          }

          setUploadProgress(prev => ({ ...prev, [file.name]: 100 }));
          return { ...fileData, s3Key: key, file: undefined }; // Remove file reference
        } catch (error) {
          clearInterval(progressInterval);
          throw error;
        }
      });

      const uploadedFiles = await Promise.all(uploadPromises);
      
      // Update files with S3 keys
      const updatedFiles = files.map(file => {
        const uploaded = uploadedFiles.find(u => u.name === file.name);
        return uploaded || file;
      });

      setFiles(updatedFiles);
      updateFormData({ medicalFiles: updatedFiles });
      nextStep();
    } catch (error: any) {
      alert(error.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Upload & Classify Documents</h2>
      <p className="text-gray-600 mb-6">
        Upload your medical documents and categorize each file to help our clinicians review your case.
      </p>

      {/* Upload Area */}
      <div className="mb-6">
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive
              ? "border-blue-400 bg-blue-50"
              : "border-gray-300 hover:border-gray-400"
          }`}
        >
          <input {...getInputProps()} />
          <div className="space-y-2">
            <div className="text-4xl">📁</div>
            <p className="text-lg font-medium">
              {isDragActive ? "Drop files here" : "Drag & drop files here"}
            </p>
            <p className="text-sm text-gray-500">
              or click to browse (PDF, DOCX, JPG, PNG, TIFF, DICOM)
            </p>
            <p className="text-xs text-gray-400">
              Maximum 10 files, 50MB each
            </p>
          </div>
        </div>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-4 mb-6">
          <h3 className="text-lg font-medium">Uploaded Files ({files.length}/10)</h3>
          {files.map((file, index) => {
            const progress = uploadProgress[file.name];
            const isUploading = uploading && progress !== undefined;

            return (
              <div key={`${file.name}-${index}`} className="border rounded-lg p-4 bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3">
                      <div>
                        <p className="font-medium truncate" title={file.name}>
                          {file.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {(file.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      </div>
                    </div>

                    {/* Category Selection */}
                    <div className="mt-3">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category *
                      </label>
                      <select
                        value={file.category}
                        onChange={(e) => updateFileCategory(index, e.target.value as any)}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                        disabled={uploading}
                      >
                        {FILE_CATEGORIES.map(category => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Upload Progress */}
                    {isUploading && (
                      <div className="mt-3">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${Math.max(progress || 0, 0)}%` }}
                          />
                        </div>
                        <div className="text-xs text-gray-600 mt-1">
                          {progress === 100 ? "Complete" : `${Math.round(progress || 0)}%`}
                        </div>
                      </div>
                    )}
                  </div>

                  {!uploading && (
                    <button
                      onClick={() => removeFile(index)}
                      className="ml-4 text-red-600 hover:text-red-800 text-sm"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={prevStep}
          className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          disabled={uploading}
        >
          Previous
        </button>

        <button
          onClick={uploadFiles}
          disabled={files.length === 0 || uploading}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {uploading ? "Uploading..." : "Continue"}
        </button>
      </div>
    </div>
  );
}


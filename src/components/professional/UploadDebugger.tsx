'use client';

import { useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface UploadDebuggerProps {
  title: string;
  accept: Record<string, string[]>;
}

export default function UploadDebugger({ title, accept }: UploadDebuggerProps) {
  const [logs, setLogs] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, `[${timestamp}] ${message}`]);
  };

  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    accept,
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024,
    onDragEnter: () => addLog('✅ Drag enter detected'),
    onDragOver: () => addLog('⏳ Drag over detected'),
    onDragLeave: () => addLog('❌ Drag leave detected'),
    onDrop: async (acceptedFiles, rejectedFiles) => {
      addLog(`📁 Files dropped - Accepted: ${acceptedFiles.length}, Rejected: ${rejectedFiles.length}`);
      
      if (rejectedFiles.length > 0) {
        rejectedFiles.forEach(file => {
          addLog(`❌ Rejected: ${file.file.name} - ${file.errors.map(e => e.message).join(', ')}`);
        });
      }

      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        addLog(`📄 Processing file: ${file.name} (${file.size} bytes, ${file.type})`);
        
        setUploading(true);
        
        try {
          addLog('🌐 Requesting presigned URL...');
          const presignResponse = await fetch('/api/professional/presign-upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              files: [{
                filename: file.name,
                mimetype: file.type,
                fileSize: file.size
              }],
              email: 'debug@professional.com'
            })
          });

          if (!presignResponse.ok) {
            const errorText = await presignResponse.text();
            throw new Error(`Presign failed: ${presignResponse.status} - ${errorText}`);
          }

          const presignData = await presignResponse.json();
          addLog(`✅ Got presigned URL: ${presignData.uploadUrls[0].url.substring(0, 50)}...`);

          const { url } = presignData.uploadUrls[0];
          
          addLog('📤 Uploading file...');
          const uploadResponse = await fetch(url, {
            method: 'PUT',
            body: file,
            headers: { 'Content-Type': file.type }
          });

          if (!uploadResponse.ok) {
            throw new Error(`Upload failed: ${uploadResponse.status}`);
          }

          addLog('🎉 Upload successful!');
          
        } catch (error) {
          addLog(`💥 Error: ${error instanceof Error ? error.message : String(error)}`);
        } finally {
          setUploading(false);
        }
      }
    }
  });

  const clearLogs = () => setLogs([]);

  return (
    <div className="border border-yellow-300 bg-yellow-50 rounded-lg p-4 mb-6">
      <h3 className="text-lg font-semibold text-yellow-800 mb-4">🔧 {title} Debug Tool</h3>
      
      {/* Upload Area */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors mb-4 ${
          isDragAccept
            ? 'border-green-400 bg-green-50'
            : isDragReject
            ? 'border-red-400 bg-red-50'
            : isDragActive
            ? 'border-blue-400 bg-blue-50'
            : uploading
            ? 'border-yellow-400 bg-yellow-50'
            : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
        }`}
      >
        <input {...getInputProps()} />
        
        {uploading ? (
          <div>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <p className="text-blue-600">Processing upload...</p>
          </div>
        ) : (
          <div>
            <svg className="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="text-gray-600">
              <span className="font-medium text-blue-600">Click to test upload</span> or drag and drop
            </p>
            <div className="text-xs text-gray-500 mt-2">
              <p>State: {isDragActive ? 'Dragging' : isDragAccept ? 'Accept' : isDragReject ? 'Reject' : 'Idle'}</p>
              <p>Accepted types: {Object.keys(accept).join(', ')}</p>
            </div>
          </div>
        )}
      </div>

      {/* Debug Logs */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm font-medium text-yellow-800">Debug Logs</h4>
          <button
            onClick={clearLogs}
            className="text-xs bg-yellow-200 hover:bg-yellow-300 text-yellow-800 px-2 py-1 rounded"
          >
            Clear
          </button>
        </div>
        <div className="bg-gray-900 text-green-400 text-xs font-mono p-3 rounded max-h-60 overflow-y-auto">
          {logs.length === 0 ? (
            <p className="text-gray-500">No logs yet... Try uploading a file!</p>
          ) : (
            logs.map((log, index) => (
              <div key={index} className="mb-1">{log}</div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
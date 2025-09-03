'use client';

import { useState } from 'react';

interface AIDataReviewProps {
  title: string;
  extractedData: any;
  onUpdate: (data: any) => void;
  onApprove: () => void;
  schema: Array<{
    key: string;
    label: string;
    type: 'text' | 'number' | 'textarea' | 'select' | 'boolean' | 'array';
    options?: string[];
    placeholder?: string;
    required?: boolean;
  }>;
}

export default function AIDataReview({ 
  title, 
  extractedData, 
  onUpdate, 
  onApprove, 
  schema 
}: AIDataReviewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [localData, setLocalData] = useState(extractedData || {});
  const [approvalState, setApprovalState] = useState<'pending' | 'approved' | 'rejected'>('pending');

  const handleFieldChange = (key: string, value: any) => {
    const updatedData = { ...localData, [key]: value };
    setLocalData(updatedData);
    onUpdate(updatedData);
  };

  const handleApprove = () => {
    setApprovalState('approved');
    setIsEditing(false);
    onApprove();
  };

  const handleReject = () => {
    setApprovalState('rejected');
    setIsEditing(true);
  };

  const renderField = (field: any) => {
    const value = localData[field.key] || '';

    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            value={value}
            onChange={(e) => handleFieldChange(field.key, e.target.value)}
            placeholder={field.placeholder}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
            disabled={!isEditing && approvalState === 'approved'}
          />
        );
      
      case 'number':
        return (
          <input
            type="number"
            value={value}
            onChange={(e) => handleFieldChange(field.key, parseInt(e.target.value) || 0)}
            placeholder={field.placeholder}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={!isEditing && approvalState === 'approved'}
          />
        );
      
      case 'select':
        return (
          <select
            value={value}
            onChange={(e) => handleFieldChange(field.key, e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={!isEditing && approvalState === 'approved'}
          >
            <option value="">Select {field.label}</option>
            {field.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      
      case 'boolean':
        return (
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={Boolean(value)}
              onChange={(e) => handleFieldChange(field.key, e.target.checked)}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              disabled={!isEditing && approvalState === 'approved'}
            />
            <span className="text-gray-700">{field.label}</span>
          </label>
        );
      
      case 'array':
        const arrayValue = Array.isArray(value) ? value : [];
        return (
          <div>
            {arrayValue.map((item: string, index: number) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => {
                    const newArray = [...arrayValue];
                    newArray[index] = e.target.value;
                    handleFieldChange(field.key, newArray);
                  }}
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={!isEditing && approvalState === 'approved'}
                />
                {(isEditing || approvalState !== 'approved') && (
                  <button
                    type="button"
                    onClick={() => {
                      const newArray = arrayValue.filter((_: any, i: number) => i !== index);
                      handleFieldChange(field.key, newArray);
                    }}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            {(isEditing || approvalState !== 'approved') && (
              <button
                type="button"
                onClick={() => {
                  handleFieldChange(field.key, [...arrayValue, '']);
                }}
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                + Add Item
              </button>
            )}
          </div>
        );
      
      default:
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => handleFieldChange(field.key, e.target.value)}
            placeholder={field.placeholder}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={!isEditing && approvalState === 'approved'}
          />
        );
    }
  };

  return (
    <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <svg className="w-6 h-6 text-purple-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <div>
            <h3 className="text-lg font-semibold text-purple-900">{title}</h3>
            <p className="text-sm text-purple-700">
              AI has extracted this information from your uploaded documents. Please review and approve.
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {approvalState === 'approved' && (
            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              ✅ Approved
            </span>
          )}
          {approvalState === 'rejected' && (
            <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              ❌ Needs Review
            </span>
          )}
          {approvalState === 'pending' && (
            <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              ⏳ Pending Review
            </span>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {schema.map((field) => (
          <div key={field.key}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            {renderField(field)}
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-6 pt-4 border-t border-purple-200">
        <div className="flex space-x-3">
          {approvalState === 'pending' && (
            <>
              <button
                onClick={handleApprove}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                ✅ Approve Data
              </button>
              <button
                onClick={handleReject}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                ❌ Needs Changes
              </button>
            </>
          )}
          
          {approvalState === 'approved' && (
            <button
              onClick={() => {
                setApprovalState('pending');
                setIsEditing(true);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              📝 Edit Data
            </button>
          )}
          
          {approvalState === 'rejected' && (
            <button
              onClick={handleApprove}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              ✅ Approve Changes
            </button>
          )}
        </div>
        
        {(isEditing || approvalState === 'rejected') && (
          <button
            onClick={() => setIsEditing(false)}
            className="text-gray-600 hover:text-gray-800"
          >
            Cancel Editing
          </button>
        )}
      </div>
    </div>
  );
}
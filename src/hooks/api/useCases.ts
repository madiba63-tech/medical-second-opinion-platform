'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys, queryOptions, handleQueryError } from '@/lib/queryClient';

// Types
interface Case {
  id: string;
  caseNumber: string;
  diseaseType: string;
  status: 'submitted' | 'processing' | 'ai_analysis' | 'assigned' | 'under_review' | 'peer_review' | 'completed' | 'delivered';
  submittedDate: string;
  estimatedCompletion?: string;
  assignedTo?: string;
  finalOpinionUrl?: string;
  lastUpdated: string;
  urgency: 'low' | 'medium' | 'high';
  aiConfidenceScore?: number;
  progressPercentage?: number;
  nextStep?: string;
  documentsCount?: number;
  messagesCount?: number;
  patientInfo?: {
    name: string;
    age: number;
    gender: string;
    medicalHistory?: string[];
  };
}

interface CaseFilters {
  status?: string[];
  urgency?: string[];
  diseaseType?: string;
  dateRange?: {
    start: string;
    end: string;
  };
  search?: string;
  sortBy?: 'submittedDate' | 'lastUpdated' | 'urgency' | 'status';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

interface CasesResponse {
  cases: Case[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

interface Document {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadedDate: string;
  downloadUrl: string;
  thumbnailUrl?: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
}

interface TimelineEvent {
  id: string;
  type: 'status_change' | 'document_upload' | 'assignment' | 'comment' | 'system';
  timestamp: string;
  title: string;
  description: string;
  actor?: string;
  metadata?: any;
}

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderType: 'patient' | 'professional' | 'system';
  content: string;
  timestamp: string;
  attachments?: Document[];
  read: boolean;
}

// API functions
const fetchCases = async (filters?: CaseFilters): Promise<CasesResponse> => {
  const params = new URLSearchParams();
  
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined) {
        if (Array.isArray(value)) {
          params.append(key, value.join(','));
        } else if (typeof value === 'object') {
          params.append(key, JSON.stringify(value));
        } else {
          params.append(key, String(value));
        }
      }
    });
  }

  const response = await fetch(`/api/v1/customer/cases?${params}`);
  if (!response.ok) {
    throw new Error('Failed to fetch cases');
  }
  
  return response.json();
};

const fetchCaseDetails = async (caseNumber: string): Promise<Case> => {
  const response = await fetch(`/api/v1/customer/cases/${caseNumber}`);
  if (!response.ok) {
    throw new Error('Failed to fetch case details');
  }
  
  return response.json();
};

const fetchCaseDocuments = async (caseNumber: string): Promise<Document[]> => {
  const response = await fetch(`/api/v1/customer/cases/${caseNumber}/documents`);
  if (!response.ok) {
    throw new Error('Failed to fetch case documents');
  }
  
  return response.json();
};

const fetchCaseTimeline = async (caseNumber: string): Promise<TimelineEvent[]> => {
  const response = await fetch(`/api/v1/customer/cases/${caseNumber}/timeline`);
  if (!response.ok) {
    throw new Error('Failed to fetch case timeline');
  }
  
  return response.json();
};

const fetchCaseCommunication = async (caseNumber: string): Promise<Message[]> => {
  const response = await fetch(`/api/v1/customer/cases/${caseNumber}/messages`);
  if (!response.ok) {
    throw new Error('Failed to fetch case communication');
  }
  
  return response.json();
};

const sendMessage = async ({ caseNumber, content, attachments }: {
  caseNumber: string;
  content: string;
  attachments?: File[];
}): Promise<Message> => {
  const formData = new FormData();
  formData.append('content', content);
  
  if (attachments) {
    attachments.forEach((file, index) => {
      formData.append(`attachment_${index}`, file);
    });
  }
  
  const response = await fetch(`/api/v1/customer/cases/${caseNumber}/messages`, {
    method: 'POST',
    body: formData,
  });
  
  if (!response.ok) {
    throw new Error('Failed to send message');
  }
  
  return response.json();
};

const reopenCase = async ({ caseNumber, reason, additionalInfo }: {
  caseNumber: string;
  reason: string;
  additionalInfo?: string;
}): Promise<Case> => {
  const response = await fetch(`/api/v1/customer/cases/${caseNumber}/reopen`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      reason,
      additionalInfo,
    }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to reopen case');
  }
  
  return response.json();
};

// Custom Hooks
export const useCases = (filters?: CaseFilters) => {
  return useQuery({
    queryKey: queryKeys.casesList(filters),
    queryFn: () => fetchCases(filters),
    ...queryOptions.realtime,
    onError: handleQueryError,
  });
};

export const useCaseDetails = (caseNumber: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: queryKeys.caseDetails(caseNumber),
    queryFn: () => fetchCaseDetails(caseNumber),
    enabled: enabled && !!caseNumber,
    ...queryOptions.critical,
    onError: handleQueryError,
  });
};

export const useCaseDocuments = (caseNumber: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: queryKeys.caseDocuments(caseNumber),
    queryFn: () => fetchCaseDocuments(caseNumber),
    enabled: enabled && !!caseNumber,
    ...queryOptions.cached,
    onError: handleQueryError,
  });
};

export const useCaseTimeline = (caseNumber: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: queryKeys.caseTimeline(caseNumber),
    queryFn: () => fetchCaseTimeline(caseNumber),
    enabled: enabled && !!caseNumber,
    ...queryOptions.realtime,
    onError: handleQueryError,
  });
};

export const useCaseCommunication = (caseNumber: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: queryKeys.caseCommunication(caseNumber),
    queryFn: () => fetchCaseCommunication(caseNumber),
    enabled: enabled && !!caseNumber,
    ...queryOptions.realtime,
    onError: handleQueryError,
  });
};

export const useSendMessage = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: sendMessage,
    onMutate: async ({ caseNumber, content }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: queryKeys.caseCommunication(caseNumber) });
      
      // Snapshot previous value
      const previousMessages = queryClient.getQueryData<Message[]>(
        queryKeys.caseCommunication(caseNumber)
      );
      
      // Optimistically update
      const optimisticMessage: Message = {
        id: `temp-${Date.now()}`,
        senderId: 'current-user', // Should come from auth context
        senderName: 'You',
        senderType: 'patient',
        content,
        timestamp: new Date().toISOString(),
        read: true,
      };
      
      queryClient.setQueryData<Message[]>(
        queryKeys.caseCommunication(caseNumber),
        (old) => [...(old || []), optimisticMessage]
      );
      
      return { previousMessages, optimisticMessage };
    },
    onError: (err, variables, context) => {
      // Rollback on error
      if (context?.previousMessages) {
        queryClient.setQueryData(
          queryKeys.caseCommunication(variables.caseNumber),
          context.previousMessages
        );
      }
    },
    onSettled: (data, error, variables) => {
      // Always refetch after error or success
      queryClient.invalidateQueries({
        queryKey: queryKeys.caseCommunication(variables.caseNumber),
      });
    },
  });
};

export const useReopenCase = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: reopenCase,
    onSuccess: (data) => {
      // Update the case in the list
      queryClient.setQueryData<CasesResponse>(
        queryKeys.casesList(),
        (old) => {
          if (!old) return old;
          return {
            ...old,
            cases: old.cases.map((case_) =>
              case_.caseNumber === data.caseNumber ? data : case_
            ),
          };
        }
      );
      
      // Update individual case details
      queryClient.setQueryData(queryKeys.caseDetails(data.caseNumber), data);
      
      // Invalidate related queries
      queryClient.invalidateQueries({
        queryKey: queryKeys.caseTimeline(data.caseNumber),
      });
    },
    onError: handleQueryError,
  });
};

// Real-time subscription hook (would integrate with WebSocket)
export const useCaseRealTimeUpdates = (caseNumber: string) => {
  const queryClient = useQueryClient();
  
  // This would typically connect to a WebSocket or Server-Sent Events
  // For now, we'll use polling as a fallback
  return useQuery({
    queryKey: [...queryKeys.caseDetails(caseNumber), 'realtime'],
    queryFn: () => fetchCaseDetails(caseNumber),
    refetchInterval: 30000, // Poll every 30 seconds
    enabled: !!caseNumber,
    onSuccess: (data) => {
      // Update the main case details cache
      queryClient.setQueryData(queryKeys.caseDetails(caseNumber), data);
    },
    onError: handleQueryError,
  });
};

// Utility functions
export const prefetchCase = (caseNumber: string) => {
  const queryClient = useQueryClient();
  
  return queryClient.prefetchQuery({
    queryKey: queryKeys.caseDetails(caseNumber),
    queryFn: () => fetchCaseDetails(caseNumber),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const prefetchCaseDocuments = (caseNumber: string) => {
  const queryClient = useQueryClient();
  
  return queryClient.prefetchQuery({
    queryKey: queryKeys.caseDocuments(caseNumber),
    queryFn: () => fetchCaseDocuments(caseNumber),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};
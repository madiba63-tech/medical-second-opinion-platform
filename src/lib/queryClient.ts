import { QueryClient } from '@tanstack/react-query';

// Create a client
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Cache data for 5 minutes by default
      staleTime: 5 * 60 * 1000,
      // Keep unused data in cache for 10 minutes
      gcTime: 10 * 60 * 1000,
      // Retry failed requests 2 times
      retry: 2,
      // Retry with exponential backoff
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      // Refetch on window focus for critical data
      refetchOnWindowFocus: true,
      // Don't refetch on reconnect for most queries
      refetchOnReconnect: 'always',
    },
    mutations: {
      // Retry failed mutations once
      retry: 1,
      // Shorter retry delay for mutations
      retryDelay: 1000,
    },
  },
});

// Query Keys Factory
export const queryKeys = {
  all: ['customer'] as const,
  
  // Profile related
  profile: () => [...queryKeys.all, 'profile'] as const,
  profileDetails: (id: string) => [...queryKeys.profile(), id] as const,
  
  // Cases related
  cases: () => [...queryKeys.all, 'cases'] as const,
  casesList: (filters?: any) => [...queryKeys.cases(), 'list', filters] as const,
  caseDetails: (caseNumber: string) => [...queryKeys.cases(), 'details', caseNumber] as const,
  caseDocuments: (caseNumber: string) => [...queryKeys.cases(), 'documents', caseNumber] as const,
  caseTimeline: (caseNumber: string) => [...queryKeys.cases(), 'timeline', caseNumber] as const,
  caseCommunication: (caseNumber: string) => [...queryKeys.cases(), 'communication', caseNumber] as const,
  
  // Notifications related
  notifications: () => [...queryKeys.all, 'notifications'] as const,
  notificationsList: (filters?: any) => [...queryKeys.notifications(), 'list', filters] as const,
  
  // Support related
  support: () => [...queryKeys.all, 'support'] as const,
  supportTickets: () => [...queryKeys.support(), 'tickets'] as const,
  supportChat: (sessionId?: string) => [...queryKeys.support(), 'chat', sessionId] as const,
  supportFAQ: () => [...queryKeys.support(), 'faq'] as const,
  
  // Billing related
  billing: () => [...queryKeys.all, 'billing'] as const,
  billingHistory: () => [...queryKeys.billing(), 'history'] as const,
  billingMethods: () => [...queryKeys.billing(), 'methods'] as const,
  
  // Analytics related
  analytics: () => [...queryKeys.all, 'analytics'] as const,
  dashboardStats: () => [...queryKeys.analytics(), 'dashboard'] as const,
  caseAnalytics: (caseNumber: string) => [...queryKeys.analytics(), 'case', caseNumber] as const,
} as const;

// Common query options
export const queryOptions = {
  // For real-time data that changes frequently
  realtime: {
    staleTime: 0,
    gcTime: 1 * 60 * 1000, // 1 minute
    refetchInterval: 30 * 1000, // 30 seconds
    refetchOnWindowFocus: true,
  },
  
  // For cached data that changes infrequently
  cached: {
    staleTime: 15 * 60 * 1000, // 15 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    refetchOnWindowFocus: false,
  },
  
  // For critical data that should be fresh
  critical: {
    staleTime: 1 * 60 * 1000, // 1 minute
    gcTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  },
  
  // For background data that's nice to have
  background: {
    staleTime: 30 * 60 * 1000, // 30 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  },
} as const;

// Error handling
export const handleQueryError = (error: any) => {
  console.error('Query Error:', error);
  
  // You can add more sophisticated error handling here
  // such as sending to error tracking service, showing toasts, etc.
  
  if (error?.status === 401) {
    // Handle authentication errors
    // Redirect to login or refresh token
  } else if (error?.status === 403) {
    // Handle authorization errors
    // Show access denied message
  } else if (error?.status >= 500) {
    // Handle server errors
    // Show generic error message
  }
  
  return error;
};

// Custom hook for optimistic updates
export const useOptimisticUpdate = () => {
  return {
    updateProfile: (newProfile: any) => {
      queryClient.setQueryData(queryKeys.profile(), (old: any) => ({
        ...old,
        ...newProfile,
      }));
    },
    
    updateCaseStatus: (caseNumber: string, newStatus: string) => {
      // Update case in list
      queryClient.setQueryData(queryKeys.casesList(), (old: any) => {
        if (!old?.cases) return old;
        return {
          ...old,
          cases: old.cases.map((case_: any) =>
            case_.caseNumber === caseNumber
              ? { ...case_, status: newStatus }
              : case_
          ),
        };
      });
      
      // Update individual case details
      queryClient.setQueryData(queryKeys.caseDetails(caseNumber), (old: any) => ({
        ...old,
        status: newStatus,
      }));
    },
    
    addNotification: (notification: any) => {
      queryClient.setQueryData(queryKeys.notificationsList(), (old: any) => ({
        ...old,
        notifications: [notification, ...(old?.notifications || [])],
        totalCount: (old?.totalCount || 0) + 1,
      }));
    },
    
    markNotificationRead: (notificationId: string) => {
      queryClient.setQueryData(queryKeys.notificationsList(), (old: any) => {
        if (!old?.notifications) return old;
        return {
          ...old,
          notifications: old.notifications.map((notif: any) =>
            notif.id === notificationId
              ? { ...notif, read: true }
              : notif
          ),
        };
      });
    },
  };
};

export default queryClient;
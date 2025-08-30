import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

// Types
export interface CustomerProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  dateOfBirth?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  emergencyContact?: {
    name: string;
    relationship: string;
    phone: string;
    email?: string;
  };
  memberSince: string;
  completedCases: number;
  avatar?: string;
  membershipTier: 'basic' | 'premium' | 'enterprise';
  preferredChannel: 'EMAIL' | 'SMS' | 'PUSH';
  healthConditions?: string[];
  allergies?: string[];
  medications?: string[];
  insuranceInfo?: {
    provider: string;
    policyNumber: string;
    groupNumber?: string;
  };
}

export interface CustomerPreferences {
  language: string;
  timezone: string;
  notifications: {
    email: boolean;
    sms: boolean;
    push: boolean;
    caseUpdates: boolean;
    marketingEmails: boolean;
    appointmentReminders: boolean;
    securityAlerts: boolean;
  };
  accessibility: {
    highContrast: boolean;
    largeText: boolean;
    reduceMotion: boolean;
  };
  privacy: {
    shareDataForResearch: boolean;
    allowMarketingContacts: boolean;
    dataRetentionPeriod: '1year' | '3years' | '5years' | 'indefinite';
  };
}

export interface Notification {
  id: string;
  type: 'case_update' | 'system' | 'appointment' | 'billing' | 'security' | 'marketing';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  priority: 'high' | 'medium' | 'low';
  actionUrl?: string;
  expiresAt?: string;
  category: string;
}

export interface CommunicationState {
  unreadMessages: number;
  activeChat: {
    isActive: boolean;
    agentName?: string;
    estimatedWaitTime?: number;
  };
  supportAvailable: boolean;
  lastActivity?: string;
}

export interface UIState {
  theme: 'light' | 'dark' | 'system';
  sidebarCollapsed: boolean;
  mobileMenuOpen: boolean;
  currentPersona: 'informed_advocator' | 'cautious_researcher' | 'tech_savvy_optimizer';
  viewMode: 'cards' | 'list' | 'compact';
  language: string;
  region: string;
}

export interface CustomerState {
  // Profile & Authentication
  profile: CustomerProfile | null;
  isAuthenticated: boolean;
  preferences: CustomerPreferences;
  
  // Notifications
  notifications: Notification[];
  unreadNotificationsCount: number;
  
  // Communication
  communication: CommunicationState;
  
  // UI State
  ui: UIState;
  
  // Loading States
  loading: {
    profile: boolean;
    notifications: boolean;
    cases: boolean;
  };
  
  // Error States
  errors: {
    profile?: string;
    notifications?: string;
    cases?: string;
  };
  
  // Actions
  setProfile: (profile: CustomerProfile) => void;
  updateProfile: (updates: Partial<CustomerProfile>) => void;
  setPreferences: (preferences: Partial<CustomerPreferences>) => void;
  
  // Notification Actions
  addNotification: (notification: Notification) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
  
  // Communication Actions
  setCommunicationState: (state: Partial<CommunicationState>) => void;
  
  // UI Actions
  setUIState: (state: Partial<UIState>) => void;
  toggleSidebar: () => void;
  toggleMobileMenu: () => void;
  setPersona: (persona: UIState['currentPersona']) => void;
  
  // Loading Actions
  setLoading: (key: keyof CustomerState['loading'], value: boolean) => void;
  setError: (key: keyof CustomerState['errors'], error: string | undefined) => void;
  
  // Authentication Actions
  signIn: (profile: CustomerProfile) => void;
  signOut: () => void;
  
  // Utility Actions
  reset: () => void;
}

const defaultPreferences: CustomerPreferences = {
  language: 'en',
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  notifications: {
    email: true,
    sms: true,
    push: true,
    caseUpdates: true,
    marketingEmails: false,
    appointmentReminders: true,
    securityAlerts: true,
  },
  accessibility: {
    highContrast: false,
    largeText: false,
    reduceMotion: false,
  },
  privacy: {
    shareDataForResearch: false,
    allowMarketingContacts: false,
    dataRetentionPeriod: '3years',
  },
};

const defaultUIState: UIState = {
  theme: 'light',
  sidebarCollapsed: false,
  mobileMenuOpen: false,
  currentPersona: 'informed_advocator',
  viewMode: 'cards',
  language: 'en',
  region: 'US',
};

const defaultCommunicationState: CommunicationState = {
  unreadMessages: 0,
  activeChat: {
    isActive: false,
  },
  supportAvailable: true,
};

const initialState = {
  profile: null,
  isAuthenticated: false,
  preferences: defaultPreferences,
  notifications: [],
  unreadNotificationsCount: 0,
  communication: defaultCommunicationState,
  ui: defaultUIState,
  loading: {
    profile: false,
    notifications: false,
    cases: false,
  },
  errors: {},
};

export const useCustomerStore = create<CustomerState>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,

        // Profile Actions
        setProfile: (profile) =>
          set(
            (state) => ({
              profile,
              isAuthenticated: true,
              loading: { ...state.loading, profile: false },
              errors: { ...state.errors, profile: undefined },
            }),
            false,
            'setProfile'
          ),

        updateProfile: (updates) =>
          set(
            (state) => ({
              profile: state.profile ? { ...state.profile, ...updates } : null,
            }),
            false,
            'updateProfile'
          ),

        setPreferences: (preferences) =>
          set(
            (state) => ({
              preferences: { ...state.preferences, ...preferences },
            }),
            false,
            'setPreferences'
          ),

        // Notification Actions
        addNotification: (notification) =>
          set(
            (state) => ({
              notifications: [notification, ...state.notifications],
              unreadNotificationsCount: state.unreadNotificationsCount + 1,
            }),
            false,
            'addNotification'
          ),

        markNotificationRead: (id) =>
          set(
            (state) => {
              const notification = state.notifications.find((n) => n.id === id);
              if (!notification || notification.read) return state;

              return {
                notifications: state.notifications.map((n) =>
                  n.id === id ? { ...n, read: true } : n
                ),
                unreadNotificationsCount: Math.max(0, state.unreadNotificationsCount - 1),
              };
            },
            false,
            'markNotificationRead'
          ),

        markAllNotificationsRead: () =>
          set(
            (state) => ({
              notifications: state.notifications.map((n) => ({ ...n, read: true })),
              unreadNotificationsCount: 0,
            }),
            false,
            'markAllNotificationsRead'
          ),

        removeNotification: (id) =>
          set(
            (state) => {
              const notification = state.notifications.find((n) => n.id === id);
              const wasUnread = notification && !notification.read;

              return {
                notifications: state.notifications.filter((n) => n.id !== id),
                unreadNotificationsCount: wasUnread
                  ? Math.max(0, state.unreadNotificationsCount - 1)
                  : state.unreadNotificationsCount,
              };
            },
            false,
            'removeNotification'
          ),

        clearNotifications: () =>
          set(
            () => ({
              notifications: [],
              unreadNotificationsCount: 0,
            }),
            false,
            'clearNotifications'
          ),

        // Communication Actions
        setCommunicationState: (state) =>
          set(
            (currentState) => ({
              communication: { ...currentState.communication, ...state },
            }),
            false,
            'setCommunicationState'
          ),

        // UI Actions
        setUIState: (state) =>
          set(
            (currentState) => ({
              ui: { ...currentState.ui, ...state },
            }),
            false,
            'setUIState'
          ),

        toggleSidebar: () =>
          set(
            (state) => ({
              ui: { ...state.ui, sidebarCollapsed: !state.ui.sidebarCollapsed },
            }),
            false,
            'toggleSidebar'
          ),

        toggleMobileMenu: () =>
          set(
            (state) => ({
              ui: { ...state.ui, mobileMenuOpen: !state.ui.mobileMenuOpen },
            }),
            false,
            'toggleMobileMenu'
          ),

        setPersona: (persona) =>
          set(
            (state) => ({
              ui: { ...state.ui, currentPersona: persona },
            }),
            false,
            'setPersona'
          ),

        // Loading Actions
        setLoading: (key, value) =>
          set(
            (state) => ({
              loading: { ...state.loading, [key]: value },
            }),
            false,
            'setLoading'
          ),

        setError: (key, error) =>
          set(
            (state) => ({
              errors: { ...state.errors, [key]: error },
            }),
            false,
            'setError'
          ),

        // Authentication Actions
        signIn: (profile) =>
          set(
            () => ({
              profile,
              isAuthenticated: true,
              loading: { profile: false, notifications: false, cases: false },
              errors: {},
            }),
            false,
            'signIn'
          ),

        signOut: () =>
          set(
            () => ({
              ...initialState,
              ui: { ...defaultUIState, theme: get().ui.theme }, // Preserve theme preference
            }),
            false,
            'signOut'
          ),

        // Utility Actions
        reset: () =>
          set(() => initialState, false, 'reset'),
      }),
      {
        name: 'customer-store',
        partialize: (state) => ({
          profile: state.profile,
          isAuthenticated: state.isAuthenticated,
          preferences: state.preferences,
          ui: {
            theme: state.ui.theme,
            currentPersona: state.ui.currentPersona,
            viewMode: state.ui.viewMode,
            language: state.ui.language,
            region: state.ui.region,
          },
        }),
      }
    ),
    {
      name: 'customer-store',
      enabled: process.env.NODE_ENV === 'development',
    }
  )
);

// Selectors for optimized re-renders
export const useCustomerProfile = () => useCustomerStore((state) => state.profile);
export const useCustomerPreferences = () => useCustomerStore((state) => state.preferences);
export const useNotifications = () => useCustomerStore((state) => state.notifications);
export const useUnreadNotificationsCount = () => useCustomerStore((state) => state.unreadNotificationsCount);
export const useCommunicationState = () => useCustomerStore((state) => state.communication);
export const useUIState = () => useCustomerStore((state) => state.ui);
export const useLoadingStates = () => useCustomerStore((state) => state.loading);
export const useErrorStates = () => useCustomerStore((state) => state.errors);
export const useIsAuthenticated = () => useCustomerStore((state) => state.isAuthenticated);
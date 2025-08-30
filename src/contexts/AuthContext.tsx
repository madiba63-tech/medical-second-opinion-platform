'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { patientIdentityService, setAuthToken, clearAuthToken, CustomerProfile } from '@/lib/api';

interface AuthContextType {
  user: CustomerProfile | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (userData: Partial<CustomerProfile> & { password: string }) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<CustomerProfile>) => Promise<{ success: boolean; error?: string }>;
  refreshProfile: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<CustomerProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!user;

  // Initialize auth state on mount
  useEffect(() => {
    console.log('AuthContext: Starting initialization...');
    
    // Immediate timeout - force loading to false after just 1 second to prevent infinite loading
    const aggressiveTimeout = setTimeout(() => {
      console.log('AuthContext: Aggressive timeout (1s) - forcing loading to false immediately');
      setLoading(false);
    }, 1000);
    
    const initializeAuth = async () => {
      // Check if we're in the browser
      if (typeof window === 'undefined') {
        console.log('AuthContext: Not in browser, setting loading to false');
        setLoading(false);
        clearTimeout(aggressiveTimeout);
        return;
      }
      
      const token = localStorage.getItem('authToken');
      console.log('AuthContext: Token from localStorage:', !!token);
      
      if (!token) {
        console.log('AuthContext: No token found, setting loading to false');
        setLoading(false);
        clearTimeout(aggressiveTimeout);
        return;
      }

      setAuthToken(token);
      
      try {
        console.log('AuthContext: Calling getProfile API...');
        const response = await patientIdentityService.getProfile();
        console.log('AuthContext: getProfile response:', response);
        
        if (response.success && response.data) {
          const userData = response.data.user || response.data;
          console.log('AuthContext: Processing user data:', userData);
          // Add default values for missing fields
          const fullUserData = {
            ...userData,
            phone: userData.phone || '',
            dateOfBirth: userData.dateOfBirth || '',
            address: userData.address || {
              street: '',
              city: '',
              state: '',
              zipCode: '',
              country: 'US'
            },
            emergencyContact: userData.emergencyContact || {
              name: '',
              phone: '',
              relationship: ''
            },
            medicalHistory: userData.medicalHistory || [],
            preferredLanguage: userData.preferredLanguage || 'en',
            communicationPreferences: userData.communicationPreferences || {
              email: true,
              sms: false,
              push: true
            },
            memberSince: userData.createdAt || userData.memberSince || new Date().toISOString(),
            isActive: userData.isActive !== undefined ? userData.isActive : true
          };
          console.log('AuthContext: Setting user data and loading to false');
          setUser(fullUserData);
          setLoading(false);
          clearTimeout(aggressiveTimeout);
        } else {
          // Token is invalid, clear it
          console.log('AuthContext: Invalid token response, clearing auth');
          clearAuthToken();
          localStorage.removeItem('authToken');
          setLoading(false);
          clearTimeout(aggressiveTimeout);
        }
      } catch (error) {
        console.error('AuthContext: Auth initialization failed:', error);
        clearAuthToken();
        localStorage.removeItem('authToken');
        setLoading(false);
        clearTimeout(aggressiveTimeout);
      }
    };

    initializeAuth();
    
    return () => {
      clearTimeout(aggressiveTimeout);
    };
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setLoading(true);
    
    try {
      const response = await patientIdentityService.login(email, password);
      
      if (response.success && response.data) {
        // Handle new API response structure
        const token = response.data.tokens?.accessToken || response.data.token;
        const userData = response.data.user || response.data;
        
        if (token) {
          setAuthToken(token);
          localStorage.setItem('authToken', token);
        }
        
        // Add default values for missing fields
        const fullUserData = {
          ...userData,
          phone: userData.phone || '',
          dateOfBirth: userData.dateOfBirth || '',
          address: userData.address || {
            street: '',
            city: '',
            state: '',
            zipCode: '',
            country: 'US'
          },
          emergencyContact: userData.emergencyContact || {
            name: '',
            phone: '',
            relationship: ''
          },
          medicalHistory: userData.medicalHistory || [],
          preferredLanguage: userData.preferredLanguage || 'en',
          communicationPreferences: userData.communicationPreferences || {
            email: true,
            sms: false,
            push: true
          },
          memberSince: userData.createdAt || userData.memberSince || new Date().toISOString(),
          isActive: userData.isActive !== undefined ? userData.isActive : true
        };
        setUser(fullUserData);
        
        return { success: true };
      } else {
        return { success: false, error: response.error || 'Login failed' };
      }
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Login failed' 
      };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: Partial<CustomerProfile> & { password: string }): Promise<{ success: boolean; error?: string }> => {
    setLoading(true);
    
    try {
      const response = await patientIdentityService.register(userData);
      
      if (response.success && response.data) {
        // Handle new API response structure  
        const token = response.data.tokens?.accessToken || response.data.token;
        const userData = response.data.user || response.data;
        
        if (token) {
          setAuthToken(token);
          localStorage.setItem('authToken', token);
        }
        
        // Add default values for missing fields
        const fullUserData = {
          ...userData,
          phone: userData.phone || '',
          dateOfBirth: userData.dateOfBirth || '',
          address: userData.address || {
            street: '',
            city: '',
            state: '',
            zipCode: '',
            country: 'US'
          },
          emergencyContact: userData.emergencyContact || {
            name: '',
            phone: '',
            relationship: ''
          },
          medicalHistory: userData.medicalHistory || [],
          preferredLanguage: userData.preferredLanguage || 'en',
          communicationPreferences: userData.communicationPreferences || {
            email: true,
            sms: false,
            push: true
          },
          memberSince: userData.createdAt || userData.memberSince || new Date().toISOString(),
          isActive: userData.isActive !== undefined ? userData.isActive : true
        };
        setUser(fullUserData);
        
        return { success: true };
      } else {
        return { success: false, error: response.error || 'Registration failed' };
      }
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Registration failed' 
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setLoading(true);
    
    try {
      await patientIdentityService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      clearAuthToken();
      localStorage.removeItem('authToken');
      setUser(null);
      setLoading(false);
    }
  };

  const updateProfile = async (data: Partial<CustomerProfile>): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await patientIdentityService.updateProfile(data);
      
      if (response.success && response.data) {
        setUser(response.data);
        return { success: true };
      } else {
        return { success: false, error: response.error || 'Profile update failed' };
      }
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Profile update failed' 
      };
    }
  };

  const refreshProfile = async (): Promise<void> => {
    if (!isAuthenticated) return;
    
    try {
      const response = await patientIdentityService.getProfile();
      
      if (response.success && response.data) {
        const userData = response.data.user || response.data;
        // Add default values for missing fields
        const fullUserData = {
          ...userData,
          phone: userData.phone || '',
          dateOfBirth: userData.dateOfBirth || '',
          address: userData.address || {
            street: '',
            city: '',
            state: '',
            zipCode: '',
            country: 'US'
          },
          emergencyContact: userData.emergencyContact || {
            name: '',
            phone: '',
            relationship: ''
          },
          medicalHistory: userData.medicalHistory || [],
          preferredLanguage: userData.preferredLanguage || 'en',
          communicationPreferences: userData.communicationPreferences || {
            email: true,
            sms: false,
            push: true
          },
          memberSince: userData.createdAt || userData.memberSince || new Date().toISOString(),
          isActive: userData.isActive !== undefined ? userData.isActive : true
        };
        setUser(fullUserData);
      }
    } catch (error) {
      console.error('Profile refresh failed:', error);
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile,
    refreshProfile,
    isAuthenticated,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Higher-order component for protected routes
export function withAuth<P extends object>(Component: React.ComponentType<P>) {
  return function AuthenticatedComponent(props: P) {
    const { isAuthenticated, loading } = useAuth();
    
    if (loading) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600"></div>
        </div>
      );
    }
    
    if (!isAuthenticated) {
      // Redirect to login page
      window.location.href = '/login';
      return null;
    }
    
    return <Component {...props} />;
  };
}
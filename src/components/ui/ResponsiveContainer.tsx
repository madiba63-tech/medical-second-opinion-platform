'use client';

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { usePersona } from '@/hooks/usePersona';

type BreakpointSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
type ViewportOrientation = 'portrait' | 'landscape';
type DeviceType = 'mobile' | 'tablet' | 'desktop';

interface ViewportContextType {
  width: number;
  height: number;
  breakpoint: BreakpointSize;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  orientation: ViewportOrientation;
  deviceType: DeviceType;
  isTouchDevice: boolean;
}

const ViewportContext = createContext<ViewportContextType | null>(null);

const breakpoints = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
};

interface ResponsiveProviderProps {
  children: ReactNode;
}

export function ResponsiveProvider({ children }: ResponsiveProviderProps) {
  const [viewport, setViewport] = useState<ViewportContextType>({
    width: 0,
    height: 0,
    breakpoint: 'md',
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    orientation: 'landscape',
    deviceType: 'desktop',
    isTouchDevice: false
  });

  useEffect(() => {
    const updateViewport = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // Determine breakpoint
      let breakpoint: BreakpointSize = 'xs';
      Object.entries(breakpoints).forEach(([bp, minWidth]) => {
        if (width >= minWidth) {
          breakpoint = bp as BreakpointSize;
        }
      });

      // Determine device type
      const isMobile = width < breakpoints.md;
      const isTablet = width >= breakpoints.md && width < breakpoints.lg;
      const isDesktop = width >= breakpoints.lg;
      
      let deviceType: DeviceType = 'desktop';
      if (isMobile) deviceType = 'mobile';
      else if (isTablet) deviceType = 'tablet';

      // Determine orientation
      const orientation: ViewportOrientation = height > width ? 'portrait' : 'landscape';

      // Detect touch device
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

      setViewport({
        width,
        height,
        breakpoint,
        isMobile,
        isTablet,
        isDesktop,
        orientation,
        deviceType,
        isTouchDevice
      });
    };

    // Initial update
    updateViewport();

    // Add resize listener
    window.addEventListener('resize', updateViewport);
    window.addEventListener('orientationchange', updateViewport);

    return () => {
      window.removeEventListener('resize', updateViewport);
      window.removeEventListener('orientationchange', updateViewport);
    };
  }, []);

  return (
    <ViewportContext.Provider value={viewport}>
      {children}
    </ViewportContext.Provider>
  );
}

export function useViewport() {
  const context = useContext(ViewportContext);
  if (!context) {
    throw new Error('useViewport must be used within a ResponsiveProvider');
  }
  return context;
}

// Responsive Container Component
interface ResponsiveContainerProps {
  children: ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  gap?: 'none' | 'sm' | 'md' | 'lg';
  columns?: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
}

export function ResponsiveContainer({
  children,
  className = '',
  maxWidth = 'xl',
  padding = 'md',
  gap = 'md',
  columns
}: ResponsiveContainerProps) {
  const { isMobile, isTablet, deviceType } = useViewport();
  const { uiConfig } = usePersona();

  const maxWidthClasses = {
    sm: 'max-w-2xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    '2xl': 'max-w-none',
    full: 'max-w-full'
  };

  const paddingClasses = {
    none: '',
    sm: 'px-4 py-2',
    md: 'px-4 sm:px-6 py-4 sm:py-6',
    lg: 'px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10'
  };

  const gapClasses = {
    none: '',
    sm: 'space-y-3 sm:space-y-4',
    md: 'space-y-4 sm:space-y-6',
    lg: 'space-y-6 sm:space-y-8'
  };

  // Persona-based layout density adjustments
  const getDensityAdjustment = () => {
    switch (uiConfig.layout.density) {
      case 'compact':
        return 'space-y-2 sm:space-y-3';
      case 'spacious':
        return 'space-y-6 sm:space-y-8 lg:space-y-10';
      default:
        return gapClasses[gap];
    }
  };

  const getColumnsClass = () => {
    if (!columns) return '';
    
    return `grid grid-cols-${columns.mobile} sm:grid-cols-${columns.tablet} lg:grid-cols-${columns.desktop}`;
  };

  return (
    <div className={`mx-auto ${maxWidthClasses[maxWidth]} ${paddingClasses[padding]} ${className}`}>
      <div className={`${getDensityAdjustment()} ${getColumnsClass()}`}>
        {children}
      </div>
    </div>
  );
}

// Responsive Grid Component
interface ResponsiveGridProps {
  children: ReactNode;
  className?: string;
  cols?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  gap?: 'sm' | 'md' | 'lg';
  minItemWidth?: string;
}

export function ResponsiveGrid({
  children,
  className = '',
  cols = { mobile: 1, tablet: 2, desktop: 3 },
  gap = 'md',
  minItemWidth
}: ResponsiveGridProps) {
  const { uiConfig } = usePersona();

  const gapClasses = {
    sm: 'gap-3 sm:gap-4',
    md: 'gap-4 sm:gap-6',
    lg: 'gap-6 sm:gap-8'
  };

  // Adjust gap based on persona density preference
  const getPersonaGap = () => {
    switch (uiConfig.layout.density) {
      case 'compact':
        return 'gap-2 sm:gap-3';
      case 'spacious':
        return 'gap-6 sm:gap-8';
      default:
        return gapClasses[gap];
    }
  };

  const gridClass = minItemWidth
    ? `grid grid-cols-[repeat(auto-fit,minmax(${minItemWidth},1fr))]`
    : `grid grid-cols-${cols.mobile} sm:grid-cols-${cols.tablet} lg:grid-cols-${cols.desktop}`;

  return (
    <div className={`${gridClass} ${getPersonaGap()} ${className}`}>
      {children}
    </div>
  );
}

// Responsive Card Component
interface ResponsiveCardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'outlined' | 'ghost';
  padding?: 'sm' | 'md' | 'lg';
  hover?: boolean;
  onClick?: () => void;
}

export function ResponsiveCard({
  children,
  className = '',
  variant = 'default',
  padding = 'md',
  hover = false,
  onClick
}: ResponsiveCardProps) {
  const { isMobile } = useViewport();
  const { uiConfig } = usePersona();

  const variants = {
    default: 'bg-white border border-gray-200 rounded-xl shadow-sm',
    elevated: 'bg-white rounded-xl shadow-lg border-0',
    outlined: 'bg-white border-2 rounded-xl shadow-none',
    ghost: 'bg-transparent border-0 rounded-xl shadow-none'
  };

  const paddingClasses = {
    sm: isMobile ? 'p-3' : 'p-4',
    md: isMobile ? 'p-4' : 'p-6',
    lg: isMobile ? 'p-6' : 'p-8'
  };

  // Adjust based on persona layout density
  const getPersonaPadding = () => {
    switch (uiConfig.layout.density) {
      case 'compact':
        return isMobile ? 'p-3' : 'p-4';
      case 'spacious':
        return isMobile ? 'p-6' : 'p-8';
      default:
        return paddingClasses[padding];
    }
  };

  const hoverClass = hover ? 'hover:shadow-md hover:scale-105 transition-all duration-200' : '';
  const clickableClass = onClick ? 'cursor-pointer' : '';

  // Persona-specific border color
  const borderColor = variant === 'outlined' ? uiConfig.colorScheme.primary : '';
  const borderStyle = variant === 'outlined' ? { borderColor } : {};

  return (
    <div
      className={`${variants[variant]} ${getPersonaPadding()} ${hoverClass} ${clickableClass} ${className}`}
      style={borderStyle}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

// Touch-Optimized Button Component
interface TouchButtonProps {
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  href?: string;
}

export function TouchButton({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  onClick,
  href
}: TouchButtonProps) {
  const { isTouchDevice, isMobile } = useViewport();
  const { uiConfig } = usePersona();

  // Touch-optimized sizes (minimum 44px touch target)
  const sizeClasses = {
    sm: isTouchDevice ? 'px-4 py-3 text-sm' : 'px-3 py-2 text-sm',
    md: isTouchDevice ? 'px-6 py-3 text-sm' : 'px-4 py-2 text-sm',
    lg: isTouchDevice ? 'px-8 py-4 text-base' : 'px-6 py-3 text-base',
    xl: isTouchDevice ? 'px-10 py-5 text-lg' : 'px-8 py-4 text-lg'
  };

  const variants = {
    primary: {
      background: uiConfig.colorScheme.primary,
      color: 'white',
      border: 'transparent',
      hover: 'hover:opacity-90'
    },
    secondary: {
      background: 'white',
      color: uiConfig.colorScheme.primary,
      border: uiConfig.colorScheme.primary,
      hover: 'hover:bg-gray-50'
    },
    ghost: {
      background: 'transparent',
      color: uiConfig.colorScheme.primary,
      border: 'transparent',
      hover: `hover:bg-${uiConfig.colorScheme.primary}10`
    },
    danger: {
      background: '#EF4444',
      color: 'white',
      border: 'transparent',
      hover: 'hover:bg-red-600'
    }
  };

  const variantStyle = variants[variant];
  const widthClass = fullWidth ? 'w-full' : '';
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  
  // Enhanced touch feedback for mobile
  const touchClass = isMobile ? 'active:scale-95 active:opacity-75' : '';
  
  const baseClass = `inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${touchClass}`;

  const style = {
    backgroundColor: variantStyle.background,
    color: variantStyle.color,
    borderColor: variantStyle.border,
    borderWidth: variant === 'secondary' ? '2px' : '0',
    focusRingColor: uiConfig.colorScheme.primary
  };

  const Component = href ? 'a' : 'button';

  return (
    <Component
      className={`${baseClass} ${sizeClasses[size]} ${widthClass} ${variantStyle.hover} ${disabledClass} ${className}`}
      style={style}
      onClick={onClick}
      href={href}
      disabled={disabled && !href}
    >
      {children}
    </Component>
  );
}

// Responsive Modal Component
interface ResponsiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnOverlay?: boolean;
}

export function ResponsiveModal({
  isOpen,
  onClose,
  title,
  children,
  className = '',
  size = 'md',
  closeOnOverlay = true
}: ResponsiveModalProps) {
  const { isMobile, height } = useViewport();
  const { uiConfig } = usePersona();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: isMobile ? 'max-w-sm mx-4' : 'max-w-md',
    md: isMobile ? 'max-w-md mx-4' : 'max-w-lg',
    lg: isMobile ? 'max-w-lg mx-4' : 'max-w-2xl',
    xl: isMobile ? 'max-w-xl mx-4' : 'max-w-4xl',
    full: isMobile ? 'mx-4 my-4' : 'mx-8 my-8'
  };

  // Mobile-specific adjustments
  const mobileClass = isMobile 
    ? `fixed inset-x-0 bottom-0 rounded-t-3xl max-h-[90vh] overflow-hidden ${height < 700 ? 'rounded-b-none' : ''}` 
    : 'rounded-xl';

  const positionClass = isMobile 
    ? 'items-end' 
    : 'items-center justify-center';

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={closeOnOverlay ? onClose : undefined}
      />
      
      {/* Modal Content */}
      <div className={`relative bg-white ${mobileClass} ${sizeClasses[size]} transform transition-all duration-300 ease-out ${className}`}>
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        {/* Mobile drag indicator */}
        {isMobile && !title && (
          <div className="flex justify-center pt-3 pb-2">
            <div className="w-8 h-1 bg-gray-300 rounded-full" />
          </div>
        )}

        {/* Content */}
        <div className={`${title || isMobile ? 'p-6' : 'p-6'} overflow-y-auto max-h-[70vh] sm:max-h-[80vh]`}>
          {children}
        </div>
      </div>
    </div>
  );
}

// Hook for responsive utilities
export function useResponsiveUtils() {
  const viewport = useViewport();
  const { uiConfig } = usePersona();

  return {
    ...viewport,
    
    // Utility functions
    getSpacing: (size: 'sm' | 'md' | 'lg') => {
      const base = { sm: 4, md: 6, lg: 8 };
      const multiplier = uiConfig.layout.density === 'compact' ? 0.75 : 
                        uiConfig.layout.density === 'spacious' ? 1.25 : 1;
      return base[size] * multiplier;
    },
    
    getFontSize: (size: 'sm' | 'md' | 'lg') => {
      const base = { sm: 14, md: 16, lg: 18 };
      const adjustment = uiConfig.typography.size === 'compact' ? -2 :
                        uiConfig.typography.size === 'comfortable' ? 2 : 0;
      return base[size] + adjustment;
    },
    
    getTouchTargetSize: () => viewport.isTouchDevice ? 44 : 32,
    
    getOptimalColumns: (minWidth: number = 250) => {
      return Math.floor(viewport.width / minWidth) || 1;
    },
    
    shouldUseCompactLayout: () => {
      return viewport.isMobile || uiConfig.layout.density === 'compact';
    },
    
    getPersonaColors: () => uiConfig.colorScheme
  };
}
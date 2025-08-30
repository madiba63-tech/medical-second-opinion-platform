'use client';

import { useEffect, useState, useMemo } from 'react';
import { PERSONA_UI_CONFIGS, type CustomerPersona, type PersonaUIConfiguration } from '@/types/persona';

interface PersonaAdaptiveUIProps {
  children: React.ReactNode;
  persona?: CustomerPersona | null;
  className?: string;
}

interface ThemeColors {
  primary: string;
  primaryDark: string;
  primaryLight: string;
  secondary: string;
  secondaryDark: string;
  secondaryLight: string;
  accent: string;
  accentDark: string;
  accentLight: string;
  background: string;
  backgroundDark: string;
  backgroundLight: string;
}

interface ThemeConfiguration extends PersonaUIConfiguration {
  colors: ThemeColors;
  spacing: {
    compact: string;
    standard: string;
    spacious: string;
  };
  borderRadius: {
    small: string;
    medium: string;
    large: string;
  };
  shadows: {
    subtle: string;
    medium: string;
    strong: string;
  };
}

// Default theme for when no persona is detected
const DEFAULT_THEME: PersonaUIConfiguration = {
  persona: 'informed_advocator',
  colorScheme: {
    primary: '#3B82F6',
    secondary: '#10B981',
    accent: '#8B5CF6',
    background: '#F8FAFC'
  },
  typography: {
    headingFont: 'Inter',
    bodyFont: 'Inter',
    size: 'standard'
  },
  layout: {
    density: 'standard',
    navigationStyle: 'standard',
    informationDepth: 'comprehensive'
  },
  features: {
    showAdvancedMetrics: true,
    enableQuickActions: true,
    showTechnicalDetails: true,
    prioritizeEducation: true,
    emphasizeTrust: true
  }
};

// Enhanced color variants for better theming
function generateThemeColors(colorScheme: PersonaUIConfiguration['colorScheme']): ThemeColors {
  // Simple hex to RGB conversion for color manipulation
  const hexToRgb = (hex: string): [number, number, number] => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
      parseInt(result[1], 16),
      parseInt(result[2], 16),
      parseInt(result[3], 16)
    ] : [59, 130, 246]; // default blue
  };

  const darken = (hex: string, amount = 0.2): string => {
    const [r, g, b] = hexToRgb(hex);
    return `rgb(${Math.round(r * (1 - amount))}, ${Math.round(g * (1 - amount))}, ${Math.round(b * (1 - amount))})`;
  };

  const lighten = (hex: string, amount = 0.1): string => {
    const [r, g, b] = hexToRgb(hex);
    return `rgb(${Math.min(255, Math.round(r + (255 - r) * amount))}, ${Math.min(255, Math.round(g + (255 - g) * amount))}, ${Math.min(255, Math.round(b + (255 - b) * amount))})`;
  };

  return {
    primary: colorScheme.primary,
    primaryDark: darken(colorScheme.primary, 0.2),
    primaryLight: lighten(colorScheme.primary, 0.1),
    secondary: colorScheme.secondary,
    secondaryDark: darken(colorScheme.secondary, 0.2),
    secondaryLight: lighten(colorScheme.secondary, 0.1),
    accent: colorScheme.accent,
    accentDark: darken(colorScheme.accent, 0.2),
    accentLight: lighten(colorScheme.accent, 0.1),
    background: colorScheme.background,
    backgroundDark: darken(colorScheme.background, 0.05),
    backgroundLight: lighten(colorScheme.background, 0.02),
  };
}

function createThemeConfiguration(config: PersonaUIConfiguration): ThemeConfiguration {
  const colors = generateThemeColors(config.colorScheme);
  
  const spacing = {
    compact: config.layout.density === 'compact' ? '0.5rem' : config.layout.density === 'standard' ? '0.75rem' : '1rem',
    standard: config.layout.density === 'compact' ? '1rem' : config.layout.density === 'standard' ? '1.5rem' : '2rem',
    spacious: config.layout.density === 'compact' ? '1.5rem' : config.layout.density === 'standard' ? '2rem' : '2.5rem',
  };

  const borderRadius = {
    small: config.layout.density === 'compact' ? '0.25rem' : '0.375rem',
    medium: config.layout.density === 'compact' ? '0.5rem' : '0.75rem',
    large: config.layout.density === 'compact' ? '0.75rem' : '1rem',
  };

  const shadows = {
    subtle: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    medium: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    strong: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  };

  return {
    ...config,
    colors,
    spacing,
    borderRadius,
    shadows,
  };
}

export function PersonaAdaptiveUI({ children, persona, className = '' }: PersonaAdaptiveUIProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const theme = useMemo(() => {
    const baseConfig = persona ? PERSONA_UI_CONFIGS[persona] : DEFAULT_THEME;
    return createThemeConfiguration(baseConfig);
  }, [persona]);

  // Generate CSS custom properties for the theme
  const cssVariables = useMemo(() => {
    return {
      '--color-primary': theme.colors.primary,
      '--color-primary-dark': theme.colors.primaryDark,
      '--color-primary-light': theme.colors.primaryLight,
      '--color-secondary': theme.colors.secondary,
      '--color-secondary-dark': theme.colors.secondaryDark,
      '--color-secondary-light': theme.colors.secondaryLight,
      '--color-accent': theme.colors.accent,
      '--color-accent-dark': theme.colors.accentDark,
      '--color-accent-light': theme.colors.accentLight,
      '--color-background': theme.colors.background,
      '--color-background-dark': theme.colors.backgroundDark,
      '--color-background-light': theme.colors.backgroundLight,
      '--spacing-compact': theme.spacing.compact,
      '--spacing-standard': theme.spacing.standard,
      '--spacing-spacious': theme.spacing.spacious,
      '--border-radius-small': theme.borderRadius.small,
      '--border-radius-medium': theme.borderRadius.medium,
      '--border-radius-large': theme.borderRadius.large,
      '--shadow-subtle': theme.shadows.subtle,
      '--shadow-medium': theme.shadows.medium,
      '--shadow-strong': theme.shadows.strong,
      '--font-heading': theme.typography.headingFont,
      '--font-body': theme.typography.bodyFont,
      '--font-size-multiplier': theme.typography.size === 'compact' ? '0.875' : theme.typography.size === 'comfortable' ? '1.125' : '1',
      '--layout-density': theme.layout.density === 'compact' ? '0.75' : theme.layout.density === 'spacious' ? '1.25' : '1',
    } as React.CSSProperties;
  }, [theme]);

  // Dynamic class names based on persona configuration
  const dynamicClasses = useMemo(() => {
    const classes = ['persona-adaptive-ui'];
    
    // Add persona-specific classes
    if (persona) {
      classes.push(`persona-${persona}`);
    }
    
    // Add layout density classes
    classes.push(`layout-${theme.layout.density}`);
    
    // Add navigation style classes
    classes.push(`nav-${theme.layout.navigationStyle}`);
    
    // Add typography size classes
    classes.push(`text-${theme.typography.size}`);
    
    // Add information depth classes
    classes.push(`info-${theme.layout.informationDepth}`);
    
    return classes.join(' ');
  }, [persona, theme]);

  // Don't render anything on server to avoid hydration mismatches
  if (!isClient) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div 
      className={`${dynamicClasses} ${className}`}
      style={cssVariables}
      data-persona={persona || 'default'}
      data-theme={theme.persona}
    >
      <style jsx global>{`
        .persona-adaptive-ui {
          --color-primary-rgb: ${theme.colors.primary.replace('#', '').match(/.{2}/g)?.map(hex => parseInt(hex, 16)).join(', ') || '59, 130, 246'};
          --color-secondary-rgb: ${theme.colors.secondary.replace('#', '').match(/.{2}/g)?.map(hex => parseInt(hex, 16)).join(', ') || '16, 185, 129'};
          --color-accent-rgb: ${theme.colors.accent.replace('#', '').match(/.{2}/g)?.map(hex => parseInt(hex, 16)).join(', ') || '139, 92, 246'};
        }

        /* Persona-specific button styles */
        .persona-adaptive-ui .btn-primary {
          background-color: var(--color-primary);
          border-color: var(--color-primary);
          color: white;
          border-radius: var(--border-radius-medium);
          box-shadow: var(--shadow-subtle);
          transition: all 0.2s ease-in-out;
        }

        .persona-adaptive-ui .btn-primary:hover {
          background-color: var(--color-primary-dark);
          border-color: var(--color-primary-dark);
          box-shadow: var(--shadow-medium);
          transform: translateY(-1px);
        }

        .persona-adaptive-ui .btn-secondary {
          background-color: var(--color-secondary);
          border-color: var(--color-secondary);
          color: white;
          border-radius: var(--border-radius-medium);
          box-shadow: var(--shadow-subtle);
          transition: all 0.2s ease-in-out;
        }

        .persona-adaptive-ui .btn-secondary:hover {
          background-color: var(--color-secondary-dark);
          border-color: var(--color-secondary-dark);
          box-shadow: var(--shadow-medium);
          transform: translateY(-1px);
        }

        /* Input field styles */
        .persona-adaptive-ui input,
        .persona-adaptive-ui select,
        .persona-adaptive-ui textarea {
          border-radius: var(--border-radius-medium);
          border-color: #d1d5db;
          transition: all 0.2s ease-in-out;
        }

        .persona-adaptive-ui input:focus,
        .persona-adaptive-ui select:focus,
        .persona-adaptive-ui textarea:focus {
          border-color: var(--color-primary);
          box-shadow: 0 0 0 3px rgba(var(--color-primary-rgb), 0.1);
          outline: none;
        }

        /* Card styles */
        .persona-adaptive-ui .card {
          background-color: white;
          border-radius: var(--border-radius-large);
          box-shadow: var(--shadow-medium);
          border: 1px solid #f3f4f6;
        }

        /* Progress bar styles */
        .persona-adaptive-ui .progress-bar {
          background-color: var(--color-primary);
          border-radius: var(--border-radius-small);
        }

        .persona-adaptive-ui .progress-bg {
          background-color: var(--color-background-dark);
          border-radius: var(--border-radius-small);
        }

        /* Alert styles */
        .persona-adaptive-ui .alert-success {
          background-color: var(--color-secondary-light);
          border-color: var(--color-secondary);
          color: var(--color-secondary-dark);
          border-radius: var(--border-radius-medium);
        }

        .persona-adaptive-ui .alert-warning {
          background-color: var(--color-accent-light);
          border-color: var(--color-accent);
          color: var(--color-accent-dark);
          border-radius: var(--border-radius-medium);
        }

        .persona-adaptive-ui .alert-error {
          background-color: #fef2f2;
          border-color: #f87171;
          color: #dc2626;
          border-radius: var(--border-radius-medium);
        }

        /* Typography adjustments */
        .persona-adaptive-ui.text-compact {
          font-size: 0.875rem;
        }

        .persona-adaptive-ui.text-comfortable {
          font-size: 1.125rem;
          line-height: 1.75;
        }

        .persona-adaptive-ui h1,
        .persona-adaptive-ui h2,
        .persona-adaptive-ui h3 {
          font-family: var(--font-heading, 'Inter', sans-serif);
        }

        .persona-adaptive-ui p,
        .persona-adaptive-ui span,
        .persona-adaptive-ui div {
          font-family: var(--font-body, 'Inter', sans-serif);
        }

        /* Layout density adjustments */
        .persona-adaptive-ui.layout-compact {
          --spacing-multiplier: 0.75;
        }

        .persona-adaptive-ui.layout-spacious {
          --spacing-multiplier: 1.25;
        }

        .persona-adaptive-ui.layout-compact .space-y-4 > * + * {
          margin-top: calc(1rem * var(--spacing-multiplier, 1));
        }

        .persona-adaptive-ui.layout-compact .space-y-6 > * + * {
          margin-top: calc(1.5rem * var(--spacing-multiplier, 1));
        }

        .persona-adaptive-ui.layout-compact .p-4 {
          padding: calc(1rem * var(--spacing-multiplier, 1));
        }

        .persona-adaptive-ui.layout-compact .p-6 {
          padding: calc(1.5rem * var(--spacing-multiplier, 1));
        }

        /* Persona-specific customizations */
        .persona-adaptive-ui.persona-cautious_researcher {
          --emphasis-trust: 1;
          --emphasis-education: 1;
        }

        .persona-adaptive-ui.persona-cautious_researcher .trust-badge {
          display: block;
          opacity: 1;
        }

        .persona-adaptive-ui.persona-tech_savvy_optimizer {
          --emphasis-efficiency: 1;
        }

        .persona-adaptive-ui.persona-tech_savvy_optimizer .advanced-metrics {
          display: block;
        }

        .persona-adaptive-ui.persona-informed_advocator {
          --emphasis-comprehensive: 1;
        }

        .persona-adaptive-ui.persona-informed_advocator .technical-details {
          display: block;
        }

        /* Navigation style adjustments */
        .persona-adaptive-ui.nav-simple .nav-advanced {
          display: none;
        }

        .persona-adaptive-ui.nav-advanced .nav-simple {
          display: none;
        }

        /* Information depth adjustments */
        .persona-adaptive-ui.info-minimal .detailed-info {
          display: none;
        }

        .persona-adaptive-ui.info-comprehensive .summary-only {
          display: none;
        }

        /* Accessibility improvements */
        .persona-adaptive-ui button:focus,
        .persona-adaptive-ui a:focus {
          outline: 2px solid var(--color-primary);
          outline-offset: 2px;
        }

        .persona-adaptive-ui [data-focus-visible-added] {
          outline: 2px solid var(--color-primary);
          outline-offset: 2px;
        }

        /* High contrast mode support */
        @media (prefers-contrast: high) {
          .persona-adaptive-ui {
            --color-primary: #000080;
            --color-secondary: #008000;
            --color-accent: #800080;
          }
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .persona-adaptive-ui * {
            transition: none !important;
            animation: none !important;
          }
        }

        /* Dark mode support (if needed) */
        @media (prefers-color-scheme: dark) {
          .persona-adaptive-ui {
            --color-background: #1f2937;
            --color-background-dark: #111827;
            --color-background-light: #374151;
          }
        }
      `}</style>
      
      {children}
      
      {/* Theme indicator for development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 left-4 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded z-50">
          Persona: {persona || 'default'} | Theme: {theme.persona}
        </div>
      )}
    </div>
  );
}

// Hook to access current theme configuration
export function usePersonaTheme(persona?: CustomerPersona | null) {
  return useMemo(() => {
    const baseConfig = persona ? PERSONA_UI_CONFIGS[persona] : DEFAULT_THEME;
    return createThemeConfiguration(baseConfig);
  }, [persona]);
}

// Utility component for persona-aware styling
export function PersonaStyledDiv({ 
  persona, 
  variant = 'default', 
  children, 
  className = '',
  ...props 
}: {
  persona?: CustomerPersona | null;
  variant?: 'default' | 'primary' | 'secondary' | 'accent';
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}) {
  const theme = usePersonaTheme(persona);
  
  const variantClasses = {
    default: '',
    primary: 'border-l-4 border-primary bg-primary bg-opacity-5',
    secondary: 'border-l-4 border-secondary bg-secondary bg-opacity-5',
    accent: 'border-l-4 border-accent bg-accent bg-opacity-5',
  };
  
  return (
    <div 
      className={`${variantClasses[variant]} ${className}`} 
      data-variant={variant}
      {...props}
    >
      {children}
    </div>
  );
}
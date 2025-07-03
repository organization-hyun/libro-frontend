export const theme = {
  colors: {
    primary: '#007bff',
    primaryDark: '#0056b3',
    secondary: '#28a745',
    secondaryDark: '#218838',
    text: {
      primary: '#333',
      secondary: '#666',
      light: '#888',
    },
    background: {
      main: '#f5f5f5',
      white: '#ffffff',
      light: '#fafafa',
    },
    border: '#e0e0e0',
    error: '#dc3545',
    errorDark: '#c82333',
    warning: '#ffc107',
    disabled: '#6c757d',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '1rem',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
    md: '0 3px 6px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.12)',
    lg: '0 10px 20px rgba(0, 0, 0, 0.15), 0 3px 6px rgba(0, 0, 0, 0.10)',
  },
  transitions: {
    default: '0.3s ease',
  },
  breakpoints: {
    mobile: '320px',
    tablet: '768px',
    desktop: '1024px',
  },
  mediaQueries: {
    mobile: '@media (max-width: 767px)',
    tablet: '@media (min-width: 768px) and (max-width: 1023px)',
    desktop: '@media (min-width: 1024px)',
  },
} as const; 
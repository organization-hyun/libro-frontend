export const theme = {
  colors: {
    primary: '#007bff',
    text: {
      primary: '#333',
      secondary: '#666',
      light: '#888',
    },
    background: {
      main: '#f5f5f5',
      white: '#ffffff',
    },
  },
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem',
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '50%',
  },
  shadows: {
    sm: '0 2px 4px rgba(0, 0, 0, 0.1)',
    md: '0 2px 8px rgba(0, 0, 0, 0.2)',
  },
  transitions: {
    default: '0.2s',
  },
} as const; 
import { createTheme, ThemeOptions } from '@mui/material/styles';

// Color palette
const colors = {
  primary: '#FF8C00', // Orange
  primaryLight: '#FFB84D',
  primaryDark: '#E67E00',
  secondary: '#9E9E9E', // Grey
  secondaryLight: '#B0BEC5',
  secondaryDark: '#616161',
  background: '#FFF8F0', // Cream
  surface: '#FFFFFF',
  text: '#212121',
  textSecondary: '#757575',
  border: '#E0E0E0',
  error: '#D32F2F',
  warning: '#F57C00',
  info: '#1976D2',
  success: '#388E3C',
};

const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: colors.primary,
      light: colors.primaryLight,
      dark: colors.primaryDark,
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: colors.secondary,
      light: colors.secondaryLight,
      dark: colors.secondaryDark,
      contrastText: '#FFFFFF',
    },
    background: {
      default: colors.background,
      paper: colors.surface,
    },
    text: {
      primary: colors.text,
      secondary: colors.textSecondary,
    },
    divider: colors.border,
    error: {
      main: colors.error,
    },
    warning: {
      main: colors.warning,
    },
    info: {
      main: colors.info,
    },
    success: {
      main: colors.success,
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontWeight: 700,
      fontSize: 'clamp(2rem, 5vw, 3.5rem)',
      lineHeight: 1.2,
    },
    h2: {
      fontWeight: 700,
      fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
      lineHeight: 1.3,
    },
    h3: {
      fontWeight: 700,
      fontSize: 'clamp(1.25rem, 3vw, 2rem)',
      lineHeight: 1.3,
    },
    h4: {
      fontWeight: 600,
      fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
    },
    h5: {
      fontWeight: 600,
      fontSize: 'clamp(1rem, 2vw, 1.25rem)',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
    },
    body1: {
      fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: 'clamp(0.85rem, 1.2vw, 1rem)',
      lineHeight: 1.5,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          borderRadius: 8,
          padding: '10px 20px',
          transition: 'all 0.2s ease',
        },
        contained: {
          boxShadow: '0 2px 8px rgba(255, 140, 0, 0.2)',
          '&:hover': {
            boxShadow: '0 4px 16px rgba(255, 140, 0, 0.3)',
          },
        },
        outlined: {
          borderColor: colors.primary,
          color: colors.primary,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: colors.surface,
          color: colors.text,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: 'clamp(1rem, 5vw, 2rem)',
          paddingRight: 'clamp(1rem, 5vw, 2rem)',
        },
      },
    },
    MuiGrid: {
      styleOverrides: {
        root: {
          width: '100%',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: 'inherit',
        },
      },
    },
  },
};

export const theme = createTheme(themeOptions);

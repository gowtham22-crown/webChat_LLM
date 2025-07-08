import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#00C389', // Standard Chartered Green
      light: '#4DD4A4',
      dark: '#00A374',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#0078D4', // Professional Blue
      light: '#40A4F4',
      dark: '#005A9F',
      contrastText: '#ffffff',
    },
    background: {
      default: '#F8FFFE',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1A1A1A',
      secondary: '#666666',
    },
    grey: {
      50: '#F8F9FA',
      100: '#E9ECEF',
      200: '#DEE2E6',
      300: '#CED4DA',
      400: '#ADB5BD',
      500: '#6C757D',
      600: '#495057',
      700: '#343A40',
      800: '#212529',
      900: '#000000',
    },
    success: {
      main: '#00C389',
      light: '#4DD4A4',
      dark: '#00A374',
    },
    error: {
      main: '#DC3545',
      light: '#FF6B7A',
      dark: '#C82333',
    },
    warning: {
      main: '#FFC107',
      light: '#FFD54F',
      dark: '#FF8F00',
    },
    info: {
      main: '#0078D4',
      light: '#40A4F4',
      dark: '#005A9F',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    button: {
      fontSize: '0.875rem',
      fontWeight: 500,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0px 2px 4px rgba(0, 0, 0, 0.05)',
    '0px 4px 8px rgba(0, 0, 0, 0.1)',
    '0px 8px 16px rgba(0, 0, 0, 0.1)',
    '0px 12px 24px rgba(0, 0, 0, 0.1)',
    '0px 16px 32px rgba(0, 0, 0, 0.1)',
    '0px 20px 40px rgba(0, 0, 0, 0.1)',
    '0px 24px 48px rgba(0, 0, 0, 0.15)',
    '0px 28px 56px rgba(0, 0, 0, 0.15)',
    '0px 32px 64px rgba(0, 0, 0, 0.15)',
    '0px 36px 72px rgba(0, 0, 0, 0.2)',
    '0px 40px 80px rgba(0, 0, 0, 0.2)',
    '0px 44px 88px rgba(0, 0, 0, 0.2)',
    '0px 48px 96px rgba(0, 0, 0, 0.25)',
    '0px 52px 104px rgba(0, 0, 0, 0.25)',
    '0px 56px 112px rgba(0, 0, 0, 0.25)',
    '0px 60px 120px rgba(0, 0, 0, 0.3)',
    '0px 64px 128px rgba(0, 0, 0, 0.3)',
    '0px 68px 136px rgba(0, 0, 0, 0.3)',
    '0px 72px 144px rgba(0, 0, 0, 0.35)',
    '0px 76px 152px rgba(0, 0, 0, 0.35)',
    '0px 80px 160px rgba(0, 0, 0, 0.35)',
    '0px 84px 168px rgba(0, 0, 0, 0.4)',
    '0px 88px 176px rgba(0, 0, 0, 0.4)',
    '0px 92px 184px rgba(0, 0, 0, 0.4)',
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 20px',
          fontSize: '0.875rem',
          fontWeight: 500,
          textTransform: 'none',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #00C389 0%, #00A374 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #00A374 0%, #008A63 100%)',
          },
        },
        containedSecondary: {
          background: 'linear-gradient(135deg, #0078D4 0%, #005A9F 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #005A9F 0%, #004578 100%)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.08)',
          border: '1px solid rgba(0, 0, 0, 0.05)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 20,
        },
      },
    },
  },
});

export default theme; 
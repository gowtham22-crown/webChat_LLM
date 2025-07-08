import React, { useState, useEffect } from 'react';
import { ThemeProvider, CssBaseline, GlobalStyles } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import theme from './theme';
import LoginPage from './components/Auth/LoginPage';
import MainDashboard from './components/Dashboard/MainDashboard';

// Global styles for modern aesthetics
const globalStyles = {
  '*': {
    boxSizing: 'border-box',
  },
  html: {
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
  },
  body: {
    margin: 0,
    padding: 0,
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    backgroundColor: '#F8FFFE',
  },
  '#root': {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  // Custom scrollbar styling for webkit browsers
  '::-webkit-scrollbar': {
    width: '8px',
    height: '8px',
  },
  '::-webkit-scrollbar-track': {
    background: '#f1f1f1',
    borderRadius: '10px',
  },
  '::-webkit-scrollbar-thumb': {
    background: 'linear-gradient(135deg, #00C389 0%, #0078D4 100%)',
    borderRadius: '10px',
    '&:hover': {
      background: 'linear-gradient(135deg, #00A374 0%, #005A9F 100%)',
    },
  },
  // Enhanced focus styles for accessibility
  '*:focus-visible': {
    outline: '2px solid #00C389',
    outlineOffset: '2px',
  },
  // Smooth transitions for better UX
  '*': {
    transition: 'all 0.2s ease-in-out',
  },
  // Animation keyframes
  '@keyframes fadeIn': {
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
  },
  '@keyframes slideIn': {
    from: { transform: 'translateX(-100%)' },
    to: { transform: 'translateX(0)' },
  },
  '@keyframes pulse': {
    '0%': { opacity: 1 },
    '50%': { opacity: 0.5 },
    '100%': { opacity: 1 },
  },
  // Enhanced button hover effects
  '.MuiButton-root': {
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      transform: 'translateY(-1px)',
    },
  },
  // Enhanced card hover effects
  '.MuiCard-root': {
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      transform: 'translateY(-2px)',
    },
  },
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on app load
  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        const storedUser = localStorage.getItem('bankingAppUser');
        const storedAuth = localStorage.getItem('bankingAppAuth');
        
        if (storedUser && storedAuth === 'true') {
          const userData = JSON.parse(storedUser);
          setUser(userData);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        // Clear potentially corrupted data
        localStorage.removeItem('bankingAppUser');
        localStorage.removeItem('bankingAppAuth');
      } finally {
        setLoading(false);
      }
    };

    // Simulate loading time for better UX
    setTimeout(checkAuthStatus, 1000);
  }, []);

  const handleLogin = (userData) => {
    try {
      // Store user data and auth status
      localStorage.setItem('bankingAppUser', JSON.stringify(userData));
      localStorage.setItem('bankingAppAuth', 'true');
      
      setUser(userData);
      setIsAuthenticated(true);
      
      // Track login event (in real app, send to analytics)
      console.log('User logged in:', userData.mobile);
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handleLogout = () => {
    try {
      // Clear stored data
      localStorage.removeItem('bankingAppUser');
      localStorage.removeItem('bankingAppAuth');
      
      // Clear state
      setUser(null);
      setIsAuthenticated(false);
      
      // Track logout event (in real app, send to analytics)
      console.log('User logged out');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  // Loading screen component
  const LoadingScreen = () => (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #00C389 0%, #0078D4 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          width: 80,
          height: 80,
          background: 'rgba(255,255,255,0.2)',
          borderRadius: 16,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 24,
          animation: 'pulse 2s infinite',
        }}
      >
        <span
          style={{
            color: 'white',
            fontSize: '2rem',
            fontWeight: 'bold',
          }}
        >
          S
        </span>
      </div>
      <h2
        style={{
          color: 'white',
          margin: 0,
          fontFamily: '"Inter", sans-serif',
          fontWeight: 600,
          fontSize: '1.5rem',
          marginBottom: 8,
        }}
      >
        Standard Chartered
      </h2>
      <p
        style={{
          color: 'rgba(255,255,255,0.8)',
          margin: 0,
          fontFamily: '"Inter", sans-serif',
          fontSize: '1rem',
        }}
      >
        AI Banking Assistant
      </p>
      <div
        style={{
          width: 40,
          height: 4,
          background: 'rgba(255,255,255,0.3)',
          borderRadius: 2,
          marginTop: 24,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            background: 'white',
            borderRadius: 2,
            animation: 'slideIn 2s infinite',
          }}
        />
      </div>
    </div>
  );

  // Error boundary component
  const ErrorBoundary = ({ children }) => {
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
      const handleError = (error) => {
        console.error('Application error:', error);
        setHasError(true);
      };

      window.addEventListener('error', handleError);
      window.addEventListener('unhandledrejection', handleError);

      return () => {
        window.removeEventListener('error', handleError);
        window.removeEventListener('unhandledrejection', handleError);
      };
    }, []);

    if (hasError) {
      return (
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            background: 'linear-gradient(135deg, #00C389 0%, #0078D4 100%)',
            color: 'white',
            textAlign: 'center',
            padding: 20,
          }}
        >
          <h1 style={{ marginBottom: 16 }}>Oops! Something went wrong</h1>
          <p style={{ marginBottom: 24, opacity: 0.8 }}>
            We're experiencing technical difficulties. Please try refreshing the page.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: '1px solid rgba(255,255,255,0.3)',
              color: 'white',
              padding: '12px 24px',
              borderRadius: 8,
              cursor: 'pointer',
              fontSize: '1rem',
            }}
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return children;
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <CssBaseline />
          <GlobalStyles styles={globalStyles} />
          
          {!isAuthenticated ? (
            <LoginPage onLogin={handleLogin} />
          ) : (
            <MainDashboard user={user} onLogout={handleLogout} />
          )}
        </LocalizationProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App; 
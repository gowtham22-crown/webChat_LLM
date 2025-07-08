import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  InputAdornment,
  CircularProgress,
  Alert,
  Fade,
  Zoom,
} from '@mui/material';
import {
  Phone,
  Security,
  CheckCircle,
} from '@mui/icons-material';

const LoginPage = ({ onLogin }) => {
  const [step, setStep] = useState('mobile'); // 'mobile', 'otp', 'success'
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleMobileSubmit = async (e) => {
    e.preventDefault();
    if (!mobileNumber || mobileNumber.length < 10) {
      setError('Please enter a valid mobile number');
      return;
    }
    
    setLoading(true);
    setError('');
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setStep('otp');
    }, 1500);
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }
    
    setLoading(true);
    setError('');
    
    // Simulate OTP verification
    setTimeout(() => {
      setLoading(false);
      if (otp === '123456') {
        setStep('success');
        setTimeout(() => {
          onLogin({
            mobile: mobileNumber,
            name: 'John Doe',
            accountNumber: '****1234',
            balance: 'SGD 25,450.00'
          });
        }, 1000);
      } else {
        setError('Invalid OTP. Please try again.');
      }
    }, 1500);
  };

  const resendOtp = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setError('');
    }, 1000);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #00C389 0%, #0078D4 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
      }}
    >
      <Zoom in={true} timeout={800}>
        <Card
          sx={{
            maxWidth: 400,
            width: '100%',
            borderRadius: 3,
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
            overflow: 'visible',
          }}
        >
          <CardContent sx={{ p: 4 }}>
            {/* Standard Chartered Logo */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  margin: '0 auto',
                  mb: 2,
                  background: 'linear-gradient(135deg, #0078D4 0%, #00C389 100%)',
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  '&::before': {
                    content: '"S"',
                    color: 'white',
                    fontSize: '2rem',
                    fontWeight: 'bold',
                  }
                }}
              />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: 'text.primary',
                  mb: 0.5,
                }}
              >
                Standard Chartered
              </Typography>
            </Box>

            {/* Mobile Number Step */}
            <Fade in={step === 'mobile'} timeout={600}>
              <Box sx={{ display: step === 'mobile' ? 'block' : 'none' }}>
                <Typography
                  variant="h4"
                  sx={{
                    textAlign: 'center',
                    mb: 3,
                    fontWeight: 600,
                    color: 'text.primary',
                  }}
                >
                  Log in
                </Typography>

                <form onSubmit={handleMobileSubmit}>
                  <TextField
                    fullWidth
                    label="Mobile number"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                    placeholder="+65 9XXX XXXX"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Phone color="primary" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ mb: 3 }}
                    disabled={loading}
                  />

                  {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                      {error}
                    </Alert>
                  )}

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    disabled={loading || !mobileNumber}
                    sx={{
                      py: 1.5,
                      fontSize: '1rem',
                      fontWeight: 600,
                    }}
                  >
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Log in'}
                  </Button>
                </form>

                <Typography
                  variant="body2"
                  sx={{
                    textAlign: 'center',
                    mt: 3,
                    color: 'text.secondary',
                  }}
                >
                  We'll send you a verification code via SMS
                </Typography>
              </Box>
            </Fade>

            {/* OTP Verification Step */}
            <Fade in={step === 'otp'} timeout={600}>
              <Box sx={{ display: step === 'otp' ? 'block' : 'none' }}>
                <Typography
                  variant="h4"
                  sx={{
                    textAlign: 'center',
                    mb: 2,
                    fontWeight: 600,
                    color: 'text.primary',
                  }}
                >
                  Verify OTP
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    textAlign: 'center',
                    mb: 3,
                    color: 'text.secondary',
                  }}
                >
                  Enter the 6-digit code sent to<br />
                  <strong>+65 {mobileNumber}</strong>
                </Typography>

                <form onSubmit={handleOtpSubmit}>
                  <TextField
                    fullWidth
                    label="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="123456"
                    inputProps={{
                      style: { textAlign: 'center', fontSize: '1.5rem', letterSpacing: '0.5rem' }
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Security color="primary" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ mb: 3 }}
                    disabled={loading}
                  />

                  {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                      {error}
                    </Alert>
                  )}

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    disabled={loading || otp.length !== 6}
                    sx={{
                      py: 1.5,
                      fontSize: '1rem',
                      fontWeight: 600,
                      mb: 2,
                    }}
                  >
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Verify & Login'}
                  </Button>

                  <Button
                    fullWidth
                    variant="text"
                    onClick={resendOtp}
                    disabled={loading}
                    sx={{ color: 'primary.main' }}
                  >
                    Resend OTP
                  </Button>
                </form>

                <Typography
                  variant="body2"
                  sx={{
                    textAlign: 'center',
                    mt: 3,
                    color: 'text.secondary',
                  }}
                >
                  Use <strong>123456</strong> for demo purposes
                </Typography>
              </Box>
            </Fade>

            {/* Success Step */}
            <Fade in={step === 'success'} timeout={600}>
              <Box
                sx={{
                  display: step === 'success' ? 'flex' : 'none',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                }}
              >
                <CheckCircle
                  sx={{
                    fontSize: 80,
                    color: 'success.main',
                    mb: 2,
                  }}
                />
                <Typography
                  variant="h4"
                  sx={{
                    mb: 2,
                    fontWeight: 600,
                    color: 'text.primary',
                  }}
                >
                  Welcome Back!
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: 'text.secondary',
                  }}
                >
                  Redirecting to your dashboard...
                </Typography>
              </Box>
            </Fade>
          </CardContent>
        </Card>
      </Zoom>
    </Box>
  );
};

export default LoginPage; 
import React, { useState, useRef, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  TextField,
  InputAdornment,
  Badge,
  Avatar,
  Switch,
  FormControlLabel,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  Chip,
  Menu,
  MenuItem,
  Drawer,
  useTheme,
  useMediaQuery,
  Alert,
  Snackbar,
} from '@mui/material';
import {
  Add,
  Mic,
  MicOff,
  Send,
  AttachFile,
  AccountCircle,
  Summary,
  ConfirmationNumber,
  Search,
  MoreVert,
  Notifications,
  AccountBalance,
  Settings,
  Language,
  Logout,
} from '@mui/icons-material';
import SummaryDropdown from './SummaryDropdown';
import TicketStatus from './TicketStatus';
import ChatArea from './ChatArea';
import Sidebar from './Sidebar';

const MainDashboard = ({ user, onLogout }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [message, setMessage] = useState('');
  const [showAccountBalance, setShowAccountBalance] = useState(false);
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [ticketOpen, setTicketOpen] = useState(false);
  const [profileMenuAnchor, setProfileMenuAnchor] = useState(null);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [speechError, setSpeechError] = useState('');
  const [recentChats, setRecentChats] = useState([
    { id: 1, title: 'Account Balance Inquiry', lastMessage: 'Your current balance is...', time: '2 min ago', unread: 2 },
    { id: 2, title: 'Password Reset', lastMessage: 'Password successfully updated', time: '1 hour ago', unread: 0 },
    { id: 3, title: 'Loan Application', lastMessage: 'Thank you for your application...', time: '3 hours ago', unread: 1 },
  ]);
  const [currentChat, setCurrentChat] = useState(null);
  const fileInputRef = useRef(null);

  // React Speech Recognition hooks
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable
  } = useSpeechRecognition();

  // Update message field when transcript changes
  useEffect(() => {
    if (transcript) {
      setMessage(transcript);
    }
  }, [transcript]);

  // Check for speech recognition support
  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      setSpeechError('Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari.');
    } else if (!isMicrophoneAvailable) {
      setSpeechError('Microphone access is required for voice input. Please allow microphone permissions.');
    }
  }, [browserSupportsSpeechRecognition, isMicrophoneAvailable]);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // Add the message to current chat or create new chat
    const newMessage = {
      id: Date.now(),
      type: 'user',
      content: message,
      timestamp: new Date(),
    };

    if (currentChat) {
      // Add message to existing chat
      const updatedChat = {
        ...currentChat,
        messages: [...(currentChat.messages || []), newMessage]
      };
      setCurrentChat(updatedChat);
    } else {
      // Create new chat with this message
      const newChat = {
        id: Date.now(),
        title: message.length > 30 ? message.substring(0, 30) + '...' : message,
        messages: [newMessage],
        lastMessage: message,
        time: 'now',
        unread: 0
      };
      setCurrentChat(newChat);
      setRecentChats([newChat, ...recentChats]);
    }

    // Simulate AI response (you can replace this with actual AI integration)
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        type: 'bot',
        content: `Thank you for your message: "${message}". I'm here to help you with your banking needs. How can I assist you further?`,
        timestamp: new Date(),
      };

      const updatedChatWithResponse = {
        ...currentChat || { id: Date.now(), title: message.length > 30 ? message.substring(0, 30) + '...' : message, messages: [newMessage] },
        messages: [...(currentChat?.messages || [newMessage]), aiResponse]
      };
      setCurrentChat(updatedChatWithResponse);
    }, 1000);

    // Reset message and transcript
    setMessage('');
    resetTranscript();
  };

  const handleVoiceRecord = () => {
    if (!browserSupportsSpeechRecognition) {
      setSpeechError('Speech recognition is not supported in this browser.');
      return;
    }

    if (!isMicrophoneAvailable) {
      setSpeechError('Microphone access is required. Please allow microphone permissions.');
      return;
    }

    try {
      if (listening) {
        SpeechRecognition.stopListening();
      } else {
        resetTranscript();
        SpeechRecognition.startListening({ 
          continuous: true,
          language: 'en-US' // You can make this dynamic based on user preference
        });
      }
      setSpeechError(''); // Clear any previous errors
    } catch (error) {
      console.error('Speech recognition error:', error);
      setSpeechError('Failed to start speech recognition. Please try again.');
    }
  };

  const handleFileAttach = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log('File attached:', file.name);
      // You can implement file upload logic here
    }
  };

  const handleNewChat = () => {
    // Create a completely fresh chat with no messages
    setCurrentChat({ id: Date.now(), title: 'New Chat', messages: [] });
    setMessage('');
    resetTranscript();
  };

  const handleChatSelect = (chat) => {
    setCurrentChat(chat);
    setMessage('');
    resetTranscript();
    if (isMobile) {
      setMobileDrawerOpen(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: 'background.default' }}>
      {/* Sidebar */}
      <Sidebar
        recentChats={recentChats}
        currentChat={currentChat}
        onNewChat={handleNewChat}
        onChatSelect={handleChatSelect}
        isMobile={isMobile}
        drawerOpen={mobileDrawerOpen}
        onDrawerToggle={() => setMobileDrawerOpen(!mobileDrawerOpen)}
      />

      {/* Main Content Area */}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', height: '100vh' }}>
        {/* Top Header */}
        <AppBar
          position="static"
          sx={{
            background: 'linear-gradient(135deg, #0078D4 0%, #00C389 100%)',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            flexShrink: 0,
          }}
        >
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            {/* Left Section */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {isMobile && (
                <IconButton
                  color="inherit"
                  onClick={() => setMobileDrawerOpen(true)}
                  sx={{ mr: 2 }}
                >
                  <Search />
                </IconButton>
              )}
              
              {/* Standard Chartered Logo */}
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    background: 'rgba(255,255,255,0.2)',
                    borderRadius: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 2,
                    '&::before': {
                      content: '"S"',
                      color: 'white',
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                    }
                  }}
                />
                <Typography variant="h6" sx={{ fontWeight: 600, color: 'white' }}>
                  Standard Chartered
                </Typography>
              </Box>
            </Box>

            {/* Right Section */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {/* Account Balance Toggle */}
              <FormControlLabel
                control={
                  <Switch
                    checked={showAccountBalance}
                    onChange={(e) => setShowAccountBalance(e.target.checked)}
                    sx={{
                      '& .MuiSwitch-thumb': { bgcolor: 'white' },
                      '& .MuiSwitch-track': { bgcolor: 'rgba(255,255,255,0.3)' }
                    }}
                  />
                }
                label={
                  <Typography variant="body2" sx={{ color: 'white', ml: 1 }}>
                    Show account balance
                  </Typography>
                }
                sx={{ mr: 2 }}
              />

              {/* Summary Button */}
              <Button
                startIcon={<AccountCircle />}
                onClick={() => setSummaryOpen(!summaryOpen)}
                sx={{
                  color: 'white',
                  borderRadius: 2,
                  px: 2,
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
                }}
              >
                Summary
              </Button>

              {/* Ticket Button */}
              <Button
                startIcon={
                  <Badge badgeContent={2} color="error">
                    <ConfirmationNumber />
                  </Badge>
                }
                onClick={() => setTicketOpen(!ticketOpen)}
                sx={{
                  color: 'white',
                  borderRadius: 2,
                  px: 2,
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
                }}
              >
                Ticket
              </Button>

              {/* Profile Menu */}
              <IconButton
                onClick={(e) => setProfileMenuAnchor(e.currentTarget)}
                sx={{ color: 'white' }}
              >
                <Avatar sx={{ width: 32, height: 32, bgcolor: 'rgba(255,255,255,0.2)' }}>
                  {user?.name?.charAt(0)}
                </Avatar>
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Main Content - Fixed height calculation */}
        <Box sx={{ 
          flexGrow: 1, 
          display: 'flex', 
          position: 'relative',
          height: 'calc(100vh - 64px - 90px)', // Subtract header and input area heights
          overflow: 'hidden'
        }}>
          {/* Chat Area */}
          <ChatArea
            currentChat={currentChat}
            user={user}
            showAccountBalance={showAccountBalance}
          />

          {/* Summary Dropdown */}
          <SummaryDropdown
            open={summaryOpen}
            onClose={() => setSummaryOpen(false)}
          />

          {/* Ticket Status Panel */}
          <TicketStatus
            open={ticketOpen}
            onClose={() => setTicketOpen(false)}
          />
        </Box>

        {/* Chat Input Area - Fixed at bottom */}
        <Paper
          elevation={3}
          sx={{
            p: 2,
            background: 'linear-gradient(135deg, #0078D4 0%, #00C389 100%)',
            borderRadius: 0,
            flexShrink: 0,
            height: '90px', // Fixed height for input area
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          {/* Voice Status Indicator */}
          {listening && (
            <Box sx={{ mb: 1, textAlign: 'center' }}>
              <Typography variant="caption" sx={{ color: 'white', opacity: 0.9 }}>
                🎤 Listening... Speak now
              </Typography>
            </Box>
          )}

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TextField
              fullWidth
              placeholder={listening ? "Listening..." : "Ask"}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              sx={{
                '& .MuiOutlinedInput-root': {
                  bgcolor: 'white',
                  borderRadius: 2,
                  '& fieldset': { border: 'none' },
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleVoiceRecord}
                      disabled={!browserSupportsSpeechRecognition || !isMicrophoneAvailable}
                      title={
                        !browserSupportsSpeechRecognition 
                          ? "Speech recognition not supported" 
                          : !isMicrophoneAvailable 
                          ? "Microphone not available" 
                          : listening 
                          ? "Stop recording" 
                          : "Start voice recording"
                      }
                      sx={{
                        color: listening ? 'error.main' : 'text.secondary',
                        animation: listening ? 'pulse 1s infinite' : 'none',
                        '@keyframes pulse': {
                          '0%': { opacity: 1 },
                          '50%': { opacity: 0.5 },
                          '100%': { opacity: 1 },
                        },
                        '&:disabled': {
                          color: 'text.disabled'
                        }
                      }}
                    >
                      {listening ? <MicOff /> : <Mic />}
                    </IconButton>
                    <IconButton onClick={handleFileAttach} sx={{ color: 'text.secondary' }}>
                      <AttachFile />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="contained"
              onClick={handleSendMessage}
              disabled={!message.trim()}
              sx={{
                minWidth: 48,
                height: 48,
                borderRadius: 2,
                bgcolor: 'white',
                color: 'primary.main',
                '&:hover': { bgcolor: 'grey.100' },
                '&:disabled': { bgcolor: 'grey.300' },
              }}
            >
              <Send />
            </Button>
          </Box>
          
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
            accept="image/*,application/pdf,.doc,.docx"
          />
        </Paper>
      </Box>

      {/* Profile Menu */}
      <Menu
        anchorEl={profileMenuAnchor}
        open={Boolean(profileMenuAnchor)}
        onClose={() => setProfileMenuAnchor(null)}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 200,
            borderRadius: 2,
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          }
        }}
      >
        <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            {user?.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {user?.mobile}
          </Typography>
          {showAccountBalance && (
            <Chip
              label={user?.balance}
              size="small"
              color="primary"
              sx={{ mt: 1 }}
            />
          )}
        </Box>
        
        <MenuItem onClick={() => setProfileMenuAnchor(null)}>
          <AccountBalance sx={{ mr: 2 }} />
          Account Details
        </MenuItem>
        <MenuItem onClick={() => setProfileMenuAnchor(null)}>
          <Language sx={{ mr: 2 }} />
          Language Settings
        </MenuItem>
        <MenuItem onClick={() => setProfileMenuAnchor(null)}>
          <Notifications sx={{ mr: 2 }} />
          Notifications
        </MenuItem>
        <MenuItem onClick={() => setProfileMenuAnchor(null)}>
          <Settings sx={{ mr: 2 }} />
          Settings
        </MenuItem>
        <Divider />
        <MenuItem onClick={onLogout} sx={{ color: 'error.main' }}>
          <Logout sx={{ mr: 2 }} />
          Logout
        </MenuItem>
      </Menu>

      {/* Speech Error Snackbar */}
      <Snackbar
        open={!!speechError}
        autoHideDuration={6000}
        onClose={() => setSpeechError('')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSpeechError('')} severity="warning">
          {speechError}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default MainDashboard; 
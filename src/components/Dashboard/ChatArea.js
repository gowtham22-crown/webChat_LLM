import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Chip,
  IconButton,
  Card,
  CardContent,
  Button,
  Fade,
  CircularProgress,
  Tooltip,
} from '@mui/material';
import {
  SmartToy,
  Person,
  ThumbUp,
  ThumbDown,
  ContentCopy,
  Refresh,
  VolumeUp,
  VolumeOff,
  Schedule,
  AccountBalance,
  CreditCard,
  Security,
  Help,
} from '@mui/icons-material';
import voiceRecording from '../../utils/voiceRecording';

const ChatArea = ({ currentChat, user, showAccountBalance }) => {
  const messagesEndRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([]);
  const [speakingMessageId, setSpeakingMessageId] = useState(null);

  // Only set messages when currentChat exists and has messages
  useEffect(() => {
    if (currentChat && currentChat.messages && currentChat.messages.length > 0) {
      setMessages(currentChat.messages);
    } else {
      setMessages([]); // Start with empty messages for new chats
    }
  }, [currentChat]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const formatTime = (timestamp) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(timestamp);
  };

  const handleSuggestionClick = (suggestion) => {
    // Handle suggestion click logic
    console.log('Suggestion clicked:', suggestion);
  };

  const handleCopyMessage = (content) => {
    navigator.clipboard.writeText(content);
  };

  const handleThumbUp = (messageId) => {
    console.log('Thumbs up for message:', messageId);
  };

  const handleThumbDown = (messageId) => {
    console.log('Thumbs down for message:', messageId);
  };

  // Enhanced text-to-speech functionality
  const handleSpeakMessage = async (messageId, content) => {
    try {
      // Stop any currently playing speech
      if (speakingMessageId) {
        voiceRecording.stopSpeaking();
        setSpeakingMessageId(null);
        
        // If clicking the same message, just stop
        if (speakingMessageId === messageId) {
          return;
        }
      }

      setSpeakingMessageId(messageId);
      
      // Format text for better speech
      const speechText = voiceRecording.formatForSpeech(content);
      
      // Speak the message with banking-specific settings
      await voiceRecording.speak(speechText, { 
        banking: true,
        rate: 0.85,
        volume: 0.9 
      });
      
      setSpeakingMessageId(null);
    } catch (error) {
      console.error('Error speaking message:', error);
      setSpeakingMessageId(null);
    }
  };

  const QuickActions = () => (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 2, color: 'text.primary', fontWeight: 600 }}>
        Quick Actions
      </Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2 }}>
        {[
          { icon: <AccountBalance />, title: 'Check Balance', desc: 'View your account balances' },
          { icon: <CreditCard />, title: 'Transfer Money', desc: 'Send money to another account' },
          { icon: <Security />, title: 'Reset Password', desc: 'Change your login credentials' },
          { icon: <Help />, title: 'Get Support', desc: 'Contact customer service' },
        ].map((action, index) => (
          <Card
            key={index}
            sx={{
              cursor: 'pointer',
              transition: 'all 0.2s',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              },
            }}
          >
            <CardContent sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32, mr: 1.5 }}>
                  {action.icon}
                </Avatar>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  {action.title}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                {action.desc}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );

  // Show welcome screen when no chat is selected or when it's a new empty chat
  if (!currentChat || (currentChat && (!currentChat.messages || currentChat.messages.length === 0))) {
    return (
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, rgba(0, 195, 137, 0.05) 0%, rgba(0, 120, 212, 0.05) 100%)',
          position: 'relative',
          height: '100%',
          overflow: 'auto',
        }}
      >
        {/* Welcome Section */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Avatar
            sx={{
              width: 80,
              height: 80,
              bgcolor: 'primary.main',
              margin: '0 auto',
              mb: 2,
            }}
          >
            <SmartToy sx={{ fontSize: 40 }} />
          </Avatar>
          <Typography variant="h4" sx={{ fontWeight: 600, mb: 1, color: 'text.primary' }}>
            Welcome to AI Banking Assistant
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 500, mx: 'auto' }}>
            Your intelligent banking companion is here to help with account management, 
            transactions, and any banking questions you might have.
          </Typography>
          
          {showAccountBalance && user?.balance && (
            <Chip
              label={`Balance: ${user.balance}`}
              color="primary"
              sx={{ mt: 2, fontSize: '1rem', py: 2 }}
            />
          )}
        </Box>

        <QuickActions />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(135deg, rgba(0, 195, 137, 0.02) 0%, rgba(0, 120, 212, 0.02) 100%)',
        height: '100%',
      }}
    >
      {/* Chat Header */}
      <Paper
        elevation={1}
        sx={{
          p: 2,
          borderRadius: 0,
          borderBottom: '1px solid',
          borderColor: 'divider',
          bgcolor: 'white',
          flexShrink: 0,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
              <SmartToy />
            </Avatar>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {currentChat.title || 'AI Assistant'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Online • Ready to help
              </Typography>
            </Box>
          </Box>
          
          {showAccountBalance && user?.balance && (
            <Chip
              label={user.balance}
              color="primary"
              variant="outlined"
              sx={{ fontWeight: 600 }}
            />
          )}
        </Box>
      </Paper>

      {/* Messages Area */}
      <Box
        sx={{
          flexGrow: 1,
          overflow: 'auto',
          p: 2,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {messages.map((message, index) => (
          <Fade in={true} timeout={600} key={message.id}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start',
                mb: 2,
              }}
            >
              <Box
                sx={{
                  maxWidth: '80%',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 1,
                  flexDirection: message.type === 'user' ? 'row-reverse' : 'row',
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: message.type === 'user' ? 'secondary.main' : 'primary.main',
                    width: 36,
                    height: 36,
                  }}
                >
                  {message.type === 'user' ? <Person /> : <SmartToy />}
                </Avatar>

                <Box>
                  <Paper
                    elevation={1}
                    sx={{
                      p: 2,
                      bgcolor: message.type === 'user' ? 'primary.main' : 'white',
                      color: message.type === 'user' ? 'white' : 'text.primary',
                      borderRadius: 2,
                      position: 'relative',
                      '&:hover .message-actions': {
                        opacity: 1,
                      },
                    }}
                  >
                    <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                      {message.content}
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, gap: 1 }}>
                      <Typography
                        variant="caption"
                        sx={{
                          color: message.type === 'user' ? 'rgba(255,255,255,0.7)' : 'text.secondary',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <Schedule sx={{ fontSize: 12, mr: 0.5 }} />
                        {formatTime(message.timestamp)}
                      </Typography>
                    </Box>

                    {/* Message Actions */}
                    <Box
                      className="message-actions"
                      sx={{
                        position: 'absolute',
                        top: -8,
                        right: message.type === 'user' ? 'auto' : -8,
                        left: message.type === 'user' ? -8 : 'auto',
                        opacity: 0,
                        transition: 'opacity 0.2s',
                        display: 'flex',
                        gap: 0.5,
                      }}
                    >
                      <Tooltip title="Copy">
                        <IconButton
                          size="small"
                          onClick={() => handleCopyMessage(message.content)}
                          sx={{
                            bgcolor: 'background.paper',
                            boxShadow: 1,
                            '&:hover': { bgcolor: 'grey.100' },
                          }}
                        >
                          <ContentCopy fontSize="small" />
                        </IconButton>
                      </Tooltip>

                      {/* Text-to-Speech Button */}
                      <Tooltip title={speakingMessageId === message.id ? "Stop speaking" : "Read aloud"}>
                        <IconButton
                          size="small"
                          onClick={() => handleSpeakMessage(message.id, message.content)}
                          sx={{
                            bgcolor: 'background.paper',
                            boxShadow: 1,
                            color: speakingMessageId === message.id ? 'primary.main' : 'inherit',
                            '&:hover': { bgcolor: 'grey.100' },
                          }}
                        >
                          {speakingMessageId === message.id ? (
                            <VolumeOff fontSize="small" />
                          ) : (
                            <VolumeUp fontSize="small" />
                          )}
                        </IconButton>
                      </Tooltip>
                      
                      {message.type === 'bot' && (
                        <>
                          <Tooltip title="Good response">
                            <IconButton
                              size="small"
                              onClick={() => handleThumbUp(message.id)}
                              sx={{
                                bgcolor: 'background.paper',
                                boxShadow: 1,
                                '&:hover': { bgcolor: 'grey.100' },
                              }}
                            >
                              <ThumbUp fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Poor response">
                            <IconButton
                              size="small"
                              onClick={() => handleThumbDown(message.id)}
                              sx={{
                                bgcolor: 'background.paper',
                                boxShadow: 1,
                                '&:hover': { bgcolor: 'grey.100' },
                              }}
                            >
                              <ThumbDown fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </>
                      )}
                    </Box>
                  </Paper>

                  {/* Suggestions */}
                  {message.suggestions && (
                    <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {message.suggestions.map((suggestion, idx) => (
                        <Chip
                          key={idx}
                          label={suggestion}
                          variant="outlined"
                          size="small"
                          onClick={() => handleSuggestionClick(suggestion)}
                          sx={{
                            cursor: 'pointer',
                            '&:hover': {
                              bgcolor: 'primary.main',
                              color: 'white',
                            },
                          }}
                        />
                      ))}
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>
          </Fade>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Avatar sx={{ bgcolor: 'primary.main', width: 36, height: 36 }}>
              <SmartToy />
            </Avatar>
            <Paper elevation={1} sx={{ p: 2, borderRadius: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CircularProgress size={16} />
                <Typography variant="body2" color="text.secondary">
                  AI is typing...
                </Typography>
              </Box>
            </Paper>
          </Box>
        )}

        <div ref={messagesEndRef} />
      </Box>
    </Box>
  );
};

export default ChatArea; 
import React, { useState } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Badge,
  Avatar,
  IconButton,
  Divider,
  Chip,
  useTheme,
} from '@mui/material';
import {
  Add,
  Search,
  Chat,
  MoreVert,
  Delete,
  Archive,
  AccessTime,
} from '@mui/icons-material';

const Sidebar = ({
  recentChats,
  currentChat,
  onNewChat,
  onChatSelect,
  isMobile,
  drawerOpen,
  onDrawerToggle,
}) => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredChat, setHoveredChat] = useState(null);

  const filteredChats = recentChats.filter(chat =>
    chat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getChatIcon = (index) => {
    const icons = ['💬', '🔒', '🏦', '💳', '📋'];
    return icons[index % icons.length];
  };

  const truncateText = (text, maxLength = 30) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const SidebarContent = () => (
    <Box
      sx={{
        width: isMobile ? 280 : 320,
        height: '100%',
        bgcolor: '#E8F4F8',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* New Chat Button */}
      <Box sx={{ p: 2 }}>
        <Button
          fullWidth
          variant="contained"
          startIcon={<Add />}
          onClick={onNewChat}
          sx={{
            background: 'linear-gradient(135deg, #00C389 0%, #00A374 100%)',
            borderRadius: 2,
            py: 1.5,
            fontSize: '1rem',
            fontWeight: 600,
            textTransform: 'none',
            boxShadow: '0 4px 12px rgba(0, 195, 137, 0.3)',
            '&:hover': {
              background: 'linear-gradient(135deg, #00A374 0%, #008A63 100%)',
              boxShadow: '0 6px 16px rgba(0, 195, 137, 0.4)',
            },
          }}
        >
          New chat
        </Button>
      </Box>

      {/* Search Bar */}
      <Box sx={{ px: 2, pb: 2 }}>
        <TextField
          fullWidth
          placeholder="Search conversations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ color: 'text.secondary', fontSize: 20 }} />
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              bgcolor: 'white',
              borderRadius: 2,
              '& fieldset': {
                borderColor: 'transparent',
              },
              '&:hover fieldset': {
                borderColor: 'primary.main',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'primary.main',
              },
            },
          }}
        />
      </Box>

      {/* Recent Chats Section */}
      <Box sx={{ px: 2, pb: 1 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: 'text.primary',
            fontSize: '1.1rem',
          }}
        >
          Recent chats
        </Typography>
      </Box>

      <Divider sx={{ mx: 2, mb: 1 }} />

      {/* Chat List */}
      <List sx={{ flexGrow: 1, px: 1, py: 0 }}>
        {filteredChats.length === 0 ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              py: 4,
              color: 'text.secondary',
            }}
          >
            <Chat sx={{ fontSize: 48, mb: 2, opacity: 0.5 }} />
            <Typography variant="body2">
              {searchQuery ? 'No chats found' : 'No recent conversations'}
            </Typography>
          </Box>
        ) : (
          filteredChats.map((chat, index) => (
            <ListItem
              key={chat.id}
              disablePadding
              sx={{
                mb: 0.5,
                borderRadius: 2,
                overflow: 'hidden',
              }}
              onMouseEnter={() => setHoveredChat(chat.id)}
              onMouseLeave={() => setHoveredChat(null)}
            >
              <ListItemButton
                selected={currentChat?.id === chat.id}
                onClick={() => onChatSelect(chat)}
                sx={{
                  borderRadius: 2,
                  py: 1.5,
                  px: 2,
                  '&.Mui-selected': {
                    bgcolor: 'rgba(0, 120, 212, 0.1)',
                    borderLeft: '4px solid',
                    borderLeftColor: 'primary.main',
                  },
                  '&:hover': {
                    bgcolor: 'rgba(0, 120, 212, 0.05)',
                  },
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      bgcolor: 'white',
                      color: 'primary.main',
                      width: 40,
                      height: 40,
                      fontSize: '1.2rem',
                      border: '2px solid',
                      borderColor: chat.unread > 0 ? 'primary.main' : 'grey.300',
                    }}
                  >
                    {getChatIcon(index)}
                  </Avatar>
                </ListItemAvatar>

                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontWeight: chat.unread > 0 ? 600 : 500,
                          color: 'text.primary',
                          fontSize: '0.9rem',
                        }}
                      >
                        {truncateText(chat.title, 20)}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        {chat.unread > 0 && (
                          <Badge
                            badgeContent={chat.unread}
                            color="primary"
                            sx={{
                              '& .MuiBadge-badge': {
                                fontSize: '0.7rem',
                                height: 18,
                                minWidth: 18,
                              },
                            }}
                          />
                        )}
                        {hoveredChat === chat.id && (
                          <IconButton
                            size="small"
                            sx={{
                              color: 'text.secondary',
                              '&:hover': { color: 'text.primary' },
                            }}
                          >
                            <MoreVert fontSize="small" />
                          </IconButton>
                        )}
                      </Box>
                    </Box>
                  }
                  secondary={
                    <Box>
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'text.secondary',
                          fontSize: '0.8rem',
                          lineHeight: 1.3,
                          mt: 0.5,
                        }}
                      >
                        {truncateText(chat.lastMessage, 35)}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                        <AccessTime sx={{ fontSize: 12, mr: 0.5, color: 'text.secondary' }} />
                        <Typography
                          variant="caption"
                          sx={{
                            color: 'text.secondary',
                            fontSize: '0.7rem',
                          }}
                        >
                          {chat.time}
                        </Typography>
                      </Box>
                    </Box>
                  }
                />
              </ListItemButton>
            </ListItem>
          ))
        )}
      </List>

      {/* Bottom Section */}
      <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
        <Typography
          variant="caption"
          sx={{
            color: 'text.secondary',
            display: 'block',
            textAlign: 'center',
          }}
        >
          AI Banking Assistant v2.0
        </Typography>
      </Box>
    </Box>
  );

  if (isMobile) {
    return (
      <Drawer
        variant="temporary"
        open={drawerOpen}
        onClose={onDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        sx={{
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            borderRight: 'none',
            boxShadow: '2px 0 10px rgba(0,0,0,0.1)',
          },
        }}
      >
        <SidebarContent />
      </Drawer>
    );
  }

  return (
    <Box
      sx={{
        borderRight: '1px solid',
        borderColor: 'divider',
        boxShadow: '2px 0 10px rgba(0,0,0,0.05)',
      }}
    >
      <SidebarContent />
    </Box>
  );
};

export default Sidebar; 
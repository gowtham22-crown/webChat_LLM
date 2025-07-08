import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Divider,
  IconButton,
  Chip,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Button,
  Collapse,
  Badge,
  Fade,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  Stepper,
  Step,
  StepLabel,
  StepContent,
} from '@mui/material';
import {
  Close,
  ConfirmationNumber,
  Support,
  Schedule,
  CheckCircle,
  Error,
  Warning,
  Info,
  Person,
  Message,
  Phone,
  Email,
  Refresh,
  Add,
  ChatBubble,
  Assignment,
} from '@mui/icons-material';

const TicketStatus = ({ open, onClose }) => {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [ticketDialogOpen, setTicketDialogOpen] = useState(false);

  // Sample ticket data
  const tickets = [
    {
      id: 'TKT-2024-001',
      title: 'Credit Card Payment Issue',
      description: 'Unable to process payment through mobile app. Transaction fails at final step.',
      status: 'in_progress',
      priority: 'high',
      category: 'Payment Issues',
      createdDate: new Date(Date.now() - 86400000 * 2), // 2 days ago
      lastUpdate: new Date(Date.now() - 3600000), // 1 hour ago
      assignedAgent: 'Sarah Johnson',
      estimatedResolution: new Date(Date.now() + 86400000), // Tomorrow
      progress: 65,
      communications: [
        {
          id: 1,
          type: 'user',
          message: 'I cannot make payments through the mobile app. It keeps failing.',
          timestamp: new Date(Date.now() - 86400000 * 2),
          author: 'You'
        },
        {
          id: 2,
          type: 'agent',
          message: 'Thank you for reporting this issue. We are investigating the payment gateway.',
          timestamp: new Date(Date.now() - 86400000 * 1.8),
          author: 'Sarah Johnson'
        },
        {
          id: 3,
          type: 'system',
          message: 'Technical team has identified the issue and working on a fix.',
          timestamp: new Date(Date.now() - 3600000),
          author: 'System'
        }
      ],
      steps: [
        { label: 'Issue Reported', completed: true },
        { label: 'Under Investigation', completed: true },
        { label: 'Solution in Progress', completed: false },
        { label: 'Testing & Verification', completed: false },
        { label: 'Resolution Complete', completed: false },
      ]
    },
    {
      id: 'TKT-2024-002',
      title: 'Account Statement Request',
      description: 'Need detailed account statement for the last 6 months for loan application.',
      status: 'pending',
      priority: 'medium',
      category: 'Documentation',
      createdDate: new Date(Date.now() - 3600000 * 6), // 6 hours ago
      lastUpdate: new Date(Date.now() - 3600000 * 2), // 2 hours ago
      assignedAgent: 'Michael Chen',
      estimatedResolution: new Date(Date.now() + 86400000 * 2), // 2 days
      progress: 25,
      communications: [
        {
          id: 1,
          type: 'user',
          message: 'I need my account statement for the past 6 months for my home loan application.',
          timestamp: new Date(Date.now() - 3600000 * 6),
          author: 'You'
        },
        {
          id: 2,
          type: 'agent',
          message: 'I will prepare your statement. Please allow 24-48 hours for processing.',
          timestamp: new Date(Date.now() - 3600000 * 2),
          author: 'Michael Chen'
        }
      ],
      steps: [
        { label: 'Request Received', completed: true },
        { label: 'Document Preparation', completed: false },
        { label: 'Quality Check', completed: false },
        { label: 'Document Delivery', completed: false },
      ]
    },
    {
      id: 'TKT-2024-003',
      title: 'Loan Interest Rate Inquiry',
      description: 'Questions about current home loan interest rates and eligibility criteria.',
      status: 'completed',
      priority: 'low',
      category: 'General Inquiry',
      createdDate: new Date(Date.now() - 86400000 * 5), // 5 days ago
      lastUpdate: new Date(Date.now() - 86400000 * 3), // 3 days ago
      assignedAgent: 'Lisa Wong',
      estimatedResolution: new Date(Date.now() - 86400000 * 3),
      progress: 100,
      communications: [
        {
          id: 1,
          type: 'user',
          message: 'What are the current home loan rates and what documents do I need?',
          timestamp: new Date(Date.now() - 86400000 * 5),
          author: 'You'
        },
        {
          id: 2,
          type: 'agent',
          message: 'Current rates start from 3.25% p.a. I will send you the complete document checklist.',
          timestamp: new Date(Date.now() - 86400000 * 4),
          author: 'Lisa Wong'
        },
        {
          id: 3,
          type: 'system',
          message: 'Document checklist and rate sheet sent to your registered email.',
          timestamp: new Date(Date.now() - 86400000 * 3),
          author: 'System'
        }
      ],
      steps: [
        { label: 'Inquiry Received', completed: true },
        { label: 'Information Gathered', completed: true },
        { label: 'Response Sent', completed: true },
        { label: 'Case Closed', completed: true },
      ]
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'in_progress':
        return 'info';
      case 'pending':
        return 'warning';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      case 'low':
        return 'info';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle />;
      case 'in_progress':
        return <Schedule />;
      case 'pending':
        return <Warning />;
      case 'cancelled':
        return <Error />;
      default:
        return <Info />;
    }
  };

  const formatTime = (timestamp) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(timestamp);
  };

  const handleTicketClick = (ticket) => {
    setSelectedTicket(ticket);
    setTicketDialogOpen(true);
  };

  const handleCloseTicketDialog = () => {
    setTicketDialogOpen(false);
    setSelectedTicket(null);
  };

  const activeTickets = tickets.filter(ticket => ticket.status !== 'completed' && ticket.status !== 'cancelled');

  if (!open) return null;

  return (
    <>
      {/* Backdrop to prevent clicking behind */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1299,
          bgcolor: 'rgba(0, 0, 0, 0.1)', // Light backdrop
        }}
        onClick={onClose}
      />
      
      <Fade in={open} timeout={300}>
        <Box
          sx={{
            position: 'fixed',
            top: 70,
            right: 20,
            width: '35%',
            maxWidth: 450,
            minWidth: 350,
            maxHeight: 'calc(100vh - 100px)',
            zIndex: 1300,
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
          }}
        >
          <Paper
            elevation={8}
            sx={{
              borderRadius: 3,
              overflow: 'hidden',
              bgcolor: 'white', // Solid white background
              border: '1px solid rgba(0,0,0,0.1)', // Add subtle border
            }}
          >
            {/* Header */}
            <Box
              sx={{
                background: 'linear-gradient(135deg, #0078D4 0%, #00C389 100%)',
                color: 'white',
                p: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Badge badgeContent={activeTickets.length} color="error">
                  <ConfirmationNumber sx={{ mr: 1 }} />
                </Badge>
                <Typography variant="h6" sx={{ fontWeight: 600, ml: 1 }}>
                  Support Tickets
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconButton size="small" sx={{ color: 'white' }}>
                  <Refresh />
                </IconButton>
                <IconButton size="small" onClick={onClose} sx={{ color: 'white' }}>
                  <Close />
                </IconButton>
              </Box>
            </Box>

            {/* Content */}
            <Box sx={{ maxHeight: '70vh', overflow: 'auto', bgcolor: 'white' }}>
              {/* Quick Stats */}
              <Box sx={{ p: 2, bgcolor: 'white' }}>
                <Box sx={{ display: 'flex', gap: 1.5, mb: 2 }}>
                  <Card sx={{ flex: 1, bgcolor: 'white' }}>
                    <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
                      <Typography variant="body2" color="text.secondary">
                        Active
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 600, color: 'info.main' }}>
                        {activeTickets.length}
                      </Typography>
                    </CardContent>
                  </Card>
                  <Card sx={{ flex: 1, bgcolor: 'white' }}>
                    <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
                      <Typography variant="body2" color="text.secondary">
                        Completed
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 600, color: 'success.main' }}>
                        {tickets.filter(t => t.status === 'completed').length}
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
              </Box>

              <Divider />

              {/* Tickets List */}
              <Box sx={{ p: 2, bgcolor: 'white' }}>
                <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                  Your Tickets
                </Typography>

                {tickets.length === 0 ? (
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      py: 4,
                      color: 'text.secondary',
                    }}
                  >
                    <ConfirmationNumber sx={{ fontSize: 48, mb: 2, opacity: 0.5 }} />
                    <Typography variant="body2">
                      No support tickets found
                    </Typography>
                    <Button
                      variant="outlined"
                      startIcon={<Add />}
                      size="small"
                      sx={{ mt: 2 }}
                    >
                      Create New Ticket
                    </Button>
                  </Box>
                ) : (
                  <List sx={{ p: 0 }}>
                    {tickets.map((ticket, index) => (
                      <ListItem
                        key={ticket.id}
                        sx={{
                          px: 0,
                          py: 1.5,
                          borderBottom: index < tickets.length - 1 ? '1px solid' : 'none',
                          borderColor: 'divider',
                          cursor: 'pointer',
                          borderRadius: 2,
                          '&:hover': {
                            bgcolor: 'action.hover',
                          },
                        }}
                        onClick={() => handleTicketClick(ticket)}
                      >
                        <ListItemAvatar>
                          <Avatar
                            sx={{
                              bgcolor: `${getStatusColor(ticket.status)}.main`,
                              width: 36,
                              height: 36,
                            }}
                          >
                            {getStatusIcon(ticket.status)}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
                              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                {ticket.title}
                              </Typography>
                              <Chip
                                label={ticket.priority}
                                size="small"
                                color={getPriorityColor(ticket.priority)}
                                sx={{ ml: 1 }}
                              />
                            </Box>
                          }
                          secondary={
                            <Box>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  display: '-webkit-box',
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: 'vertical',
                                  mb: 1,
                                }}
                              >
                                {ticket.description}
                              </Typography>
                              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Chip
                                  label={ticket.status.replace('_', ' ')}
                                  size="small"
                                  color={getStatusColor(ticket.status)}
                                  variant="outlined"
                                />
                                <Typography variant="caption" color="text.secondary">
                                  {ticket.id}
                                </Typography>
                              </Box>
                              {ticket.status === 'in_progress' && (
                                <Box sx={{ mt: 1 }}>
                                  <LinearProgress
                                    variant="determinate"
                                    value={ticket.progress}
                                    sx={{ height: 4, borderRadius: 2 }}
                                  />
                                  <Typography variant="caption" color="text.secondary">
                                    Progress: {ticket.progress}%
                                  </Typography>
                                </Box>
                              )}
                            </Box>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                )}
              </Box>

              {/* Footer */}
              <Box sx={{ p: 2, bgcolor: 'grey.50', textAlign: 'center' }}>
                <Button
                  variant="outlined"
                  startIcon={<Add />}
                  size="small"
                  fullWidth
                  sx={{ mb: 1 }}
                >
                  Create New Ticket
                </Button>
                <Button variant="text" size="small" fullWidth>
                  View All Tickets
                </Button>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Fade>

      {/* Ticket Detail Dialog */}
      <Dialog
        open={ticketDialogOpen}
        onClose={handleCloseTicketDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3, bgcolor: 'white' } // Ensure dialog also has solid background
        }}
      >
        {selectedTicket && (
          <>
            <DialogTitle
              sx={{
                background: 'linear-gradient(135deg, #0078D4 0%, #00C389 100%)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {selectedTicket.title}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Ticket ID: {selectedTicket.id}
                </Typography>
              </Box>
              <IconButton onClick={handleCloseTicketDialog} sx={{ color: 'white' }}>
                <Close />
              </IconButton>
            </DialogTitle>

            <DialogContent sx={{ p: 3, bgcolor: 'white' }}>
              {/* Ticket Info */}
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                  <Chip
                    label={selectedTicket.status.replace('_', ' ')}
                    color={getStatusColor(selectedTicket.status)}
                    icon={getStatusIcon(selectedTicket.status)}
                  />
                  <Chip
                    label={`${selectedTicket.priority} priority`}
                    color={getPriorityColor(selectedTicket.priority)}
                  />
                  <Chip
                    label={selectedTicket.category}
                    variant="outlined"
                  />
                </Box>

                <Typography variant="body1" sx={{ mb: 2 }}>
                  {selectedTicket.description}
                </Typography>

                <Box sx={{ display: 'flex', gap: 3, mb: 2 }}>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Created
                    </Typography>
                    <Typography variant="body2">
                      {formatTime(selectedTicket.createdDate)}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Assigned to
                    </Typography>
                    <Typography variant="body2">
                      {selectedTicket.assignedAgent}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Est. Resolution
                    </Typography>
                    <Typography variant="body2">
                      {formatTime(selectedTicket.estimatedResolution)}
                    </Typography>
                  </Box>
                </Box>

                {selectedTicket.status === 'in_progress' && (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Progress: {selectedTicket.progress}%
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={selectedTicket.progress}
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                  </Box>
                )}
              </Box>

              <Divider sx={{ mb: 3 }} />

              {/* Progress Steps */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Progress Timeline
                </Typography>
                <Stepper orientation="vertical">
                  {selectedTicket.steps.map((step, index) => (
                    <Step key={index} active={step.completed || index === selectedTicket.steps.findIndex(s => !s.completed)}>
                      <StepLabel
                        StepIconComponent={() => (
                          <Box
                            sx={{
                              width: 24,
                              height: 24,
                              borderRadius: '50%',
                              bgcolor: step.completed ? 'success.main' : 'grey.300',
                              color: 'white',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            {step.completed ? <CheckCircle sx={{ fontSize: 16 }} /> : index + 1}
                          </Box>
                        )}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: step.completed ? 600 : 400,
                            color: step.completed ? 'text.primary' : 'text.secondary',
                          }}
                        >
                          {step.label}
                        </Typography>
                      </StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Box>

              <Divider sx={{ mb: 3 }} />

              {/* Communications */}
              <Box>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Communications
                </Typography>
                <List sx={{ p: 0 }}>
                  {selectedTicket.communications.map((comm, index) => (
                    <ListItem key={comm.id} sx={{ px: 0, alignItems: 'flex-start' }}>
                      <ListItemAvatar>
                        <Avatar
                          sx={{
                            bgcolor: comm.type === 'user' ? 'secondary.main' : comm.type === 'agent' ? 'primary.main' : 'grey.500',
                            width: 32,
                            height: 32,
                          }}
                        >
                          {comm.type === 'user' ? <Person /> : comm.type === 'agent' ? <Support /> : <Assignment />}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                              {comm.author}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {formatTime(comm.timestamp)}
                            </Typography>
                          </Box>
                        }
                        secondary={
                          <Typography variant="body2" sx={{ mt: 0.5 }}>
                            {comm.message}
                          </Typography>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </DialogContent>

            <DialogActions sx={{ p: 3, pt: 0, bgcolor: 'white' }}>
              <Button startIcon={<ChatBubble />} variant="outlined">
                Add Comment
              </Button>
              <Button startIcon={<Phone />} variant="outlined">
                Call Agent
              </Button>
              <Button startIcon={<Email />} variant="contained">
                Send Email
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </>
  );
};

export default TicketStatus; 
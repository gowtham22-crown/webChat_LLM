import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Divider,
  IconButton,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
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
} from '@mui/material';
import {
  Close,
  FilterList,
  DateRange,
  Category,
  TrendingUp,
  TrendingDown,
  AccountBalance,
  CreditCard,
  Security,
  Support,
  Notifications,
  Download,
  Refresh,
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const SummaryDropdown = ({ open, onClose }) => {
  const [dateFilter, setDateFilter] = useState('last_30_days');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Sample summary data
  const summaryData = {
    totalTransactions: 127,
    totalAmount: 'SGD 45,230.50',
    categories: [
      { name: 'Account Inquiries', count: 45, percentage: 35, trend: 'up' },
      { name: 'Money Transfers', count: 32, percentage: 25, trend: 'down' },
      { name: 'Security & Settings', count: 28, percentage: 22, trend: 'up' },
      { name: 'General Support', count: 22, percentage: 18, trend: 'stable' },
    ],
    recentActivities: [
      {
        id: 1,
        type: 'balance_inquiry',
        title: 'Account Balance Check',
        description: 'Checked savings account balance',
        amount: 'SGD 25,450.00',
        timestamp: new Date(Date.now() - 1800000),
        status: 'completed',
      },
      {
        id: 2,
        type: 'transfer',
        title: 'Fund Transfer',
        description: 'Transfer to John Smith',
        amount: 'SGD 500.00',
        timestamp: new Date(Date.now() - 3600000),
        status: 'completed',
      },
      {
        id: 3,
        type: 'security',
        title: 'Password Reset',
        description: 'Updated login password',
        timestamp: new Date(Date.now() - 7200000),
        status: 'completed',
      },
      {
        id: 4,
        type: 'support',
        title: 'Customer Support',
        description: 'Inquired about loan options',
        timestamp: new Date(Date.now() - 10800000),
        status: 'pending',
      },
    ],
  };

  const getCategoryIcon = (type) => {
    const icons = {
      balance_inquiry: <AccountBalance />,
      transfer: <CreditCard />,
      security: <Security />,
      support: <Support />,
    };
    return icons[type] || <Notifications />;
  };

  const formatTime = (timestamp) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(timestamp);
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return <TrendingUp sx={{ color: 'success.main', fontSize: 16 }} />;
      case 'down':
        return <TrendingDown sx={{ color: 'error.main', fontSize: 16 }} />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'failed':
        return 'error';
      default:
        return 'default';
    }
  };

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
            width: '40%',
            maxWidth: 500,
            minWidth: 400,
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
                <Notifications sx={{ mr: 1 }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Activity Summary
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconButton
                  size="small"
                  onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                  sx={{ color: 'white' }}
                >
                  <FilterList />
                </IconButton>
                <IconButton size="small" sx={{ color: 'white' }}>
                  <Download />
                </IconButton>
                <IconButton size="small" onClick={onClose} sx={{ color: 'white' }}>
                  <Close />
                </IconButton>
              </Box>
            </Box>

            {/* Filter Section */}
            <Collapse in={showAdvancedFilters}>
              <Box sx={{ p: 2, bgcolor: 'grey.50', borderBottom: '1px solid', borderColor: 'divider' }}>
                <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                  Filters
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                  <FormControl size="small" sx={{ minWidth: 120 }}>
                    <InputLabel>Date Range</InputLabel>
                    <Select
                      value={dateFilter}
                      label="Date Range"
                      onChange={(e) => setDateFilter(e.target.value)}
                    >
                      <MenuItem value="today">Today</MenuItem>
                      <MenuItem value="last_7_days">Last 7 days</MenuItem>
                      <MenuItem value="last_30_days">Last 30 days</MenuItem>
                      <MenuItem value="last_90_days">Last 90 days</MenuItem>
                      <MenuItem value="custom">Custom Range</MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl size="small" sx={{ minWidth: 120 }}>
                    <InputLabel>Category</InputLabel>
                    <Select
                      value={categoryFilter}
                      label="Category"
                      onChange={(e) => setCategoryFilter(e.target.value)}
                    >
                      <MenuItem value="all">All Categories</MenuItem>
                      <MenuItem value="account">Account Inquiries</MenuItem>
                      <MenuItem value="transfer">Transfers</MenuItem>
                      <MenuItem value="security">Security</MenuItem>
                      <MenuItem value="support">Support</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                {dateFilter === 'custom' && (
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <DatePicker
                      label="Start Date"
                      value={startDate}
                      onChange={setStartDate}
                      renderInput={(params) => <TextField {...params} size="small" />}
                    />
                    <DatePicker
                      label="End Date"
                      value={endDate}
                      onChange={setEndDate}
                      renderInput={(params) => <TextField {...params} size="small" />}
                    />
                  </Box>
                )}
              </Box>
            </Collapse>

            {/* Content */}
            <Box sx={{ maxHeight: '60vh', overflow: 'auto', bgcolor: 'white' }}>
              {/* Summary Statistics */}
              <Box sx={{ p: 2, bgcolor: 'white' }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Overview (Last 30 days)
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                  <Card sx={{ flex: 1, bgcolor: 'white' }}>
                    <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                      <Typography variant="body2" color="text.secondary">
                        Total Activities
                      </Typography>
                      <Typography variant="h5" sx={{ fontWeight: 600, color: 'primary.main' }}>
                        {summaryData.totalTransactions}
                      </Typography>
                    </CardContent>
                  </Card>
                  <Card sx={{ flex: 1, bgcolor: 'white' }}>
                    <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                      <Typography variant="body2" color="text.secondary">
                        Total Amount
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 600, color: 'success.main' }}>
                        {summaryData.totalAmount}
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>

                {/* Category Breakdown */}
                <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                  Category Breakdown
                </Typography>
                <Box sx={{ mb: 3 }}>
                  {summaryData.categories.map((category, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        py: 1,
                        borderBottom: index < summaryData.categories.length - 1 ? '1px solid' : 'none',
                        borderColor: 'divider',
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                        <Typography variant="body2" sx={{ flex: 1 }}>
                          {category.name}
                        </Typography>
                        <Chip
                          label={`${category.count}`}
                          size="small"
                          color="primary"
                          variant="outlined"
                          sx={{ mx: 1 }}
                        />
                        <Typography variant="body2" color="text.secondary" sx={{ minWidth: 40 }}>
                          {category.percentage}%
                        </Typography>
                        {getTrendIcon(category.trend)}
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>

              <Divider />

              {/* Recent Activities */}
              <Box sx={{ p: 2, bgcolor: 'white' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    Recent Activities
                  </Typography>
                  <Button
                    size="small"
                    startIcon={<Refresh />}
                    onClick={() => console.log('Refresh activities')}
                  >
                    Refresh
                  </Button>
                </Box>

                <List sx={{ p: 0 }}>
                  {summaryData.recentActivities.map((activity, index) => (
                    <ListItem
                      key={activity.id}
                      sx={{
                        px: 0,
                        py: 1,
                        borderBottom: index < summaryData.recentActivities.length - 1 ? '1px solid' : 'none',
                        borderColor: 'divider',
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar
                          sx={{
                            bgcolor: 'primary.main',
                            width: 36,
                            height: 36,
                          }}
                        >
                          {getCategoryIcon(activity.type)}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                              {activity.title}
                            </Typography>
                            <Chip
                              label={activity.status}
                              size="small"
                              color={getStatusColor(activity.status)}
                              sx={{ ml: 1 }}
                            />
                          </Box>
                        }
                        secondary={
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              {activity.description}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 0.5 }}>
                              <Typography variant="caption" color="text.secondary">
                                {formatTime(activity.timestamp)}
                              </Typography>
                              {activity.amount && (
                                <Typography variant="caption" sx={{ fontWeight: 600, color: 'success.main' }}>
                                  {activity.amount}
                                </Typography>
                              )}
                            </Box>
                          </Box>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>

              {/* Footer */}
              <Box sx={{ p: 2, bgcolor: 'grey.50', textAlign: 'center' }}>
                <Button variant="outlined" size="small" fullWidth>
                  View Full Activity Report
                </Button>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Fade>
    </>
  );
};

export default SummaryDropdown; 
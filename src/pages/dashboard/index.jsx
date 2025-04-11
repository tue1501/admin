import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  CircularProgress,
} from '@mui/material';
import {
  TrendingUp as RevenueIcon,
  ShoppingCart as OrderIcon,
  People as CustomerIcon,
  Inventory as ProductIcon,
} from '@mui/icons-material';
import styles from '../../styles/pages/dashboard/index.module.css';

const StatCard = ({ title, value, icon, color }) => (
  <Paper className={styles.statCard}>
    <Box className={styles.statContent}>
      <Box>
        <Typography variant="subtitle2" color="textSecondary">
          {title}
        </Typography>
        <Typography variant="h4" className={styles.statValue}>
          {value}
        </Typography>
      </Box>
      <Box className={styles.iconContainer} sx={{ backgroundColor: `${color}15` }}>
        {React.cloneElement(icon, { sx: { color } })}
      </Box>
    </Box>
  </Paper>
);

const DashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call
      // Mocking data for now
      const data = {
        totalRevenue: 125000000,
        totalOrders: 48,
        totalCustomers: 156,
        totalProducts: 89,
      };
      setStats(data);
    } catch (err) {
      setError('Không thể tải dữ liệu thống kê');
      console.error('Error fetching stats:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return (
      <Box className={styles.loadingContainer}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box className={styles.errorContainer}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box className={styles.container}>
      <Typography variant="h4" className={styles.title}>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Doanh thu"
            value={stats.totalRevenue.toLocaleString('vi-VN') + 'đ'}
            icon={<RevenueIcon />}
            color="#2196f3"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Đơn hàng"
            value={stats.totalOrders}
            icon={<OrderIcon />}
            color="#4caf50"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Khách hàng"
            value={stats.totalCustomers}
            icon={<CustomerIcon />}
            color="#ff9800"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Sản phẩm"
            value={stats.totalProducts}
            icon={<ProductIcon />}
            color="#f44336"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage; 
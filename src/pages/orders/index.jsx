import React, { useState, useEffect } from 'react';
import { orderAPI } from '../../services/api';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  CircularProgress,
  TextField,
  Button,
} from '@mui/material';
import { Visibility as ViewIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/pages/orders/index.module.css';

const OrdersPage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await orderAPI.getAll();
      setOrders(response.data.data);
      setFilteredOrders(response.data.data);
    } catch (err) {
      setError('Không thể tải danh sách đơn hàng');
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleFilter = () => {
    const filtered = orders.filter((order) => {
      const orderDate = new Date(order.ngaytao);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      if (start && end) {
        return orderDate >= start && orderDate <= end;
      } else if (start) {
        return orderDate >= start;
      } else if (end) {
        return orderDate <= end;
      } else {
        return true;
      }
    });
    setFilteredOrders(filtered);
  };

  const getStatusDescription = (status) => {
    switch (status) {
      case 0:
        return 'Chờ duyệt đơn';
      case 1:
        return 'Đã duyệt đơn';
      case 2:
        return 'Đang vận chuyển';
      case 3:
        return 'Đã nhận hàng';
      case 4:
        return 'Đã hủy đơn';
      default:
        return 'Không xác định';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 0:
        return 'orange';
      case 1:
        return 'blue';
      case 2:
        return 'purple';
      case 3:
        return 'green';
      case 4:
        return 'red';
      default:
        return 'grey';
    }
  };

  const filteredOrdersBySearch = filteredOrders.filter((order) =>
    order.tenkh.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.idDonhang.toString().includes(searchTerm) || // Tìm kiếm theo mã đơn hàng
    getStatusDescription(order.trangthai).toLowerCase().includes(searchTerm.toLowerCase()) // Tìm kiếm theo trạng thái
  );

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
      <Box className={styles.header}>
        <Typography variant="h4" className={styles.title}>
          Quản lý Đơn hàng
        </Typography>
      </Box>

      <Box className={styles.filterContainer}>
        <TextField
          label="Ngày bắt đầu"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          className={styles.dateInput}
        />
        <TextField
          label="Ngày kết thúc"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          className={styles.dateInput}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleFilter}
          className={styles.filterButton}
        >
          Lọc
        </Button>
      </Box>

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <TextField
          label="Tìm kiếm"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>

      <TableContainer component={Paper} className={styles.tableContainer}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Mã đơn hàng</TableCell>
              <TableCell>Khách hàng</TableCell>
              <TableCell>Ngày đặt</TableCell>
              <TableCell align="right">Tổng tiền</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell align="center">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(filteredOrdersBySearch) && filteredOrdersBySearch.length > 0 ? (
              filteredOrdersBySearch.map((data) => (
                <TableRow key={data.idDonhang}>
                  <TableCell>{data.idDonhang}</TableCell>
                  <TableCell>{data.tenkh}</TableCell>
                  <TableCell>{new Date(data.ngaytao).toLocaleDateString('vi-VN')}</TableCell>
                  <TableCell align="right">
                    {data.tongtien.toLocaleString('vi-VN')}đ
                  </TableCell>
                  <TableCell style={{ color: getStatusColor(data.trangthai) }}>
                    {getStatusDescription(data.trangthai)}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      onClick={() => navigate(`/orders/detail/${data.idDonhang}`)}
                      size="small"
                      color="primary"
                    >
                      <ViewIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">Không có đơn hàng nào.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default OrdersPage;
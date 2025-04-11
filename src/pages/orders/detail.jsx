import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { orderAPI } from '../../services/api';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Button,
} from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import styles from '../../styles/pages/orders/detail.module.css';

const OrderDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrderDetail = useCallback(async () => {
    try {
      setLoading(true);
      const response = await orderAPI.getById(id);
      setOrder(response.data);
    } catch (err) {
      setError('Không thể tải thông tin đơn hàng');
      console.error('Error fetching order:', err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchOrderDetail();
  }, [fetchOrderDetail]);

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
        <Button onClick={fetchOrderDetail} variant="contained" color="primary">
          Thử lại
        </Button>
      </Box>
    );
  }

  if (!order) {
    return (
      <Box className={styles.errorContainer}>
        <Typography>Không tìm thấy đơn hàng</Typography>
      </Box>
    );
  }

  return (
    <Box className={styles.container}>
      <Box className={styles.header}>
        <Typography variant="h4" className={styles.title}>
          Chi tiết đơn hàng #{order.iddonhang}
        </Typography>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper className={styles.section}>
            <Typography variant="h6" gutterBottom>
              Thông tin khách hàng
            </Typography>
            <Divider className={styles.divider} />
            <Box>
              <Typography>Tên: {order.hoten}</Typography>
              <Typography>Ghi chú: {order.ghichu}</Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper className={styles.section}>
            <Typography variant="h6" gutterBottom>
              Chi tiết sản phẩm
            </Typography>
            <Divider className={styles.divider} />
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Sản phẩm</TableCell>
                    <TableCell align="right">Đơn giá</TableCell>
                    <TableCell align="right">Số lượng</TableCell>
                    <TableCell align="right">Thành tiền</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.products.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4}>
                        <Typography>Không có sản phẩm trong đơn hàng</Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    order.products.map((item) => (
                      <TableRow key={item.idSanPham}>
                        <TableCell>
                          <Box className={styles.productInfo}>
                            <img src={item.hinhanh} alt={item.tensp} className={styles.productImage} />
                            <Box>
                              <Typography>{item.tensp}</Typography>
                              <Typography variant="body2" color="textSecondary">
                                Xuất xứ: {item.xuatxu}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell align="right">
                          {item.gia.toLocaleString('vi-VN')}đ
                        </TableCell>
                        <TableCell align="right">{item.sl}</TableCell>
                        <TableCell align="right">
                          {(item.gia * item.sl).toLocaleString('vi-VN')}đ
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                  <TableRow>
                    <TableCell colSpan={3} align="right">
                      <strong>Tổng cộng:</strong>
                    </TableCell>
                    <TableCell align="right">
                      <strong>
                        {order.products.reduce((total, item) => total + item.gia * item.sl, 0).toLocaleString('vi-VN')}đ
                      </strong>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OrderDetailPage;
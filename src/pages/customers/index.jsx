import React, { useState, useEffect } from 'react';
import { fetchCustomers, updateCustomer } from '../../services/api';
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
  Dialog,
  TextField,
  Button,
  Grid,
  InputLabel,
} from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import styles from '../../styles/pages/customers/index.module.css';

const CustomersPage = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editDialog, setEditDialog] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    hoten: '',
    email: '',
    sdt: '',
    diachi: '',
  });
  const [searchTerm, setSearchTerm] = useState('');

  const fetchCustomersData = async () => {
    try {
      setLoading(true);
      const response = await fetchCustomers();
      setCustomers(response.data);
    } catch (err) {
      setError('Không thể tải danh sách khách hàng');
      console.error('Error fetching customers:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomersData();
  }, []);

  const handleEdit = (customer) => {
    setSelectedCustomer(customer);
    setFormData({
      hoten: customer.hoten,
      email: customer.gmail,
      sdt: customer.sdt,
      diachi: customer.diachi,
    });
    setEditDialog(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      await updateCustomer(selectedCustomer.idKhachHang, formData);
      await fetchCustomersData();
      setEditDialog(false);
    } catch (err) {
      console.error('Error updating customer:', err);
      alert('Không thể cập nhật thông tin khách hàng');
    } finally {
      setSaving(false);
    }
  };

  const filteredCustomers = customers.filter((customer) =>
    customer.hoten.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.sdt.includes(searchTerm) ||
    customer.gmail.toLowerCase().includes(searchTerm.toLowerCase()) 
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
          Quản lý Khách hàng
        </Typography>
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
              <TableCell>Họ tên</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Số điện thoại</TableCell>
              <TableCell>Địa chỉ</TableCell>
              <TableCell align="center">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCustomers.map((customer) => (
              <TableRow key={customer.idKhachHang}>
                <TableCell>{customer.hoten}</TableCell>
                <TableCell>{customer.gmail}</TableCell>
                <TableCell>{customer.sdt}</TableCell>
                <TableCell>{customer.diachi}</TableCell>
                <TableCell align="center">
                  <IconButton
                    onClick={() => handleEdit(customer)}
                    size="small"
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog 
        open={editDialog} 
        onClose={() => setEditDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 3 }}>
            Chỉnh sửa Thông tin Khách hàng
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <InputLabel required sx={{ 
                  fontSize: '0.75rem',
                  color: 'rgba(0, 0, 0, 0.6)',
                  marginBottom: '4px'
                }}>
                  Họ tên
                </InputLabel>
                <TextField
                  fullWidth
                  name="hoten"
                  value={formData.hoten}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel required sx={{ 
                  fontSize: '0.75rem',
                  color: 'rgba(0, 0, 0, 0.6)',
                  marginBottom: '4px'
                }}>
                  Email
                </InputLabel>
                <TextField
                  fullWidth
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  type="email"
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel required sx={{ 
                  fontSize: '0.75rem',
                  color: 'rgba(0, 0, 0, 0.6)',
                  marginBottom: '4px'
                }}>
                  Số điện thoại
                </InputLabel>
                <TextField
                  fullWidth
                  name="sdt"
                  value={formData.sdt}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel sx={{ 
                  fontSize: '0.75rem',
                  color: 'rgba(0, 0, 0, 0.6)',
                  marginBottom: '4px'
                }}>
                  Địa chỉ
                </InputLabel>
                <TextField
                  fullWidth
                  name="diachi"
                  value={formData.diachi}
                  onChange={handleChange}
                  multiline
                  rows={4}
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={saving}
                  sx={{
                    mt: 2,
                    textTransform: 'none',
                    backgroundColor: '#1976d2',
                    '&:hover': {
                      backgroundColor: '#1565c0'
                    }
                  }}
                >
                  {saving ? <CircularProgress size={24} /> : 'Lưu thay đổi'}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Dialog>
    </Box>
  );
};

export default CustomersPage;
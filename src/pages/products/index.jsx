import React, { useState, useEffect } from 'react';
import { fetchProducts, deleteProduct } from '../../services/api';
import {
  Box,
  Button,
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
  Avatar,
  TextField,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/pages/products/index.module.css';

const ProductsPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchProductsData = async () => {
    try {
      setLoading(true);
      const response = await fetchProducts();
      setProducts(response.data.data);
    } catch (err) {
      setError('Không thể tải danh sách sản phẩm');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      try {
        await deleteProduct(id);
        await fetchProductsData();
      } catch (err) {
        console.error('Error deleting product:', err);
      }
    }
  };

  useEffect(() => {
    fetchProductsData();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.tensp.toLowerCase().includes(searchTerm.toLowerCase())
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
      <Typography variant="h4" className={styles.title}>
        Quản lý Sản phẩm
      </Typography>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <TextField
          label="Tìm kiếm"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => navigate('/products/add')}
        >
          Thêm sản phẩm
        </Button>
      </Box>
      <TableContainer component={Paper} className={styles.tableContainer}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tên sản phẩm</TableCell>
              <TableCell>Mô tả</TableCell>
              <TableCell>Xuất xứ</TableCell>
              <TableCell>Hình ảnh</TableCell>
              <TableCell align="right">Giá</TableCell>
              <TableCell align="right">Tồn kho</TableCell>
              <TableCell align="center">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts.map((data) => (
              <TableRow key={data.idSanPham}>
                <TableCell>{data.tensp}</TableCell>
                <TableCell>{data.mota}</TableCell>
                <TableCell>{data.xuatxu}</TableCell>
                <TableCell>
                  <Avatar
                    src={data.hinhanh}
                    alt={data.tensp}
                    variant="rounded"
                    className={styles.hinhanh}
                  />
                </TableCell>
                <TableCell align="right">
                  {data.gia.toLocaleString('vi-VN')}đ
                </TableCell>
                <TableCell align="right">{data.tonkho}</TableCell>
                <TableCell align="center">
                  <IconButton
                    onClick={() => navigate(`/products/edit/${data.idSanPham}`)}
                    size="small"
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(data.idSanPham)}
                    size="small"
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ProductsPage;
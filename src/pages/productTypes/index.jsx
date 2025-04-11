import React, { useState, useEffect } from 'react';
import { fetchProductTypes, deleteProductType } from '../../services/api';
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
  Button,
  TextField,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/pages/productTypes/index.module.css';

const ProductTypesPage = () => {
  const navigate = useNavigate();
  const [productTypes, setProductTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchProductTypesData = async () => {
    try {
      setLoading(true);
      const response = await fetchProductTypes();
      setProductTypes(response.data.data);
    } catch (err) {
      setError('Không thể tải danh sách loại sản phẩm');
      console.error('Error fetching product types:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa loại sản phẩm này?')) {
      try {
        await deleteProductType(id);
        await fetchProductTypesData();
      } catch (err) {
        console.error('Error deleting product type:', err);
      }
    }
  };

  const handleEdit = (productType) => {
    navigate(`/productTypes/edit/${productType.idLoaiSanPham}`, { state: { productType } });
  };

  useEffect(() => {
    fetchProductTypesData();
  }, []);

  const filteredProductTypes = productTypes.filter((type) =>
    type.tenloai.toLowerCase().includes(searchTerm.toLowerCase())
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
        Quản lý Loại sản phẩm
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
          onClick={() => navigate('/productTypes/add')}
        >
          Thêm loại sản phẩm
        </Button>
      </Box>
      <TableContainer component={Paper} className={styles.tableContainer}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tên loại sản phẩm</TableCell>
              <TableCell align="center">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProductTypes.map((data) => (
              <TableRow key={data.idLoaiSanPham}>
                <TableCell>{data.tenloai}</TableCell>
                <TableCell align="center">
                  <IconButton
                    onClick={() => handleEdit(data)}
                    size="small"
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(data.idLoaiSanPham)}
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

export default ProductTypesPage;
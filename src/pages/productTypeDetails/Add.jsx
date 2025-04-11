import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductTypes, addProductTypeDetail } from '../../services/api';
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Typography,
  CircularProgress,
} from '@mui/material';
import styles from '../../styles/pages/productTypeDetails/Add.module.css';

const AddProductTypeDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [productTypes, setProductTypes] = useState([]);
  const [selectedProductType, setSelectedProductType] = useState('');
  const [detailName, setDetailName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProductTypesData = async () => {
    try {
      const response = await fetchProductTypes();
      setProductTypes(response.data.data);
    } catch (err) {
      console.error('Error fetching product types:', err);
    }
  };

  useEffect(() => {
    fetchProductTypesData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedProductType || !detailName) {
      alert('Vui lòng điền đầy đủ thông tin.');
      return;
    }

    try {
      setLoading(true);
      await addProductTypeDetail({
        idLoaiSanPham: selectedProductType,
        tenchitiet: detailName,
      });
      navigate(`/productTypes/detail/${id}`);
    } catch (err) {
      setError('Không thể thêm chi tiết loại sản phẩm.');
      console.error('Error adding product type detail:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box className={styles.loadingContainer}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box className={styles.container}>
      <Typography variant="h4" className={styles.title}>
        Thêm Chi Tiết Loại Sản Phẩm
      </Typography>
      {error && (
        <Typography color="error" className={styles.error}>
          {error}
        </Typography>
      )}
      <form onSubmit={handleSubmit} className={styles.form}>
        <TextField
          label="Tên Chi Tiết Loại Sản Phẩm"
          value={detailName}
          onChange={(e) => setDetailName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          select
          label="Loại Sản Phẩm"
          value={selectedProductType}
          onChange={(e) => setSelectedProductType(e.target.value)}
          fullWidth
          margin="normal"
        >
          {productTypes.map((type) => (
            <MenuItem key={type.idLoaiSanPham} value={type.idLoaiSanPham}>
              {type.tenloai}
            </MenuItem>
          ))}
        </TextField>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={styles.submitButton}
        >
          Thêm
        </Button>
      </form>
    </Box>
  );
};

export default AddProductTypeDetailPage;
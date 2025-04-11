import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { fetchProductTypes, updateProductTypeDetail } from '../../services/api';
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Typography,
  CircularProgress,
} from '@mui/material';
import styles from '../../styles/pages/productTypeDetails/Add.module.css';

const EditProductTypeDetailPage = () => {
  const { id, detailId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
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
    if (location.state?.productTypeDetail) {
      const { tenchitiet, idLoaiSanPham } = location.state.productTypeDetail;
      setDetailName(tenchitiet);
      setSelectedProductType(idLoaiSanPham);
    } else {
      setError('Không thể tải thông tin chi tiết loại sản phẩm');
    }
    fetchProductTypesData();
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedProductType || !detailName) {
      alert('Vui lòng điền đầy đủ thông tin.');
      return;
    }

    try {
      setLoading(true);
      await updateProductTypeDetail(detailId, {
        idLoaiSanPham: selectedProductType,
        tenchitiet: detailName,
      });
      navigate(`/productTypes/detail/${id}`);
    } catch (err) {
      setError('Không thể cập nhật chi tiết loại sản phẩm.');
      console.error('Error updating product type detail:', err);
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
        Chỉnh sửa Chi Tiết Loại Sản Phẩm
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
          Lưu
        </Button>
      </form>
    </Box>
  );
};

export default EditProductTypeDetailPage;

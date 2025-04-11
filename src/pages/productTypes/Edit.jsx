import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductTypeById, updateProductType } from '../../services/api';
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
} from '@mui/material';
import styles from '../../styles/pages/productTypes/Add.module.css';

const EditProductTypePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProductTypeData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetchProductTypeById(id);
      setName(response.data.tenloai);
    } catch (err) {
      setError('Không thể tải thông tin loại sản phẩm');
      console.error('Error fetching product type:', err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  const handleEditProductType = async () => {
    try {
      setLoading(true);
      await updateProductType(id, { tenloai: name });
      navigate('/productTypes');
    } catch (err) {
      setError('Không thể cập nhật loại sản phẩm');
      console.error('Error updating product type:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductTypeData();
  }, [fetchProductTypeData]);

  return (
    <Box className={styles.container}>
      <Typography variant="h4" className={styles.title}>
        Chỉnh sửa Loại sản phẩm
      </Typography>
      <div className={styles.form}>
        <TextField
          label="Tên loại sản phẩm"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        {error && (
          <Typography color="error" className={styles.error}>
            {error}
          </Typography>
        )}
        <Box className={styles.actions}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleEditProductType}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Lưu'}
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate('/productTypes')}
            disabled={loading}
          >
            Hủy
          </Button>
        </Box>
      </div>
    </Box>
  );
};

export default EditProductTypePage;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  CircularProgress,
} from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import styles from '../../styles/pages/products/form.module.css';

const EditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    color: '',
    origin: '',
    price: '',
    stock: '',
    imageUrl: '',
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // TODO: Replace with actual API call
        const response = await fetch(`/api/products/${id}`);
        const data = await response.json();
        setFormData(data);
      } catch (err) {
        setError('Không thể tải thông tin sản phẩm');
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

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
      // TODO: Replace with actual API call
      await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      navigate('/products');
    } catch (err) {
      console.error('Error updating product:', err);
    } finally {
      setSaving(false);
    }
  };

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
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/products')}
        className={styles.backButton}
      >
        Quay lại
      </Button>

      <Typography variant="h4" className={styles.title}>
        Chỉnh sửa Sản phẩm
      </Typography>

      <Paper className={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Tên sản phẩm"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Màu sắc"
                name="color"
                value={formData.color}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Xuất xứ"
                name="origin"
                value={formData.origin}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Giá"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                required
                InputProps={{
                  endAdornment: <Typography>đ</Typography>,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Số lượng tồn kho"
                name="stock"
                type="number"
                value={formData.stock}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="URL hình ảnh"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Box className={styles.actions}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={saving}
                  startIcon={saving && <CircularProgress size={20} />}
                >
                  {saving ? 'Đang lưu...' : 'Lưu thay đổi'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default EditProductPage; 
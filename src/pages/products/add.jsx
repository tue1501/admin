import React, { useState, useEffect } from 'react';
import { fetchProductTypes } from '../../services/api';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
  CircularProgress,
  IconButton,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/pages/products/form.module.css';

const AddProductPage = () => {
  const navigate = useNavigate();
  const [productTypes, setProductTypes] = useState([]);
  const [formData, setFormData] = useState({
    productType: '',
    name: '',
    origin: '',
    price: '',
    description: '',
    mainImage: null,
    items: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
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

    fetchProductTypesData();
  }, []);

  const handleChange = (e, index, field) => {
    const { value, files } = e.target;
    if (field === 'image') {
      setFormData((prev) => ({
        ...prev,
        items: prev.items.map((item, i) =>
          i === index ? { ...item, [field]: files[0] } : item
        ),
      }));
    } else if (field === 'mainImage') {
      setFormData((prev) => ({
        ...prev,
        mainImage: files[0],
      }));
    } else if (index !== undefined) {
      setFormData((prev) => ({
        ...prev,
        items: prev.items.map((item, i) =>
          i === index ? { ...item, [field]: value } : item
        ),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [e.target.name]: value,
      }));
    }
  };

  const handleAddItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, { color: '', stock: '', image: null }],
    }));
  };

  const handleRemoveItem = (index) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form data:', formData);
    // TODO: Gửi dữ liệu lên API
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
      <Typography variant="h5" className={styles.title}>
        Thêm Sản Phẩm Mới
      </Typography>
      <Paper className={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                select
                label="Loại sản phẩm"
                name="productType"
                value={formData.productType}
                onChange={(e) => handleChange(e)}
                fullWidth
                required
              >
                {productTypes.map((type) => (
                  <MenuItem key={type.idLoaiSanPham} value={type.idLoaiSanPham}>
                    {type.tenloai}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Tên sản phẩm"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Xuất xứ"
                name="origin"
                value={formData.origin}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Giá"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Số lượng tồn kho"
                name="sl"
                type="number"
                value={formData.price}
                onChange={handleChange}
                fullWidth
                required
                disabled={formData.items.some((item) => item.color)} // Disable if any "Màu sắc" is filled
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Mô tả"
                name="description"
                value={formData.description}
                onChange={handleChange}
                fullWidth
                multiline
                rows={3}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Ảnh chính</Typography>
              <Button variant="outlined" component="label">
                Chọn ảnh chính
                <input
                  type="file"
                  hidden
                  onChange={(e) => handleChange(e, null, 'mainImage')}
                />
              </Button>
              {formData.mainImage && (
                <Typography variant="body2" mt={1}>
                  {formData.mainImage.name}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Màu sắc và Hình ảnh</Typography>
              {formData.items.map((item, index) => (
                <Grid container spacing={2} key={index} alignItems="center">
                  <Grid item xs={12} md={4}>
                    <TextField
                      label="Màu sắc"
                      value={item.color}
                      onChange={(e) => handleChange(e, index, 'color')}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      label="Tồn kho"
                      type="number"
                      value={item.stock}
                      onChange={(e) => handleChange(e, index, 'stock')}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Button variant="outlined" component="label" fullWidth>
                      Tải lên hình ảnh
                      <input
                        type="file"
                        hidden
                        onChange={(e) => handleChange(e, index, 'image')}
                      />
                    </Button>
                    {item.image && (
                      <Typography variant="body2" mt={1}>
                        {item.image.name}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={12} display="flex" justifyContent="flex-end">
                    <IconButton
                      color="error"
                      onClick={() => handleRemoveItem(index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              ))}
              <Button
                startIcon={<AddIcon />}
                onClick={handleAddItem}
                variant="outlined"
                sx={{ mt: 2 }}
              >
                Thêm màu
              </Button>
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="flex-end">
              <Button
                variant="outlined"
                onClick={() => navigate('/products')}
                sx={{ mr: 2 }}
              >
                Hủy
              </Button>
              <Button variant="contained" color="primary" type="submit">
                Thêm sản phẩm
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default AddProductPage;
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Button,
  Grid,
  CircularProgress,
  Divider,
  Rating,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Edit as EditIcon,
} from '@mui/icons-material';
import styles from '../../styles/pages/products/detail.module.css';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // TODO: Replace with actual API call
        const response = await fetch(`/api/products/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError('Không thể tải thông tin sản phẩm');
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

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

  if (!product) {
    return (
      <Box className={styles.errorContainer}>
        <Typography>Không tìm thấy sản phẩm</Typography>
      </Box>
    );
  }

  return (
    <Box className={styles.container}>
      <Box className={styles.header}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/products')}
        >
          Quay lại
        </Button>
        <Button
          variant="contained"
          color="primary"
          startIcon={<EditIcon />}
          onClick={() => navigate(`/products/edit/${id}`)}
        >
          Chỉnh sửa
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper className={styles.imageContainer}>
            <img
              src={product.imageUrl}
              alt={product.name}
              className={styles.productImage}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper className={styles.infoContainer}>
            <Typography variant="h4" gutterBottom>
              {product.name}
            </Typography>

            <Box className={styles.ratingContainer}>
              <Rating value={product.rating} readOnly precision={0.5} />
              <Typography variant="body2" color="textSecondary">
                ({product.numReviews} đánh giá)
              </Typography>
            </Box>

            <Typography variant="h5" color="primary" className={styles.price}>
              {product.price.toLocaleString('vi-VN')}đ
            </Typography>

            <Divider className={styles.divider} />

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="textSecondary">
                  Màu sắc
                </Typography>
                <Typography variant="body1">{product.color}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="textSecondary">
                  Xuất xứ
                </Typography>
                <Typography variant="body1">{product.origin}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="textSecondary">
                  Tồn kho
                </Typography>
                <Typography variant="body1">{product.stock} sản phẩm</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="textSecondary">
                  Đã bán
                </Typography>
                <Typography variant="body1">{product.sold} sản phẩm</Typography>
              </Grid>
            </Grid>

            <Divider className={styles.divider} />

            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              Mô tả sản phẩm
            </Typography>
            <Typography variant="body1">{product.description}</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductDetailPage; 
import React, { useState } from 'react';
import { createProductType } from '../../services/api';
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/pages/productTypes/Add.module.css';

const AddProductTypePage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAddProductType = async () => {
    try {
      setLoading(true);
      await createProductType({ tenloai: name });
      navigate('/productTypes');
    } catch (err) {
      setError('Không thể thêm loại sản phẩm');
      console.error('Error adding product type:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className={styles.container}>
      <Typography variant="h4" className={styles.title}>
        Thêm Loại sản phẩm
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
            onClick={handleAddProductType}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Thêm'}
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

export default AddProductTypePage;

import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Refresh as RefreshIcon } from '@mui/icons-material';
import styles from './PageError.module.css';

const PageError = ({ message, onRetry }) => {
  return (
    <Box className={styles.container}>
      <Typography color="error" gutterBottom>
        {message || 'Đã có lỗi xảy ra'}
      </Typography>
      {onRetry && (
        <Button
          startIcon={<RefreshIcon />}
          onClick={onRetry}
          variant="outlined"
          color="primary"
        >
          Thử lại
        </Button>
      )}
    </Box>
  );
};

export default PageError; 
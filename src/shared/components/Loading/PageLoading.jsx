import React from 'react';
import { Box, CircularProgress } from '@mui/material';
import styles from './PageLoading.module.css';

const PageLoading = () => {
  return (
    <Box className={styles.container}>
      <CircularProgress />
    </Box>
  );
};

export default PageLoading; 
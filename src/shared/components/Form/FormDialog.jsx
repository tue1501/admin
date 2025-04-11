import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
} from '@mui/material';
import styles from './FormDialog.module.css';

const FormDialog = ({
  open,
  title,
  children,
  onSubmit,
  onClose,
  loading,
  submitText = 'Lưu',
  cancelText = 'Hủy',
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent dividers>{children}</DialogContent>
        <DialogActions className={styles.actions}>
          <Button onClick={onClose} disabled={loading}>
            {cancelText}
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            startIcon={loading && <CircularProgress size={20} />}
          >
            {loading ? 'Đang xử lý...' : submitText}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default FormDialog; 
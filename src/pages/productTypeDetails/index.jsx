import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  fetchProductTypeDetails,
  fetchProductTypeById,
  fetchProductTypes,
  deleteProductTypeDetail,
} from '../../services/api';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  CircularProgress,
  Button,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import styles from '../../styles/pages/productTypeDetails/index.module.css';

const ProductTypeDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [productTypeDetails, setProductTypeDetails] = useState([]);
  const [productTypeName, setProductTypeName] = useState('');
  const [productTypes, setProductTypes] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProductTypeDetailsData = async () => {
    try {
      setLoading(true);
      const response = await fetchProductTypeDetails();
      setProductTypeDetails(response.data.data);
    } catch (err) {
      setError('Không thể tải thông tin chi tiết loại sản phẩm');
      console.error('Error fetching product type details:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchProductTypeNameData = useCallback(async () => {
    try {
      const response = await fetchProductTypeById(id);
      setProductTypeName(response.data.tenloai);
    } catch (err) {
      console.error('Error fetching product type name:', err);
    }
  }, [id]);

  const fetchProductTypesData = async () => {
    try {
      const response = await fetchProductTypes();
      const types = response.data.data.reduce((acc, type) => {
        acc[type.id] = type.tenloai;
        return acc;
      }, {});
      setProductTypes(types);
    } catch (err) {
      console.error('Error fetching product types:', err);
    }
  };

  useEffect(() => {
    fetchProductTypeDetailsData();
    fetchProductTypeNameData();
    fetchProductTypesData();
  }, [id, fetchProductTypeNameData]);

  const handleDelete = async (idChiTietLoaiSanPham) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa chi tiết loại sản phẩm này?')) {
      try {
        await deleteProductTypeDetail(idChiTietLoaiSanPham);
        await fetchProductTypeDetailsData();
      } catch (err) {
        console.error('Error deleting product type detail:', err);
      }
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
      <Typography variant="h4" className={styles.title}>
        Chi tiết loại sản phẩm: {productTypeName}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => navigate(`/ProductTypeDetailPage/add`)}
      >
        Thêm chi tiết loại sản phẩm
      </Button>

      <TableContainer component={Paper} className={styles.tableContainer}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tên chi tiết loại sản phẩm</TableCell>
              <TableCell>Loại sản phẩm</TableCell>
              <TableCell align="center">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productTypeDetails.map((data) => (
              <TableRow key={data.idChiTietLoaiSanPham}>
                <TableCell>{data.tenchitiet}</TableCell>
                <TableCell>{productTypes[data.idLoaiSanPham]}</TableCell>
                <TableCell align="center">
                  <IconButton
                    onClick={() =>
                      navigate(`/ProductTypeDetailPage/editDetail/${data.idChiTietLoaiSanPham}`, {
                        state: { productTypeDetail: data },
                      })
                    }
                    size="small"
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(data.idChiTietLoaiSanPham)}
                    size="small"
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ProductTypeDetailPage;
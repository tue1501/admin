import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  CircularProgress,
  Box,
  Typography,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import styles from './DataTable.module.css';

const DataTable = ({
  columns,
  data,
  loading,
  title,
  onEdit,
  onDelete,
  customActions,
}) => {
  if (loading) {
    return (
      <Box className={styles.loadingContainer}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Paper className={styles.container}>
      {title && (
        <Typography variant="h6" className={styles.title}>
          {title}
        </Typography>
      )}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.field}
                  align={column.align || 'left'}
                  width={column.width}
                >
                  {column.headerName}
                </TableCell>
              ))}
              {(onEdit || onDelete || customActions) && (
                <TableCell align="center" width={100}>
                  Thao tác
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                {columns.map((column) => (
                  <TableCell
                    key={`${row.id}-${column.field}`}
                    align={column.align || 'left'}
                  >
                    {column.renderCell
                      ? column.renderCell(row)
                      : row[column.field]}
                  </TableCell>
                ))}
                {(onEdit || onDelete || customActions) && (
                  <TableCell align="center">
                    <Box className={styles.actions}>
                      {onEdit && (
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => onEdit(row)}
                        >
                          <EditIcon />
                        </IconButton>
                      )}
                      {onDelete && (
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => onDelete(row)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      )}
                      {customActions && customActions(row)}
                    </Box>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default DataTable; 
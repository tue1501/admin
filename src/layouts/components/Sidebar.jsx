import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  ShoppingCart as ProductsIcon,
  People as CustomersIcon,
  Receipt as OrdersIcon,
  Category as CategoryIcon,
  ListAlt as ListAltIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './Sidebar.module.css';

const DRAWER_WIDTH = 240;

const MENU_ITEMS = [
  { text: 'Loại sản phẩm', icon: <CategoryIcon />, path: '/productTypes' },
  { text: 'Chi tiết loại sản phẩm', icon: <ListAltIcon />, path: '/ProductTypeDetailPage' },
  { text: 'Sản phẩm', icon: <ProductsIcon />, path: '/products' },
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  { text: 'Đơn hàng', icon: <OrdersIcon />, path: '/orders' },
  { text: 'Khách hàng', icon: <CustomersIcon />, path: '/customers' },
];

const Sidebar = ({ open, onClose, variant }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const drawer = (
    <Box className={styles.drawer}>
      <Box className={styles.drawerHeader}>
        <Typography variant="subtitle2" className={styles.drawerTitle}>
          QUẢN LÝ
        </Typography>
      </Box>
      <List className={styles.menuList}>
        {MENU_ITEMS.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => {
              navigate(item.path);
              if (variant === 'temporary') {
                onClose();
              }
            }}
            className={`${styles.menuItem} ${
              location.pathname === item.path ? styles.menuItemActive : ''
            }`}
          >
            <ListItemIcon
              className={`${styles.menuIcon} ${
                location.pathname === item.path ? styles.menuIconActive : ''
              }`}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              className={location.pathname === item.path ? styles.menuTextActive : ''}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Drawer
      variant={variant}
      open={variant === 'temporary' ? open : true}
      onClose={onClose}
      classes={{
        paper: styles.drawerPaper,
      }}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        width: DRAWER_WIDTH,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
          backgroundColor: '#fff',
          borderRight: '1px solid rgba(0, 0, 0, 0.12)',
        },
      }}
    >
      {drawer}
    </Drawer>
  );
};

export default Sidebar;
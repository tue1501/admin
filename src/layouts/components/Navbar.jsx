import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import styles from './Navbar.module.css';

const Navbar = ({ onMenuClick }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <AppBar
      position="fixed"
      className={styles.appBar}
      elevation={0}
      sx={{
        width: { md: `calc(100% - 240px)` },
        ml: { md: '240px' },
        backgroundColor: 'transparent',
      }}
    >
      <Toolbar className={styles.toolbar}>
        {isMobile && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={onMenuClick}
            className={styles.menuButton}
          >
            <MenuIcon />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import {
  Box,
  CssBaseline,
  useMediaQuery,
  useTheme,
  ThemeProvider,
  // createTheme,
} from '@mui/material';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import styles from './MainLayout.module.css';

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#1976d2',
//     },
//     background: {
//       default: '#f5f5f5',
//     },
//   },
//   typography: {
//     fontFamily: [
//       '-apple-system',
//       'BlinkMacSystemFont',
//       '"Segoe UI"',
//       'Roboto',
//       '"Helvetica Neue"',
//       'Arial',
//       'sans-serif',
//     ].join(','),
//   },
// });

const MainLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box className={styles.root}>
        <CssBaseline />
        <Navbar onMenuClick={handleDrawerToggle} />
        <Sidebar
          open={mobileOpen}
          onClose={handleDrawerToggle}
          variant={isMobile ? 'temporary' : 'permanent'}
        />
        <Box
          component="main"
          className={styles.content}
          sx={{
            marginLeft: { md: '0px' },
            marginTop: '64px',
            padding: '0',
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default MainLayout; 
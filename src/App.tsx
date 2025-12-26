import React from 'react';
import {
  CssBaseline,
  ThemeProvider,
  Box,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
} from '@mui/material';
import { Outlet } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { logout } from './services/authService';
import { theme } from './theme/theme';
import './styles/global.css';
import './styles/app.css';

/**
 * Root App component with layout, theme, and routing
 * Wraps all pages and provides consistent layout
 */
const App: React.FC = () => {
  const { user } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className="app-container" sx={{ backgroundColor: 'background.default' }}>
        {/* Header */}
        <AppBar position="sticky" elevation={1}>
          <Toolbar className="app-toolbar">
            <Container maxWidth="lg" sx={{ width: '100%' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography
                  variant="h4"
                  component="div"
                  className="app-title"
                  sx={{
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Video view
                </Typography>

                {/* User info and logout button */}
                {user && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography
                      variant="body1"
                      sx={{ color: 'white', fontWeight: 500 }}
                    >
                      {user.email}
                    </Typography>
                    <Button
                      color="inherit"
                      variant="outlined"
                      size="small"
                      onClick={handleLogout}
                      sx={{
                        borderColor: 'rgba(255,255,255,0.5)',
                        '&:hover': {
                          borderColor: 'white',
                          backgroundColor: 'rgba(255,255,255,0.1)',
                        },
                      }}
                    >
                      Logout
                    </Button>
                  </Box>
                )}
              </Box>
            </Container>
          </Toolbar>
        </AppBar>

        {/* Main Content */}
        <Box
          component="main"
          className="app-main"
          sx={{
            paddingY: { xs: 2, sm: 3, md: 4, lg: 5 },
          }}
        >
          <Outlet />
        </Box>

        {/* Footer */}
        <Box
          component="footer"
          className="app-footer"
          sx={{
            backgroundColor: theme.palette.background.paper,
            paddingY: { xs: 2, sm: 3 },
          }}
        >
          <Container maxWidth="lg">
            <Typography
              variant="body2"
              color="text.secondary"
              align="center"
              className="app-footer-text"
            >
              © {new Date().getFullYear()} VideView. All rights reserved.
            </Typography>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;

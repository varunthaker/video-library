import React from 'react';
import {
  CssBaseline,
  ThemeProvider,
  Box,
  AppBar,
  Toolbar,
  Typography,
} from '@mui/material';
import { Outlet } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import { UserButton } from '@clerk/clerk-react';
import { theme } from './theme/theme';
import './styles/global.css';
import './styles/app.css';

/**
 * Root App component with layout, theme, and routing
 * Wraps all pages and provides consistent layout
 */
const App: React.FC = () => {
  const { isSignedIn } = useAuth();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className="app-container" sx={{ backgroundColor: 'background.default' }}>
        {/* Header */}
        <AppBar position="sticky" elevation={1}>
          <Toolbar className="app-toolbar">
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', px: { xs: 2, sm: 3, md: 4 } }}>
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
                Hariprabodham Smrutis
              </Typography>

              {/* User Button Component - displays user profile and settings */}
              {isSignedIn && (
                <UserButton
                  appearance={{
                    elements: {
                      userButtonAvatarBox: 'w-10 h-10',
                      userButtonTrigger:
                        'focus-visible:outline-none rounded-full',
                    },
                  }}
                />
              )}
            </Box>
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
            width: '100%',
            px: { xs: 2, sm: 3, md: 4 },
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            className="app-footer-text"
          >
            © {new Date().getFullYear()} Hariprabodham Germany. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;

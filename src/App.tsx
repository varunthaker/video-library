import React from 'react';
import {
  CssBaseline,
  ThemeProvider,
  Box,
  AppBar,
  Toolbar,
  Typography,
  Container,
} from '@mui/material';
import { Outlet } from 'react-router-dom';
import { theme } from './theme/theme';
import './styles/global.css';
import './styles/app.css';

/**
 * Root App component with layout, theme, and routing
 * Wraps all pages and provides consistent layout
 */
const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className="app-container" sx={{ backgroundColor: 'background.default' }}>
        {/* Header */}
        <AppBar position="sticky" elevation={1}>
          <Toolbar className="app-toolbar">
            <Container maxWidth="lg">
              <Box className="app-toolbar-content">
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

                {/* Future: Auth menu can go here */}
                {/* <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button color="inherit">Login</Button>
                  <Button color="inherit">Sign Up</Button>
                </Box> */}
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

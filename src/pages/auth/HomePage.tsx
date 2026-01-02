import React from 'react';
import { useAuth } from '@clerk/clerk-react';
import { CircularProgress, Box } from '@mui/material';
import LoginPage from './LoginPage';
import './styles/HomePage.css';
import { ThemesPage } from '../ThemesPage';

/**
 * HomePage component that shows LoginPage when user is not authenticated
 * and ThemesPage when user is authenticated
 */
const HomePage: React.FC = () => {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return isSignedIn ? < ThemesPage /> : <LoginPage />;
};

export default HomePage;

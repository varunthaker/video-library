import React from 'react';
import { useAuth } from '@clerk/clerk-react';
import { CircularProgress, Box } from '@mui/material';
import { Dashboard } from '../Dashboard';
import LoginPage from './LoginPage';
import './styles/HomePage.css';

/**
 * HomePage component that shows LoginPage when user is not authenticated
 * and Dashboard when user is authenticated
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

  return isSignedIn ? <Dashboard /> : <LoginPage />;
};

export default HomePage;

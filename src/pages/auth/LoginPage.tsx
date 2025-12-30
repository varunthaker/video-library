import React from 'react';
import { useAuth } from '@clerk/clerk-react';
import { SignIn } from '@clerk/clerk-react';
import { Container, Box, CircularProgress } from '@mui/material';
import './styles/LoginPage.css';

const LoginPage: React.FC = () => {
  const { isLoaded } = useAuth();

  if (!isLoaded) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '80vh',
          gap: 2,
        }}
      >
        <SignIn
          appearance={{
            elements: {
              rootBox: 'w-full',
              card: 'w-full shadow-lg',
            },
          }}
        />
      </Box>
    </Container>
  );
};

export default LoginPage;

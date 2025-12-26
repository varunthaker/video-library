import React from 'react';
import { Container, Box, Typography, Button as MuiButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Error as ErrorIcon } from '@mui/icons-material';

/**
 * NotFound (404) page
 */
export const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 'calc(100vh - 200px)',
          textAlign: 'center',
          paddingY: { xs: 3, sm: 4, md: 6 },
        }}
      >
        <ErrorIcon
          sx={{
            fontSize: { xs: '4rem', sm: '5rem', md: '6rem' },
            color: 'error.main',
            marginBottom: { xs: 1.5, sm: 2 },
          }}
        />

        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '2.5rem', sm: '3rem', md: '4rem' },
            fontWeight: 700,
            marginBottom: 1,
            color: 'text.primary',
          }}
        >
          404
        </Typography>

        <Typography
          variant="h4"
          sx={{
            marginBottom: { xs: 1.5, sm: 2 },
            fontWeight: 500,
            color: 'text.secondary',
            fontSize: { xs: '1.25rem', sm: '1.5rem' },
          }}
        >
          Page Not Found
        </Typography>

        <Typography
          variant="body1"
          sx={{
            marginBottom: { xs: 3, sm: 4 },
            color: 'text.secondary',
            maxWidth: '500px',
            fontSize: { xs: '0.95rem', sm: '1rem' },
          }}
        >
          Sorry, the page you're looking for doesn't exist. It might have been
          moved or deleted.
        </Typography>

        <MuiButton
          variant="contained"
          size="large"
          onClick={() => navigate('/')}
          sx={{
            paddingX: { xs: 3, sm: 4 },
            paddingY: { xs: 1.25, sm: 1.5 },
            fontSize: { xs: '0.95rem', sm: '1rem' },
          }}
        >
          Go Back Home
        </MuiButton>
      </Box>
    </Container>
  );
};

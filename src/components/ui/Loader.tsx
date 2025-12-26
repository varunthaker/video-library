import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import './styles/loader.css';

export interface LoaderProps {
  loading: boolean;
  message?: string;
  size?: 'small' | 'medium' | 'large';
  fullScreen?: boolean;
}

/**
 * Loader component for displaying loading states
 */
export const Loader: React.FC<LoaderProps> = ({
  loading,
  message = 'Loading...',
  size = 'medium',
  fullScreen = false,
}) => {
  if (!loading) return null;

  const containerClassName = fullScreen
    ? 'loader-fullscreen'
    : 'loader-inline';

  const sizeMap = {
    small: 30,
    medium: 50,
    large: 80,
  };

  return (
    <Box className={containerClassName}>
      <Box className="loader-content">
        <CircularProgress size={sizeMap[size]} />
        {message && (
          <Typography
            variant="body2"
            className="loader-message"
            sx={{ color: 'text.secondary' }}
          >
            {message}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

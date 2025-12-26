import React from 'react';
import { Container, Box, Grid, Typography, Alert } from '@mui/material';
import { VideoCard } from '../components/video/VideoCard';
import { Loader } from '../components/ui/Loader';
import { useVideos } from '../hooks/useVideos';
import '../styles/dashboard.css';

/**
 * Dashboard page - displays all videos in a responsive grid
 * Responsive breakpoints:
 * - Mobile: 1 column
 * - Tablet (600px+): 2 columns
 * - Desktop (960px+): 3 columns
 * - Large Desktop (1200px+): 4 columns
 */
export const Dashboard: React.FC = () => {
  const { videos, loading, error } = useVideos();

  console.log('Videos:', videos);


  return (
    <Container maxWidth="xl">
      {/* Page Header */}
      <Box className="dashboard-header">
        <Typography
          variant="h1"
          component="h1"
          className="dashboard-title"
          sx={{
            fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem', lg: '3rem' },
          }}
        >
          Video Library
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          className="dashboard-subtitle"
          sx={{
            fontSize: { xs: '0.95rem', sm: '1rem', md: '1.1rem' },
          }}
        >
          Explore our collection of videos and discover amazing content
        </Typography>
      </Box>

      {/* Loading State */}
      <Loader loading={loading} message="Loading videos..." />

      {/* Error State */}
      {error && !loading && (
        <Alert severity="error" className="dashboard-alert">
          Failed to load videos: {error.message}
        </Alert>
      )}

      {/* Empty State */}
      {!loading && videos.length === 0 && (
        <Alert severity="info" className="dashboard-alert">
          No videos available at the moment. Check back soon!
        </Alert>
      )}

      {/* Videos Grid - Responsive */}
      {!loading && videos.length > 0 && (
        <Grid
          container
          spacing={{ xs: 2, sm: 2.5, md: 3, lg: 3.5 }}
          className="dashboard-grid"
        >
          {videos.map((video) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              xl={3}
              key={video.id}
              className="dashboard-grid-item"
            >
              <Box className="dashboard-grid-item-wrapper">
                <VideoCard video={video} />
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

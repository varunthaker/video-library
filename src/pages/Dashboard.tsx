import React, { useState } from 'react';
import { Container, Box, Grid, Typography, Alert, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { VideoCard } from '../components/video/VideoCard';
import { Loader } from '../components/ui/Loader';
import { AddVideoModal } from '../components/video/AddVideoModal';
import { useVideos } from '../hooks/useVideos';
import '../styles/dashboard.css';
import { useUserRole } from '../hooks/useUserRole';

/**
 * Dashboard page - displays all videos in a responsive grid
 * Responsive breakpoints:
 * - Mobile: 1 column
 * - Tablet (600px+): 2 columns
 * - Desktop (960px+): 3 columns
 * - Large Desktop (1200px+): 4 columns
 */
export const Dashboard: React.FC = () => {
  const { videos, loading, error, refetch } = useVideos();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {  isAdmin }= useUserRole();

  return (
    <Container maxWidth="xl">
      {/* Page Header */}
      <Box className="dashboard-header">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
          <Box>
            <Typography
              variant="body1"
              color="text.secondary"
              className="dashboard-subtitle"
              sx={{
                fontSize: { xs: '0.95rem', sm: '1rem', md: '1.1rem' },
              }}
            >
              Prabodhswamiji's Smruti's in Germany
            </Typography>
          </Box>
          {isAdmin && <Button
            variant="contained"
            color="primary"
            onClick={() => setIsModalOpen(true)}
            sx={{
              whiteSpace: 'nowrap',
              padding: { xs: '4px 8px', sm: '8px 16px' },
              fontSize: { xs: '0.875rem', sm: '1rem' },
            }}
          ><AddIcon />
          </Button>}
        </Box>
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

      {/* Add Video Modal */}
      <AddVideoModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => refetch()}
      />
    </Container>
  );
};

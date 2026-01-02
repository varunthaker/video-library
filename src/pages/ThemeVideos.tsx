import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Box, Grid, Alert, Button, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { VideoCard } from '../components/video/VideoCard';
import { Loader } from '../components/ui/Loader';
import { AddVideoModal } from '../components/video/AddVideoModal';
import './styles/themevideos.css';
import { useUserRole } from '../hooks/useUserRole';
import { getVideosByTheme } from '../services/videoService';
import { Video } from '../types/video';

/**
 * ThemeVideos page - displays all videos for a specific theme in a responsive grid
 * Responsive breakpoints:
 * - Mobile: 1 column
 * - Tablet (600px+): 2 columns
 * - Desktop (960px+): 3 columns
 * - Large Desktop (1200px+): 4 columns
 */
export const ThemeVideos: React.FC = () => {
  const { id: themeId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { isAdmin } = useUserRole();

  useEffect(() => {
    if (!themeId) return;

    const fetchThemeVideos = async () => {
      try {
        setLoading(true);
        const data = await getVideosByTheme(themeId);
        setVideos(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchThemeVideos();
  }, [themeId]);

  const handleAddVideoSuccess = async () => {
    if (!themeId) return;
    try {
      const data = await getVideosByTheme(themeId);
      setVideos(data);
    } catch (err) {
      setError(err as Error);
    }
    setIsModalOpen(false);
  };


  return (
    <Container maxWidth="xl">
      <Box className="themevideos-container">
        {/* Page Header */}
        <Box className="themevideos-header">
          <Box className="themevideos-header-content">
            <IconButton
              onClick={() => navigate(-1)}
              sx={{ color: 'primary.main' }}
            >
              <ArrowBackIcon />
            </IconButton>
            {isAdmin && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => setIsModalOpen(true)}
                className="themevideos-add-button"
                startIcon={<AddIcon />}
              >
               Video
              </Button>
            )}
          </Box>
        </Box>

        {/* Loading State */}
        <Loader loading={loading} message="Loading videos..." />

        {/* Error State */}
        {error && !loading && (
          <Alert severity="error" className="themevideos-alert">
            Failed to load videos: {error.message}
          </Alert>
        )}

        {/* Empty State */}
        {!loading && videos.length === 0 && (
          <Alert severity="info" className="themevideos-alert">
            No videos available for this theme. Check back soon!
          </Alert>
        )}

        {/* Videos Grid - Responsive */}
        {!loading && videos.length > 0 && (
          <Grid
            container
            spacing={{ xs: 2, sm: 2.5, md: 3, lg: 3.5 }}
            className="themevideos-grid"
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
                className="themevideos-grid-item"
              >
                <Box className="themevideos-grid-item-wrapper">
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
          onSuccess={handleAddVideoSuccess}
        />
      </Box>
    </Container>
  );
};

import React from 'react';
import { Box, Container } from '@mui/material';
import { getYouTubeEmbedUrl } from '../../utils/extractYouTubeId';
import './styles/video-player.css';

export interface VideoPlayerProps {
  videoId: string;
  title?: string;
}

/**
 * VideoPlayer component using YouTube nocookie embed
 * Supports mobile and desktop viewing
 */
export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoId,
  title,
}) => {
  const embedUrl = getYouTubeEmbedUrl(videoId);

  return (
    <Container maxWidth="md">
      <Box className="video-player-container">
        <iframe
          className="video-player-iframe"
          src={embedUrl}
          title={title || 'Video Player'}
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      </Box>
    </Container>
  );
};

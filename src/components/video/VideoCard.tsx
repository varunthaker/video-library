import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Modal,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Video } from '../../types/video';
import { getYouTubeEmbedUrl } from '../../utils/extractYouTubeId';
import './styles/video-card.css';

export interface VideoCardProps {
  video: Video;
}

/**
 * VideoCard component displaying video with thumbnail and modal player
 * Responsive and mobile-friendly
 */
export const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  const [openModal, setOpenModal] = useState(false);
  const thumbnailUrl = `https://img.youtube.com/vi/${video.youtube_video_id}/hqdefault.jpg`;

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <Card className="video-card">
        {/* Thumbnail with play button overlay */}
        <Box className="video-card-thumbnail-container">
          <CardMedia
            component="img"
            image={thumbnailUrl}
            alt={video.title}
            className="video-card-thumbnail"
          />
          <Box
            onClick={handleOpenModal}
            className="video-card-play-overlay"
          >
            <IconButton className="video-card-play-button">
              <PlayArrowIcon sx={{ fontSize: 32, color: 'primary.main' }} />
            </IconButton>
          </Box>
        </Box>

        {/* Card content */}
        <CardContent sx={{ flexGrow: 1, padding: { xs: 1.5, sm: 2, md: 2.5 } }}>
          <Typography
            gutterBottom
            variant="h6"
            component="h2"
            className="video-card-title"
          >
            {video.title}
          </Typography>
        </CardContent>
      </Card>

      {/* Modal for full video player */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        className="video-modal"
      >
        <Box className="video-modal-content">
          <IconButton
            onClick={handleCloseModal}
            className="video-modal-close-button"
          >
            <CloseIcon sx={{ color: 'white' }} />
          </IconButton>

          <Box className="video-modal-player">
            <iframe
              className="video-modal-iframe"
              src={getYouTubeEmbedUrl(video.youtube_video_id)}
              title={video.title}
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              sandbox="allow-same-origin allow-scripts allow-presentation"
              onContextMenu={(e) => e.preventDefault()}
            />
            <Box className="video-modal-overlay" />
          </Box>
        </Box>
      </Modal>
    </>
  );
};

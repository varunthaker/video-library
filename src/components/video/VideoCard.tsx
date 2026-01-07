import React, { useState, useRef } from 'react';
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
import PauseIcon from '@mui/icons-material/Pause';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import FastForwardIcon from '@mui/icons-material/FastForward';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import YouTube from 'react-youtube';
import { Video } from '../../types/video';
import './styles/video-card.css';

export interface VideoCardProps {
  video: Video;
}

/**
 * VideoCard component displaying video with thumbnail and modal player
 */
export const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  const [openModal, setOpenModal] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const playerRef = useRef<{ playVideo: () => void; pauseVideo: () => void; getCurrentTime: () => number; seekTo: (time: number, allowSeekAhead: boolean) => void } | null>(null);
  const thumbnailUrl = `https://img.youtube.com/vi/${video.youtube_video_id}/hqdefault.jpg`;

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const onReady = (event: { target: { playVideo: () => void; pauseVideo: () => void; getCurrentTime: () => number; seekTo: (time: number, allowSeekAhead: boolean) => void } }) => {
    playerRef.current = event.target;
  };

    const onError = (event: { data: number }) => {
    console.error('YouTube player error for video:', video.youtube_video_id, 'Error code:', event.data);
  };

  const playerOpts = {
    playerVars: {
      controls: 0,
      disablekb: 1,
      modestbranding: 1,
      rel: 0,
      fs: 0,
      iv_load_policy: 3,
      origin: typeof window !== 'undefined' ? window.location.origin : '',
    },
  };

  const handlePlayPauseToggle = () => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.pauseVideo();
        setIsPlaying(false);
      } else {
        playerRef.current.playVideo();
        setIsPlaying(true);
      }
    }
  };

  const handleRewind = () => {
    if (playerRef.current) {
      const currentTime = playerRef.current.getCurrentTime();
      playerRef.current.seekTo(currentTime - 10, true);
    }
  };

  const handleForward = () => {
    if (playerRef.current) {
      const currentTime = playerRef.current.getCurrentTime();
      playerRef.current.seekTo(currentTime + 10, true);
    }
  };

  const handleFullscreenToggle = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <>
      <Card className="video-card">
        {/* Thumbnail clickable area */}
        <Box 
          className="video-card-thumbnail-container"
          onClick={handleOpenModal}
        >
          <CardMedia
            component="img"
            image={thumbnailUrl}
            alt={video.title}
            className="video-card-thumbnail"
          />
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
        className={`video-modal ${isFullscreen ? 'video-modal-fullscreen' : ''}`}
      >
        <Box className="video-modal-content" sx={{ position: 'relative', width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Box className="video-modal-player" sx={{ flex: 1, position: 'relative' }}>
            <YouTube 
              videoId={video.youtube_video_id}
              opts={playerOpts}
              onReady={onReady}
              onError={onError}
            />
          </Box>

          {/* Overlay layer above player - blocks all YouTube interactions */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'transparent',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              zIndex: 10,
            }}
          >
            {/* Close button - top right */}
            <Box sx={{ alignSelf: 'flex-end', padding: 2 }}>
              <IconButton
                onClick={handleCloseModal}
                className="video-modal-close-button"
                sx={{ color: 'white', '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}
              >
                <CloseIcon sx={{ fontSize: 32 }} />
              </IconButton>
            </Box>

            {/* Controls - bottom center and right */}
            <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'flex-end', paddingBottom: 3, paddingLeft: 3, paddingRight: 3 }}>
              {/* Left: empty space */}
              <Box sx={{ flex: 1 }} />
              
              {/* Center: play controls */}
              <Box className="video-modal-controls" sx={{ display: 'flex', gap: 3, justifyContent: 'center', alignItems: 'center' }}>
                <IconButton
                  onClick={handleRewind}
                  sx={{ color: 'white', '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}
                >
                  <FastRewindIcon sx={{ fontSize: 32 }} />
                </IconButton>
                <IconButton
                  onClick={handlePlayPauseToggle}
                  sx={{ color: 'white', '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}
                >
                  {isPlaying ? <PauseIcon sx={{ fontSize: 48 }} /> : <PlayArrowIcon sx={{ fontSize: 48 }} />}
                </IconButton>
                <IconButton
                  onClick={handleForward}
                  sx={{ color: 'white', '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}
                >
                  <FastForwardIcon sx={{ fontSize: 32 }} />
                </IconButton>
              </Box>

              {/* Right: fullscreen button */}
              <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                <IconButton
                  onClick={handleFullscreenToggle}
                  sx={{ color: 'white', '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}
                >
                  {isFullscreen ? <FullscreenExitIcon sx={{ fontSize: 32 }} /> : <FullscreenIcon sx={{ fontSize: 32 }} />}
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

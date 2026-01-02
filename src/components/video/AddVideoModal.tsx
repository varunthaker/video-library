import React, { useState } from 'react';
import { Box, Alert } from '@mui/material';
import { Input } from '../ui/Input';
import { Modal } from '../ui/Modal';
import { createVideo } from '../../services/videoService';
import { extractYouTubeId } from '../../utils/extractYouTubeId';
import './styles/add-video-modal.css';
import { useAuth } from '@clerk/clerk-react';

interface AddVideoModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

/**
 * Modal form for adding new videos
 * Extracts YouTube ID from URL and saves to database
 */
export const AddVideoModal: React.FC<AddVideoModalProps> = ({
  open,
  onClose,
  onSuccess,
}) => {
  const [title, setTitle] = useState('');
  const [youtubeLink, setYoutubeLink] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const {userId} = useAuth();

  const handleClose = () => {
    setTitle('');
    setYoutubeLink('');
    setError('');
    onClose();
  };

  const handleSubmit = async () => {
    // Validation
    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    if (!youtubeLink.trim()) {
      setError('YouTube link is required');
      return;
    }

    // Extract YouTube ID
    const youtubeId = extractYouTubeId(youtubeLink);
    if (!youtubeId) {
      setError('Invalid YouTube URL. Please enter a valid YouTube link');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await createVideo({
        title: title.trim(),
        youtube_video_id: youtubeId,
        created_by: userId || '',
      });

      // Reset form and close modal
      setTitle('');
      setYoutubeLink('');
      
      if (onSuccess) {
        onSuccess();
      }
      handleClose();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to add video';
      setError(`Error: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Add New Video"
      onSubmit={handleSubmit}
      submitText="Add Video"
      loading={loading}
      maxWidth="sm"
    >
      <Box className="add-video-form">
        {error && (
          <Alert severity="error" sx={{ marginBottom: 2 }}>
            {error}
          </Alert>
        )}

        <Input
          label="Video Title"
          placeholder="Enter video title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={loading}
        />

        <Input
          label="YouTube Link"
          placeholder="Enter YouTube URL or video ID"
          value={youtubeLink}
          onChange={(e) => setYoutubeLink(e.target.value)}
          disabled={loading}
        />
      </Box>
    </Modal>
  );
};

import React, { useState, useEffect, useRef } from 'react';
import { Box, Alert } from '@mui/material';
import { Input } from '../ui/Input';
import { Modal } from '../ui/Modal';
import { createVideo } from '../../services/videoService';
import { getAllThemes } from '../../services/themeService';
import { extractYouTubeId } from '../../utils/extractYouTubeId';
import './styles/add-video-modal.css';
import { useAuth } from '@clerk/clerk-react';
import { Theme } from '../../types/theme';

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
  const [themes, setThemes] = useState<Theme[]>([]);
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [themesLoading, setThemesLoading] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const {userId} = useAuth();

  useEffect(() => {
    fetchThemes();
  }, []);

  const fetchThemes = async () => {
    try {
      setThemesLoading(true);
      const data = await getAllThemes();
      setThemes(data);
    } catch (err) {
      console.error('Error fetching themes:', err);
    } finally {
      setThemesLoading(false);
    }
  };

  const handleAddTheme = (themeId: string) => {
    if (!selectedThemes.includes(themeId)) {
      setSelectedThemes([...selectedThemes, themeId]);
    }
  };

  const handleRemoveTheme = (themeId: string) => {
    setSelectedThemes(selectedThemes.filter(id => id !== themeId));
  };

  const handleClose = () => {
    setTitle('');
    setYoutubeLink('');
    setError('');
    setSelectedThemes([]);
    setDropdownOpen(false);
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
        theme_ids: selectedThemes,
      });

      // Reset form and close modal
      setTitle('');
      setYoutubeLink('');
      setSelectedThemes([]);
      
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

        {/* Themes Dropdown */}
        <div className="add-video-form-group">
          <label className="add-video-form-label">Themes</label>
          <div className="add-video-form-themes" ref={dropdownRef}>
            <div className="add-video-form-tags">
              {selectedThemes.map(id => {
                const theme = themes.find(t => t.id === id);
                if (!theme) return null;
                return (
                  <span key={id} className="add-video-form-tag">
                    {theme.title}
                    <button
                      type="button"
                      className="add-video-form-tag-remove"
                      onClick={() => handleRemoveTheme(id)}
                      aria-label={`Remove ${theme.title}`}
                      disabled={loading}
                    >
                      ×
                    </button>
                  </span>
                );
              })}
            </div>
            <button
              type="button"
              className="add-video-form-themes-button"
              onClick={() => setDropdownOpen(v => !v)}
              disabled={loading || themesLoading}
            >
              {selectedThemes.length === 0 ? 'Select themes...' : 'Add more themes'}
            </button>
            {dropdownOpen && (
              <div className="add-video-form-dropdown">
                {themes.filter(theme => !selectedThemes.includes(theme.id)).length === 0 ? (
                  <div className="add-video-form-dropdown-empty">No more themes</div>
                ) : (
                  themes.filter(theme => !selectedThemes.includes(theme.id)).map(theme => (
                    <div
                      key={theme.id}
                      className="add-video-form-dropdown-item"
                      onClick={() => handleAddTheme(theme.id)}
                    >
                      {theme.title}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </Box>
    </Modal>
  );
};

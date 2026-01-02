import React, { useEffect, useState, useRef } from 'react';
import { Container, Box, Typography, Alert, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { getAllThemes } from '../services/themeService';
import { Theme } from '../types/theme';
import { Loader } from '../components/ui/Loader';
import { Modal } from '../components/ui/Modal';
import { ThemeForm, ThemeFormHandle } from '../components/theme/ThemeForm';
import { AddVideoModal } from '../components/video/AddVideoModal';
import { useUserRole } from '../hooks/useUserRole';
import './styles/themes-page.css';

/**
 * ThemesPage - displays all themes in a list
 */
export const ThemesPage: React.FC = () => {
  const navigate = useNavigate();
  const [themes, setThemes] = useState<Theme[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);
  const [formKey, setFormKey] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<ThemeFormHandle>(null);

  const { isAdmin } = useUserRole();

  useEffect(() => {
    fetchThemes();
  }, []);

  const fetchThemes = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllThemes();
      setThemes(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch themes';
      setError(errorMessage);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTheme = () => {
    setIsEdit(false);
    setSelectedTheme(null);
    setFormKey((prev) => prev + 1);
    setIsModalOpen(true);
  };

  const handleEditTheme = (theme: Theme) => {
    setIsEdit(true);
    setSelectedTheme(theme);
    setFormKey((prev) => prev + 1);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setIsEdit(false);
    setSelectedTheme(null);
  };

  const handleModalSubmit = async () => {
    setIsSubmitting(true);
    try {
      await formRef.current?.submit();
      handleModalClose();
      fetchThemes();
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddVideoSuccess = async () => {
    setIsVideoModalOpen(false);
    fetchThemes();
  };



  return (
    <Container maxWidth="lg">
      <Box className="themes-container">
        {/* Page Header */}
        <Box className="themes-header">
          <Typography variant="h4" component="h1" className="themes-title">
            Themes
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
           {isAdmin && <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={handleAddTheme}
            >
              Theme
            </Button>}
            {isAdmin && (
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => setIsVideoModalOpen(true)}
              >
                Video
              </Button>
            )}
          </Box>
        </Box>

        {/* Error Alert */}
        {error && (
          <Alert severity="error" className="error-alert">
            {error}
          </Alert>
        )}

        {/* Loader */}
        <Loader loading={loading} message="Loading themes..." />

        {!loading && (
          <>
            {/* Themes List */}
            {themes.length > 0 ? (
              <Box className="themes-list">
                {themes.map((theme) => (
                  <Box 
                    key={theme.id} 
                    className="theme-item"
                    onClick={() => navigate(`/themes/${theme.id}`)}
                    style={{ cursor: 'pointer' }}
                  >
                    <Typography 
                      variant="body1" 
                      className="theme-title"
                    >
                      {theme.title}
                    </Typography>
                   { isAdmin && <Button
                      size="small"
                      variant="text"
                      color="primary"
                      className="theme-edit-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditTheme(theme);
                      }}
                    >
                      <EditIcon />
                    </Button>}
                  </Box>
                ))}
              </Box>
            ) : (
              <Alert severity="info" className="empty-state-alert">
                No themes found. Create your first theme!
              </Alert>
            )}
          </>
        )}
      </Box>

      {/* Theme Modal */}
      <Modal
        open={isModalOpen}
        onClose={handleModalClose}
        title={isEdit ? 'Edit Theme' : 'Add Theme'}
        submitText={isEdit ? 'Update' : 'Create'}
        onSubmit={handleModalSubmit}
        loading={isSubmitting}
      >
        <ThemeForm
          key={formKey}
          ref={formRef}
          isEdit={isEdit}
          theme={selectedTheme || undefined}
        />
      </Modal>

      {/* Add Video Modal */}
      <AddVideoModal
        open={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        onSuccess={handleAddVideoSuccess}
      />
    </Container>
  );
};

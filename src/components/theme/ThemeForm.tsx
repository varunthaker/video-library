import  { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { Box, Alert } from '@mui/material';
import { Input } from '../ui/Input';
import { createTheme, updateTheme } from '../../services/themeService';
import { Theme, ThemeFormData } from '../../types/theme';
import { useAuth } from '@clerk/clerk-react';

interface ThemeFormProps {
  isEdit?: boolean;
  theme?: Theme;
  onSubmit?: () => void;
  onError?: (error: string) => void;
}

export interface ThemeFormHandle {
  submit: () => Promise<void>;
}

/**
 * Form component for creating or updating themes
 * Can be used in both create and edit modes
 */
export const ThemeForm = forwardRef<ThemeFormHandle, ThemeFormProps>(
  ({ isEdit = false, theme, onSubmit, onError }, ref) => {
    const [title, setTitle] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const {userId} = useAuth();

    // Initialize form with theme data if editing
    useEffect(() => {
      if (isEdit && theme) {
        setTitle(theme.title);
      }
    }, [isEdit, theme]);

    const validateForm = (): boolean => {
      if (!title.trim()) {
        setError('Title is required');
        return false;
      }
      return true;
    };

    const handleSubmit = async () => {
      setError('');

      if (!validateForm()) {
        return;
      }

      setLoading(true);

      try {
        const themeData: ThemeFormData = {
          title: title.trim(),
          created_by: userId || '',
        };

        if (isEdit && theme) {
          await updateTheme(theme.id, themeData);
        } else {
          await createTheme(themeData);
        }

        // Reset form
        setTitle('');
        if (onSubmit) {
          onSubmit();
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to save theme';
        setError(`Error: ${errorMessage}`);
        if (onError) {
          onError(errorMessage);
        }
      } finally {
        setLoading(false);
      }
    };

    // Expose submit method to parent via ref
    useImperativeHandle(ref, () => ({
      submit: handleSubmit,
    }));

    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 1 }}>
            {error}
          </Alert>
        )}

        <Input
          label="Theme Title"
          placeholder="Enter theme title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={loading}
          autoFocus
        />
      </Box>
    );
  }
);

ThemeForm.displayName = 'ThemeForm';
export default ThemeForm;

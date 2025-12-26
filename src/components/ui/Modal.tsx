import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import './styles/modal.css';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  onSubmit?: () => void | Promise<void>;
  submitText?: string;
  closeText?: string;
  loading?: boolean;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

/**
 * Reusable Modal component
 * Centered on the page with customizable content
 */
export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  children,
  onSubmit,
  submitText = 'Submit',
  closeText = 'Cancel',
  loading = false,
  maxWidth = 'sm',
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '8px',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
        },
      }}
    >
      <Box className="modal-header">
        <DialogTitle className="modal-title">{title}</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: 'text.secondary',
          }}
          disabled={loading}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <DialogContent dividers className="modal-content">
        {children}
      </DialogContent>

      {onSubmit && (
        <DialogActions className="modal-actions">
          <Button
            onClick={onClose}
            disabled={loading}
            variant="outlined"
          >
            {closeText}
          </Button>
          <Button
            onClick={onSubmit}
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? 'Loading...' : submitText}
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

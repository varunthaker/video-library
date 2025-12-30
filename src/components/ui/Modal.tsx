import React, { useEffect } from 'react';
import { Button, Box } from '@mui/material';
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

type ModalSizeMap = {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
};

const sizeMap: ModalSizeMap = {
  xs: 'modal--sm',
  sm: 'modal--sm',
  md: 'modal--md',
  lg: 'modal--lg',
  xl: 'modal--lg',
};

/**
 * Reusable Modal component
 * Accessible modal dialog with focus management and smooth animations
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
  // Lock body scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [open]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!open) return null;

  const modalSizeClass = sizeMap[maxWidth];

  return (
    <div
      className="modal-overlay"
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      role="presentation"
    >
      <div className={`modal ${modalSizeClass}`} role="dialog" aria-modal="true">
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <button
            className="modal-close"
            onClick={onClose}
            aria-label="Close modal"
            type="button"
            disabled={loading}
          >
            <CloseIcon sx={{ width: 20, height: 20 }} />
          </button>
        </div>

        <Box className="modal-content">{children}</Box>

        {onSubmit && (
          <Box className="modal-actions">
            <Button
              onClick={onClose}
              disabled={loading}
              variant="outlined"
              size="small"
            >
              {closeText}
            </Button>
            <Button
              onClick={onSubmit}
              variant="contained"
              color="primary"
              disabled={loading}
              size="small"
            >
              {loading ? 'Loading...' : submitText}
            </Button>
          </Box>
        )}
      </div>
    </div>
  );
};

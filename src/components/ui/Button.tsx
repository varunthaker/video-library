import React from 'react';
import MuiButton, { ButtonProps as MuiButtonProps } from '@mui/material/Button';
import './styles/button.css';

export interface ButtonProps extends MuiButtonProps {
  children: React.ReactNode;
  loading?: boolean;
  fullWidth?: boolean;
}

/**
 * Reusable Button component wrapping Material UI Button
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, loading = false, disabled, className, ...props }, ref) => {
    return (
      <MuiButton
        ref={ref}
        disabled={disabled || loading}
        className={`app-button ${className || ''}`}
        {...props}
      >
        {children}
      </MuiButton>
    );
  }
);

Button.displayName = 'Button';
export default Button;

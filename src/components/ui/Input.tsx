import React from 'react';
import TextField from '@mui/material/TextField';
import { TextFieldProps } from '@mui/material/TextField';

export interface InputProps extends Omit<TextFieldProps, 'error'> {
  error?: string;
}

/**
 * Reusable Input component wrapping Material UI TextField
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ error, ...props }, ref) => {
    return (
      <TextField
        ref={ref}
        error={!!error}
        helperText={error}
        fullWidth
        variant="outlined"
        margin="normal"
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
export default Input;

import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { resetPassword, updatePassword } from '../../services/authService';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import './styles/ResetPasswordPage.css';

type ResetStep = 'request' | 'reset';

/**
 * ResetPasswordPage component for password recovery
 * - Step 1: Request password reset with email
 * - Step 2: Reset password with new password (if recovery token is present)
 */
const ResetPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // Determine initial step from URL params
  const type = searchParams.get('type');
  const accessToken = searchParams.get('access_token');
  const initialStep: ResetStep = accessToken && type === 'recovery' ? 'reset' : 'request';
  
  const [step] = useState<ResetStep>(initialStep);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleResetRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const response = await resetPassword(email);
    setLoading(false);

    if (!response.success) {
      setError(response.error?.message || 'Failed to send reset email');
    } else {
      setSuccess(true);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    const response = await updatePassword(password);
    setLoading(false);

    if (!response.success) {
      setError(response.error?.message || 'Failed to update password');
    } else {
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }
  };

  return (
    <div className="reset-password-page">
      <div className="reset-password-container">
        {success && step === 'request' ? (
          <div className="reset-password-success">
            <h2>Email Sent!</h2>
            <p>
              We've sent a password reset link to <strong>{email}</strong>
            </p>
            <p className="reset-password-note">
              Please check your email and click the link to reset your password.
            </p>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => navigate('/login')}
            >
              Back to Login
            </Button>
          </div>
        ) : success && step === 'reset' ? (
          <div className="reset-password-success">
            <h2>Password Reset Successfully!</h2>
            <p>You can now login with your new password.</p>
            <p className="redirect-message">Redirecting to login page...</p>
          </div>
        ) : step === 'request' ? (
          <form onSubmit={handleResetRequest} className="reset-password-form">
            <h2 className="reset-password-title">Reset Password</h2>
            <p className="reset-password-subtitle">
              Enter your email address and we'll send you a link to reset your password.
            </p>

            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />

            {error && <div className="reset-password-error">{error}</div>}

            <Button
              type="submit"
              disabled={loading}
              fullWidth
              variant="contained"
              color="primary"
              size="large"
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </Button>

            <div className="reset-password-footer">
              <p>
                Remember your password? <a href="/login">Login</a>
              </p>
            </div>
          </form>
        ) : (
          <form onSubmit={handleResetPassword} className="reset-password-form">
            <h2 className="reset-password-title">Set New Password</h2>

            <Input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              inputProps={{ minLength: 8 }}
            />

            <Input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={loading}
              inputProps={{ minLength: 8 }}
            />

            {error && <div className="reset-password-error">{error}</div>}

            <Button
              type="submit"
              disabled={loading}
              fullWidth
              variant="contained"
              color="primary"
              size="large"
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordPage;

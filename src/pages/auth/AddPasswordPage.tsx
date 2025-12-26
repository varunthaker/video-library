import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { updatePassword } from '../../services/authService';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import './styles/AddPasswordPage.css';

/**
 * AddPasswordPage component for invited users to set their password
 */
const AddPasswordPage: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Check if user is authenticated and has access token
  useEffect(() => {
    const accessToken = searchParams.get('access_token');
    const type = searchParams.get('type');

    // If no valid invite token, redirect to login
    if (!accessToken || type !== 'invite') {
      navigate('/login');
    }
  }, [searchParams, navigate]);

  useEffect(() => {
    // If user is already authenticated and has set password, redirect to home
    if (user && success) {
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
  }, [user, success, navigate]);

  const handleAddPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate passwords
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
      setError(response.error?.message || 'Failed to set password');
    } else {
      setSuccess(true);
    }
  };

  return (
    <div className="add-password-page">
      <div className="add-password-container">
        {success ? (
          <div className="add-password-success">
            <h2>Password Set Successfully!</h2>
            <p>You can now use your email and password to login.</p>
            <p className="redirect-message">Redirecting to home page...</p>
          </div>
        ) : (
          <form onSubmit={handleAddPassword} className="add-password-form">
            <h2 className="add-password-title">Set Your Password</h2>
            <p className="add-password-subtitle">
              Please create a password to complete your account setup.
            </p>

            <Input
              type="password"
              placeholder="Password"
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

            {error && <div className="add-password-error">{error}</div>}

            <Button
              type="submit"
              disabled={loading}
              fullWidth
              variant="contained"
              color="primary"
              size="large"
            >
              {loading ? 'Setting Password...' : 'Set Password'}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddPasswordPage;

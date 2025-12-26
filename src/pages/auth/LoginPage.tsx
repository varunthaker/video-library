import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { loginWithEmail } from '../../services/authService';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import './styles/LoginPage.css';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const response = await loginWithEmail(email, password);
    setLoading(false);

    if (!response.success) {
      setError(response.error?.message || 'Login failed');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <form onSubmit={handleLogin} className="login-form">
          <h2 className="login-title">Login</h2>
          
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />

          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />

          {error && <div className="login-error">{error}</div>}

          <Button
            type="submit"
            disabled={loading}
            fullWidth
            variant="contained"
            color="primary"
            size="large"
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>

          <div className="login-footer">
            <p>
              <a href="/reset-password">Forgot password?</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

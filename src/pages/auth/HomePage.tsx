import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Loader } from '../../components/ui/Loader';
import LoginPage from './LoginPage';
import { Dashboard } from '../Dashboard';
import './styles/HomePage.css';

/**
 * HomePage component that shows LoginPage when user is not authenticated
 * and Dashboard when user is authenticated
 */
const HomePage: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="home-page-loading">
        <Loader loading={true} message="Loading..." />
      </div>
    );
  }

  return user ? <Dashboard /> : <LoginPage />;
};

export default HomePage;

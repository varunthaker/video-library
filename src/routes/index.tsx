import { RouteObject } from 'react-router-dom';
import { NotFound } from '../pages/NotFound';
import LoginPage from '../pages/auth/LoginPage';
import { ThemesPage } from '../pages/ThemesPage';
import { ThemeVideos } from '../pages/ThemeVideos';
import ProtectedRoute from '../components/ProtectedRoute';

// Public routes
export const publicRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <LoginPage />,
  },
];

// Protected routes (requires authentication)
export const protectedRoutes: RouteObject[] = [
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <ThemesPage />
      </ProtectedRoute>
    ),
    index: true,
  },
  {
    path: '/themes/:id',
    element: (
      <ProtectedRoute>
        <ThemeVideos />
      </ProtectedRoute>
    ),
  },
];

// Fallback route
export const fallbackRoute: RouteObject = {
  path: '*',
  element: <NotFound />,
};

// Combined routes
export const routes: RouteObject[] = [
  ...publicRoutes,
  ...protectedRoutes,
  fallbackRoute,
];

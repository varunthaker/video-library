import { RouteObject } from 'react-router-dom';
import { NotFound } from '../pages/NotFound';
import HomePage from '../pages/auth/HomePage';
import LoginPage from '../pages/auth/LoginPage';
import { Dashboard } from '../pages/Dashboard';

// Public routes
export const publicRoutes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
    index: true,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
];

// Protected routes (for future authentication)
export const protectedRoutes: RouteObject[] = [
  {
    path: '/dashboard',
    element: <Dashboard />,
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

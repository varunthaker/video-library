import { RouteObject } from 'react-router-dom';
import { Dashboard } from '../pages/Dashboard';
import { NotFound } from '../pages/NotFound';

// Public routes
export const publicRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Dashboard />,
    index: true,
  },
];

// Protected routes (for future authentication)
export const protectedRoutes: RouteObject[] = [
  // Add authenticated routes here in the future
  // {
  //   path: '/upload',
  //   element: <UploadVideo />,
  // },
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

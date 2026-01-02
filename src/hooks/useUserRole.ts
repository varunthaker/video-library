// src/hooks/useUserRole.ts
import { useUser } from '@clerk/clerk-react';

export function useUserRole() {
  const { user, isLoaded } = useUser();
  
  // Get role from publicMetadata (this comes from the token)
  const role = (user?.publicMetadata?.role as string) || 'user';
  const isAdmin = role === 'admin';
  
  return { role, isAdmin, isLoaded };
}
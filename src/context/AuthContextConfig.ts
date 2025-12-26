import { createContext } from 'react';

/**
 * Auth context type
 */
export interface AuthContextType {
  user: any | null; // eslint-disable-line @typescript-eslint/no-explicit-any
  loading: boolean;
}

/**
 * Create Auth Context
 */
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

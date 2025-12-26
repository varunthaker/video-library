import { supabase } from './supabaseClient';

export interface AuthError {
  message: string;
  code?: string;
}

export interface AuthResponse {
  success: boolean;
  error?: AuthError;
  user?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

/**
 * Login user with email and password
 */
export const loginWithEmail = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return {
        success: false,
        error: { message: error.message, code: error.code },
      };
    }

    return { success: true, user: data.user };
  } catch (err: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
    return {
      success: false,
      error: { message: ((err as Record<string, unknown>).message as string) || 'An error occurred during login' },
    };
  }
};

/**
 * Sign up user with email and password
 */
export const signupWithEmail = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return {
        success: false,
        error: { message: error.message, code: error.code },
      };
    }

    return { success: true, user: data.user };
  } catch (err: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
    return {
      success: false,
      error: { message: ((err as Record<string, unknown>).message as string) || 'An error occurred during signup' },
    };
  }
};

/**
 * Send password reset email
 */
export const resetPassword = async (email: string): Promise<AuthResponse> => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) {
      return {
        success: false,
        error: { message: error.message, code: error.code },
      };
    }

    return { success: true };
  } catch (err: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
    return {
      success: false,
      error: {
        message: ((err as Record<string, unknown>).message as string) || 'An error occurred during password reset',
      },
    };
  }
};

/**
 * Update password
 */
export const updatePassword = async (
  newPassword: string
): Promise<AuthResponse> => {
  try {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      return {
        success: false,
        error: { message: error.message, code: error.code },
      };
    }

    return { success: true, user: data.user };
  } catch (err: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
    return {
      success: false,
      error: {
        message: ((err as Record<string, unknown>).message as string) || 'An error occurred updating password',
      },
    };
  }
};

/**
 * Logout user
 */
export const logout = async (): Promise<AuthResponse> => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return {
        success: false,
        error: { message: error.message, code: error.code },
      };
    }

    return { success: true };
  } catch (err: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
    return {
      success: false,
      error: { message: ((err as Record<string, unknown>).message as string) || 'An error occurred during logout' },
    };
  }
};

/**
 * Get current user session
 */
export const getCurrentUser = async () => {
  try {
    const { data, error } = await supabase.auth.getUser();

    if (error) {
      return null;
    }

    return data.user;
  } catch {
    return null;
  }
};

/**
 * Subscribe to auth state changes
 */
export const onAuthStateChange = (
  callback: (user: any | null) => void // eslint-disable-line @typescript-eslint/no-explicit-any
) => {
  const { data } = supabase.auth.onAuthStateChange((_event, session) => {
    callback(session?.user || null);
  });

  return data.subscription;
};

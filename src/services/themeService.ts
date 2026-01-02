import { supabase } from './supabaseClient';
import { Theme, ThemeFormData } from '../types/theme';

const THEMES_TABLE = 'themes';

/**
 * Fetch all themes from Supabase
 */
export async function getAllThemes(): Promise<Theme[]> {
  try {
    const { data, error } = await supabase
      .from(THEMES_TABLE)
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Theme[];
  } catch (error) {
    console.error('Error fetching themes:', error);
    throw error;
  }
}

/**
 * Fetch a single theme by ID
 */
export async function getThemeById(id: string): Promise<Theme | null> {
  try {
    const { data, error } = await supabase
      .from(THEMES_TABLE)
      .select('*')
      .eq('id', id)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data as Theme | null;
  } catch (error) {
    console.error('Error fetching theme:', error);
    throw error;
  }
}

/**
 * Create a new theme
 */
export async function createTheme(themeData: ThemeFormData): Promise<Theme> {
  try {
    const { data, error } = await supabase
      .from(THEMES_TABLE)
      .insert([themeData])
      .select()
      .single();

    if (error) throw error;
    return data as Theme;
  } catch (error) {
    console.error('Error creating theme:', error);
    throw error;
  }
}

/**
 * Update an existing theme
 */
export async function updateTheme(
  id: string,
  themeData: Partial<ThemeFormData>
): Promise<Theme> {
  try {
    const { data, error } = await supabase
      .from(THEMES_TABLE)
      .update(themeData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Theme;
  } catch (error) {
    console.error('Error updating theme:', error);
    throw error;
  }
}

/**
 * Delete a theme
 */
export async function deleteTheme(id: string): Promise<void> {
  try {
    const { error } = await supabase
      .from(THEMES_TABLE)
      .delete()
      .eq('id', id);

    if (error) throw error;
  } catch (error) {
    console.error('Error deleting theme:', error);
    throw error;
  }
}

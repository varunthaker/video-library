import { supabase } from './supabaseClient';
import { Video, VideoFormData } from '../types/video';

const VIDEOS_TABLE = 'videos';

/**
 * Fetch all active videos from Supabase
 */
export async function getAllVideos(): Promise<Video[]> {
  try {
    const { data, error } = await supabase
      .from(VIDEOS_TABLE)
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Video[];
  } catch (error) {
    console.error('Error fetching videos:', error);
    throw error;
  }
}

/**
 * Fetch a single video by ID
 */
export async function getVideoById(id: string): Promise<Video | null> {
  try {
    const { data, error } = await supabase
      .from(VIDEOS_TABLE)
      .select('*')
      .eq('id', id)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data as Video | null;
  } catch (error) {
    console.error('Error fetching video:', error);
    throw error;
  }
}

/**
 * Create a new video
 */
export async function createVideo(videoData: VideoFormData): Promise<Video> {
  try {
    const { data, error } = await supabase
      .from(VIDEOS_TABLE)
      .insert([videoData])
      .select()
      .single();

    if (error) throw error;
    return data as Video;
  } catch (error) {
    console.error('Error creating video:', error);
    throw error;
  }
}

/**
 * Update an existing video
 */
export async function updateVideo(
  id: string,
  videoData: Partial<VideoFormData>
): Promise<Video> {
  try {
    const { data, error } = await supabase
      .from(VIDEOS_TABLE)
      .update(videoData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Video;
  } catch (error) {
    console.error('Error updating video:', error);
    throw error;
  }
}

/**
 * Delete a video
 */
export async function deleteVideo(id: string): Promise<void> {
  try {
    const { error } = await supabase
      .from(VIDEOS_TABLE)
      .delete()
      .eq('id', id);

    if (error) throw error;
  } catch (error) {
    console.error('Error deleting video:', error);
    throw error;
  }
}

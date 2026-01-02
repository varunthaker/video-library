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
 * Create a new video
 */
export async function createVideo(videoData: VideoFormData): Promise<Video> {
  try {
    // Extract theme_ids from videoData
    const { theme_ids, ...videoWithoutThemes } = videoData;

    // Step 1: Create the video first
    const { data: createdVideo, error: videoError } = await supabase
      .from(VIDEOS_TABLE)
      .insert([videoWithoutThemes])
      .select()
      .single();

    if (videoError) throw videoError;
    if (!createdVideo) throw new Error('Failed to create video');

    // Step 2: If theme_ids are provided, create theme_video relationships
    if (theme_ids && theme_ids.length > 0) {
      const themeVideoRecords = theme_ids.map(theme_id => ({
        theme_id,
        video_id: createdVideo.id,
      }));

      const { error: themeError } = await supabase
        .from('theme_videos')
        .insert(themeVideoRecords);

      if (themeError) {
        // Log error but don't fail - video was created successfully
        console.error('Error linking themes to video:', themeError);
      }
    }

    return createdVideo as Video;
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

/**
 * Fetch all videos for a specific theme
 */
export async function getVideosByTheme(themeId: string): Promise<Video[]> {
  try {
    const { data, error } = await supabase
      .from('theme_videos')
      .select(`
        id,
        theme_id,
        video_id,
        created_at,
        videos (*)
      `)
      .eq('theme_id', themeId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    
    // Map the response to extract video data
    return data?.map((item: any) => item.videos) as Video[];
  } catch (error) {
    console.error('Error fetching videos for theme:', error);
    throw error;
  }
}

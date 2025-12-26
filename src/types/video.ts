export interface Video {
  id: string;
  title: string;
  description: string;
  youtube_video_id: string;
  is_active: boolean;
  created_at: string;
}

export interface VideoFormData {
  title: string;
  description: string;
  youtube_video_id: string;
  is_active: boolean;
}

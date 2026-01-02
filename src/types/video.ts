export interface Video {
  id: string;
  title: string;
  youtube_video_id: string;
  created_at: string;
  created_by: string;
}

export interface VideoFormData {
  title: string;
  youtube_video_id: string;
  created_by: string;
}

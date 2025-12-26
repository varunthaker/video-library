import { useState, useEffect } from 'react';
import { Video } from '../types/video';
import { getAllVideos } from '../services/videoService';

export interface UseVideosReturn {
  videos: Video[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

/**
 * Custom hook to fetch and manage videos
 */
export function useVideos(): UseVideosReturn {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllVideos();
      setVideos(data);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setError(error);
      console.error('Failed to fetch videos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const refetch = async () => {
    await fetchVideos();
  };

  return {
    videos,
    loading,
    error,
    refetch,
  };
}

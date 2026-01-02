/**
 * Extract YouTube video ID from various URL formats
 * Supports: youtube.com/watch?v=ID, youtu.be/ID, youtube-nocookie.com/embed/ID
 */
export function extractYouTubeId(url: string): string | null {
  if (!url) return null;

  // If it's just an ID, return it
  if (!/[/:]/.test(url)) {
    return url;
  }

  // youtube.com/watch?v=ID
  const youtubeMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube-nocookie\.com\/embed\/)([^&/?#]+)/);
  if (youtubeMatch) {
    return youtubeMatch[1];
  }

  // youtube.com/embed/ID
  const embedMatch = url.match(/youtube\.com\/embed\/([^?&#]+)/);
  if (embedMatch) {
    return embedMatch[1];
  }

  return null;
}

/**
 * Generate YouTube nocookie embed URL from video ID with restricted controls
 * - autoplay=1: Auto-play when modal opens
 * - muted=1: Required for auto-play without user interaction
 * - controls=0: Hide YouTube controls (we use custom controls)
 * - rel=0: No related videos
 * - modestbranding=1: Minimal YouTube branding
 * - fs=1: Enable fullscreen via API
 * - disablekb=1: Disable keyboard controls
 */
export function getYouTubeEmbedUrl(videoId: string): string {
  return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&muted=1&controls=0&rel=0&modestbranding=1&fs=1&disablekb=1`;
}

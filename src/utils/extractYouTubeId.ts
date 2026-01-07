/**
 * Extract YouTube video ID from various URL formats
 * Supports: youtube.com/watch?v=ID, youtu.be/ID, youtube-nocookie.com/embed/ID, youtube.com/live/ID
 */
export function extractYouTubeId(url: string): string | null {
  if (!url) return null;

  // If it's just an ID, return it
  if (!/[/:]/.test(url)) {
    return url;
  }

  // Array of allowed URL patterns
  const patterns = [
    /youtube\.com\/watch\?v=([^&/?#]+)/,
    /youtu\.be\/([^/?#]+)/,
    /youtube(?:-nocookie)?\.com\/embed\/([^?&#]+)/,
    /youtube\.com\/live\/([^/?#]+)/
  ];

  // Check each pattern
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return match[1];
    }
  }

  return null;
}


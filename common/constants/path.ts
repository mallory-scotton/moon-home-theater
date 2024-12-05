// Local Appdata path to save the application
export const APPDATA =
  process.env.LOCALAPPDATA ||
  (process.platform === 'darwin' ? process.env.HOME + '/Library/Preferences' : process.env.HOME + '/.local/share');

// Export allowed file extensions
export const VIDEO_EXTENSIONS = ['.mp4', '.avi', '.mkv'];
export const AUDIO_EXTENSIONS = ['.mp3', '.ogg', '.wav'];
export const SUBTITLE_EXTENSIONS = ['.srt'];
export const IMAGE_EXTENSIONS = ['.png', '.gif', '.jpg', 'jpeg', 'svg'];

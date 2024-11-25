// Local Appdata path to save the application
export const APPDATA =
  process.env.LOCALAPPDATA ||
  (process.platform === 'darwin' ? process.env.HOME + '/Library/Preferences' : process.env.HOME + '/.local/share');

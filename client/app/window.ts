// Dependencies
import { BrowserWindow } from 'electron';
import path from 'path';
import { productName } from '../../package.json';
import { IS_DEBUG } from './utils';

// Icon
import icon from '../assets/icons/favicon.ico';

// Prepare a window variable to keep track of the window
let window: BrowserWindow | null = null;

// Get webpack entry
declare const MOON_WEBPACK_ENTRY: string;
declare const MOON_PRELOAD_WEBPACK_ENTRY: string;

/**
 * Create the main electron windows
 */
export const createWindow = () => {
  // Show the window instead of creating a new window
  if (window !== null) {
    window.show();
    return;
  }

  // Create the new window
  window = new BrowserWindow({
    title: productName,
    minWidth: 960,
    minHeight: 540,
    webPreferences: {
      preload: MOON_PRELOAD_WEBPACK_ENTRY,
      devTools: IS_DEBUG
    },
    icon: path.join(__dirname, icon)
  });

  // If the app is running in debug mode
  if (IS_DEBUG) {
    window.webContents.openDevTools();
  }

  // Prevent closing by hiding the window
  window.on('close', (evt) => {
    evt.preventDefault();
    window.hide();
  });

  // Load the webpack entry in the window
  window.loadURL(MOON_WEBPACK_ENTRY);
};

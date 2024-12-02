/** Dependencies */
import { BrowserWindow, app } from 'electron';
import { createWindow } from './app/window';
import { createTray } from './app/tray';
import dotenv from 'dotenv';

// Query the configuration .env
dotenv.config();

// If the electron squirrel startup is required, quit
if (require('electron-squirrel-startup')) {
  app.quit();
}

/**
 * On application ready, create the tray and the window
 */
const onReady = () => {
  // Create the tray icon
  createTray();

  // Check if the opening of the windows is enable
  if (process.env.OPEN_CLIENT_ON_START !== 'false') {
    createWindow();
  }
}

// Add the listener on ready
app.on('ready', onReady);

// On macOS, it's common for applications to stay open until the user quits explicitly
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Prevent non opening windows on activation
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

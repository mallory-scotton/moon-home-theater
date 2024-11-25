/** Dependencies */
import { BrowserWindow, app } from 'electron';
import { productName } from '../package.json';

const isDebug = (): boolean => process.env.npm_lifecycle_event === 'start';

declare const MOON_WEBPACK_ENTRY: string;
declare const MOON_PRELOAD_WEBPACK_ENTRY: string;

console.log('Application is running with', MOON_WEBPACK_ENTRY);

if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = (): void => {
  const window = new BrowserWindow({
    title: `${productName} ${app.getVersion()}`,
    minWidth: 1080,
    minHeight: 720,
    webPreferences: {
      preload: MOON_PRELOAD_WEBPACK_ENTRY
    }
  });

  if (isDebug()) {
    window.webContents.openDevTools();
  }

  window.loadURL(MOON_WEBPACK_ENTRY);
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

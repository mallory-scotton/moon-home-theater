/** Dependencies */
import { BrowserWindow, app, Tray, Menu } from 'electron';
import { productName } from '../package.json';
import path from 'path';

import icon from './assets/icons/favicon.ico';

const isDebug = (): boolean => process.env.npm_lifecycle_event === 'start';

declare const MOON_WEBPACK_ENTRY: string;
declare const MOON_PRELOAD_WEBPACK_ENTRY: string;

// Setup the tray menu
let tray: Tray | null = null;

if (require('electron-squirrel-startup')) {
  app.quit();
}

const createTray = () => {
  tray = new Tray(path.join(__dirname, icon));

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Show App',
      click: () => {}
    },
    {
      type: 'separator'
    },
    {
      label: 'Quit',
      click: () => {}
    }
  ]);

  tray.setToolTip('Moon Home Theater');
  tray.setContextMenu(contextMenu);

  tray.on('click', () => {});
};

const createWindow = (): void => {
  createTray();

  const window = new BrowserWindow({
    title: `${productName} ${app.getVersion()}`,
    minWidth: 1080,
    minHeight: 720,
    webPreferences: {
      preload: MOON_PRELOAD_WEBPACK_ENTRY
    },
    icon: path.join(__dirname, icon)
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

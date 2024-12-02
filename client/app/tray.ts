// Dependencies
import { Tray, Menu, app } from 'electron';
import path from 'path';
import { productName } from '../../package.json';
import { createWindow } from './window';

// Icon
import icon from '../assets/icons/favicon.ico';

// Prepare a window variable to keep track of the window
let tray: Tray | null = null;

/**
 * Create the menu for the tray
 * @returns The created menu
 */
const createMenu = (): Menu => {
  return Menu.buildFromTemplate([
    {
      type: 'normal',
      label: 'Open Moon Home Theater...',
      click: createWindow
    },
    {
      type: 'separator'
    },
    {
      type: 'checkbox',
      checked: true,
      label: 'Open Moon Home Theater at Login'
    },
    {
      type: 'separator'
    },
    {
      type: 'normal',
      label: 'Update Libraries'
    },
    {
      type: 'normal',
      enabled: false,
      label: 'Cancel Library Update'
    },
    {
      type: 'separator'
    },
    {
      type: 'normal',
      label: 'Check for Updates'
    },
    {
      type: 'normal',
      label: 'About Moon Home Theater'
    },
    {
      type: 'separator'
    },
    {
      type: 'normal',
      label: 'Exit',
      click: () => {
        process.exit(0);
      }
    }
  ]);
};

/**
 * Create the tray icon for the app
 */
export const createTray = () => {
  // Create the new tray
  tray = new Tray(path.join(__dirname, icon));

  // Add the context menu and the tooltip
  tray.setContextMenu(createMenu());
  tray.setToolTip(productName);

  // Add an event on double click to open the windows
  tray.on('double-click', createWindow);
};

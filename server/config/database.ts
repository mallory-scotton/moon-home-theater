// Dependencies
import { Sequelize } from 'sequelize-typescript';
import { SyncOptions } from 'sequelize';
import { join } from 'path';
import { APPDATA } from '../../common/constants/path';
import { mkdirSync } from 'fs';

// Models
import { Directory } from '../models/directory.model';

// Constant for the moon database
export const DATABASE_PATH = join(APPDATA, 'Moon Home Theater', 'Databases');

// Build the database
export const database = new Sequelize({
  dialect: 'sqlite',
  database: 'moon.library',
  logging: false,
  storage: join(DATABASE_PATH, 'moon.library.db'),
  models: [Directory]
});

/**
 * Utility function to synchronise the database
 * @param options The sync options of the database
 */
export const synchronise = (options?: SyncOptions): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      // Verify the database folder exists
      mkdirSync(DATABASE_PATH, { recursive: true });
    } catch (error) {
      // Catch potential error when creating the folders
      reject(error);
    }

    // Synchronise the database
    database
      .sync(options)
      .then(() => resolve)
      .catch(reject);
  });
};

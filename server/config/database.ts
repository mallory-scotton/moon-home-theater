// Dependencies
import { Sequelize } from 'sequelize-typescript';
import { SyncOptions } from 'sequelize';
import { join } from 'path';
import { mkdirSync } from 'fs';
import { logger } from '../../common/utils/logger';
import { MOON_BASE_PATH } from '.';

// Models
import {
  Directory,
  Account,
  LibrarySection,
  LibrarySectionPermission,
  SectionLocation,
  Preference,
  StatisticsBandwidth,
  StatisticsResouces,
  MediaStream,
  MediaPart,
  MediaItem,
  MetadataItem
} from '../models';

// Constant for the moon database
export const DATABASE_PATH = join(MOON_BASE_PATH, 'Databases');

// Build the database
export const database = new Sequelize({
  dialect: 'sqlite',
  database: 'moon.library',
  logging: false,
  storage: join(DATABASE_PATH, 'moon.library.db'),
  models: [
    Directory,
    Account,
    LibrarySection,
    LibrarySectionPermission,
    SectionLocation,
    Preference,
    StatisticsBandwidth,
    StatisticsResouces,
    MediaStream,
    MediaPart,
    MediaItem,
    MetadataItem
  ]
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
      logger.verbose('Appdata path has been verified');
    } catch (error) {
      // Catch potential error when creating the folders
      reject(error);
    }

    // Log a start of the database synchronisation
    logger.verbose('Database synchronisation started...');

    // Synchronise the database
    database
      .sync(options)
      .then(() => {
        logger.info('Database synched');
        resolve();
      })
      .catch(reject);
  });
};

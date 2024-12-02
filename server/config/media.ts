// Dependencies
import fs from 'fs';
import path from 'path';
import { logger } from '../../common/utils/logger';
import { MOON_BASE_PATH } from '.';

// Media path
export const MEDIA_PATH = path.join(MOON_BASE_PATH, 'Media');

// Verify media path
try {
  fs.mkdirSync(MEDIA_PATH, { recursive: true });
  logger.verbose('Media path checked!');
} catch (error) {
  logger.error('Error detected with the media path');
  process.exit(1);
}

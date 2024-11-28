// Dependencies
import fs from 'fs';
import path from 'path';
import { APPDATA } from '../../common/constants/path';
import { logger } from '../../common/utils/logger';

// Media path
export const MEDIA_PATH = path.join(APPDATA, 'Moon Home Theater', 'Media');

// Verify media path
try {
  fs.mkdirSync(MEDIA_PATH, { recursive: true });
  logger.debug('Media path checked!');
} catch (error) {
  logger.error('Error detected with the media path');
  process.exit(1);
}

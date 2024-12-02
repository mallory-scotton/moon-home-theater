// Dependencies
import dotenv from 'dotenv';
import { APPDATA } from '../../common/constants/path';
import path from 'path';

// Query the environnement configuration
dotenv.config();

// Export configuration
export const PORT = process.env.PORT || 45455;
export const MOON_BASE_PATH = path.join(APPDATA, 'Moon Home Theater');

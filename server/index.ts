// Dependencies
// import '../client';
import { logger } from '../common/utils/logger';
import { synchronise } from './config/database';
import { listen } from './server';

// Synchronise the databse and run the server
synchronise().then(listen).catch(logger.error);

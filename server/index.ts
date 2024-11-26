// Dependencies
// import '../client';
import { synchronise } from './config/database';
import { listen } from './server';

// Synchronise the databse and run the server
synchronise().then(listen).catch(console.error);

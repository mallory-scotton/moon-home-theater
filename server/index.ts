// Dependencies
// import '../client';
import { synchronise } from './config/database';
import { listen } from './server';

synchronise().then(listen).catch(console.error);

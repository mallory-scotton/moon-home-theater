// Dependencies
import express from 'express';
import { PORT } from './config';

// Import middlewares
import compression from 'compression';

// Import main router
import mainRouter from './routes';

// Create the express instance
const app = express();

// Use middlewares
app.use(compression());

// Use routers
app.use('/', mainRouter);

/**
 * Start the HTTP server on the defined PORT
 * @returns Nothing
 */
export const listen = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      app.listen(PORT, () => {
        console.log(`HTTP Server is listening on, http://localhost:${PORT}`);
        resolve();
      });
    } catch (error) {
      reject(error);
    }
  });
};

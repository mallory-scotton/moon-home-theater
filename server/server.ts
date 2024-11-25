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

// listen to the port
app.listen(PORT, () => {
  console.log(`HTTP Server is listening on, http://localhost:${PORT}`);
});

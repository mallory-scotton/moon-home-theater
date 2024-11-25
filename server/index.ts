// Dependencies
// import '../client';

import express from 'express';
import { PORT } from './config';

import avatarsRouter from './routes/avatars';

const app = express();

app.use('/avatars', avatarsRouter);

app.listen(PORT, () => {
  console.log(`HTTP Server is listening on, http://localhost:${PORT}`);
});

// Dependencies
import { Router } from 'express';

// Import routers
import avatarRouter from '@/routes/avatars.routes';
import photoRouter from '@/routes/photo.routes';
import transcodeRouter from '@/routes/transcode.routes';
import statisticRouter from '@/routes/statistics.routes';
import updaterRouter from '@/routes/updater.routes';
import butlerRouter from '@/routes/butler.routes';
import browseRouter from '@/routes/browse.routes';
import libraryRouter from '@/routes/library.routes';

// Create main express router
const mainRouter = Router();

// Use the routers
mainRouter.use('/avatar', avatarRouter);
mainRouter.use('/photo', photoRouter);
mainRouter.use('/transocde', transcodeRouter);
mainRouter.use('/statistics', statisticRouter);
mainRouter.use('/updater', updaterRouter);
mainRouter.use('/butler', butlerRouter);
mainRouter.use('/browse', browseRouter);
mainRouter.use('/library', libraryRouter);

// Export the main router
export default mainRouter;

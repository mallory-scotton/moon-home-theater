// Dependencies
import { Router } from 'express';

// Import routers
import avatarRouter from '@/routes/avatars.routes';
import photoRouter from '@/routes/photo.routes';
import transcodeRouter from '@/routes/transcode.routes';
import statisticRouter from '@/routes/statistics.routes';

// Create main express router
const mainRouter = Router();

// Use the routers
mainRouter.use('/avatar', avatarRouter);
mainRouter.use('/photo', photoRouter);
mainRouter.use('/transocde', transcodeRouter);
mainRouter.use('/statistics', statisticRouter);

// Export the main router
export default mainRouter;

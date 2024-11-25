// Dependencies
import { Router } from 'express';

// Import routers
import avatarRouter from '@/routes/avatars.routes';
import photoRouter from '@/routes/photo.routes';

// Create main express router
const mainRouter = Router();

// Use the routers
mainRouter.use('/avatar', avatarRouter);
mainRouter.use('/photo', photoRouter);

// Export the main router
export default mainRouter;

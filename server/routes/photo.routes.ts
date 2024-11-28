// Dependencies
import { Router } from 'express';
import { photoController } from '@/controllers/photo.controller';
import { validator } from '@/middlewares/validator.middleware';
import { photoSchema } from '../validators/photo.validator';

// Create the router
const router = Router();

// Route to transcode a photo
router.get('/:/transcode', validator.query(photoSchema), photoController);

// Export the router
export default router;

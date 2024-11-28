// Dependencies
import { Router } from 'express';
import { avatarController } from '../controllers/avatar.controller';
import { validator } from '@/middlewares/validator.middleware';
import { avatarSchema } from '../validators/avatar.validator';

// Create the router
const router = Router();

// Generate an avatar based on a color, text and size.
router.get('/:color/:text/:size', validator.params(avatarSchema), avatarController);

// Export the router
export default router;

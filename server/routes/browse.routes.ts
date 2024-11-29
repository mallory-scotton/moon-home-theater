// Dependencies
import { Router } from 'express';
import { validator } from '@/middlewares/validator.middleware';
import { browseSchema } from '@/validators/browse.validator';
import { browseHomeController, browsePathController } from '@/controllers/browse.controller';

// Create the router
const router = Router();

// Get the list of disk and home path
router.get('/', browseHomeController);

// Get the list of files and path in a path
router.get('/:guid', validator.query(browseSchema), browsePathController);

// Export the router
export default router;

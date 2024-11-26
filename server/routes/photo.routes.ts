// Dependencies
import joi from 'joi';
import { Router } from 'express';
import { photoController } from '@/controllers/photo.controller';
import { validator } from '@/middlewares/validator.middleware';

// Create the router
const router = Router();

// Create validator schema
const photoSchema = joi.object({
  width: joi.number().required().integer().min(0),
  height: joi.number().required().integer().min(0),
  opacity: joi.number().optional().integer().default(100).min(0).max(100),
  minSize: joi.boolean().optional().default(false),
  upscale: joi.boolean().optional().default(false),
  url: joi.string().required()
});

// Route to transcode a photo
router.get('/:/transcode', validator.query(photoSchema), photoController);

// Export the router
export default router;

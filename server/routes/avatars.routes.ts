// Dependencies
import joi from 'joi';
import { Router } from 'express';
import { avatarController } from '../controllers/avatar.controller';
import { validator } from '@/middlewares/validator.middleware';

// Create the router
const router = Router();

// Create a validator schema
const avatarSchema = joi.object({
  color: joi
    .string()
    .required()
    .pattern(/^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/)
    .messages({
      'string.base': 'Invalid color format. Please use a valid HEX color (e.g., 088DD2).',
      'string.pattern.base': 'Invalid color format. Please use a valid HEX color (e.g., 088DD2).'
    }),
  text: joi.string().required(),
  size: joi
    .number()
    .integer()
    .messages({
      'number.base': 'Invalid size. Size must be a number between 16 and 1024.',
      'number.integer': 'Invalid size. Size must be a number between 16 and 1024.'
    })
});

// Generate an avatar based on a color, text and size.
router.get('/:color/:text/:size', validator.params(avatarSchema), avatarController);

// Export the router
export default router;

// Dependencies
import joi from 'joi';

// Create validator schema
export const photoSchema = joi.object({
  width: joi.number().required().integer().min(0).max(8192),
  height: joi.number().required().integer().min(0).max(8192),
  opacity: joi.number().optional().integer().default(100).min(0).max(100),
  fit: joi.string().valid('inside', 'cover', 'fill').optional().default('cover'),
  blur: joi.number().optional().min(0).max(100).default(0),
  url: joi.string().required()
});

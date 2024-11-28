// Dependencies
import joi from 'joi';

// Create a validator schema
export const avatarSchema = joi.object({
  color: joi
    .string()
    .required()
    .pattern(/^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/)
    .messages({
      'string.base': 'Invalid color format. Please use a valid HEX color (e.g., 088DD2).',
      'string.pattern.base': 'Invalid color format. Please use a valid HEX color (e.g., 088DD2).'
    }),
  text: joi.string().required(),
  size: joi.number().integer().messages({
    'number.base': 'Invalid size. Size must be a number between 16 and 1024.',
    'number.integer': 'Invalid size. Size must be a number between 16 and 1024.'
  })
});

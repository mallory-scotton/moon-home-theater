// Dependencies
import joi from 'joi';

// Create a validator schema
export const browseSchema = joi.object({
  includeFiles: joi.boolean().optional().default(true)
});

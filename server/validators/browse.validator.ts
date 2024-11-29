// Dependencies
import joi from 'joi';

// Create a validator schema
export const browseSchema = joi.object({
  include_files: joi.boolean().optional().default(true)
});

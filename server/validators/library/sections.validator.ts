// Dependencies
import joi from 'joi';

// Validation schema: Getting all library sections
const getAllSectionsSchema = joi.object({
  page: joi.number().optional().min(1).max(500).default(1)
});

// Forward the schemas
export default {
  getAllSectionsSchema
};

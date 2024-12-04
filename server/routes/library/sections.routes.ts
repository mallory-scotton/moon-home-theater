// Dependencies
import { Router } from 'express';
import Schemas from '@/validators/library/sections.validator';
import { validator } from '@/middlewares/validator.middleware';
import Controller from '@/controllers/library/sections.controller';

// Create a new express router
const router = Router();

// Get all libraries
router.get('/', validator.query(Schemas.getAllSectionsSchema), Controller.getAllSections);

// Create a library
router.post('/', Controller.createSection);

// Update a library
router.put('/:sectionId', Controller.updateSection);

// Delete a library
router.delete('/:sectionId', Controller.deleteSection);

// Refresh the library
router.get('/:sectionId/refresh', Controller.refreshSection);

// Search in the library
router.get('/:sectionId/search', Controller.searchInSection);

// Get newest items
router.get('/:sectionId/newest', Controller.getNewestItemsInSection);

// Get recently added items
router.get('/:sectionId/recentlyAdded', Controller.getRecentlyAddedItemsInSection);

// Get recently viewed items
router.get('/:sectionId/recentlyViewed', Controller.getRecentlyViewedInSection);

// Get library items
router.get('/:sectionId/:tag', Controller.getItemsByTagInSection);

// Export the router
export default router;

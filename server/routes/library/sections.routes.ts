// Dependencies
import { Router } from 'express';

// Create a new express router
const router = Router();

// Get all libraries
router.get('/');

// Create a library
router.post('/');

// Update a library
router.put('/:sectionId');

// Delete a library
router.delete('/:sectionId');

// Refresh the library
router.get('/:sectionId/refresh');

// Search in the library
router.get('/:sectionId/search');

// Get newest items
router.get('/:sectionId/newest');

// Get recently added items
router.get('/:sectionId/recentlyAdded');

// Get recently viewed items
router.get('/:sectionId/recentlyViewed');

// Get library items
router.get('/:sectionId/:tag');

// Export the router
export default router;

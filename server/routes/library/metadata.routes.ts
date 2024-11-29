// Dependencies
import { Router } from 'express';

// Create a new express router
const router = Router();

// Get an item
router.get('/:metadataId');

// Update an item
router.put('/:metadataId');

// Delete an item
router.delete('/:metadataId');

// Get the thumb of a metadata item
router.get('/:metadataId/thumb');

// Get the poster of a metadata item
router.get('/:metadataId/poster');

// Get the banner of a metadata item
router.get('/:metadataId/banner');

// Get the music of a metadata item
router.get('/:metadataId/music');

// Get the background of a metadata item
router.get('/:metadataId/background');

// Export the router
export default router;

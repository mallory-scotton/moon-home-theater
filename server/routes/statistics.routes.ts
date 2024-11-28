// Dependencies
import { Router } from 'express';
import { getResourcesStatistics } from '@/controllers/statistics.controller';

// Create a new express router
const router = Router();

// Get media statistics
router.get('/media');

// Get resources statistics
router.get('/resources', getResourcesStatistics);

// Get bandwidth statistics
router.get('/bandwidth');

// Export the router
export default router;

// Dependencies
import { Router } from 'express';

// Create a new express router
const router = Router();

// Get media statistics
router.get('/media');

// Get resources statistics
router.get('/resources');

// Get bandwidth statistics
router.get('/bandwidth');

// Export the router
export default router;

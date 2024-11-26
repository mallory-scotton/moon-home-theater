// Dependencies
import { Router } from 'express';

// Create a new express router
const router = Router();

// Querying status of updates
router.get('/status');

// Checking for updates
router.put('/check');

// Apply updates
router.put('/apply');

// Export the router
export default router;

// Dependencies
import { Router } from 'express';

// Create a new express router
const router = Router();

// Get list of butler taks
router.get('/');

// Start all butler tasks
router.post('/');

// Stop all butler tasks
router.delete('/');

// Start a single butler task
router.post('/:taskName');

// Stop a single butler task
router.delete('/:taskName');

// Export the router
export default router;

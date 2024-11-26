// Dependencies
import { Router } from 'express';

// Create a new express router
const router = Router();

// Get a list of transcode sessions
router.get('/sessions');

// Get a transcode session
router.get('/sessions/:sessionKey');

// Create a transcode session
router.post('/sessions');

// Stop a trancode session
router.delete('/sessions/:sessionKey');

// Get a file from the transcode sessions
router.get('/sessions/:sessionKey/:file');

// Export the router
export default router;

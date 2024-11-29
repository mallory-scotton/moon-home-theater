// Dependencies
import { Router } from 'express';
import sectionsRouter from './library/sections.routes';
import metadataRouter from './library/metadata.routes';

// Create a new express router
const router = Router();

// Use sub routers for the sections
router.use('/sections', sectionsRouter);

// Use sub routers for the metadata
router.get('/metadata', metadataRouter);

// Export the router
export default router;

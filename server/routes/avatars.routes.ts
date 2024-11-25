// Dependencies
import { Router } from 'express';
import { generateAvatar } from '../services/avatars';
import { avatarValidator } from '../validators/avatars';

// Create the router
const router = Router();

// Generate an avatar based on a color, text and size.
router.get('/:color/:text/:size', avatarValidator, (req, res): any => {
  // Spread the parameters
  const { color, text, size } = req.params;

  // Parse the size to int
  const parsedSize = parseInt(size);

  // Try generating the image
  try {
    const stream = generateAvatar(color, text, parsedSize);
    // Return the image
    res.setHeader('Content-Type', 'image/png');
    stream.pipe(res);
  } catch (error) {
    res.status(500).json({ status: 'error', status_message: 'Failed to generate avatar.' });
  }
});

// Export the router
export default router;

// Dependencies
import { RequestHandler } from 'express';
import { isHexColor } from 'validator';

/**
 * Validation of the parameters for avatar creation
 * @param req The HTTP request
 * @param res The HTTP response
 * @param next Next callback
 */
export const avatarValidator: RequestHandler = (req, res, next): any => {
  const { color, text, size } = req.params;

  // Validate the color
  if (!isHexColor(color)) {
    return res
      .status(400)
      .json({ status: 'error', status_message: 'Invalid color format. Please use a valid HEX color (e.g., 088DD2).' });
  }

  // Validate the size
  let parsedSize = parseInt(size);
  if (isNaN(parsedSize)) {
    return res
      .status(400)
      .json({ status: 'error', status_message: 'Invalid size. Size must be a number between 16 and 1024.' });
  }

  next();
};

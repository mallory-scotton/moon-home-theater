// Dependencies
import { RequestHandler } from 'express';
import sharp from 'sharp';
import { MEDIA_PATH } from '../config/media';
import fs from 'fs/promises';
import path from 'path';
import { logger } from '../../common/utils/logger';

/**
 * Handle a photo transcode request
 * @param req The HTTP request
 * @param res The HTTP response
 */
export const photoController: RequestHandler = async (req, res): Promise<void> => {
  try {
    // Split the arguments
    let { width, height, opacity, fit, blur, url } = req.value;

    // Convert the url into a file path
    const filepath: string = path.join(MEDIA_PATH, url as string);

    // Check if the file exists
    try {
      await fs.access(filepath);
    } catch (error) {
      res.status(404).json({ status: 'error', status_message: 'Media not found in Moon assets.' });
      return;
    }

    // Read the image file
    const buffer = await fs.readFile(filepath);

    // Convert the image buffer using sharp
    let image = sharp(buffer);

    // Resize the image based on the width/height and method
    image = image.resize(width, height, { fit: fit, withoutEnlargement: fit === 'cover' ? true : undefined });

    // Apply blur if specified
    if (blur > 0) {
      image = image.blur(blur);
    }

    // Apply the opacity if specified
    if (opacity < 100) {
      image = image.removeAlpha().ensureAlpha(opacity / 100);
    }

    // Send the transformed image
    res.header('Content-Type', 'image/png');
    res.header('Content-Length');
    res.end(await image.toFormat('png').toBuffer());
  } catch (error) {
    logger.error('Error processing image:', error);
    res.status(500).json({ status: 'error', status_message: 'Failed to process the image' });
  }
};

// Dependencies
import { PNGStream, createCanvas } from 'canvas';
import { clamp } from '../../../common/utils/math';

/**
 * Generate an avatar based on a color and a text
 * @param color The color of the avatar in HEX
 * @param text The text of the avatar
 * @param size The size of the avatar in pixel
 * @returns A png stream of the avatar
 */
export const generateAvatar = (color: string, text: string, size: number): PNGStream => {
  // Clamp size between allowed range
  size = clamp(size, 16, 1024);

  // Create a canvas
  const canvas = createCanvas(size, size);
  const context = canvas.getContext('2d');

  // Set background color
  context.fillStyle = `#${color}`;
  context.fillRect(0, 0, size, size);

  // Set text style
  context.font = `${size * 0.4}px Arial`;
  context.fillStyle = '#FFFFFF';
  context.textAlign = 'center';
  context.textBaseline = 'middle';

  // Draw the text in the center
  context.fillText(text.substring(0, 2).toUpperCase(), size / 2, size / 2);

  return canvas.createPNGStream();
};

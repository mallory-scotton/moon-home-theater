// Dependencies
import { MediaPart, MediaItem, MediaStream } from '../../../models';
import { statSync } from 'fs';

/**
 * Get the need update status of a file
 * @param filepath The path of the file to check
 * @param force Force option to force the update of the file
 * @returns True if the update is needed, false otherwise
 */
export const updateCheck = async (filepath: string, force: boolean = false): Promise<boolean> => {
  // Trying to find the mediaPart of the file
  const part = await MediaPart.findOne({ where: { file: filepath } });

  // If the part cannot be found, update is needed
  if (!part) {
    return true;
  }

  // Get the last update time for the database and the file
  const lastDbUpdate = new Date(part.updatedAt || part.createdAt);
  const lastFileUpdate = statSync(filepath).mtime;

  // If the file hasn't been update since the previous scan and the force option is not activated
  // no update needed
  if (lastDbUpdate > lastFileUpdate && !force) {
    return false;
  }

  // Destroy database entry
  await MediaStream.destroy({ where: { mediaPartId: part.id } });
  await MediaItem.destroy({ where: { id: part.mediaItemId } });
  await MediaPart.destroy({ where: { id: part.id } });

  // Return the need update
  return true;
};

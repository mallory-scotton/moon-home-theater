// Dependencies
import fs from 'fs';
import cp from 'child_process';
import os from 'os';
import path from 'path';
import { logger } from '../../../common/utils/logger';
import { promisify } from 'util';

// Retreive os platform
const PLATFORM = os.platform();

// Promisify exec function
const execAsync = promisify(cp.exec);

/**
 * Get the lists of logical mounted disks on the system
 * @returns The list of disks
 */
export const getDisks = async (): Promise<string[]> => {
  const disks: string[] = [];

  try {
    if (PLATFORM === 'win32') {
      // Windows: Use WMIC to get the logical disks
      const { stdout } = await execAsync('wmic logicaldisk get name');
      const lines = stdout.split('\n').filter((l) => l.trim() !== '' && l.includes(':'));

      for (const line of lines) {
        const drive = line.trim();

        if (drive) {
          disks.push(drive);
        }
      }
    } else {
      // Unix/Linux: Use df to get mounted filesystems
      const { stdout } = await execAsync('df -h --ouput=target');
      const lines = stdout.split('\n').filter((line) => line.trim() !== '');

      for (const line of lines) {
        const mountPoint = line.trim();

        if (mountPoint && mountPoint !== 'Filesystem') {
          disks.push(mountPoint);
        }
      }
    }
  } catch (error) {
    logger.error('Error retrieving disks:', error);
  }

  return disks;
};

// Interface for path content
interface PathContent {
  paths: {
    key: string;
    path: string;
    title: string;
  }[];
  files: {
    key: string;
    path: string;
    title: string;
  }[];
}

/**
 * Get the content of a directory
 * @param dirPath The path to the directory to check
 * @returns The content of the directory
 */
export const getDirContent = (dirPath: string): Promise<PathContent> => {
  return new Promise((resolve, reject) => {
    try {
      // Prepare a list of paths
      let result: PathContent = { paths: [], files: [] };

      // Get the content of the directory
      const content = fs.readdirSync(dirPath);

      // Loop through each file of the folder
      for (const filepath of content) {
        // Get the absolute path
        const joined = path.join(dirPath, filepath);

        try {
          const stat = fs.statSync(joined);
          const object = {
            key: `/browse/${Buffer.from(joined, 'utf-8').toString('base64')}`,
            title: filepath,
            path: joined
          };

          // Push the object inside the correct array
          if (stat.isDirectory()) {
            result.paths.push(object);
          } else {
            result.files.push(object);
          }
        } catch {}
      }

      // Resolve the promise
      resolve(result);
    } catch (error) {
      logger.error('Error while getting directory content:', error);
      reject();
    }
  });
};

export const getFiles = (
  dirPath: string,
  options: { extensions?: string[]; recursive?: boolean; root?: string } = {}
): string[] => {
  // Prepare a array of string to get the result
  let results: string[] = [];

  // Set the root path to the dir path
  if (!options.root) {
    options.root = dirPath;
  }

  // Query the item in the dir path
  const items = fs.readdirSync(dirPath);

  // Loop through each items
  for (const item of items) {
    // Get the full and relative path
    const fullPath = path.join(dirPath, item);
    const relativePath = path.relative(options.root, fullPath);

    // If the item is a directory
    if (fs.statSync(fullPath).isDirectory()) {
      // And the recurvisity is activated
      if (options.recursive) {
        // Check in the subfolders
        results = results.concat(getFiles(fullPath, options));
      }

      // Skip the next part
      continue;
    }

    // Get the extension of the file
    const ext = path.extname(fullPath).toLowerCase();

    // If the extensions filter is activated and the extension is not in the filter list
    if (options.extensions && !options.extensions.includes(ext)) {
      continue;
    }

    // Otherwise add the relative file path to the results
    results.push(relativePath);
  }

  // Return the results
  return results;
};

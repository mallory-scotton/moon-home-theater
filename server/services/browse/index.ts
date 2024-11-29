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

// Dependencies
import { RequestHandler } from 'express';
import crypto from 'crypto';
import path from 'path';
import fs from 'fs';
import { logger } from '../../common/utils/logger';
import { getDisks, getDirContent } from '@/services/browse';

// Browse to get the home directories and disks
export const browseHomeController: RequestHandler = async (req, res) => {
  try {
    // Get disks and generate map with resolved path and hash
    const disks = await getDisks();
    const paths = disks.map((disk) => {
      const resolved = disk + '\\';
      return {
        title: disk,
        path: resolved,
        key: `/browse/${Buffer.from(resolved, 'utf-8').toString('base64')}`
      };
    });

    // Get the home directory
    const home = path.resolve(process.env.HOME);

    // Send the response
    res.status(200).json({
      home: {
        title: path.dirname(home),
        path: home,
        key: `/browse/${Buffer.from(home, 'utf-8').toString('base64')}`
      },
      paths: paths,
      paths_count: paths.length
    });
  } catch (error) {
    logger.error('Error append while fetching for home and disks directories:', error);
    res.status(500).json({
      status: 'error',
      status_message: 'Internal server error while fecthing for home and disks directories.'
    });
  }
};

// Browse the specified path
export const browsePathController: RequestHandler = (req, res) => {
  try {
    const { guid } = req.params;
    const { include_files } = req.value;

    let decodedPath: string;
    try {
      decodedPath = Buffer.from(guid, 'base64').toString('utf-8');
    } catch (error) {
      res.status(400).json({ status: 'error', status_message: 'Invalid path encoding.' });
      return;
    }

    // Validate the decoded path
    const normalized = path.normalize(decodedPath);

    // Check if the path exists
    fs.stat(normalized, (error, stats) => {
      if (error) {
        res.status(404).json({ status: 'error', status_message: 'Path not found.' });
        return;
      }

      if (stats.isDirectory()) {
        // If it's a directory, read its content
        fs.readdir(normalized, (error, content) => {
          if (error) {
            res.status(500).json({ status: 'error', status_message: 'Error reading the directory.' });
            return;
          }

          getDirContent(normalized)
            .then((content) => {
              // Send the response
              res.status(200).json({
                paths: content.paths,
                paths_count: content.paths.length,
                files: include_files ? content.files : undefined,
                files_count: include_files ? content.files.length : undefined
              });
            })
            .catch(() => {
              res
                .status(500)
                .json({ status: 'error', status_message: 'Internal server error while fecthing for a path.' });
            });
        });
      } else {
        res.status(400).json({ status: 'error', status_message: 'Not a directory.' });
      }
    });
  } catch (error) {
    logger.error('Error append while fetching for a path:', error);
    res.status(500).json({
      status: 'error',
      status_message: 'Internal server error while fecthing for a path.'
    });
  }
};

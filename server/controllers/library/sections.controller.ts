// Dependencies
import { RequestHandler } from 'express';
import { LibrarySection, SectionLocation } from '../../models';
import { logger } from '../../../common/utils/logger';
import { paginate } from '../../../common/utils/api';

/**
 * Handle the request to get all the library sections
 * @param req The HTTP request
 * @param res The HTTP response
 */
const getAllSections: RequestHandler = (req, res) => {
  paginate(
    LibrarySection,
    {
      include: [
        {
          model: SectionLocation,
          attributes: { exclude: ['createdAt', 'updatedAt', 'librarySectionId', 'id'] }
        }
      ]
    },
    req.value?.page
  )
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      logger.error('Error while querying database for all library sections:', error);
      res.status(500).send({ status: 'Error', statusMessage: 'Internal server error while querying for sections.' });
    });
};

const getSectionById: RequestHandler = (req, res) => {};

const createSection: RequestHandler = (req, res) => {};

const deleteSection: RequestHandler = (req, res) => {};

const updateSection: RequestHandler = (req, res) => {};

const refreshSection: RequestHandler = (req, res) => {};

const searchInSection: RequestHandler = (req, res) => {};

const getNewestItemsInSection: RequestHandler = (req, res) => {};

const getRecentlyAddedItemsInSection: RequestHandler = (req, res) => {};

const getRecentlyViewedInSection: RequestHandler = (req, res) => {};

const getItemsByTagInSection: RequestHandler = (req, res) => {};

// Exporting function
export default {
  getAllSections,
  getSectionById,
  createSection,
  deleteSection,
  updateSection,
  refreshSection,
  searchInSection,
  getNewestItemsInSection,
  getRecentlyAddedItemsInSection,
  getRecentlyViewedInSection,
  getItemsByTagInSection
};

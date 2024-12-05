// Dependencies
import { Language } from '../../../../common/types/language';
import { MetadataItem, LibrarySection } from '../../../models';
import { parseTorrentFileName } from '../../filename-parser';
import { tmdb } from '../../tmdb';
import { basename } from 'path';
import { TmdbDetailsResult } from '../../tmdb/types';

/**
 * Transform the title to a sortable one without any complicated characters
 * @param title The original title to transform
 * @returns The transformed title
 */
const title2sort = (title: string): string => {
  return title
    .toLowerCase() // Lowercase the title
    .trim() // Trim the title
    .replace(/^(the|a|an)\s+/i, '') // Remove leading the/a/an
    .trim() // Trim the whitespace
    .replace(/[^\x20-\x7E]/g, '') // Remove non ascii characters
    .normalize('NFD') // Normalize text
    .replace(/[\u0300-\u036f]/g, '') // Remove accent
    .replace(/\s+/g, ' '); // Simplify spaces: replace multiple spaces with a single space
};

/**
 * Find or create the associated metadata item
 * @param details The TMDB details of the movie/tv show
 * @param section The library section of the metadata item
 * @returns The associated metadata item
 */
const findOrCreateMetadata = async (details: TmdbDetailsResult, section: LibrarySection) => {
  return (
    await MetadataItem.findOrCreate({
      where: {
        tmdbId: details.id,
        librarySectionId: section.id
      },
      defaults: {
        librarySectionId: section.id,
        metadataType: section.sectionType,
        tmdbId: details.id,
        imdbId: details.imdb_id,
        hash: Buffer.from(details.imdb_id + section.id, 'ascii').toString('base64'),
        mediaItemCount: 0,
        title: details.title,
        titleSort: title2sort(details.title),
        originalTitle: details.original_title,
        studio: '',
        rating: details.vote_average,
        ratingCount: details.vote_count,
        tagline: details.tagline,
        summary: details.overview,
        trivia: '',
        quotes: '',
        contentRating: '',
        contentRatingAge: '',
        duration: details.runtime,
        userThumbUrl: null,
        userArtUrl: null,
        userBannerUrl: null,
        userMusicUrl: null,
        tagsGenre: details.genres?.map((g) => g.name.toLowerCase()).join('|'),
        tagsCollection: '',
        tagsDirector: '',
        tagsWriter: '',
        tagsStar: '',
        tagsCountry: details.production_countries?.map((c) => c.name.toLowerCase()).join('|'),
        originallyAvailableAt: details.release_date ? new Date(details.release_date) : null,
        year: details.release_date ? parseInt(details.release_date.split('-')[0]) : null,
        audienceRating: 0
      }
    })
  )[0];
};

/**
 * Get the metadata item from a filepath
 * @param filepath The filepath to check the metadata from
 * @returns The metadataItem
 */
export const getMetadataItem = (filepath: string, section: LibrarySection): Promise<MetadataItem> => {
  return new Promise(async (resolve, reject) => {
    // Get the section type
    const sectionType = section.sectionType === 1 ? 'movie' : 'tv';

    // Parse the torrent filename of the filepath
    const parsedFilepath = parseTorrentFileName(basename(filepath));

    // try to find a TMDB result
    const searchResult = await tmdb.search(parsedFilepath.title, {
      type: sectionType,
      year: parsedFilepath.year,
      language: section.language as Language
    });

    // Cannot find movie/tv show
    if (searchResult.total_results === 0) {
      reject('Cannot find movie/tv show in TheMovieDatabase.');
      return;
    }

    // Get the detailled version of the first result
    const details = await tmdb.details(searchResult.results[0].id, sectionType, {
      language: section.language as Language,
      appendToResponse: [
        'credits',
        'releases',
        'keywords',
        'external_ids',
        'release_dates',
        'videos',
        'alternative_titles',
        'recommendations',
        'reviews',
        'similar',
        'translations',
        'releases',
        'images',
        'content_ratings'
      ]
    });

    // Find or create the metadata item with the details
    resolve(await findOrCreateMetadata(details, section));
  });
};

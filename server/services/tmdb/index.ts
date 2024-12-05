// Dependencies
import axios from 'axios';
import { Language } from '../../../common/types/language';
import { TMDB_API_KEY, TMDB_BASE_URL, TMDB_CDN_BASE_URL } from './config';
import { TmdbSearchOptions, TmdbSearchResult, TmdbDetailsResult, TmdbDetailsOptions, TmdbDetailsType } from './types';
import { stringifyParams } from '../../../common/utils/api';
import { logger } from '../../../common/utils/logger';

// Helper class to create a TheMovieDatabase wrapper
class Tmdb {
  // Public attributes
  public language: Language = 'en';

  /**
   * Construct the wrapper
   * @param language The language to build the wrapper from
   */
  constructor(language: Language = 'en') {
    this.language = language;
  }

  /**
   * Axios get helper function
   * @param url The url to get
   * @param params The parameters to apply to the url
   * @returns The axios response promise
   */
  private get(url: string, params: { [key: string]: any }) {
    params['api_key'] = TMDB_API_KEY;
    url = TMDB_BASE_URL + url + stringifyParams(params);
    logger.http(`GET ${url}`);
    return axios.get(url);
  }

  /**
   * Search using the TMDB api
   * @param query The query of the search
   * @param options The options of the search such as language or type of search
   */
  public search(
    query: string,
    options: TmdbSearchOptions = { language: this.language, type: 'multi' }
  ): Promise<TmdbSearchResult> {
    return new Promise((resolve, reject) => {
      this.get('search/' + (options.type || 'multi'), {
        query: query,
        language: options.language || this.language,
        page: options.page,
        year: options.year,
        include_adult: options.includeAdult
      })
        .then((data) => resolve(data.data))
        .catch(reject);
    });
  }

  /**
   * Get the details of an item based on his id
   * @param id The TMDB id of the item
   * @param type The type of item
   * @param options The options to pass to the request
   * @returns The details of the item
   */
  public details(
    id: number,
    type: TmdbDetailsType,
    options: TmdbDetailsOptions = {
      language: this.language,
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
    }
  ): Promise<TmdbDetailsResult> {
    return new Promise((resolve, reject) => {
      this.get(`${type}/${id}`, {
        append_to_response: options.appendToResponse?.join(','),
        language: options.language || this.language
      })
        .then((data) => resolve(data.data))
        .catch(reject);
    });
  }
}

export const tmdb = new Tmdb();

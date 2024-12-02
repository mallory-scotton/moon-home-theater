// Dependencies
import axios from 'axios';
import { Language } from '../../../common/types/language';
import { TMDB_API_KEY, TMDB_BASE_URL, TMDB_CDN_BASE_URL } from './config';
import { TmdbSearchOptions, TmdbSearchResult } from './types';
import { stringifyParams } from '../../../common/utils/api';

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
}

export const tmdb = new Tmdb();

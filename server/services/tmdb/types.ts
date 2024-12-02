// Dependencies
import { Language } from '../../../common/types/language';

// Export base type of image sizing
export type TmdbBackdropSize = 'w300' | 'w780' | 'w1280' | 'original';
export type TmdbLogoSize = 'w45' | 'w92' | 'w154' | 'w185' | 'w300' | 'w500' | 'original';
export type TmdbPosterSize = 'w92' | 'w154' | 'w342' | 'w500' | 'w780' | 'original';
export type TmdbProfileSize = 'w45' | 'w185' | 'h632' | 'original';
export type TmdbStillSize = 'w92' | 'w185' | 'w300' | 'original';

// Interface for the tmdb search options
export interface TmdbSearchOptions {
  page?: number;
  year?: number;
  type?: 'movie' | 'tv' | 'keyword' | 'company' | 'collection' | 'person' | 'multi';
  language?: Language;
  includeAdult?: boolean
}

// Interface for the tmdb search result
export interface TmdbSearchResult {
  page: number;
  results: {
    id: number;
    name: string;
    adult?: boolean;
    backdrop_path?: string;
    original_language?: string;
    original_name?: string;
    overview?: string;
    poster_path?: string;
    logo_path?: string;
    origin_country?: string;
    genre_ids?: number[];
    original_title?: string;
    popularity?: number;
    release_date?: string;
    title?: string;
    video?: boolean;
    vote_average?: number;
    vote_count?: number;
    gender?: number;
    know_for_department?: string;
    profile_path?: string;
    known_for?: {
      adult?: boolean;
      id?: number;
      backdrop_path?: string;
      title?: string;
      original_language?: string;
      origianl_title?: string;
      overview?: string;
      poster_path?: string;
      media_type?: string;
      genre_ids?: number[];
      popularity?: number;
      release_date?: string;
      video?: boolean;
      vote_average?: number;
      vote_count?: number;
    }[];
    first_air_date?: string;
  }[];
  total_pages: number;
  total_results: number;
}

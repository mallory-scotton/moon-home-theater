// Dependencies
import { Language } from '../../../common/types/language';

// Export base type of image sizing
export type TmdbBackdropSize = 'w300' | 'w780' | 'w1280' | 'original';
export type TmdbLogoSize = 'w45' | 'w92' | 'w154' | 'w185' | 'w300' | 'w500' | 'original';
export type TmdbPosterSize = 'w92' | 'w154' | 'w342' | 'w500' | 'w780' | 'original';
export type TmdbProfileSize = 'w45' | 'w185' | 'h632' | 'original';
export type TmdbStillSize = 'w92' | 'w185' | 'w300' | 'original';

// Interface for TMDB person
export interface TmdbPerson {
  adult?: boolean;
  gender?: number;
  id: number;
  known_for_department?: string;
  name?: string;
  original_name?: string;
  popularity?: number;
  profile_path?: string;
  cast_id?: number;
  character?: string;
  credit_id?: string;
  order?: number;
}

// Interface for TMDB image
export interface TmdbImage {
  aspect_ratio: number;
  height: number;
  iso_639_1: string;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

// Interface for the tmdb search options
export interface TmdbSearchOptions {
  page?: number;
  year?: number;
  type?: 'movie' | 'tv' | 'keyword' | 'company' | 'collection' | 'person' | 'multi';
  language?: Language;
  includeAdult?: boolean;
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

// Interface for the tmdb details result
export interface TmdbDetailsResult {
  adult?: boolean;
  backdrop_path?: string;
  belongs_to_collection?: string;
  budget?: number;
  genres?: {
    id: number;
    name: string;
  }[];
  homepage?: string;
  id: number;
  imdb_id?: string;
  origin_country?: string[];
  original_language?: string;
  original_title?: string;
  overview?: string;
  popularity?: number;
  poster_path?: string;
  production_companies: {
    id: number;
    logo_path?: string;
    name?: string;
    origin_country?: string;
  }[];
  production_countries: {
    english_name?: string;
    iso_639_1?: string;
    name?: string;
  }[];
  release_date?: string;
  revenue?: number;
  runtime?: number;
  spoken_languages?: {
    english_name?: string;
    iso_639_1?: string;
    name?: string;
  }[];
  status?: string;
  tagline?: string;
  title?: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
  credits?: {
    cast?: TmdbPerson[];
    crew?: TmdbPerson[];
  };
  releases?: {
    countries?: {
      certification?: string;
      descriptors?: string[];
      iso_3166_1?: string;
      primary?: boolean;
      release_date?: string;
    }[];
  };
  keywords?: {
    keywords?: {
      id: number;
      name: string;
    }[];
  };
  external_ids?: {
    imdb_id?: string;
    wikidata_id?: string;
    facebook_id?: string;
    instagram_id?: string;
    twitter_id?: string;
  };
  release_dates?: {
    results?: {
      iso_3166_1?: string,
      release_dates?: {
        certification?: string;
        descriptors?: string[];
        iso_639_1?: string;
        note?: string;
        release_date?: string;
        type?: number;
      }[]
    }[];
  };
  videos?: {
    results?: {
      iso_639_1?: string;
      iso_3166_1?: string;
      name?: string;
      key?: string;
      site?: string;
      size?: number;
      type?: string;
      official?: boolean;
      published_at?: string;
      id?: string;
    }[];
  };
  alternative_titles?: {
    titles?: {
      iso_3166_1?: string;
      title?: string;
      type?: string;
    }[];
  };
  recommendations?: TmdbSearchResult;
  review?: {
    page: number;
    results: {
      author?: string;
      author_details?: {
        name?: string;
        username?: string;
        avatar_path?: string;
        rating?: number;
      };
      content?: string;
      created_at?: string;
      id?: string;
      updated_at?: string;
      url?: string;
    }[];
    total_pages: number;
    total_results: number;
  };
  similar?: TmdbSearchResult;
  translations?: {
    translations: {
      iso_3166_1?: string;
      iso_639_1?: string;
      name?: string;
      english_name?: string;
      data?: {
        homepage?: string;
        overview?: string;
        runtime?: number;
        tagline?: string;
        title?: string;
      };
    }[];
  };
  images?: {
    backdrops?: TmdbImage[];
    logos?: TmdbImage[];
    posters?: TmdbImage[];
  }
}

// Interface for the tmdb details options
export interface TmdbDetailsOptions {
  appendToResponse?: (
    | 'credits'
    | 'releases'
    | 'keywords'
    | 'external_ids'
    | 'release_dates'
    | 'videos'
    | 'alternative_titles'
    | 'recommendations'
    | 'reviews'
    | 'similar'
    | 'translations'
    | 'releases'
    | 'images'
    | 'content_ratings'
  )[];
  language?: Language;
}

// Type for details
export type TmdbDetailsType = 'movie' | 'tv' | 'person' | 'network' | 'keyword' | 'company' | 'collection' | 'credit';

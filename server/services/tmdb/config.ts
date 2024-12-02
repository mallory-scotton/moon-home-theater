// Dependencies
import dotenv from 'dotenv';

// Get the configuration from the .env
dotenv.config();

// Configuration for TMDB services
export const TMDB_API_KEY = process.env.TMDB_API_KEY || '';
export const TMDB_BASE_URL = 'https://api.themoviedb.org/3/';
export const TMDB_CDN_BASE_URL = 'http://image.tmdb.org/t/p/';

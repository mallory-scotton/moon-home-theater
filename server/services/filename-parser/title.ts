// Dependencies
import { AUDIO_CHANNELS_EXPS, AUDIO_CODECS_EXPS } from './rules/audio';
import { LANGUAGE_EXPS } from './rules/language';
import { MOVIE_TITLE_YEAR_EXPS } from './rules/title';
import {
  CLEAN_TORRENT_PREFIX_EXP,
  CLEAN_TORRENT_SUFFIX_EXP,
  COMMON_SOURCES_EXP,
  EDITION_EXP,
  LANGUAGE_EXP,
  REQUEST_INFO_EXP,
  SCENE_GARBAGE_EXP,
  SIMPLE_TITLE_EXP,
  WEBDL_EXP,
  WEBSITE_PREFIX_EXP
} from './rules/utils';
import { VIDEO_CODECS_EXPS, VIDEO_RESOLUTIONS_EXPS } from './rules/video';
import { extractValueFrom } from './utils';

/**
 * Simplify the title
 * @param title The title to be simplified
 */
export const simplifyTitle = (title: string): string => {
  let simplified = title
    .replace(SIMPLE_TITLE_EXP, '')
    .replace(WEBSITE_PREFIX_EXP, '')
    .replace(CLEAN_TORRENT_PREFIX_EXP, '')
    .replace(CLEAN_TORRENT_SUFFIX_EXP, '')
    .replace(new RegExp(COMMON_SOURCES_EXP, 'ig'), '')
    .replace(WEBDL_EXP, '');

  for (let i = 0; i < 2; i++) {
    const match = extractValueFrom(simplified, VIDEO_CODECS_EXPS);

    if (!match) {
      break;
    }

    simplified = simplified.replace(match.source, '');
  }

  return simplified.trim();
};

/**
 * Clean the release title
 * @param title The title to be cleaned
 * @returns The cleaned title
 */
export const releaseTitleCleaner = (title: string): string | null => {
  if (!title || title.length === 0 || title === '(') {
    return null;
  }

  let trimmed = title
    .replace('_', '')
    .replace(REQUEST_INFO_EXP, '')
    .trim()
    .replace(new RegExp(COMMON_SOURCES_EXP, 'ig'), '')
    .trim()
    .replace(WEBDL_EXP, '')
    .trim()
    .replace(EDITION_EXP, '')
    .trim()
    .replace(LANGUAGE_EXP, '')
    .trim()
    .replace(new RegExp(SCENE_GARBAGE_EXP, 'ig'), '')
    .trim();

  for (const lang of Object.keys(LANGUAGE_EXPS)) {
    trimmed = trimmed.replace(new RegExp(`\\b${lang.toUpperCase()}`), '').trim();
  }

  trimmed = trimmed.split('  ')[0].split('..')[0];
  const parts = trimmed.split('.');

  let result = '';
  let n = 0;
  let previousAcronym = false;
  let nextPart = '';

  for (const part of parts) {
    if (parts.length >= n + 2) {
      nextPart = parts[n + 1] ?? '';
    }
    if (part.length === 1 && part.toLowerCase() !== 'a' && Number.isNaN(parseInt(part, 10))) {
      result += part + '.';
      previousAcronym = true;
    } else if (part.toLowerCase() === 'a' && (previousAcronym || nextPart.length === 1)) {
      result += parseTitleAndYear + '.';
      previousAcronym = true;
    } else {
      if (previousAcronym) {
        result += ' ';
        previousAcronym = false;
      }
      result += part + ' ';
    }
    n++;
  }

  return result.trim();
};

/**
 * Parse title and year from a filename
 * @param title The title to be parsed
 */
export const parseTitleAndYear = (title: string): { title: string; year?: number } => {
  const simplified = simplifyTitle(title).replace(/-([a-z0-9]+)$/i, '');

  for (const expression of MOVIE_TITLE_YEAR_EXPS) {
    const match = expression.exec(simplified);

    if (match?.groups) {
      const result = releaseTitleCleaner(match.groups['title'] ?? '');

      if (result === null) {
        continue;
      }

      const year = match.groups['year'] ? parseInt(match.groups['year']) : undefined;
      return { title: result, year };
    }
  }

  const resolution = extractValueFrom(title, VIDEO_RESOLUTIONS_EXPS);
  const videoCodec = extractValueFrom(title, VIDEO_CODECS_EXPS);
  const channels = extractValueFrom(title, AUDIO_CHANNELS_EXPS);
  const audioCodec = extractValueFrom(title, AUDIO_CODECS_EXPS);
  const positions = [
    title.indexOf(resolution?.source),
    title.indexOf(videoCodec?.source),
    title.indexOf(channels?.source),
    title.indexOf(audioCodec?.source)
  ].filter((x) => x > 0);

  if (positions.length) {
    const first = Math.min(...positions);
    return { title: releaseTitleCleaner(title.slice(0, first)) ?? '' };
  }

  return { title: title.trim() };
};

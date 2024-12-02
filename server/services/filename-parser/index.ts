// Dependencies
import { extractFieldFrom, extractValueFrom, extractValueListFrom, filterEmpty } from './utils';
import { AUDIO_CODECS_EXPS, AUDIO_CHANNELS_EXPS } from './rules/audio';
import { VIDEO_CODECS_EXPS, VIDEO_RESOLUTIONS_EXPS } from './rules/video';
import { COMPLETE_DVD_EXP, COMPLETE_EXP } from './rules/complete';
import { PROVIDER_EXP } from './rules/utils';
import { EDITION_EXPS } from './rules/edition';
import { parseTitleAndYear } from './title';
import { LANGUAGE_EXPS } from './rules/language';

/**
 * Get providers (imdb, tmdb, tvdb) from the title
 * @param title The title to get providers from
 * @returns The parsed name and id or nothing.
 */
const getProvider = (title: string): { name: string; id: string } | undefined => {
  const matches = title.match(PROVIDER_EXP);

  if (!matches) {
    return undefined;
  }

  const match = matches[0].replace(/[{}]/g, '').split('-');
  return { name: match[0], id: match[1] };
};

// Interface of the result of the parsing
interface ParseTorrentResult {
  audioCodec?:
    | 'mp3'
    | 'mp2'
    | 'dolby digital'
    | 'dolby atmos'
    | 'aac'
    | 'dolby digital plus'
    | 'flac'
    | 'dts'
    | 'dts-hd'
    | 'dolby trueHD'
    | 'opus'
    | 'vorbis'
    | 'pcm'
    | 'lpcm';
  audioChannels?: '7.1' | '5.1' | 'stereo' | 'mono';
  resolution?: '2160p' | '1080p' | '720p' | '576p' | '540p' | '480p';
  videoCodec?: 'h264' | 'h265' | 'x265' | 'hevc' | 'x264' | 'xvidhd' | 'xvid' | 'divx' | 'wmv' | 'dvdr';
  complete?: boolean;
  edition?: {
    internal?: boolean;
    limited?: boolean;
    remastered?: boolean;
    extended?: boolean;
    theatrical?: boolean;
    directors?: boolean;
    unrated?: boolean;
    imax?: boolean;
    fanEdit?: boolean;
    hdr?: boolean;
    threeD?: boolean;
    hsbs?: boolean;
    sbs?: boolean;
    hou?: boolean;
    uhd?: boolean;
    dolbyVision?: boolean;
  };
  provider?: {
    name: 'tmdb' | 'imdb' | 'tvdb';
    id: string;
  };
  title?: string;
  year?: number;
  languages?: string[];
}

/**
 * Parse the title of a filename
 * @param filename The filename to parse
 * @param isTv Is the filename a TV show
 * @returns The parsed torrent filename
 */
export const parseTorrentFileName = (filename: string, isTv: boolean = false): ParseTorrentResult => {
  // Parse the title and the year of the filename
  const parsed = parseTitleAndYear(filename);
  // Remove the title from the filename to get a clean version of the title
  const withoutTitle = filename.replace(/\./g, ' ').replace(parsed.title, '').toLowerCase();

  // Parse every possible values and remove the empty ones
  return filterEmpty({
    audioCodec: extractValueFrom(filename, AUDIO_CODECS_EXPS)?.value,
    audioChannels: extractValueFrom(filename, AUDIO_CHANNELS_EXPS)?.value,
    resolution: extractValueFrom(filename, VIDEO_RESOLUTIONS_EXPS)?.value,
    videoCodec: extractValueFrom(filename, VIDEO_CODECS_EXPS)?.value,
    complete: COMPLETE_DVD_EXP.test(filename) || COMPLETE_EXP.test(filename) || undefined,
    edition: extractFieldFrom(withoutTitle, EDITION_EXPS),
    provider: getProvider(filename),
    title: parsed.title,
    year: parsed.year,
    languages: extractValueListFrom(withoutTitle, LANGUAGE_EXPS)
  });
};

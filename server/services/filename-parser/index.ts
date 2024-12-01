// Dependencies
import { extractValueFrom } from './utils';
import { AUDIO_CODECS_EXPS, AUDIO_CHANNELS_EXPS } from './rules/audio';
import { VIDEO_CODECS_EXPS, VIDEO_RESOLUTIONS_EXPS } from './rules/video';
import { COMPLETE_DVD_EXP, COMPLETE_EXP } from './rules/complete';

export const parseTorrentFileName = (filename: string, isTv: boolean = false) => {
  return {
    audioCodec: extractValueFrom(filename, AUDIO_CODECS_EXPS)?.value,
    audioChannels: extractValueFrom(filename, AUDIO_CHANNELS_EXPS)?.value,
    resolution: extractValueFrom(filename, VIDEO_RESOLUTIONS_EXPS)?.value,
    videoCodec: extractValueFrom(filename, VIDEO_CODECS_EXPS)?.value,
    complete: COMPLETE_DVD_EXP.test(filename) || COMPLETE_EXP.test(filename) || undefined
  };
};

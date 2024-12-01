// Export audio channels related regexp
export const AUDIO_CHANNELS_EXPS = {
  SEVEN: {
    value: '7.1',
    exp: /\b(7.?[01])\b/i
  },
  SIX: {
    value: '5.1',
    exp: /\b((6[\W]0(?:ch)?)(?=[^\d]|$)|(5[\W][01](?:ch)?)(?=[^\d]|$)|5ch|6ch)\b/i
  },
  STEREO: {
    value: 'stereo',
    exp: /(((2[\W]0(?:ch)?)(?=[^\d]|$))|(stereo))/i
  },
  MONO: {
    value: 'mono',
    exp: /((1[\W]0(?:ch)?)(?=[^\\d]|$)|(mono)|(1ch))/i
  }
};

// Export audio codecs related regexp
export const AUDIO_CODECS_EXPS = {
  MP3: {
    value: 'mp3',
    exp: /\b((LAME(?:\d)+-?(?:\d)+)|(mp3))\b/i
  },
  MP2: {
    value: 'mp2',
    exp: /\b((mp2))\b/i
  },
  DOLBY: {
    value: 'dolby digital',
    exp: /\b((Dolby)|(Dolby-?Digital)|(DD)|(AC3D?))\b/i
  },
  DOLBY_ATMOS: {
    value: 'dolby atmos',
    exp: /\b((Dolby-?Atmos))\b/i
  },
  AAC: {
    value: 'aac',
    exp: /\b((AAC))(\d?.?\d?)(ch)?\b/i
  },
  EAC3: {
    value: 'dolby digital plus',
    exp: /\b((EAC3|DDP|DD\+))\b/i
  },
  FLAC: {
    value: 'flac',
    exp: /\b((FLAC))\b/i
  },
  DTS: {
    value: 'dts',
    exp: /\b((DTS))\b/i
  },
  DTS_HD: {
    value: 'dts-hd',
    exp: /\b((DTS-?HD)|(DTS(?=-?MA)|(DTS-X)))\b/i
  },
  TRUE_HD: {
    value: 'dolby trueHD',
    exp: /\b((True-?HD))\b/i
  },
  OPUS: {
    value: 'opus',
    exp: /\b((Opus))\b/i
  },
  VORBIS: {
    value: 'vorbis',
    exp: /\b((Vorbis))\b/i
  },
  PCM: {
    value: 'pcm',
    exp: /\b((PCM))\b/i
  },
  LPCM: {
    value: 'lpcm',
    exp: /\b((LPCM))\b/i
  }
};

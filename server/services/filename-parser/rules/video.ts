// Export video resolutions expression
export const VIDEO_RESOLUTIONS_EXPS = {
  R2160P: {
    value: '2160p',
    exp: /(2160p|4k[-_. ](?:UHD|HEVC|BD)|(?:UHD|HEVC|BD)[-_. ]4k|\b(4k)\b|COMPLETE.UHD|UHD.COMPLETE)/i
  },
  R1080P: {
    value: '1080p',
    exp: /(1080(i|p)|1920x1080)(10bit)?/i
  },
  R720P: {
    value: '720p',
    exp: /(720(i|p)|1280x720|960p)(10bit)?/i
  },
  R576P: {
    value: '576p',
    exp: /(576(i|p))/i
  },
  R540P: {
    value: '540p',
    exp: /(540(i|p))/i
  },
  R480P: {
    value: '480p',
    exp: /(480(i|p)|640x480|848x480)/i
  }
};

// Export video codecs expression
export const VIDEO_CODECS_EXPS = {
  H264: {
    value: 'h264',
    exp: /(h264)/i
  },
  H265: {
    value: 'h265',
    exp: /(h265)/i
  },
  X265: {
    value: 'x265',
    exp: /(x265)/i
  },
  HEVC: {
    value: 'hevc',
    exp: /(HEVC)/i
  },
  X264: {
    value: 'x264',
    exp: /(x264)/i
  },
  XVIDHD: {
    value: 'xvidhd',
    exp: /(XvidHD)/i
  },
  XVID: {
    value: 'xvid',
    exp: /(X-?vid)/i
  },
  DIVX: {
    value: 'divx',
    exp: /(divx)/i
  },
  WMV: {
    value: 'wmv',
    exp: /(WMV)/i
  },
  DVDR: {
    value: 'dvdr',
    exp: /\b(DVD-R|DVDR)\b/i
  }
};

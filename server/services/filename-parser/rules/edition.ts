// Edition regexp rules
export const EDITION_EXPS = [
  { field: 'internal', exp: /\b(INTERNAL)\b/i },
  { field: 'limited', exp: /\b(LIMITED)\b/i },
  { field: 'remastered', exp: /\b(Remastered|Anniversary|Restored)\b/i },
  { field: 'extended', exp: /\b(Extended|Uncut|Ultimate|Rogue|Collector)\b/i },
  { field: 'theatrical', exp: /\b(Theatrical)\b/i },
  { field: 'directors', exp: /\b(Directors?)\b/i },
  { field: 'unrated', exp: /\b(Uncensored|Unrated)\b/i },
  { field: 'imax', exp: /\b(IMAX)\b/i },
  { field: 'fanEdit', exp: /\b(Despecialized|Fan.?Edit)\b/i },
  { field: 'hdr', exp: /\b(HDR)\b/i },
  { field: 'threeD', exp: /\b(3D)\b/i },
  { field: 'hsbs', exp: /\b(Half-?SBS|HSBS)\b/i },
  { field: 'sbs', exp: /\b((?<!H|HALF-)SBS)\b/i },
  { field: 'hou', exp: /\b(HOU)\b/i },
  { field: 'uhd', exp: /\b(UHD)\b/i },
  { field: 'dolbyVision', exp: /\b(DV(\b(HDR10|HLG|SDR))?)\b/i }
];

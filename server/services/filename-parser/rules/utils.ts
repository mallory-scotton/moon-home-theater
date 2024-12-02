// Extension regrexp
export const FILE_EXTENSION_EXP = /\.[a-z0-9]{2,4}$/i;
export const SIMPLE_TITLE_EXP =
  /\s*(?:480[ip]|576[ip]|720[ip]|1080[ip]|2160[ip]|HVEC|[xh][\W_]?26[45]|DD\W?5\W1|[<>?*:|]|848x480|1280x720|1920x1080)((8|10)b(it))?/i;
export const WEBSITE_PREFIX_EXP = /^\[\s*[a-z]+(\.[a-z]+)+\s*\][- ]*|^www\.[a-z]+\.(?:com|net)[ -]*/i;
export const CLEAN_TORRENT_PREFIX_EXP = /^\[(?:REQ)\]/i;
export const CLEAN_TORRENT_SUFFIX_EXP = /\[(?:ettv|rartv|rarbg|cttv)\]$/i;
export const COMMON_SOURCES_EXP =
  /\b(Bluray|(dvdr?|BD)rip|HDTV|HDRip|TS|R5|CAM|SCR|(WEB|DVD)?.?SCREENER|DiVX|xvid|web-?dl)\b/i;
export const REQUEST_INFO_EXP = /\[.+?\]/i;
export const EDITION_EXP =
  /\b((Extended.|Ultimate.)?(Director.?s|Collector.?s|Theatrical|Anniversary|The.Uncut|DC|Ultimate|Final(?=(.(Cut|Edition|Version)))|Extended|Special|Despecialized|unrated|\d{2,3}(th)?.Anniversary)(.(Cut|Edition|Version))?(.(Extended|Uncensored|Remastered|Unrated|Uncut|IMAX|Fan.?Edit))?|((Uncensored|Remastered|Unrated|Uncut|IMAX|Fan.?Edit|Edition|Restored|((2|3|4)in1)))){1,3}/i;
export const LANGUAGE_EXP = /\b(TRUE.?FRENCH|videomann|SUBFRENCH|PLDUB|MULTI)/i;
export const SCENE_GARBAGE_EXP = /\b(PROPER|REAL|READ.NFO)/;
export const WEBDL_EXP = /\b(WEB[-_. ]DL|HDRIP|WEBDL|WEB-DLMux|NF|APTV|NETFLIX|NetflixU?HD|DSNY|DSNP|HMAX|AMZN|AmazonHD|iTunesHD|MaxdomeHD|WebHD|WEB$|[. ]WEB[. ](?:[xh]26[45]|DD5[. ]1)|\d+0p[. ]WEB[. ]|\b\s\/\sWEB\s\/\s\b|AMZN[. ]WEB[. ])\b/i;
export const PROVIDER_EXP = /\{(tmdb|imdb|tvdb)-[a-zA-Z0-9]+\}/g;
export const MULTI_EXP = /(?<!(WEB-))\b(MULTi|DUAL|DL)\b/i;

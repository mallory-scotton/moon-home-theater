// Dependencies
import { ffprobe } from '../../ffprobe';
import { MediaPart, MediaItem, MediaStream, MetadataItem, LibrarySection, SectionLocation } from '../../../models';
import { FfprobeStream, FfprobeData } from '../../ffprobe/types';
import { extname } from 'path';
import { removeDuplicated } from '../../../../common/utils/array';

// Regular expresssion for Forced and Complete
const FORCED_EXP = /(forced)/g;
const COMPLETE_EXP = /(full|complete)/g;

// Stream type constant
const STREAM_TYPES = ['video', 'audio', 'subtitle'];

/**
 * Get a tags from a string
 * @param stream The stream to get the tags from
 * @param tag The tag name
 * @returns The tag value or undefined if not found
 */
const getTags = (stream: FfprobeStream, tag: string): string | undefined => {
  if (!stream.tags || !stream.tags[tag]) {
    return undefined;
  }
  return stream.tags[tag] as string;
};

/**
 * Apply a transform function on a value if the value is defined
 * @param value The value to check existence
 * @param transform The transform function to apply
 * @returns The applied transform or undefined
 */
const optinalTransform = (value: any, transform: (value: any) => any) => (value ? transform(value) : undefined);

/**
 * Check if a stream title is forced
 * @param title The title tag to check the forced status
 * @returns True if the stream is forced, false otherwise
 */
const isForced = (stream: FfprobeStream): boolean => {
  let title = getTags(stream, 'title');
  // Check if the title tags is defined
  if (title) {
    // Lowercase the title
    title = title.toLowerCase();
    // If the title contain FORCED string
    if (FORCED_EXP.test(title)) {
      return true;
    }
    // If the title contain COMPLETE/FULL string
    if (COMPLETE_EXP.test(title)) {
      return false;
    }
  }
  // If the disposition is forced
  if (stream.disposition?.forced) {
    return true;
  }
  // otherwise return false
  return false;
};

/**
 * Calculate an operation based on a string (e.g: 16:9 or 24000/1001)
 * @param ratio The operation string 16:9
 * @returns The calculated operation
 */
export const parseOperation = (operation: string): number => {
  // Split the ratio text (e.g: 16:9 ==> [16, 9])
  const split: number[] = operation
    .replace(/(:|\/)/g, '-')
    .split('-')
    .map((element) => parseInt(element));
  // Calculate the ratio
  return split[0] / split[1];
};

/**
 * Create a MediaStream based on a FfprobeStream
 * @param stream The FfprobeStream to create the MediaStream from
 * @param item The MediaItem associated with the stream
 * @param part The MediaPart associated with the stream
 */
const createMediaStream = (stream: FfprobeStream, item: MediaItem, part: MediaPart, streams: FfprobeStream[]) => {
  // Get the streams with the same type as the one selected
  const sameType = streams.filter((s) => s.codec_type === stream.codec_type);

  // Create the media stream
  return MediaStream.create({
    streamType: STREAM_TYPES.indexOf(stream.codec_type) + 1,
    mediaItemId: item.id,
    mediaPartId: part.id,
    codec: stream.codec_name,
    language: getTags(stream, 'language'),
    index: sameType.indexOf(stream),
    channels: stream.channels,
    bitrate: optinalTransform(stream.bit_rate, parseInt),
    default: optinalTransform(stream.disposition?.default, Boolean),
    forced: isForced(stream),
    extraData: null
  });
};

/**
 * Create the media item
 * @param data The ffprobe analyse data
 * @returns The media creation promise
 */
const createMediaItem = (
  data: FfprobeData,
  metadata: MetadataItem,
  section: LibrarySection,
  location: SectionLocation
) => {
  // Get the video stream
  const videos = data.streams.filter((s) => s.codec_type === 'video');
  const audios = data.streams.filter((s) => s.codec_type === 'audio');

  // Create the media item
  return MediaItem.create({
    librarySectionId: section.id,
    sectionLocationId: location.id,
    metadataItemId: metadata.id,
    width: videos[0]?.width,
    height: videos[0]?.height,
    size: data.format.size,
    duration: data.format.duration,
    bitrate: data.format.bit_rate,
    container: extname(data.format.filename).replace('.', ''),
    videoCodec: removeDuplicated(videos.map((s) => s.codec_name)).join('|'),
    audioCodec: removeDuplicated(audios.map((s) => s.codec_name)).join('|'),
    audioChannels: Math.max(...audios.map((s) => s.channels)),
    displayAspectRatio: optinalTransform(videos[0]?.display_aspect_ratio, parseOperation),
    sampleAspectRatio: optinalTransform(videos[0]?.sample_aspect_ratio, parseOperation),
    framesPerSecond: optinalTransform(videos[0]?.r_frame_rate, parseOperation),
    interlacted: false,
    hints: null,
    displayOffset: null,
    settings: null,
    beginsAt: null,
    endsAt: null,
    colorTrc: null
  });
};

/**
 * Create a MediaPart based on this file
 * @param data The FFprobeData from the file
 * @param item The MediaItem previously created
 * @param filepath The path of the analysed file
 * @returns The promise of creation for the MediaPart
 */
const createMediaPart = (data: FfprobeData, item: MediaItem, filepath: string) => {
  return MediaPart.create({
    mediaItemId: item.id,
    directoryId: null,
    hash: Buffer.from(filepath, 'ascii').toString('base64'),
    file: filepath,
    size: data.format.size,
    duration: data.format.duration,
    extraData: null
  });
};

/**
 * Create a Media (Item, Part and Streams) for a scanned file
 * @param filepath The path of the scanned file
 * @param metadata The metadata item to link the media with
 * @param section The section of the file
 * @param location The location of the section
 */
export const createMedia = async (
  filepath: string,
  metadata: MetadataItem,
  section: LibrarySection,
  location: SectionLocation
) => {
  // Get the FfprobeData
  const data = await ffprobe.getData(filepath);
  // Create the MediaItem
  const item = await createMediaItem(data, metadata, section, location);
  // Create the MediaPart
  const part = await createMediaPart(data, item, filepath);
  // Create all the stream
  for (const stream of data.streams) {
    await createMediaStream(stream, item, part, data.streams);
  }
};

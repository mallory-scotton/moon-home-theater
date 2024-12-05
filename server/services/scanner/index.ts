// Dependencies
import { LibrarySection, SectionLocation } from '../../models';
import { getFiles } from '../browse';
import { EventBus } from '../../../common/types/eventBus';
import { VIDEO_EXTENSIONS } from '../../../common/constants/path';
import path from 'path';
import { createMedia, getMetadataItem, updateCheck } from './tasks';

// Scanner events
type ScannerEventList = {
  start: void;
  end: boolean;
  error: any;
};

/**
 * Calculate the ratio based on a string
 * @param ratio The ratio string (e.g. 16/9)
 * @returns The ratio in number
 */
const parseRatio = (ratio: string): number => {
  const split: number[] = ratio.split(':').map((element) => parseInt(element));
  return split[0] / split[1];
};

// Scanner class to scan a library section
export class Scanner extends EventBus<ScannerEventList> {
  private section: LibrarySection;
  private location: SectionLocation;
  private force: boolean;

  private queue: string[] = [];

  /**
   * Constructor of the scanner class
   * @param section The library section to scan
   * @param force Force the library section update
   */
  constructor(section: LibrarySection, force: boolean = false) {
    // Grant privilege over the EventBus class
    super();

    // Save the parameters of the scanner
    this.section = section;
    this.force = force;
  }

  /**
   * Scan file function
   * @param filepath The path of the file to scan
   */
  private async scanFile(filepath: string) {
    // Check if the file need an update
    if (!(await updateCheck(filepath, this.force))) {
      return;
    }
    // Get the metadata for the file
    const metadata = await getMetadataItem(filepath, this.section);
    // Create the media for the file
    await createMedia(filepath, metadata, this.section, this.location);
  }

  /**
   * Start the scanning of the elements
   */
  private async scanSection() {
    // Emit the start of the scan
    this.emit('start');

    // Get all the files in the directory and subdirectories
    this.queue = getFiles(this.location.rootPath, { extensions: VIDEO_EXTENSIONS, recursive: true });

    // Loop through each filepath
    for (const filepath of this.queue) {
      try {
        // Join the root with the relative filepath
        await this.scanFile(path.join(this.location.rootPath, filepath));
      } catch (error) {
        // Catch any potential error
        this.emit('error', error);
      }
    }

    // End the scanner
    this.emit('end', true);
  }

  /**
   * Start function for the scanner
   */
  public start() {
    // Try to find the section location
    SectionLocation.findOne({ where: { librarySectionId: this.section.id } })
      .then((location) => {
        // If the section has been found, save it and start the scan
        this.location = location;
        this.scanSection();
      })
      .catch((error) => {
        // If the section location cannot be found, error
        this.emit('error', error);
        this.emit('end', false);
      });
  }
}

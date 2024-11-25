// Dependencies
import { FFPROBE_PATH } from './config';
import { FfprobeData } from './types';
import fs from 'fs';
import path from 'path';
import cp from 'child_process';

// FFPROBE wrapper class
class FFPROBE {
  // Public properties
  public processes: cp.ChildProcess[] = [];

  /**
   * Spawn an FFPROBE processus with arguments and store it into the processes
   * @param args The list of arguments to pass to the process
   * @returns The spawned child process
   */
  public spawn(args: readonly string[] | undefined): cp.ChildProcess {
    console.log(FFPROBE_PATH);
    console.log(args);

    // Spawn the child process
    const child = cp.spawn('ffprobe', args, { cwd: path.dirname(FFPROBE_PATH) });
    this.processes.push(child);

    // Add an event to remove the process from the array when exited
    child.on('exit', () => {
      this.processes.splice(this.processes.indexOf(child), 1);
    });

    // Return the spawned child
    return (child);
  }

  /**
   * Kill all the child processus of ffprobe
   */
  public terminate(): void {
    // Loop through each process
    for (const child of this.processes) {
      if (!child.killed) {
        child.kill();
      }
    }
  }

  /**
   * Extract data from a video file
   * @param filepath The path of the file you want to extract data from
   */
  public async getData(filepath: string): Promise<FfprobeData> {
    return (new Promise((resolve, reject) => {
      // Normalize the file path
      const normalizedPath = path.resolve(filepath);

      // Checj if the file exists
      if (!fs.existsSync(normalizedPath)) {
        return reject("File doesn't exists.");
      }

      // Spawn the ffprobe process with the normalized path
      const child = this.spawn([
        '-v', 'quiet',
        '-print_format', 'json',
        '-show_streams',
        '-show_format',
        '-show_chapters',
        normalizedPath
      ]);

      let data = '';

      // Collect data from the child process
      child.stdout.on('data', (chunk) => { data += chunk; });

      // Handle errors
      child.stderr.on('data', (error) => { reject(error); });

      // Resolve the promise when the process exits
      child.on('exit', (code) => {
        if (code === 0) {
          try {
            // Parse the JSON output
            resolve(JSON.parse(data));
          } catch (error) {
            reject(`Failed to parse JSON: ${error}.`);
          }
        } else {
          reject(`ffprobe process exited with code ${code}.`);
        }
      });
    }));
  }
};

export default new FFPROBE();

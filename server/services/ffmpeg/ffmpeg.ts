// Dependencies
import { FFMPEG_PATH } from './config';
import cp from 'child_process';

// FFMPEG wrapper class
class FFMPEG {
  // Public properties
  public processes: cp.ChildProcess[] = [];

  /**
   * Spawn an FFMPEG processus with arguments and store it into the processes
   * @param args The list of arguments to pass to the process
   * @returns The spawned child process
   */
  public spawn(args: readonly string[] | undefined): cp.ChildProcess {
    // Spawn the child using the args
    const child = cp.spawn('ffmpeg', args, { cwd: FFMPEG_PATH });

    // Add the children to the processes list
    this.processes.push(child);

    // On exit, remove the child from the processes
    child.on('exit', () => {
      const index = this.processes.indexOf(child);

      if (index !== -1) {
        this.processes.splice(index, 1);
      }
    });

    // Return the child process instance
    return (child);
  }

  /**
   * Kill all the child processus of ffmpeg
   */
  public terminate(): void {
    for (const child of this.processes) {
      if (!child.killed) {
        child.kill();
      }
    }
  }
};

export default new FFMPEG();

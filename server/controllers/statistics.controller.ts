// Dependencies
import os from 'os';
import { RequestHandler } from 'express';
import { logger } from '../../common/utils/logger';

// Define the controller to get resource statistics
export const getResourcesStatistics: RequestHandler = (req, res): void => {
  try {
    // Get memory statistics
    const totalMemory = os.totalmem();
    const freeMemory = os.freemem();
    const usedMemory = totalMemory - freeMemory;

    // Get process memory usage
    const processMemory = process.memoryUsage();

    // Get CPU statistics
    const cpus = os.cpus();
    const cpuCount = cpus.length;
    const cpuUsage: number[] = cpus.map((cpu) => {
      const total = Object.values(cpu.times).reduce((acc, time) => acc + time, 0);
      const idle = cpu.times.idle;
      // Calculate CPU usage percentage
      const usage = ((total - idle) / total) * 100;
      return parseFloat(usage.toFixed(2));
    });
    const cpuTotalUsage = cpuUsage.reduce((acc, usage) => acc + usage, 0) / cpuCount;

    // Send the response
    res.status(200).json({
      at: new Date().toISOString(),
      memory: {
        free: freeMemory,
        total: totalMemory,
        used: usedMemory,
        usage_percentage: ((usedMemory / totalMemory) * 100).toFixed(2)
      },
      cpu: {
        count: cpuCount,
        usage: cpuUsage,
        total_usage: parseFloat(cpuTotalUsage.toFixed(2))
      },
      host: {
        hostname: os.hostname(),
        platform: os.platform(),
        release: os.release(),
        architecture: os.arch()
      },
      process: {
        pid: process.pid,
        uptime: process.uptime(),
        memory_usage: {
          rss: processMemory.rss,
          heap_total: processMemory.heapTotal,
          heap_used: processMemory.heapUsed,
          external: processMemory.external,
          array_buffers: processMemory.arrayBuffers
        },
        cpu_usage: process.cpuUsage()
      }
    });
  } catch (error) {
    logger.error('Error fetching resource statistics:', error);
    res
      .status(500)
      .json({ status: 'error', status_message: 'Internal server error while fetching resources statistics.' });
  }
};

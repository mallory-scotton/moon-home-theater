import type { Configuration } from 'webpack';
import { resolve } from 'path';

import { rules } from './webpack.rules';
import { plugins } from './webpack.plugins';

export const mainConfig: Configuration = {
  entry: './server/index.ts',
  module: { rules },
  plugins,
  resolve: {
    alias: {
      '@': resolve(__dirname, 'server')
    },
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.scss', '.json']
  }
};

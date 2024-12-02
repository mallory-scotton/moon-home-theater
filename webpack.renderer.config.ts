// Dependencies
import type { Configuration } from 'webpack';
import { resolve } from 'path';

// Webpack
import { rules } from './webpack.rules';
import { plugins } from './webpack.plugins';

// Use styles loaders for css/scss/sass file
rules.push({
  test: /\.(css|scss|sass)$/,
  use: [
    {
      loader: 'style-loader'
    },
    {
      loader: 'css-loader',
      options: {
        sourceMap: true
      }
    },
    {
      loader: 'resolve-url-loader'
    },
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: () => [require('autoprefixer')]
        }
      }
    },
    {
      loader: 'sass-loader',
      options: {
        sassOptions: {
          implementation: require('sass')
        }
      }
    }
  ]
});

// Adding the file loader for image assets
rules.push({
  test: /\.(png|jpe?g|gif|svg)$/i,
  use: [
    {
      loader: 'file-loader',
      options: {
        outputPath: 'images'
      }
    }
  ]
});

// Export the renderer webpack configuration
export const rendererConfig: Configuration = {
  module: { rules },
  plugins,
  resolve: {
    alias: {
      '@': resolve(__dirname, 'client')
    },
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.scss']
  }
};

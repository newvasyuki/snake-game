import path from 'path';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import { Configuration } from 'webpack';
import { Configuration as WebpackDevServerConfig } from 'webpack-dev-server';
import { MODE } from './constants';

const config = (
  _,
  argv,
): Configuration & {
  devServer: WebpackDevServerConfig;
} => {
  // eslint-disable-next-line
  const mode = argv.mode || MODE.DEV;
  return {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    mode,
    entry: {
      client: './src/client.tsx',
      sw: {
        import: './src/services/serviceWorker/sw.js',
        filename: 'sw.js',
      },
    },
    output: {
      filename: '[name].js',
      path: path.join(__dirname, '../build'),
      publicPath: '/',
    },
    target: 'web',
    devServer: {
      open: false,
      port: 3000,
      historyApiFallback: true,
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
      plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: '/node_modules/',
          use: ['babel-loader', 'ts-loader'],
        },
        {
          test: /\.pcss$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'style-loader',
            },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
              },
            },
            {
              loader: 'postcss-loader',
            },
          ],
        },
        {
          test: /\.(react.svg)$/,
          use: ['@svgr/webpack'],
        },
        {
          test: /\.(webp|png|jpe?g|gif)$/,
          type: 'asset/resource',
        },
        {
          test: /\.(ttf|woff|woff2|eot)$/,
          type: 'asset/resource',
        },
      ],
    },

    devtool: mode === MODE.DEV ? 'source-map' : false,

    optimization: {
      minimize: mode === MODE.PROD,
    },
  };
};

export default config;

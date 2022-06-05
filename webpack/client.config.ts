import path from 'path';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import { Configuration, HotModuleReplacementPlugin } from 'webpack';
import { Configuration as WebpackDevServerConfig } from 'webpack-dev-server';
import { MODE } from './constants';
// import HotModuleReplacementPlugin from 'webpack';

type AppEnv = 'development' | 'production';

const isDev = process.env.NODE_ENV === 'development';

/*
 entry: [
    isDev && '@gatsbyjs/webpack-hot-middleware/client?path=/__webpack_hmr',
    path.join(__dirname, '../../../client/index.tsx')
  ].filter(Boolean),
*/

const config: Configuration & {
  devServer: WebpackDevServerConfig;
} = {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  mode: (process.env.NODE_ENV as AppEnv) || MODE.DEV,
  // entry: {
  //   client: './src/client.tsx',
  //   sw: {
  //     import: './src/services/serviceWorker/sw.js',
  //     filename: 'sw.js',
  //   },
  // },
  // entry: [
  //   isDev && 'webpack-hot-middleware/client?path=/__webpack_hmr',
  //   path.join(__dirname, '../src/client.tsx'),
  // ].filter(Boolean),
  entry: {
    client: [
      isDev && 'webpack-hot-middleware/client?path=/__webpack_hmr',
      path.join(__dirname, '../src/client.tsx'),
    ].filter(Boolean),
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
      // {
      //   test: /\.(js|jsx|ts|tsx)$/,
      //   exclude: /node_modules/,
      //   use: {
      //     loader: 'babel-loader',
      //     options: {
      //       presets: ['@babel/preset-env', '@babel/preset-typescript', '@babel/preset-react'],
      //       plugins: [isDev && 'react-refresh/babel'].filter(Boolean),
      //     },
      //   },
      // },
      // {
      //   test: /\.tsx?$/,
      //   exclude: '/node_modules/',
      //   use: ['babel-loader', 'ts-loader'],
      // },
      {
        test: /\.tsx?$/,
        exclude: '/node_modules/',
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-react',
                '@babel/preset-typescript',
                [
                  '@babel/preset-env',
                  {
                    targets: 'defaults',
                  },
                ],
              ],
              plugins: ['@babel/transform-runtime', isDev && 'react-refresh/babel'].filter(Boolean),
            },
          },
          {
            loader: 'ts-loader',
          },
        ],
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
  plugins: [isDev && new HotModuleReplacementPlugin()].filter(Boolean),

  devtool: isDev ? 'source-map' : false,

  optimization: {
    minimize: !isDev,
  },
};

export default config;

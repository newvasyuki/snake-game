import path from 'path';
import { Configuration, IgnorePlugin } from 'webpack';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import webpackNodeExternals from 'webpack-node-externals';
import { MODE } from './constants';

const config = (_, argv): Configuration => {
  // eslint-disable-next-line
  const mode = argv.mode || MODE.DEV;
  return {
    name: 'server',
    target: 'node',
    node: { __dirname: false },
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    mode,
    entry: {
      server: './server/server.ts',
    },
    output: {
      filename: 'server.js',
      path: path.join(__dirname, '../build'),
      publicPath: '/',
      libraryTarget: 'commonjs2',
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
          exclude: ['/node_modules/'],
          use: [
            {
              loader: 'babel-loader',
              // options: {
              //   presets: [
              //     '@babel/preset-react',
              //     '@babel/preset-typescript',
              //     [
              //       '@babel/preset-env',
              //       {
              //         targets: 'defaults',
              //       },
              //     ],
              //   ],
              // },
            },
            {
              loader: 'ts-loader',
            },
          ],
        },
        {
          test: /\.pcss$/,
          loader: 'null-loader',
        },
        {
          test: /\.(react.svg)$/,
          use: ['@svgr/webpack'],
        },
        {
          test: /\.(webp|png|jpe?g|gif)$/,
          loader: 'null-loader',
        },
        {
          test: /\.(ttf|woff|woff2|eot)$/,
          loader: 'null-loader',
        },
      ],
    },

    devtool: mode === MODE.DEV ? 'source-map' : false,

    optimization: {
      minimize: mode === MODE.PROD,
      nodeEnv: false,
    },
    plugins: [
      new IgnorePlugin({
        resourceRegExp: /ssr.client/,
      }),
    ],
    externals: [webpackNodeExternals()],
  };
};

export default config;

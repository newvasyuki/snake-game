import path from 'path';
import webpackNodeExternals from 'webpack-node-externals';
import { commonConfig } from './common.config';
import { MODE } from './constants';

type AppEnv = 'development' | 'production';

const config = {
  ...commonConfig,
  name: 'ssr-client',
  target: 'node',
  node: { __dirname: false },
  mode: (process.env.NODE_ENV as AppEnv) || MODE.DEV,
  entry: {
    client: path.join(__dirname, '../src/app/ssr.tsx'),
  },
  output: {
    filename: 'ssr.client.js',
    path: path.join(__dirname, '../build'),
    publicPath: '/',
    libraryTarget: 'commonjs2',
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
  externals: [webpackNodeExternals()],
};

export default config;

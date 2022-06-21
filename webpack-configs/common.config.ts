import { Configuration } from 'webpack';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

const isDev = process.env.NODE_ENV === 'development';

export const commonConfig: Configuration = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })],
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
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
  devtool: isDev ? 'source-map' : false,

  optimization: {
    minimize: !isDev,
  },
};

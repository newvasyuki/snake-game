import path from 'path';
import { Configuration } from 'webpack';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import { MODE } from './constants';

const config = (_, argv): Configuration => {
  const mode = argv.mode || MODE.DEV;
  return {
    name: 'server',
    target: 'node',
    node: { __dirname: false },
    mode,
    entry: {
      server: './src/server.ts',
    },
    output: {
      filename: '[name].js',
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
          //так как Рома не очень понял для чего нужно .react.svg, и те иконки, которые он добавлял
          //не используют этот суффикс, решил объединить оба правила, хотя по факту достаточно было бы одного .svg$/
          test: /\.(react.svg|svg)$/,
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
  };
};

export default config;

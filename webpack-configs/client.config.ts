import path from 'path';
import { Configuration, HotModuleReplacementPlugin } from 'webpack';
import { commonConfig } from './common.config';
import { MODE } from './constants';

type AppEnv = 'development' | 'production';

const isDev = process.env.NODE_ENV === 'development';

const hmrEntries = isDev && [
  'react-hot-loader/patch',
  'webpack-hot-middleware/client?path=/__webpack_hmr',
];

const entryPath = isDev
  ? path.join(__dirname, '../../../src/client.tsx')
  : path.join(__dirname, '../src/client.tsx');

const config: Configuration = {
  ...commonConfig,
  name: 'client',
  mode: (process.env.NODE_ENV as AppEnv) || MODE.DEV,
  entry: {
    client: [...hmrEntries, entryPath].filter(Boolean),
  },
  output: {
    filename: 'client.js',
    path: path.join(__dirname, '../build'),
    publicPath: '/',
  },
  target: 'web',
  plugins: [isDev && new HotModuleReplacementPlugin()].filter(Boolean),
};

export default config;

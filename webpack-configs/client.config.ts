import path from 'path';
import { Configuration, HotModuleReplacementPlugin, DefinePlugin } from 'webpack';
import { commonConfig } from './common.config';
import { MODE } from './constants';

type AppEnv = 'development' | 'production';

const isDev = process.env.NODE_ENV === 'development';

const hmrEntries = isDev
  ? ['react-hot-loader/patch', 'webpack-hot-middleware/client?path=/__webpack_hmr']
  : [];

const entryPath = isDev
  ? path.join(__dirname, '../../../src/client.tsx')
  : path.join(__dirname, '../src/client.tsx');

const config: Configuration = {
  ...commonConfig,
  name: 'client',
  mode: (process.env.NODE_ENV as AppEnv) || MODE.DEV,
  entry: {
    client: [...hmrEntries, entryPath].filter(Boolean),
    sw: {
      import: './src/services/serviceWorker/sw.js',
      filename: 'sw.js',
    },
  },
  output: {
    filename: 'client.js',
    path: path.join(__dirname, '../build'),
    publicPath: '/',
  },
  target: 'web',
  plugins: [
    isDev && new HotModuleReplacementPlugin(),
    isDev &&
      new DefinePlugin({
        'process.env.SKIP_FORUM_AUTH': JSON.stringify(process.env.SKIP_FORUM_AUTH),
      }),
  ].filter(Boolean),
};

export default config;

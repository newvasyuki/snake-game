import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';
import { webpack } from 'webpack';
import renderMiddleware from './server-render-middleware';

import { clientConfig } from '../../webpack-configs';

console.log('hmrmiddleware start');
console.log('NODE_ENV', process.env.NODE_ENV);

const compiler = webpack({ ...clientConfig, mode: 'development' });

export default [
  devMiddleware(compiler, {
    serverSideRender: true,
    index: false,
    publicPath: clientConfig?.output?.publicPath,
  }),
  hotMiddleware(compiler, { path: `/__webpack_hmr`, log: false, heartbeat: 5 * 1000 }),
  renderMiddleware,
];

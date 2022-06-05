// eslint-disable-next-line import/no-extraneous-dependencies
import devMiddleware from 'webpack-dev-middleware';
// eslint-disable-next-line import/no-extraneous-dependencies
import hotMiddleware from 'webpack-hot-middleware';
import { Configuration, webpack } from 'webpack';
import { RequestHandler } from 'express';
import renderMiddleware from './server-render-middleware';

import { clientConfig } from '../../../webpack';

// export default function hmrMiddleware(config: Configuration): RequestHandler[] {
// }

console.log('hmrmiddleware startnig');

console.log('NODE_ENV', process.env.NODE_ENV);

const compiler = webpack({ ...clientConfig, mode: 'development' });
// console.log(compiler);

export default [
  devMiddleware(compiler, {
    // logLevel: 'error',
    serverSideRender: true,
    index: false,
    publicPath: clientConfig.output.publicPath,
  }),
  hotMiddleware(compiler, { path: `/__webpack_hmr`, log: false, heartbeat: 5 * 1000 }),
  renderMiddleware,
];

/**
 *
 * function getWebpackMiddlewares(config: webpack.Configuration, index: number): RequestHandler[] {
    const compiler = webpack({...config, mode: 'development'});

    return [
        devMiddleware(compiler, {
            logLevel: 'error',
            publicPath: config.output!.publicPath!,
        }),
        hotMiddleware(compiler, {path: `/__webpack_hmr_${index}`}),
    ];
}

export default [
    ...webpackConfigs.reduce((middlewares, config, index) => [
        ...middlewares,
        ...getWebpackMiddlewares(config, index),
    ], []),
    render,
];
 */

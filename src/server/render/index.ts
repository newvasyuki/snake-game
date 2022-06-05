/* eslint-disable no-else-return */
/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
export default () => {
  if (process.env.NODE_ENV === 'development') {
    return require('./hmr-middleware').default;
  } else {
    return require('./server-render-middleware').default;
  }
};

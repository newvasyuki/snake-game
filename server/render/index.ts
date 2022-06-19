/* eslint-disable*/

export default () => {
  if (process.env.NODE_ENV === 'development') {
    return require('./hmr-middleware').default;
  } else {
    return require('./server-render-middleware').default;
  }
};

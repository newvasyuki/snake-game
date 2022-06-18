import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { render as rtlRender, RenderOptions } from '@testing-library/react';
import { legacy_createStore, Store } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from '../store/reducers';
import { ReduxState } from '../store';

type Options = {
  preloadedState: Partial<ReduxState>;
  store?: Store;
  renderOptions?: RenderOptions;
};

const render = (
  ui: React.ReactElement<unknown>,
  {
    preloadedState = {},
    store = legacy_createStore(rootReducer, preloadedState),
    ...renderOptions
  }: Options,
) => {
  const Wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
};

// eslint-disable-next-line import/no-extraneous-dependencies
export * from '@testing-library/react';

export { render };

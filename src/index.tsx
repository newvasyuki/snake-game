import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import './styles/global.pcss';
import { Provider } from "react-redux"
import { createStore, applyMiddleware, Store } from "redux"
import reducer from './store/reducer';
import { DispatchType, UserInfoState, UserInfoAction } from './store/type';
import thunk from "redux-thunk"

const store: Store<UserInfoState, UserInfoAction> & {
  dispatch: DispatchType
} = createStore(reducer, applyMiddleware(thunk))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));

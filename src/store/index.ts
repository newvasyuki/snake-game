import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import { applyMiddleware, AnyAction, legacy_createStore } from 'redux';
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';
import rootReducer from './reducers/index';

// fix from https://github.com/reduxjs/redux-toolkit/issues/587
// Typescript error when dispatching a thunk: Argument of type 'ThunkAction<void, CombinedState<...>>'
export type ReduxState = ReturnType<typeof rootReducer>;
export type TypedDispatch = ThunkDispatch<ReduxState, any, AnyAction>;
export type TypedThunk<ReturnType = void> = ThunkAction<ReturnType, ReduxState, unknown, AnyAction>;
export const useTypedDispatch = () => useDispatch<TypedDispatch>();
export const useTypedSelector: TypedUseSelectorHook<ReduxState> = useSelector;

export const configureStore = (initialState = {}) => {
  const store = legacy_createStore(rootReducer, initialState, applyMiddleware(thunk));
  return { store };
};

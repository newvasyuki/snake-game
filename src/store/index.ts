import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import { applyMiddleware, Store, AnyAction, legacy_createStore } from 'redux';
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';
import rootReducer from './reducers/index';

export const store: Store = legacy_createStore(rootReducer, applyMiddleware(thunk));

// fix from https://github.com/reduxjs/redux-toolkit/issues/587
// Typescript error when dispatching a thunk: Argument of type 'ThunkAction<void, CombinedState<...>>'
export type AppDispatch = typeof store.dispatch;
export type ReduxState = ReturnType<typeof rootReducer>;
export type TypedDispatch = ThunkDispatch<ReduxState, any, AnyAction>;
export type TypedThunk<ReturnType = void> = ThunkAction<ReturnType, ReduxState, unknown, AnyAction>;
export const useTypedDispatch = () => useDispatch<TypedDispatch>();
export const useTypedSelector: TypedUseSelectorHook<ReduxState> = useSelector;

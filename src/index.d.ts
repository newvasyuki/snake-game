import { ReduxState } from './store';

declare global {
  interface Window {
    INITIAL_STATE: ReduxState;
  }
}

import { combineReducers } from 'redux';
import auth from './auth';
import user from './user';
import leaders from './leaders';
import darkModeReducer from './darkMode';
import forumReducer from './forum';

export default combineReducers({
  auth,
  user,
  leaders,
  darkModeReducer,
  forumReducer,
});

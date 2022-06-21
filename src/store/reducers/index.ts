import { combineReducers } from 'redux';
import auth from './auth';
import user from './user';
import leaders from './leaders';

export default combineReducers({
  auth,
  user,
  leaders,
});

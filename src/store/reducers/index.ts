import { combineReducers } from 'redux';
import auth from './auth';
import user from './user';
import leaders from './leaders';
import forum from './forum';

export default combineReducers({
  auth,
  user,
  leaders,
  forum,
});

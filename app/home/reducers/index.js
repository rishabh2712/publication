import { combineReducers } from 'redux';
import {logout} from './logout';
import {ChangePasswordRequest} from './changePassword'

export const home = combineReducers({
  logout,
  ChangePasswordRequest
});

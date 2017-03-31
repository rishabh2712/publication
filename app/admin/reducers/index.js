import { combineReducers } from 'redux';
import {user_fetch} from './fetch_users';
import {enable} from './enable_disable';
import {portal_count} from './portal_analysis';

export const admin_portal = combineReducers({
  user_fetch,
  enable,
  portal_count
});

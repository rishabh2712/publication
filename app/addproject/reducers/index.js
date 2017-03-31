import { combineReducers } from 'redux';
import {addteamrequest} from './addteam';
import {addProjectRequest} from './addproject';

export const addProject = combineReducers({
  addteamrequest,
  addProjectRequest
});

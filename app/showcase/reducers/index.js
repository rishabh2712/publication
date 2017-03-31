import { combineReducers } from 'redux';
import {showcase} from './projects';
import {insights} from './insights';

export const projects_insights = combineReducers({
  showcase,
  insights,
});

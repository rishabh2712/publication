import { combineReducers } from 'redux';
import { home } from './home/reducers';
import { projects_insights } from './showcase/reducers/index.js';
import { publication_details_update } from './publicationdetails/reducers/index.js';
import {login} from './login/reducers/index';
import {reducer as burgerMenu} from 'redux-burger-menu';
import {admin_portal} from './admin/reducers/index';
import {currentRoute} from './common/components/currentRoute/reducers/index';
import {addProject} from './addproject/reducers/index';
import { reducer as formReducer } from 'redux-form';

const appReducer = combineReducers({
  login,
  projects_insights,
  home,
  admin_portal,
  burgerMenu,
  currentRoute,
  addProject,
  publication_details_update,
  form: formReducer
});

const rootReducer = (state, action) => {
 if (action.type === 'LOGOUT_USER'){
   state = undefined;
 }
  return appReducer(state, action)
}

export default rootReducer;

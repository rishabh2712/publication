import {RECEIVE_LOGOUT_REQUEST , LOGOUT_SUCCESS ,LOGOUT_FAILURE} from '../actions/logout.js'

function logoutState(state, action) {
  switch(action.type) {
    case RECEIVE_LOGOUT_REQUEST:
      return Object.assign({}, state, {
        isAuthenticated: true,
        isLoggedOut:false,
        error:false,
      });
    case LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isAuthenticated: false,
        isLoggedOut: true,
        error:false,
      });
    case LOGOUT_FAILURE:
      return Object.assign({}, state, {
        isAuthenticated: false,
        isLoggedOut: false,
        error: action.error
      });
    default:
      return state;
  }
}

export function logout(state = {
  isAuthenticated: false,
  isLoggedOut:false,
  error:null
}, action){
  switch(action.type) {
    case RECEIVE_LOGOUT_REQUEST:
    case LOGOUT_SUCCESS:
    case LOGOUT_FAILURE:
      return Object.assign({}, state, logoutState(state, action));
    default:
      return state;
  }
}

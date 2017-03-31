import {LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE, LOGOUT_USER,FETCH_PROTECTED_DATA_REQUEST ,RECEIVE_PROTECTED_DATA ,RECEIVE_PROTECTED_DATA_FAILED , RESET_USER} from '../actions/constants';

function loginState(state,action){
  switch(action.type) {
    case LOGIN_USER_REQUEST:
      return Object.assign({}, state, {
        'isAuthenticating': true,
        'statusText': null
    });
    case LOGIN_USER_SUCCESS:
    return Object.assign({}, state, {
        'isAuthenticating': false,
        'isAuthenticated': true,
        'token': action.token,
        'statusText': 'You have been successfully logged in.',
        'user_id':action.user_id,
        'viewDemoRequest': action.viewDemoRequest,
        'viewInvites': action.viewInvites,
        'editUser': action.editUser,
        'error':false,
        'role':action.role
    });
    case LOGIN_USER_FAILURE:
    return Object.assign({}, state, {
        'isAuthenticating': false,
        'token': null,
        'userName': null,
        'statusText': action.statusText,
        'error':true,
    });
    case LOGOUT_USER:
    return Object.assign({}, state, {
        'isAuthenticated': false,
        'token': null,
        'userName': null,
        'statusText': 'You have been successfully logged out.'
    });
    case FETCH_PROTECTED_DATA_REQUEST:
    return Object.assign({}, state, {
        'token': action.token,
        'statusText': 'You have been successfully logged in.'
    });

    case RECEIVE_PROTECTED_DATA:
    return Object.assign({}, state, {
        'token': action.token,
        'statusText': 'You have been successfully logged in.'
    });
    default:
    return state;
  }
}

export function login(state = {
    token: null,
    userName: null,
    isAuthenticated: false,
    isAuthenticating: false,
    statusText: null,
},action) {
  switch(action.type)
   {
     case LOGIN_USER_REQUEST:
     case LOGIN_USER_SUCCESS:
     case LOGIN_USER_FAILURE:
     case LOGOUT_USER:
        return Object.assign({},state , loginState(state, action));
      default:
      return state;
    }
  }

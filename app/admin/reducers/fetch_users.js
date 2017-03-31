import { REQUEST_USERS , RECEIVE_USERS_SUCCESS,RECEIVE_USERS_ERROR ,INVALIDATE_USERS } from '../actions/fetch_users';

function users(state, action) {
  switch(action.type) {
      case RECEIVE_USERS_SUCCESS:
        return Object.assign({}, state, {
          isFetching: false,
          didInvalidate: false,
          items: action.data,
          errorFlag: false,
          success: true
        });
      case RECEIVE_USERS_ERROR:
        return Object.assign({}, state, {
          errorFlag:true,
          error: action.error,
          success: false,
          sendingRequest: false
        });
      case REQUEST_USERS:
        return Object.assign({}, state, {
          isFetching:true,
          sendingRequest: true,
          errorFlag: false,
        });
      case INVALIDATE_USERS:
        return Object.assign({}, state, {
          didInvalidate:true,
        });
    default:
      return state;
  }
}

export function user_fetch(state = {
  isFetching: false,
  didInvalidate: false,
  items: [],
  errorFlag: false,
  success: false
}, action){
  switch(action.type) {
    case REQUEST_USERS:
    case RECEIVE_USERS_SUCCESS:
    case RECEIVE_USERS_ERROR:
    case INVALIDATE_USERS:
      return Object.assign({}, state, users(state, action));
    default:
      return state;
  }
}

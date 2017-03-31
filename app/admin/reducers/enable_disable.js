import {CHANGE_STATUS_REQUEST,CHANGE_STATUS_SUCCESS,CHANGE_STATUS_FAILURE,CHANGE_STATUS_INVALIDATE} from '../actions/enable_disable';

function setstatus(state, action){
  switch(action.type) {
    case CHANGE_STATUS_REQUEST:
    return Object.assign({}, state, {
      isRequesting:true,
      user_id:action.id,
    });
    case CHANGE_STATUS_SUCCESS:
    return Object.assign({}, state, {
      isRequesting: false,
      success: true,
      error:false,
      data: action.json,
      user_id:action.id,
    });
    case CHANGE_STATUS_FAILURE:
    return Object.assign({}, state, {
      isRequesting: false,
      success: false,
      errorflag:action.error,
      error:true,
      user_id:action.id,
    });
    case CHANGE_STATUS_INVALIDATE:
    return Object.assign({}, state, {
    isRequesting:false,
    success:false,
    error:false,
    invalidate:true,
    user_id:null,
    });
    default:
      return state;
  }
}

export function enable(state = {
  isRequesting: false,
  didInvalidate: false,
  status:null,
  success:false,
  errorflag:null,
  error:false,
  user_id:null
}, action) {
  switch(action.type) {
    case CHANGE_STATUS_REQUEST:
    case CHANGE_STATUS_SUCCESS:
    case CHANGE_STATUS_FAILURE:
    case CHANGE_STATUS_INVALIDATE:
      return Object.assign({}, state, setstatus(state, action));
    default:
      return state;
  }
}

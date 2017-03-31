import { CHANGE_PASSWORD_REQUEST,CHANGE_PASSWORD_SUCCESS,CHANGE_PASSWORD_FAILURE,CHANGE_PASSWORD_INVALIDATE} from '../actions/changePassword.js';

function changePasswordState(state, action) {
  switch(action.type) {
    case CHANGE_PASSWORD_REQUEST:
      return Object.assign({}, state, {
        isRequesting:true,
        errors:false,
        success:false,
        didInvalidate:false
      });
    case CHANGE_PASSWORD_SUCCESS:
      return Object.assign({}, state, {
        isRequesting:false,
        errors:false,
        success:true,
        message:action.message,
        didInvalidate:false
      });
    case CHANGE_PASSWORD_FAILURE:
      return Object.assign({}, state, {
      isRequesting:false,
      errors:true,
      success:false,
      errorMessage:action.message,
      didInvalidate:false
        });
    case CHANGE_PASSWORD_INVALIDATE:
      return Object.assign({}, state, {
        isRequesting:false,
        errors:false,
        success:false,
        didInvalidate:true
        });
    default:
      return state;
  }
}

export function ChangePasswordRequest(state = {
  isRequesting:false,
  errors:false,
  success:false,
  didInvalidate:false,
  errorMessage:null,
  message:null
}, action){
  switch(action.type) {
    case CHANGE_PASSWORD_REQUEST:
    case CHANGE_PASSWORD_SUCCESS:
    case CHANGE_PASSWORD_FAILURE:
      return Object.assign({}, state, changePasswordState(state, action));
    default:
      return state;
  }
}

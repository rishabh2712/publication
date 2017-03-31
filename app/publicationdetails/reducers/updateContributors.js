import {
REQUEST_CONTRIBUTORS_UPDATE,
REQUEST_CONTRIBUTORS_UPDATE_SUCCESS,
REQUEST_CONTRIBUTORS_UPDATE_FAILURE,
REQUEST_CONTRIBUTORS_UPDATE_INVALIDATE} from '../actions';

function setcontributorsdetails(state, action) {
  switch(action.type) {
    case REQUEST_CONTRIBUTORS_UPDATE:
      return Object.assign({}, state, {
        isrequesting: true,
        didInvalidate: false,
        publicationId: -1,
        success:false,
        errors:false,
        successmessage:null,
        errormessage:null
      });
    case REQUEST_CONTRIBUTORS_UPDATE_INVALIDATE:
      return Object.assign({}, state, {
        isrequesting: false,
        didInvalidate: true,
        success:false,
        errors:false,
        successmessage:null,
        errormessage:null
      });
    case REQUEST_CONTRIBUTORS_UPDATE_SUCCESS:
      return Object.assign({}, state, {
        isrequesting:false,
        didInvalidate:false,
        success:true,
        errors:false,
        successmessage:action.message,
        errormessage:null
      });
    case REQUEST_CONTRIBUTORS_UPDATE_FAILURE:
      return Object.assign({}, state, {
        isrequesting: false,
        didInvalidate: false,
        publicationId: -1,
        success:false,
        errors:true,
        successmessage:null,
        errormessage:action.error
      });
    default:
      return state;
  }
}

export function updatecontributorsDetails(state = {
  isrequesting: false,
  didInvalidate: false,
  publicationId: -1,
  success:false,
  errors:false,
  successmessage:null,
  errormessage:null
}, action) {
  switch(action.type) {
    case REQUEST_CONTRIBUTORS_UPDATE:
    case REQUEST_CONTRIBUTORS_UPDATE_SUCCESS:
    case REQUEST_CONTRIBUTORS_UPDATE_FAILURE:
    case REQUEST_CONTRIBUTORS_UPDATE_INVALIDATE:
      return Object.assign({}, state, setcontributorsdetails(state, action));
    default:
      return state;
  }
}

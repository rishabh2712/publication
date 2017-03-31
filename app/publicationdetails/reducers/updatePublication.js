import {REQUEST_PUBLICATION_UPDATE,REQUEST_PUBLICATION_UPDATE_SUCCESS,RECEIVE_PUBLICATIONDETAILS_ERROR,REQUEST_PUBLICATION_UPDATE_FAILURE,INVALIDATE_PUBLICATION_UPDATE ,REQUEST_PUBLICATION_DELETE,PUBLICATION_DELETE_SUCCESS,PUBLICATION_DELETE_FAILURE,PUBLICATION_DELETE_INVALIDATE} from '../actions';

function setpublicatondetails(state, action) {
  switch(action.type) {
    case REQUEST_PUBLICATION_UPDATE:
      return Object.assign({}, state, {
        isrequesting: true,
        didInvalidate: false,
        publicationId: -1,
        success:false,
        errors:false,
        successmessage:null,
        errormessage:null
      });
    case INVALIDATE_PUBLICATION_UPDATE:
      return Object.assign({}, state, {
        isrequesting: false,
        didInvalidate: true,
        publicationId: -1,
        success:false,
        errors:false,
        successmessage:null,
        errormessage:null
      });
    case REQUEST_PUBLICATION_UPDATE_SUCCESS:
      return Object.assign({}, state, {
        isrequesting: false,
        didInvalidate: false,
        publicationId: action.id,
        success:true,
        errors:false,
        successmessage:action.message,
        errormessage:null
      });
    case RECEIVE_PUBLICATIONDETAILS_ERROR:
      return Object.assign({}, state, {
        isrequesting: false,
        didInvalidate: false,
        publicationId: -1,
        success:false,
        errors:true,
        successmessage:null,
        errormessage:action.error
      });
    case REQUEST_PUBLICATION_DELETE:
    return Object.assign({}, state, {
      isrequesting: true,
      didInvalidate: false,
      publicationId: action.id,
      success:false,
      errors:true,
      successmessage:null,
      errormessage:null,
    });
    case PUBLICATION_DELETE_SUCCESS:
    return Object.assign({}, state, {
      isrequesting: false,
      didInvalidate: false,
      publicationId: action.id,
      success_delete:true,
      errors:false,
      success_delete_message:action.message,
      errormessage:null
    });
    case PUBLICATION_DELETE_FAILURE:
    return Object.assign({}, state, {
      isrequesting: false,
      didInvalidate: false,
      publicationId: action.id,
      success:false,
      errors:true,
      successmessage:null,
      errormessage:action.error
    });
    case PUBLICATION_DELETE_INVALIDATE:
    return Object.assign({}, state, {
      isrequesting: false,
      didInvalidate: false,
      publicationId: -1,
      success:false,
      errors:false,
      successmessage:null,
      errormessage:null,
      success_delete:null,
      success_delete_message:null
    });
    default:
      return state;
  }
}

export function updatepublicationDetails(state = {
  isrequesting: false,
  didInvalidate: false,
  publicationId: -1,
  success:false,
  errors:false,
  successmessage:null,
  errormessage:null,
  success_delete:null,
success_delete_message:null
}, action) {
  switch(action.type) {
    case REQUEST_PUBLICATION_UPDATE:
    case REQUEST_PUBLICATION_UPDATE_SUCCESS:
    case REQUEST_PUBLICATION_UPDATE_FAILURE:
    case INVALIDATE_PUBLICATION_UPDATE:
    case REQUEST_PUBLICATION_DELETE:
    case PUBLICATION_DELETE_SUCCESS:
    case PUBLICATION_DELETE_FAILURE:
    case PUBLICATION_DELETE_INVALIDATE:
      return Object.assign({}, state, setpublicatondetails(state, action));
    default:
      return state;
  }
}

import {REQUEST_PUBLICATIONDETAILS ,INVALIDATE_PUBLICATIONDETAILS,RECEIVE_PUBLICATIONDETAILS_SUCCESS,UPDATE_LIKE_STATUS,LIKE_STATUS,RECEIVE_PUBLICATIONDETAILS_ERROR} from '../actions';

function setpublicationDetails(state, action) {
  switch(action.type) {
    case REQUEST_PUBLICATIONDETAILS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false,
        publicationId: action.id
      });
    case INVALIDATE_PUBLICATIONDETAILS:
      return Object.assign({}, state, {
        initialized: false,
        isFetching: false,
        didInvalidate: true
      });
    case RECEIVE_PUBLICATIONDETAILS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        error: false,
        details: action.json,
        initialized: true,
      });
    case RECEIVE_PUBLICATIONDETAILS_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        error: action.error
      });
    case UPDATE_LIKE_STATUS:
    return Object.assign({}, state, {
      count:action.count,
      like_status:action.status
    });
    case LIKE_STATUS:
      return Object.assign({}, state, {
        like_status:action.status,
        count:action.count
      });

    default:
      return state;
  }
}

export function publicationDetails(state = {
  isFetching: false,
  didInvalidate: false,
  publicationId: -1,
  details: {},
  initialized: false,
  like_status:false,
  count:null
}, action) {
  switch(action.type) {
    case INVALIDATE_PUBLICATIONDETAILS:
    case REQUEST_PUBLICATIONDETAILS:
    case RECEIVE_PUBLICATIONDETAILS_SUCCESS:
    case RECEIVE_PUBLICATIONDETAILS_ERROR:
    case LIKE_STATUS:
    case UPDATE_LIKE_STATUS:
      return Object.assign({}, state, setpublicationDetails(state, action));
    default:
      return state;
  }
}

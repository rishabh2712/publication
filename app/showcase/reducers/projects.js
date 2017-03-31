import { REQUEST_PROJECTS, RECEIVE_PROJECTS_SUCCESS, RECEIVE_PROJECTS_ERROR, INVALIDATE_PROJECTS,REQUEST_PUBLICATIONS, PUBLICATION_FETCH_SUCCESS , PUBLICATION_FETCH_ERROR, PUBLICATION_FETCH_INVALIDATE} from '../actions';

function projectState(state, action) {
  switch(action.type) {
    case REQUEST_PUBLICATIONS:
      return Object.assign({}, state, {
        fetchingPublications: true,
        didInvalidate: false
      });
    case PUBLICATION_FETCH_SUCCESS:
      return Object.assign({}, state, {
        fetchingPublications: false,
        publications:action.publications,
        didInvalidate: false
      });
    case PUBLICATION_FETCH_ERROR:
      return Object.assign({}, state, {
        fetchingPublications: false,
        error:true,
        errormessage:action.error,
        didInvalidate: false
      });
    case PUBLICATION_FETCH_INVALIDATE:
      return Object.assign({}, state, {
        etchingPublications:false,
        publications:[],
        error:false,
        errormessage:null,
      });
    case REQUEST_PROJECTS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });
    case INVALIDATE_PROJECTS:
      return Object.assign({}, state, {
        didInvalidate: true
      });
    case RECEIVE_PROJECTS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        error: false,
        items: action.projects,
        lastUpdated: action.receivedAt,
        publication_id:action.publication_id,
      });
    case RECEIVE_PROJECTS_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        error: action.error
      });
    default:
      return state;
  }
}

export function showcase(state = {
  fetchingPublications:false,
  publications:[],
  error:false,
  errormessage:null,
  isFetching: false,
  didInvalidate: false,
  items: [],
  showComments:false,
  projectid:null,
  publication_id:1
}, action){
  switch(action.type) {
    case INVALIDATE_PROJECTS:
    case REQUEST_PROJECTS:
    case RECEIVE_PROJECTS_SUCCESS:
    case RECEIVE_PROJECTS_ERROR:
    case REQUEST_PUBLICATIONS:
    case PUBLICATION_FETCH_SUCCESS:
    case PUBLICATION_FETCH_ERROR:
    case PUBLICATION_FETCH_INVALIDATE:
      return Object.assign({}, state, projectState(state, action));
    default:
      return state;
  }
}

import {FETCH_USER_COUNT,
FETCH_USER_COUNT_ERROR,
FETCH_PUBLICATION_COUNT,
FETCH_PUBLICATION_COUNT_ERROR,
FETCH_INSIGHT_COUNT_ERROR,
FETCH_INSIGHT_COUNT} from '../actions/index';

function countState(state, action) {
  switch(action.type) {
      case FETCH_USER_COUNT:
        return Object.assign({}, state, {
          user_count:action.count,
          user_count_error:false
        });
      case FETCH_USER_COUNT_ERROR:
        return Object.assign({}, state, {
          user_count:null,
          user_count_error:action.error
        });
      case FETCH_PUBLICATION_COUNT:
        return Object.assign({}, state, {
          publication_count:action.count,
          publication_count_error:false,
        });
      case FETCH_PUBLICATION_COUNT_ERROR:
        return Object.assign({}, state, {
          publication_count:null,
          publication_count_error:action.error,
        });
      case FETCH_INSIGHT_COUNT_ERROR:
        return Object.assign({}, state, {
          insight_count:null,
          insight_count_error:action.error
        });
      case FETCH_INSIGHT_COUNT:
        return Object.assign({}, state, {
          insight_count:action.count,
          insight_count_error:false
        });
    default:
      return state;
  }
}

export function portal_count(state = {
  user_count:null,
  user_count_error:null,
  publication_count:null,
  publication_count_error:null,
  insight_count:null,
  insight_count_error:null
}, action){
  switch(action.type) {
    case FETCH_USER_COUNT:
    case FETCH_USER_COUNT_ERROR:
    case FETCH_PUBLICATION_COUNT:
    case FETCH_PUBLICATION_COUNT_ERROR:
    case FETCH_INSIGHT_COUNT_ERROR:
    case FETCH_INSIGHT_COUNT:
      return Object.assign({}, state, countState(state, action));
    default:
      return state;
  }
}

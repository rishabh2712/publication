import { REQUEST_INSIGHTS,INVALIDATE_INSIGHTS,RECEIVE_INSIGHTS_SUCCESS,RECEIVE_INSIGHTS_ERROR,REQUEST_ADD_INSIGHTS,REQUEST_ADD_INSIGHTS_SUCCESS,REQUEST_ADD_INSIGHTS_FAILURE,REQUEST_ADD_INSIGHTS_INVALIDATE} from '../actions/Insights';

function insightState(state, action) {
  switch(action.type) {
    case REQUEST_INSIGHTS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });
    case INVALIDATE_INSIGHTS:
      return Object.assign({}, state, {
        didInvalidate: true
      });
    case RECEIVE_INSIGHTS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        error: false,
        items: action.insights,
        errorflag:false
      });
    case RECEIVE_INSIGHTS_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        error: action.error,
        errorflag:true
      });
    case REQUEST_ADD_INSIGHTS:
      return Object.assign({}, state, {
        isrequesting:true
      });
    case REQUEST_ADD_INSIGHTS_SUCCESS:
      return Object.assign({}, state, {
        success:true,
        successmessage:action.msg,
        isrequesting: false,
      });
    case REQUEST_ADD_INSIGHTS_FAILURE:
      return Object.assign({}, state, {
        errorflag:true,
        errormessage:action.error
      });
    case REQUEST_ADD_INSIGHTS_INVALIDATE:
    return Object.assign({}, state, {
      invalidate:true,
      success:null,
      errorflag:null,
      successmessage:null,
      errormessage:null
    });
    default:
      return state;
  }
}

export function insights(state = {
  isFetching: false,
  didInvalidate: false,
  items: [],
  showComments:false,
  projectid:null,
  isrequesting:false,
  success:null,
  errorflag:null,
  invalidate:false,
  successmessage:null,
  errormessage:null
}, action){
  switch(action.type) {
    case REQUEST_INSIGHTS:
    case INVALIDATE_INSIGHTS:
    case RECEIVE_INSIGHTS_SUCCESS:
    case RECEIVE_INSIGHTS_ERROR:
    case REQUEST_ADD_INSIGHTS:
    case REQUEST_ADD_INSIGHTS_SUCCESS:
    case REQUEST_ADD_INSIGHTS_FAILURE:
    case REQUEST_ADD_INSIGHTS_INVALIDATE:
      return Object.assign({}, state, insightState(state, action));
    default:
      return state;
  }
}

import { CURRENT_ROUTE , INVALIDATE_ROUTE } from '../actions';

function routeState(state, action) {
  switch(action.type) {
    case CURRENT_ROUTE:
      return Object.assign({}, state, {
        Route:action.route,
      });
    case INVALIDATE_ROUTE:
      return Object.assign({}, state, {
        Route:null,
      });
    default:
      return state;
  }
}

export function currentRoute(state = {
  Route:null,
}, action){
  switch(action.type) {
    case CURRENT_ROUTE:
    case INVALIDATE_ROUTE:
      return Object.assign({}, state, routeState(state, action));
    default:
      return state;
  }
}

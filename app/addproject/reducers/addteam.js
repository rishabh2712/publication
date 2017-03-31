import { REQUEST_ADDTEAM,INVALIDATE_ADDTEAM,ADDTEAM_SUCCESS,ADDTEAM_ERROR,REQUEST_VIEWTEAM ,SELECTED_USER} from '../actions/addteam.js';

 function addteamState(state, action) {
   switch(action.type) {
     case REQUEST_ADDTEAM:
       return Object.assign({}, state, {
         isAddTeamRequesting:true,
         errors:false,
         success:false,
         didInvalidate:false,
         project_id:action.project_id
       });
     case ADDTEAM_SUCCESS:
       return Object.assign({}, state, {
         isAddTeamRequesting:false,
         isRequesting:false,
         errors:false,
         success:true,
         successmessage:action.message,
         didInvalidate:false
       });

     case ADDTEAM_ERROR:
       return Object.assign({}, state, {
       isRequesting:false,
       errors:true,
       errorflag:action.error,
       success:false,
       didInvalidate:false
         });
     case INVALIDATE_ADDTEAM:
       return Object.assign({}, state, {
         isRequesting:false,
         errors:false,
         success:false,
         didInvalidate:true,
         errorflag:null,
         successmessage:null
       });
      case REQUEST_VIEWTEAM:
      return Object.assign({}, state, {
        requestingteam:true,
        errors:false,
        success:false,
        didInvalidate:true,
        team:action.json.team_members
      });
      case SELECTED_USER:
      return Object.assign({}, state, {
        selected_user: action.id,
      });
        break;
     default:
       return state;

   }
 }

 export function addteamrequest(state = {
   isAddTeamRequesting:false,
   isRequesting:false,
   errors:false,
   success:false,
   didInvalidate:false,
   errorflag:null,
   selected_user:null,
   team:[],
 }, action){
   switch(action.type) {
     case REQUEST_VIEWTEAM:
     case REQUEST_ADDTEAM:
     case INVALIDATE_ADDTEAM:
     case ADDTEAM_SUCCESS:
     case ADDTEAM_ERROR:
     case SELECTED_USER:
       return Object.assign({}, state, addteamState(state, action));
     default:
       return state;
   }
 }

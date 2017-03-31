import { REQUEST_ADDPROJECT,INVALIDATE_ADDPROJECT,ADDPROJECT_SUCCESS,ADDPROJECT_ERROR,CATEGORY,ORGANIZATIONS,REQUEST_CATEGORY} from '../actions/index.js';

 function addprojectState(state, action) {
   switch(action.type) {
     case REQUEST_ADDPROJECT:
       return Object.assign({}, state, {
         isRequesting:true,
         errors:false,
         success:false,
         didInvalidate:false
       });
     case ADDPROJECT_SUCCESS:
       return Object.assign({}, state, {
         isRequesting:false,
         errors:false,
         success:true,
         successmessage:action.message,
         didInvalidate:false,
         project_id:action.id
       });
     case ADDPROJECT_ERROR:
       return Object.assign({}, state, {
       isRequesting:false,
       errors:true,
       errorflag:action.error,
       success:false,
       didInvalidate:false
         });
     case INVALIDATE_ADDPROJECT:
       return Object.assign({}, state, {
         isRequesting:false,
         errors:false,
         success:false,
         didInvalidate:true,
         errorflag:null,
         successmessage:null
       });

      case REQUEST_CATEGORY:
      return Object.assign({}, state, {
        categories: action.categories
        });

      case CATEGORY:
      return Object.assign({}, state, {
        categories: action.categories
        });
      case ORGANIZATIONS:
      return Object.assign({}, state, {
        organizations: action.orgs,
        });

     default:
       return state;
   }
 }

 export function addProjectRequest(state = {
   isRequesting:false,
   errors:false,
   success:false,
   didInvalidate:false,
   categories:[],
   errorflag:null,
   organizations:[],
 }, action){
   switch(action.type) {
     case REQUEST_ADDPROJECT:
     case INVALIDATE_ADDPROJECT:
     case ADDPROJECT_SUCCESS:
     case ADDPROJECT_ERROR:
     case CATEGORY:
     case ORGANIZATIONS:
     case REQUEST_CATEGORY:
       return Object.assign({}, state, addprojectState(state, action));
     default:
       return state;
   }
 }

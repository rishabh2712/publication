import fetch from 'isomorphic-fetch';
import { apiEndPoint } from '../../config';

export const CHANGE_PASSWORD_REQUEST="CHANGE_PASSWORD_REQUEST";
export const CHANGE_PASSWORD_SUCCESS="CHANGE_PASSWORD_SUCCESS";
export const CHANGE_PASSWORD_FAILURE="CHANGE_PASSWORD_FAILURE";
export const CHANGE_PASSWORD_INVALIDATE="CHANGE_PASSWORD_INVALIDATE";

export function change_password_request(){
  return{
    type: CHANGE_PASSWORD_REQUEST,
  }
}

export function change_password_success(json){
  return{
    type: CHANGE_PASSWORD_SUCCESS,
    message:json.message

  }
}

export function change_password_failure(message){
  return{
    type: CHANGE_PASSWORD_FAILURE,
    message:message
  }
}
export function change_password_invalidate(){
  return{
    type: CHANGE_PASSWORD_INVALIDATE,
  }
}

export function change_password(currentpassword,newpassword,passwordconfirmation){
    let msg=" ";
    if(currentpassword==''){
      msg="Enter your current password";
      return(dispatch)=>{
      dispatch(change_password_failure(msg));
      }
    }else if(newpassword!=passwordconfirmation){
      msg="Password does not match the confirm password";
      return(dispatch)=>{
        dispatch(change_password_failure(msg));
      }
    }else if(newpassword.length<6){
      msg="Password must be of minimum 6 characters";
      return(dispatch)=>{
        dispatch(change_password_failure(msg));
      }
    }else{
      return (dispatch,getState) => {
        dispatch(change_password_request());
        let user_id = getState().login.user_id;
        let user = {
            user_id: getState().login.user_id,
            current_password: currentpassword,
            password:newpassword,
            password_confirmation:passwordconfirmation
          };
        return fetch(apiEndPoint + 'users/update_password/'+user_id, {
          method: 'PUT',
          credentials: 'include',
          headers: {
            'Authorization': getState().login.token,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({user})
          })
        .then(response => response.json().then(json => ({
            status: response.status,
            json
          })
        ))
        .then(({status, json}) => {
          if(status >= 400) {
              dispatch(change_password_failure(json.errors));
          } else {
            dispatch(change_password_success(json))
          }
        })
        .catch(error => console.log(error));
      };
    }
  }

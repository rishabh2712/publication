import fetch from 'isomorphic-fetch';
import { apiEndPoint } from '../../config';
import {logout_user} from '../../login/actions/index.js'

export const RECEIVE_LOGOUT_REQUEST='RECEIVE_LOGOUT_REQUEST';
export const LOGOUT_SUCCESS='LOGOUT_SUCCESS';
export const LOGOUT_FAILURE='LOGOUT_FAILURE';


function request_logout(){
  return{
    type:RECEIVE_LOGOUT_REQUEST,
  }
}

function logout_success(){
  return{
    type:LOGOUT_SUCCESS,
  }
}
function logout_failure(error){
  return{
    type:LOGOUT_FAILURE,
    error
  }
}

export function logoutUser(){
  return function(dispatch ,getState){
  dispatch(request_logout());
  let id=getState().login.user_id;
  return fetch((apiEndPoint + 'sessions/'+id) , {
      method: 'delete'
      })
      .then(({status}) => {
        if(status >= 400) {
          dispatch(logout_failure())
        } else {
          dispatch(logout_success());
          dispatch(logout_user());
        }
      })
      .catch(error => console.log(error));
    }
  }

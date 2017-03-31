import fetch from 'isomorphic-fetch';
import { apiEndPoint } from '../../config';

export const REQUEST_ADDTEAM = 'REQUEST_ADDTEAM';
export const INVALIDATE_ADDTEAM = 'INVALIDATE_ADDTEAM';
export const ADDTEAM_SUCCESS = 'ADDTEAM_SUCCESS';
export const ADDTEAM_ERROR = 'ADDTEAM_ERROR';
export const REQUEST_VIEWTEAM="REQUEST_VIEWTEAM";
export const SELECTED_USER="SELECTED_USER";

export function requestviewteam(json){
  return{
    type:REQUEST_VIEWTEAM,
    json
  }
}

export function requestAddteam() {
  return {
    type: REQUEST_ADDTEAM,
  };
}

export function invalidateaddteam() {
  return {
    type: INVALIDATE_ADDTEAM,
  };
}

function addteamsuccess(message) {
  return {
    type: ADDTEAM_SUCCESS,
    message
  }
}

function addteamerror(error) {
  return {
    type: ADDTEAM_ERROR,
    error: error
  }
}

export function selectedUser(id){
  return{
    type: SELECTED_USER,
    id
  }
}

export function addteam(team_member){
  let msg="";
  if(team_member.first_name=="" || team_member.last_name==""|| team_member.email=="" ||  team_member.role=="" ||  team_member.team_member_picture==""){
    return(dispatch)=>{
      msg="Fields cannot be left empty!";
      dispatch(addteamerror(msg));
    }
  }else{
  return (dispatch,getState) => {
    dispatch(requestAddteam());
    return fetch((apiEndPoint + 'team_members/'),{
            credentials: 'include',
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': getState().login.token
            },
            body: JSON.stringify({team_member})
          })
          .then(response => response.json().then(json => ({
              status: response.status,
              json
            })
          ))
          .then(({status, json}) => {
            if(status >= 400){
                dispatch(addteamerror(json.errors));
                }
            else {
               dispatch(addteamsuccess(json.message))
             }
          })
          .catch(error => dispatch(addteamerror(error.message)));
        }
      }
    }


export function fetchusers(id){
  return (dispatch , getState) => {
    return fetch((apiEndPoint + 'projects/'+id),{
      method:'get',
      headers: {
        'Authorization': getState().login.token
      }
    })
      .then(response => response.json())
      .then(json => dispatch(requestviewteam(json)))
  }
}

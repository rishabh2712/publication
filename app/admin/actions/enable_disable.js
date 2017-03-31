import fetch from 'isomorphic-fetch';
import { apiEndPoint } from '../../config';
import {fetchUser} from './fetch_users'

export const CHANGE_STATUS_REQUEST="CHANGE_STATUS_REQUEST";
export const CHANGE_STATUS_SUCCESS="CHANGE_STATUS_SUCCESS";
export const CHANGE_STATUS_FAILURE="CHANGE_STATUS_FAILURE";
export const CHANGE_STATUS_INVALIDATE="CHANGE_STATUS_INVALIDATE";

export function change_status_request(id){
  return{
    type: CHANGE_STATUS_REQUEST,
    id
  }
}

export function change_status_success(json,id){
  return{
    type: CHANGE_STATUS_SUCCESS,
    json,id
  }
}

export function change_status_failure(error,id){
  return{
    type: CHANGE_STATUS_FAILURE,
    error,id
  }
}

export function change_status_invalidate(){
  return{
    type: CHANGE_STATUS_INVALIDATE,
  }
}

export function changestatus(status,id){
  return (dispatch,getState) => {
    dispatch(change_status_request(id));
    return fetch((apiEndPoint +'users/'+id+'/access/'+status),{
      method: 'put',
      headers: {
        'Authorization': getState().login.token
      }
    })
    .then(response => response.json().then(json => ({
        status: response.status,
        json
      })
    ))
    .then(({status, json}) => {
      if(status >= 400) {
        dispatch(change_status_failure(json.errors))
      } else {
        dispatch(change_status_success(json,id));
        dispatch(change_status_invalidate())
        dispatch(fetchUser());
      }
    })
    .catch(error =>dispatch(change_status_failure(error.message, id)))
   };
  }

import fetch from 'isomorphic-fetch';
import { apiEndPoint } from '../../config';

export const REQUEST_USERS = "REQUEST_USERS";
export const RECEIVE_USERS_SUCCESS = "RECEIVE_USERS_SUCCESS";
export const RECEIVE_USERS_ERROR = "RECEIVE_USERS_ERROR";
export const INVALIDATE_USERS ="INVALIDATE_USERS";

export function requestuser(){
  return{
    type: REQUEST_USERS
  }
}

export function recieve_user_success(json){
  return{
    type: RECEIVE_USERS_SUCCESS ,
    data:json
  }
}

export function recieve_user_error(error){
  return{
    type: RECEIVE_USERS_ERROR ,
    error:error
  }
}
export function invalidateUsers() {
  return {
    type: INVALIDATE_USERS
  };
}

export function fetchUser(){
  return function(dispatch, getState){
    dispatch(requestuser());
    return fetch((apiEndPoint + 'users/'),{
      method: 'get',
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
        dispatch(recieve_user_error(json.errors))
      } else {
        dispatch(recieve_user_success(json))
      }
    })
    .catch(error => dispatch(recieve_user_error(error.message)));
    };
  }

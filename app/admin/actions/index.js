import fetch from 'isomorphic-fetch';
import { apiEndPoint } from '../../config';

export const FETCH_USER_COUNT="FETCH_USER_COUNT";
export const FETCH_USER_COUNT_ERROR="FETCH_USER_COUNT_ERROR";
export const FETCH_PUBLICATION_COUNT="FETCH_PUBLICATION_COUNT";
export const FETCH_PUBLICATION_COUNT_ERROR="FETCH_PUBLICATION_COUNT_ERROR";
export const FETCH_INSIGHT_COUNT_ERROR="FETCH_INSIGHT_COUNT_ERROR";
export const FETCH_INSIGHT_COUNT="FETCH_INSIGHT_COUNT";


function fetch_user_count(count){
  return{
    type: FETCH_USER_COUNT,
    count
  }
}

function fetch_user_count_error(error){
  return{
    type: FETCH_USER_COUNT_ERROR,
    error
  }
}

function fetch_publication_count(count){
  return{
    type: FETCH_PUBLICATION_COUNT,
    count
  }
}

function fetch_publication_count_error(error){
  return{
    type: FETCH_PUBLICATION_COUNT,
    error
  }
}

function fetch_insight_count(count){
  return{
    type:FETCH_INSIGHT_COUNT,
    count
  }
}

function fetch_insight_count_error(error){
  return{
    type:FETCH_INSIGHT_COUNT,
    error
  }
}

export function user_count(){
  return function(dispatch, getState){
    return fetch((apiEndPoint + 'user/count'),{
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
        dispatch(fetch_user_count_error(json.errors))
      } else {
        dispatch(fetch_user_count(json.no_of_users))
      }
    })
    .catch(error => dispatch(fetch_user_count_error(error.message)));
    };
  }

export function insight_count(){
  return function(dispatch, getState){
    return fetch((apiEndPoint + 'insight/count'),{
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
        dispatch(fetch_insight_count_error(json.errors))
      } else {
        dispatch(fetch_insight_count(json.no_of_insights))
      }
    })
    .catch(error => dispatch(fetch_insight_count_error(error)));
    };
  }

export function publication_count(){
  return function(dispatch, getState){
    return fetch((apiEndPoint + 'project/count'),{
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
        dispatch(fetch_publication_count_error(json.errors))
      } else {
        dispatch(fetch_publication_count(json.no_of_projects))
      }
    })
    .catch(error => dispatch(fetch_publication_count_error(error.message)));
    };
  }

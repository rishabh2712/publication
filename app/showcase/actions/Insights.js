import fetch from 'isomorphic-fetch';
import { apiEndPoint } from '../../config';

export const REQUEST_INSIGHTS = 'REQUEST_INSIGHTS';
export const INVALIDATE_INSIGHTS = 'INVALIDATE_INSIGHTS';
export const RECEIVE_INSIGHTS_SUCCESS = 'RECEIVE_INSIGHTS_SUCCESS';
export const RECEIVE_INSIGHTS_ERROR = 'RECEIVE_INSIGHTS_ERROR';
export const REQUEST_ADD_INSIGHTS = "REQUEST_ADD_INSIGHTS";
export const REQUEST_ADD_INSIGHTS_SUCCESS = "REQUEST_ADD_INSIGHTS_SUCCESS";
export const REQUEST_ADD_INSIGHTS_FAILURE ="REQUEST_ADD_INSIGHTS_FAILURE";
export const REQUEST_ADD_INSIGHTS_INVALIDATE="REQUEST_ADD_INSIGHTS_INVALIDATE";


function requestinsights() {
  return {
    type: REQUEST_INSIGHTS
  };
}

export function invalidateinsights() {
  return {
    type: INVALIDATE_INSIGHTS
  };
}

function receiveInsightsSuccess(json) {
  return {
    type: RECEIVE_INSIGHTS_SUCCESS,
    insights: json,
    receivedAt: Date.now()
  };
}

function receiveInsightsError(error) {
  return {
    type: RECEIVE_INSIGHTS_ERROR,
    error: error
  };
}

function requestaddinsight(){
  return{
    type:REQUEST_ADD_INSIGHTS,
  }
}

function addinsightsuccess(msg){
  return{
    type:REQUEST_ADD_INSIGHTS_SUCCESS,
    msg
  }
}
function addinsightfailure(error){
  return{
    type:REQUEST_ADD_INSIGHTS_FAILURE,
    error
  }
}

export function invalidateaddinsight(){
  return{
    type:REQUEST_ADD_INSIGHTS_INVALIDATE
  }
}

export function fetchInsights() {
  return (dispatch, getState) => {
    dispatch(requestinsights());
    return fetch((apiEndPoint + 'insights'), {
      credentials: 'include',
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
          dispatch(receiveInsightsError(json.errors))
        } else {
          dispatch(receiveInsightsSuccess(json))
        }
      })
      .catch(error => dispatch(receiveInsightsError(error.message)));
  };
}

export function addInsight(insight){
  return(dispatch,getState) => {
    if(insight.title=="" || insight.insight_image==""){
      let error="Fields cannot be left empty";
      dispatch(receiveInsightsError(error));
    }else{
    dispatch(requestaddinsight());
    return fetch((apiEndPoint + 'insights'),{
      credentials: 'include',
      method:'post',
      headers: {
        'Authorization': getState().login.token,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({insight})
    }).then(response => response.json().then(json => ({
          status: response.status,
          json
        })
      ))
      .then(({status, json}) => {
        if(status >= 400) {
          dispatch(addinsightfailure(json.errors))
        } else {
          let msg="Insight added successfully!"
          dispatch(addinsightsuccess(msg));
        }
      })
      .catch(error => dispatch(receiveInsightsError(error.message)));
      } 
    }
  }

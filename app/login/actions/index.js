import {LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE, LOGOUT_USER,FETCH_PROTECTED_DATA_REQUEST ,RECEIVE_PROTECTED_DATA} from './constants';
import fetch from 'isomorphic-fetch';
import { apiEndPoint } from '../../config';



export function loginUserSuccess(json) {
  return {
    type: LOGIN_USER_SUCCESS,
    token: json.auth_token,
    user_id:json.id,
    viewDemoRequest: json.permission.view_demo_request,
    viewInvites: json.permission.view_invites,
    editUser: json.permission.edit_user,
    role:json.permission.role
  };
}

export function loginUserFailure(error) {
  return {
    type: LOGIN_USER_FAILURE,
    statusText:error
  }
}

export function loginUserRequest() {
  return {
    type: LOGIN_USER_REQUEST
  }
}

export function logout_user() {
    return {
        type: LOGOUT_USER
    }
}

export function loginUser(state) {
    return function(dispatch) {
      if(state.email=="" || state.password== ""){
          let msg="Invalid username or passowrd"
          dispatch(loginUserFailure(msg));
      }else{
        let session = {
            email: state.email,
            password: state.password
          };
        dispatch(loginUserRequest());
        return fetch(apiEndPoint + 'sessions', {
            method: 'post',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
                body: JSON.stringify({session})
            })
            .then(response => response.json().then(json => ({
                status: response.status,
                json
              })
            ))
            .then(({status, json}) => {
              if(status >= 400) {
                dispatch(loginUserFailure(json.errors))
              } else {
                dispatch(loginUserSuccess(json))
              }
            })
            .catch(errors=>{console.log(errors)})
          }
        };
      }

export function receiveProtectedData(data)
 {
    return {
        type: RECEIVE_PROTECTED_DATA,
        payload: {
            data: data
        }
    }
  }
export function fetchProtectedDataRequest() {
  return {
    type: FETCH_PROTECTED_DATA_REQUEST
  }
}

export function fetchProtectedData(token) {
    return (dispatch, state) => {
        dispatch(fetchProtectedDataRequest());
        return fetch(apiEndPoint+'projects', {
                credentials: 'include',
                headers: {
                    'Authorization': `${token}`
                }
            })
            .then(function(response) { return response.json(); })
            .then(json => {
                dispatch(receiveProtectedData(json))
              }
            )
          }
        }

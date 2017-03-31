import fetch from 'isomorphic-fetch';
import { apiEndPoint } from '../../config';

export const REQUEST_PUBLICATIONDETAILS = 'REQUEST_PUBLICATIONDETAILS';
export const INVALIDATE_PUBLICATIONDETAILS = 'INVALIDATE_PUBLICATIONDETAILS';
export const RECEIVE_PUBLICATIONDETAILS_SUCCESS = 'RECEIVE_PUBLICATIONDETAILS_SUCCESS';
export const RECEIVE_PUBLICATIONDETAILS_ERROR = 'RECEIVE_PUBLICATIONDETAILS_ERROR';
export const REQUEST_PUBLICATION_UPDATE="REQUEST_PUBLICATION_UPDATE";
export const REQUEST_PUBLICATION_UPDATE_SUCCESS="REQUEST_PUBLICATION_UPDATE_SUCCESS";
export const REQUEST_PUBLICATION_UPDATE_FAILURE="REQUEST_PUBLICATION_UPDATE_FAILURE";
export const INVALIDATE_PUBLICATION_UPDATE ="INVALIDATE_PUBLICATION_UPDATE";
export const REQUEST_CONTRIBUTORS_UPDATE="REQUEST_CONTRIBUTORS_UPDATE";
export const REQUEST_CONTRIBUTORS_UPDATE_SUCCESS="REQUEST_CONTRIBUTORS_UPDATE_SUCCESS";
export const REQUEST_CONTRIBUTORS_UPDATE_FAILURE= "REQUEST_CONTRIBUTORS_UPDATE_FAILURE";
export const REQUEST_CONTRIBUTORS_UPDATE_INVALIDATE="REQUEST_CONTRIBUTORS_UPDATE_INVALIDATE";
export const REQUEST_PUBLICATION_DELETE="REQUEST_PUBLICATION_DELETE";
export const PUBLICATION_DELETE_SUCCESS="PUBLICATION_DELETE_SUCCESS";
export const PUBLICATION_DELETE_FAILURE="PUBLICATION_DELETE_FAILURE";
export const PUBLICATION_DELETE_INVALIDATE="PUBLICATION_DELETE_INVALIDATE";
export const LIKE_STATUS ="LIKE_STATUS";
export const UPDATE_LIKE_STATUS="UPDATE_LIKE_STATUS";
export const INVALIDATE_LIKE_STATUS ="INVALIDATE_LIKE_STATUS";
export const ADD_COMMENTS="ADD_COMMENTS";


export function requestpublicationDetails(id) {
  return {
    type: REQUEST_PUBLICATIONDETAILS,
    id
  };
}

export function invalidatepublicationDetails(id) {
  return {
    type: INVALIDATE_PUBLICATIONDETAILS,
    id
  };
}

function receivepublicationDetailsSuccess(json) {
  return {
    type: RECEIVE_PUBLICATIONDETAILS_SUCCESS,
    json,
  }
}

function receivepublicationDetailsError(error) {
  return {
    type: RECEIVE_PUBLICATIONDETAILS_ERROR,
    error: error
  }
}

function publication_update_request() {
  return {
    type: REQUEST_PUBLICATION_UPDATE,
  }
}

function publication_update_success(message,id) {
  return {
    type: REQUEST_PUBLICATION_UPDATE_SUCCESS,
    message,
    id
  }
}

function publication_update_failure(error) {
  return {
    type: REQUEST_PUBLICATION_UPDATE_FAILURE,
    error
  }
}

export function invalidate_publication_update() {
  return {
    type: INVALIDATE_PUBLICATION_UPDATE
  };
}

export function update_contributor_request() {
  return {
    type: REQUEST_CONTRIBUTORS_UPDATE
  };
}

export function update_contributor_success(message) {
  return {
    type: REQUEST_CONTRIBUTORS_UPDATE_SUCCESS
  };
}


export function update_contributor_failue(error) {
  return {
    type: REQUEST_CONTRIBUTORS_UPDATE_FAILURE,
    error
  };
}

export function update_contributor_invalidate() {
  return {
    type: REQUEST_CONTRIBUTORS_UPDATE_INVALIDATE,
  };
}

export function request_publication_delete(id){
  return{
    type:REQUEST_PUBLICATION_DELETE,
    id
  }
}

export function request_publication_delete_success(message,id){
  return{
    type:PUBLICATION_DELETE_SUCCESS,
    message,
    id
  }
}

export function request_publication_delete_failure(message,id){
  return{
    type:PUBLICATION_DELETE_FAILURE,
    message,
    id
  }
}

export function request_publication_delete_invalidate(id){
  return{
    type:PUBLICATION_DELETE_INVALIDATE,
    id
  }
}
export function update_like_status(count,status){
  return{
    type:UPDATE_LIKE_STATUS,
    count,
    status
  }
}

export function invalidate_like_status(){
  return{
    type:INVALIDATE_LIKE_STATUS
  }
}

export function like_status(likes,count,id){
  let status=null;
  likes.map((obj)=>{
      if(obj.user_id==id){
        status=true;
        console.log(status);
      }else{
        status=false;
      }
      console.log(status);
    })
  console.log(status);
  return{
    type:LIKE_STATUS,
    status,
    count
  }
}

export function post_like(id){
  return(dispatch,getState) =>{
    let status=getState().publication_details_update.publicationDetails.like_status;
    let count =getState().publication_details_update.publicationDetails.count;
    if(status==true){
      count--;
      status=false;
    }else {
      count++;
      status=true;
    }
    let like={
      user_id:getState().login.user_id,
      project_id:id
    }
    let token=getState().login.token;
    return fetch((apiEndPoint + 'likes/'),{
      method: 'post',
      headers: {
        'Authorization':`${token}` ,
        'Content-Type': 'application/json',
      },
       body: JSON.stringify({like})
      })
      .then(dispatch(update_like_status(count,status)))
    }
  }

export function fetchpublicationDetails(id) {
  return (dispatch,getState) => {
    dispatch(requestpublicationDetails(id));
    let token=getState().login.token;
    return fetch((apiEndPoint + 'projects/' + id),{
            credentials: 'include',
            headers: {
                'Authorization': `${token}`
            }
          })
      .then(response => response.json())
      .then(json => dispatch(receivepublicationDetailsSuccess(json)))
      .catch(error => dispatch(receivepublicationDetailsError(error.message)));
  }
}

function shouldFetchpublicationDetails(state, id) {
  const details = state.publication_details_update.publicationDetails.initialized;
  if(!details) {
    return true;
  } else if(details.isFetching) {
    return false;
  } else {
    return details.didInvalidate;
  }
}

export function updateMedia(media_file,id,status){
return (dispatch,getState) => {
  let method=(status=='empty'? "post":"put");
  let url=(status=='empty' ? apiEndPoint + 'media_files/' : apiEndPoint + 'media_files/'+id )
  return fetch((url),{
         credentials: 'include',
         method: method,
         headers: {
           'Content-Type': 'application/json',
            'Authorization': getState().login.token
         },
         body: JSON.stringify({media_file})
       })
       .then(response => response.json().then(json => ({
           status: response.status,
           json
         })
       ))
       .then(({status, json}) => {
         if(status >= 400){
               console.log(status);
             }
         else {
            console.log(json);
          }
       })
       .catch(error => console.log(error.message));
     }
   }

export function updatepublication(project,id){
  let msg="";
  if(project.title=="" || project.category_id==""|| project.description==""){
    return(dispatch)=>{
      msg="Fields cannot be left empty!";
      dispatch(publication_update_failure(msg));
    }
  }else{
  return (dispatch , getState) => {
    dispatch(publication_update_request());
    return fetch((apiEndPoint + 'projects/'+id),{
            credentials: 'include',
            method: 'put',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': getState().login.token
            },
            body: JSON.stringify({project})
          })
          .then(response => response.json().then(json => ({
              status: response.status,
              json
            })
          ))
          .then(({status, json}) => {
            if(status >= 400){
                dispatch(publication_update_failure(json.error));
              }else {
              let message="Project updated sucessfully";
               dispatch(publication_update_success(message ,json.id))
             }
          })
          .catch(error => dispatch(addprojecterror(error.message)));
        }
      }
    }

export function updateteam(team_member,id){
  let msg="";
  if(team_member.first_name=="" || team_member.last_name==""|| team_member.email=="" ||  team_member.role=="" ||  team_member.team_member_picture==""){
    return(dispatch)=>{
      msg="Fields cannot be left empty!";
      dispatch(addteamerror(msg));
    }
  }else{
  return (dispatch,getState) => {
    dispatch(update_contributor_request());
    return fetch((apiEndPoint + 'team_members/'+id),{
            credentials: 'include',
            method: 'put',
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
                dispatch(update_contributor_failue(json.errors));
                }
            else {
               dispatch(update_contributor_success(json.message))
             }
          })
          .catch(error => dispatch(update_contributor_failue(error.message)));
        }
      }
    }

export function fetchpublicationDetailsIfNeeded(id) {
  return (dispatch, getState) => {
    if(shouldFetchpublicationDetails(getState(), id)) {
      return dispatch(fetchpublicationDetails(id));
    }
  };
}

export function delete_publication(id){
  return (dispatch, getState) => {
    dispatch(request_publication_delete(id));
    return fetch((apiEndPoint + 'projects/'+id),{
            method: 'delete',
            headers: {
              'Authorization': getState().login.token
            }
          })
          .then(({status}) => {
            if(status >= 400){
                dispatch(request_publication_delete_failure(id));
                }
            else {
                if(status==204){
                  let message="Publication deleted!";
               dispatch(request_publication_delete_success(message,id));
              }
             }
          })
          .catch(status =>{
             console.log((status));
        })
      }
    }

export function addComment(comment){
  return(dispatch,getState)=>{
    dispatch(request_addcomments());
    return fetch((apiEndPoint + 'comment/'),{
            method: 'post',
            headers: {
              'Authorization': getState().login.token
            }
          })
        }
    }
export function updateRef(ref,id,token){
  ref.map((refe)=>{
    let reference={
      reference:refe.reference,
    }
    return fetch((apiEndPoint + 'references/'+refe.id),{
            credentials: 'include',
            method: 'put',
            headers: {
              'Content-Type': 'application/json',
              'Authorization':  `${token}`
            },
            body: JSON.stringify({reference})
          })
          .then(response => response.json().then(json => ({
              status: response.status,
              json
            })
          ))
          .catch(error => console.log((error.message)));
      })
}

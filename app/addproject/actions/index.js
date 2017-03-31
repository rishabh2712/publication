import fetch from 'isomorphic-fetch';
import { apiEndPoint } from '../../config';

export const REQUEST_ADDPROJECT = 'REQUEST_ADDPROJECT';
export const INVALIDATE_ADDPROJECT = 'INVALIDATE_ADDPROJECT';
export const ADDPROJECT_SUCCESS = 'ADDPROJECT_SUCCESS';
export const ADDPROJECT_ERROR = 'ADDPROJECT_ERROR';
export const CATEGORY="CATEGORY";
export const ORGANIZATIONS="ORGANIZATIONS";
export const REQUEST_CATEGORY="REQUEST_CATEGORY";



export function requestAddproject(i) {
  return {
    type: REQUEST_ADDPROJECT,
  };
}

export function invalidateaddproject() {
  return {
    type: INVALIDATE_ADDPROJECT,
  };
}

function addprojectsuccess(message,id) {
  return {
    type: ADDPROJECT_SUCCESS,
    message,id
  }
}

function addprojecterror(error) {
  return {
    type: ADDPROJECT_ERROR,
    error: error
  }
}
 function addcategory(categories){
   return{
     type:CATEGORY,
     categories
   }
 }
 function addorg(orgs){
   return{
     type:ORGANIZATIONS,
     orgs
   }
 }

export function addMedia(media_file){
return (dispatch,getState) => {
 return fetch((apiEndPoint + 'media_files/'),{
         credentials: 'include',
         method: 'post',
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

export function addproject(project){
  let msg="";
  if(project.title=="" || project.category_id==""|| project.description==""){
    return(dispatch)=>{
      msg="Fields cannot be left empty!";
      dispatch(addprojecterror(msg));
    }
  }else{
  return (dispatch , getState) => {
    dispatch(requestAddproject());
    return fetch((apiEndPoint + 'projects/'),{
            credentials: 'include',
            method: 'post',
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
              if(status==500){
                let msg="This project already exists";
                dispatch(addprojecterror(msg));
              }else{
                dispatch(addprojecterror(json.error));
                }
              }else {
              let message="Project created sucessfully";
               dispatch(addprojectsuccess(message ,json.id))
             }
          })
          .catch(error => dispatch(addprojecterror(error.message)));
        }
      }
    }
export function addreferences(references,id,token){
  references.map((refe)=>{
    let reference={
      reference:refe,
      project_id:id
    }
    return fetch((apiEndPoint + 'references/'),{
            credentials: 'include',
            method: 'post',
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

export function fetchcategory(){
  return (dispatch , getState) => {
    return fetch((apiEndPoint + 'categories'),{
      method:'get',
      headers: {
        'Authorization': getState().login.token
      },
    })
      .then(response => response.json())
      .then(json => dispatch(addcategory(json)))
  }
}

export function fetchorg(){
  return (dispatch , getState) => {
    return fetch((apiEndPoint + 'organizations'),{
      method:'get',
    })
      .then(response => response.json())
      .then(json => dispatch(addorg(json)))
  }
}

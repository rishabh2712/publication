import fetch from 'isomorphic-fetch';
import { apiEndPoint } from '../../config';

export const REQUEST_PUBLICATIONS="REQUEST_PUBLICATIONS";
export const PUBLICATION_FETCH_SUCCESS="PUBLICATION_FETCH_SUCCESS";
export const PUBLICATION_FETCH_ERROR="PUBLICATION_FETCH_ERROR";
export const REQUEST_PROJECTS = 'REQUEST_PROJECTS';
export const INVALIDATE_PROJECTS = 'INVALIDATE_PROJECTS';
export const RECEIVE_PROJECTS_SUCCESS = 'RECEIVE_PROJECTS_SUCCESS';
export const PUBLICATION_FETCH_INVALIDATE = 'PUBLICATION_FETCH_INVALIDATE';
export const RECEIVE_PROJECTS_ERROR = 'RECEIVE_PROJECTS_ERROR';

export function requestpublication() {
  return {
    type: REQUEST_PUBLICATIONS
  };
}
export function receivePublicationsError(error) {
  return {
    type: PUBLICATION_FETCH_ERROR,
    error
  };
}
export function receivePublicationsSuccess(publications) {
  return {
    type: PUBLICATION_FETCH_SUCCESS,
    publications
  };
}

export function receivePublicationsInvalidate() {
  return {
    type: PUBLICATION_FETCH_INVALIDATE,
  };
}

function requestProjects() {
  return {
    type: REQUEST_PROJECTS
  };
}

export function invalidateProjects() {
  return {
    type: INVALIDATE_PROJECTS
  };
}

function receiveProjectsSuccess(json,id) {
  return {
    type: RECEIVE_PROJECTS_SUCCESS,
    projects: json,
    receivedAt: Date.now(),
    publication_id:id
  };
}

function receiveProjectsError(error) {
  return {
    type: RECEIVE_PROJECTS_ERROR,
    error: error
  };
}

export function fetchPublications() {
  return (dispatch, getState) => {
    dispatch(requestpublication());
    return fetch((apiEndPoint + 'publications'), {
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
          dispatch(receivePublicationsError(json.errors))
        } else {
          dispatch(receivePublicationsSuccess(json))
        }
      })
      .catch(error => dispatch(receiveProjectsError(error.message)));
  };
}



function fetchProjects(id,cat_id) {

  return (dispatch, getState) => {
    dispatch(requestProjects());
    // let url=(cat_id ? apiEndPoint + 'projects' + (id ? "?publication_id=" + id : "") + (cat_id ? "&category_id="+ cat_id : "") )
    return fetch(apiEndPoint + 'projects' + (id ? "?publication_id=" + id : "") + (cat_id ? "&category_id="+ cat_id : ""), {
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
          dispatch(receiveProjectsError(json.errors))
        } else {
          dispatch(receiveProjectsSuccess(json,id))
        }
      })
      .catch(error => dispatch(receiveProjectsError(error.message)));
  };
}



function shouldFetchProjects(state) {
  const projects = state.projects;
  if (!projects) {
    return true;
  } else if (projects.isFetching) {
    return false;
  } else {
    return projects.didInvalidate;
  }
}

export function fetchProjectsIfNeeded(id,cat_id) {
  return (dispatch, getState) => {
    if (shouldFetchProjects(getState())) {
      return dispatch(fetchProjects(id,cat_id));
    }
  };
}

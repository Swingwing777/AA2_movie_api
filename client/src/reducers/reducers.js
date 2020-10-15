// src/reducers/reducers.js

import { combineReducers } from 'redux';

import { SET_FILTER, SET_MOVIES, SET_USERPROF, SET_USER, SET_API } from '../actions/actions';

function visibilityFilter(state = '', action) {    // A string
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    default:
      return state;
  }
}

// Note: The action function name is imported into components, not the reducers function name.

function movies(state = [], action) {              // An array of movie._ids
  switch (action.type) {
    case SET_MOVIES:
      return action.value;
    default:
      return state;
  }
}

function userProfile(state = {}, action) {        // An object containing Username, Email etc
  switch (action.type) {
    case SET_USERPROF:
      return action.value;
    default:
      return state;
  }
}

function userName(state = {}, action) {        // An object containing Username, Email etc
  switch (action.type) {
    case SET_USER:
      return action.value;
    default:
      return state;
  }
}

function cancelAxios(state = {}, action) {        // An object containing axios cancel token
  switch (action.type) {
    case SET_API:
      return action.value;
    default:
      return state;
  }
}

const moviesApp = combineReducers({
  visibilityFilter,
  movies,
  userProfile,
  userName,
  cancelAxios
});

export default moviesApp;                         // This is imported into index.jsx



// src/actions/actions.js

export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';
export const SET_USERPROF = 'SET_USERPROF';
export const SET_USER = 'SET_USER';
export const SET_API = 'SET_API';

// Note: The action function name is imported into components, not the reducers function name.

export function setMovies(value) {
  return { type: SET_MOVIES, value };
}

export function setFilter(value) {
  return { type: SET_FILTER, value };
}

export function setUserProf(value) {
  return { type: SET_USERPROF, value };
}

export function setUser(value) {
  return { type: SET_USER, value };
}

export function cancelToken(value) {
  return { type: SET_API, value };
}

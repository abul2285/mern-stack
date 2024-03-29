const USER_LOGIN = {
  REQUEST: 'USER_LOGIN_REQUEST',
  SUCCESS: 'USER_LOGIN_SUCCESS',
  FAILURE: 'USER_LOGIN_FAILURE',
};

const USER_REGISTER = {
  REQUEST: 'USER_REGISTER_REQUEST',
  SUCCESS: 'USER_REGISTER_SUCCESS',
  FAILURE: 'USER_REGISTER_FAILURE',
};

const LOAD_USER = {
  REQUEST: 'LOAD_USER_REQUEST',
  SUCCESS: 'LOAD_USER_SUCCESS',
  FAILURE: 'LOAD_USER_FAILURE',
};

const UPDATE_PROFILE = {
  REQUEST: 'UPDATE_PROFILE_REQUEST',
  SUCCESS: 'UPDATE_PROFILE_SUCCESS',
  FAILURE: 'UPDATE_PROFILE_FAILURE',
};

const UPDATE_PASSWORD = {
  REQUEST: 'UPDATE_PASSWORD_REQUEST',
  SUCCESS: 'UPDATE_PASSWORD_SUCCESS',
  FAILURE: 'UPDATE_PASSWORD_FAILURE',
};

const ALL_USERS = {
  REQUEST: 'ALL_USERS_REQUEST',
  SUCCESS: 'ALL_USERS_SUCCESS',
  FAILURE: 'ALL_USERS_FAILURE',
};

const USER_DETAILS = {
  REQUEST: 'USER_DETAILS_REQUEST',
  SUCCESS: 'USER_DETAILS_SUCCESS',
  FAILURE: 'USER_DETAILS_FAILURE',
};

const UPDATE_USER = {
  REQUEST: 'UPDATE_USER_REQUEST',
  SUCCESS: 'UPDATE_USER_SUCCESS',
  FAILURE: 'UPDATE_USER_FAILURE',
  RESET: 'UPDATE_USER_RESET',
};

const DELETE_USER = {
  REQUEST: 'DELETE_USER_REQUEST',
  SUCCESS: 'DELETE_USER_SUCCESS',
  FAILURE: 'DELETE_USER_FAILURE',
  RESET: 'DELETE_USER_RESET',
};

const FORGOT_PASSWORD = {
  REQUEST: 'FORGOT_PASSWORD_REQUEST',
  SUCCESS: 'FORGOT_PASSWORD_SUCCESS',
  FAILURE: 'FORGOT_PASSWORD_FAILURE',
};

const RESET_PASSWORD = {
  REQUEST: 'RESET_PASSWORD_REQUEST',
  SUCCESS: 'RESET_PASSWORD_SUCCESS',
  FAILURE: 'RESET_PASSWORD_FAILURE',
};

const LOGOUT_USER = {
  SUCCESS: 'LOGOUT_USER_SUCCESS',
  FAILURE: 'LOGOUT_USER_FAILURE',
};

const UPDATE_PROFILE_RESET = 'UPDATE_PROFILE_RESET';
const UPDATE_PASSWORD_RESET = 'UPDATE_PASSWORD_RESET';
const CLEAR_ERROR = 'CLEAR_ERROR';

export {
  USER_LOGIN,
  CLEAR_ERROR,
  USER_REGISTER,
  LOAD_USER,
  LOGOUT_USER,
  UPDATE_PROFILE,
  RESET_PASSWORD,
  UPDATE_PASSWORD,
  FORGOT_PASSWORD,
  UPDATE_PROFILE_RESET,
  UPDATE_PASSWORD_RESET,
  ALL_USERS,
  USER_DETAILS,
  UPDATE_USER,
  DELETE_USER,
};

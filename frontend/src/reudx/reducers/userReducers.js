import {
  CLEAR_ERROR,
  USER_LOGIN,
  USER_REGISTER,
  LOAD_USER,
  LOGOUT_USER,
  UPDATE_PROFILE,
  FORGOT_PASSWORD,
  UPDATE_PASSWORD,
  UPDATE_PROFILE_RESET,
  UPDATE_PASSWORD_RESET,
  RESET_PASSWORD,
  ALL_USERS,
  USER_DETAILS,
  UPDATE_USER,
  DELETE_USER,
} from '../types/userTypes';

const authReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_LOGIN.REQUEST:
    case USER_REGISTER.REQUEST:
    case LOAD_USER.REQUEST:
      return { ...state, loading: true, isAuthenticated: false };

    case USER_LOGIN.SUCCESS:
    case USER_REGISTER.SUCCESS:
    case LOAD_USER.SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };

    case LOGOUT_USER.SUCCESS:
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };

    case USER_LOGIN.FAILURE:
    case USER_REGISTER.FAILURE:
    case LOAD_USER.FAILURE:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        error: action.payload,
        user: null,
      };

    case LOGOUT_USER.FAILURE:
      return { ...state, error: action.payload };

    case CLEAR_ERROR:
      return { ...state, error: null };

    default:
      return state;
  }
};

const forgotPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD.REQUEST:
    case RESET_PASSWORD.REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
      };

    case FORGOT_PASSWORD.SUCCESS:
      return { ...state, loading: false, message: action.payload };

    case RESET_PASSWORD.SUCCESS:
      return {
        ...state,
        success: action.payload,
      };

    case FORGOT_PASSWORD.FAILURE:
    case RESET_PASSWORD.FAILURE:
      return { ...state, loading: false, error: action.payload };

    case CLEAR_ERROR:
      return { ...state, error: null };

    default:
      return state;
  }
};

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PROFILE.REQUEST:
    case UPDATE_PASSWORD.REQUEST:
    case UPDATE_USER.REQUEST:
    case DELETE_USER.REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_PROFILE.SUCCESS:
    case UPDATE_PASSWORD.SUCCESS:
    case UPDATE_USER.SUCCESS:
      return { ...state, loading: false, isUpdated: action.payload };

    case DELETE_USER.SUCCESS:
      return { ...state, loading: false, isDeleted: action.payload };

    case UPDATE_PROFILE.FAILURE:
    case UPDATE_PASSWORD.FAILURE:
    case UPDATE_USER.FAILURE:
    case DELETE_USER.FAILURE:
      return { ...state, loading: false, error: action.payload };

    case UPDATE_PROFILE_RESET:
    case UPDATE_PASSWORD_RESET:
    case UPDATE_USER.RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case DELETE_USER.RESET:
      return {
        ...state,
        isDeleted: false,
      };

    case CLEAR_ERROR:
      return { ...state, error: null };

    default:
      return state;
  }
};

const allUsersReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case ALL_USERS.REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ALL_USERS.SUCCESS:
      return { ...state, loading: false, users: action.payload };

    case ALL_USERS.FAILURE:
      return { ...state, loading: false, error: action.payload };

    case CLEAR_ERROR:
      return { ...state, error: null };

    default:
      return state;
  }
};

const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS.REQUEST:
      return {
        ...state,
        loading: true,
      };

    case USER_DETAILS.SUCCESS:
      return { ...state, loading: false, user: action.payload };

    case USER_DETAILS.FAILURE:
      return { ...state, loading: false, error: action.payload };

    case CLEAR_ERROR:
      return { ...state, error: null };

    default:
      return state;
  }
};

export {
  authReducer,
  userReducer,
  forgotPasswordReducer,
  allUsersReducer,
  userDetailsReducer,
};

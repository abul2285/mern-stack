import axios from 'axios';
import {
  CLEAR_ERROR,
  USER_LOGIN,
  USER_REGISTER,
  LOAD_USER,
  LOGOUT_USER,
  UPDATE_PROFILE,
  UPDATE_PASSWORD,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  ALL_USERS,
  UPDATE_USER,
  USER_DETAILS,
  DELETE_USER,
} from '../types/userTypes';

const userLogin = ({ email, password }) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN.REQUEST });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      '/api/v1/login',
      { email, password },
      config
    );

    dispatch({ type: USER_LOGIN.SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: USER_LOGIN.FAILURE,
      payload: error.response.data.message,
    });
  }
};

const userRegister = (userData) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER.REQUEST });
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const { data } = await axios.post('/api/v1/register', userData, config);

    dispatch({ type: USER_REGISTER.SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: USER_REGISTER.FAILURE,
      payload: error.response.data.message,
    });
  }
};

const userLoad = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER.REQUEST });

    const { data } = await axios.get('/api/v1/me');

    dispatch({ type: LOAD_USER.SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: LOAD_USER.FAILURE,
      payload: error.response.data.message,
    });
  }
};

const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_USERS.REQUEST });

    const { data } = await axios.get('/api/v1/admin/users');

    dispatch({ type: ALL_USERS.SUCCESS, payload: data.users });
  } catch (error) {
    dispatch({
      type: ALL_USERS.FAILURE,
      payload: error.response.data.message,
    });
  }
};

const userLogout = () => async (dispatch) => {
  try {
    await axios.get('/api/v1/logout');

    dispatch({ type: LOGOUT_USER.SUCCESS });
  } catch (error) {
    dispatch({
      type: LOGOUT_USER.FAILURE,
      payload: error.response.data.message,
    });
  }
};

const userProfileUpdate = (userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE.REQUEST });
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    const { data } = await axios.put('/api/v1/me/update', userData, config);

    dispatch({ type: UPDATE_PROFILE.SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE.FAILURE,
      payload: error.response.data.message,
    });
  }
};

const userPasswordUpdate = (passwords) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PASSWORD.REQUEST });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.put(
      '/api/v1/password/update',
      passwords,
      config
    );

    dispatch({ type: UPDATE_PASSWORD.SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_PASSWORD.FAILURE,
      payload: error.response.data.message,
    });
  }
};

const updateUser = (id, userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER.REQUEST });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.put(
      `/api/v1/admin/user/${id}`,
      userData,
      config
    );

    dispatch({ type: UPDATE_USER.SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_USER.FAILURE,
      payload: error.response.data.message,
    });
  }
};

const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_USER.REQUEST });
    const { data } = await axios.delete(`/api/v1/admin/user/${id}`);
    dispatch({ type: DELETE_USER.SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: DELETE_USER.FAILURE,
      payload: error.response.data.message,
    });
  }
};

const getUserDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_DETAILS.REQUEST });

    const { data } = await axios.get(`/api/v1/admin/user/${id}`);

    dispatch({ type: USER_DETAILS.SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: USER_DETAILS.FAILURE,
      payload: error.response.data.message,
    });
  }
};

const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
};

const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD.REQUEST });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post('/api/v1/password/forgot', email, config);

    dispatch({ type: FORGOT_PASSWORD.SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD.FAILURE,
      payload: error.response.data.message,
    });
  }
};

const resetPassword = (token, passwords) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD.REQUEST });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.put(
      `/api/v1/password/reset/${token}`,
      passwords,
      config
    );

    dispatch({ type: RESET_PASSWORD.SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD.FAILURE,
      payload: error.response.data.message,
    });
  }
};

export {
  userLogin,
  userRegister,
  clearErrors,
  userLoad,
  userLogout,
  resetPassword,
  userProfileUpdate,
  userPasswordUpdate,
  forgotPassword,
  getAllUsers,
  updateUser,
  getUserDetails,
  deleteUser,
};

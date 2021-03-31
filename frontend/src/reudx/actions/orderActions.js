import axios from 'axios';
import {
  ALL_ORDERS,
  CLEAR_ERROR,
  CREATE_ORDER,
  DELETE_ORDER,
  MY_ORDER,
  ORDER_DETAILS,
  UPDATE_ORDER,
} from '../types/orderTypes';

const createNewOrder = (order) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_ORDER.REQUEST });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post('/api/v1/order/new', order, config);

    dispatch({ type: CREATE_ORDER.SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_ORDER.FAILURE,
      payload: error.response.data.message,
    });
  }
};

const updateOrder = (id, order) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ORDER.REQUEST });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.put(
      `/api/v1/admin/order/${id}`,
      order,
      config
    );

    dispatch({ type: UPDATE_ORDER.SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_ORDER.FAILURE,
      payload: error.response.data.message,
    });
  }
};

const deleteOrder = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ORDER.REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/order/${id}`);

    dispatch({ type: DELETE_ORDER.SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: DELETE_ORDER.FAILURE,
      payload: error.response.data.message,
    });
  }
};

const getMyOrders = () => async (dispatch) => {
  try {
    dispatch({ type: MY_ORDER.REQUEST });
    const { data } = await axios.get('/api/v1/orders/me');
    dispatch({ type: MY_ORDER.SUCCESS, payload: data.order });
  } catch (error) {
    dispatch({
      type: MY_ORDER.FAILURE,
      payload: error.response.data.message,
    });
  }
};

const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DETAILS.REQUEST });
    const { data } = await axios.get(`/api/v1/order/${id}`);
    dispatch({ type: ORDER_DETAILS.SUCCESS, payload: data.order });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS.FAILURE,
      payload: error.response.data.message,
    });
  }
};

const getAllOrders = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_ORDERS.REQUEST });
    const { data } = await axios.get(`/api/v1/admin/orders`);
    dispatch({ type: ALL_ORDERS.SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ALL_ORDERS.FAILURE,
      payload: error.response.data.message,
    });
  }
};

const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
};

export {
  createNewOrder,
  clearErrors,
  getMyOrders,
  getOrderDetails,
  getAllOrders,
  updateOrder,
  deleteOrder,
};

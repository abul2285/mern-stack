import {
  ALL_ORDERS,
  CLEAR_ERROR,
  CREATE_ORDER,
  DELETE_ORDER,
  MY_ORDER,
  ORDER_DETAILS,
  UPDATE_ORDER,
} from '../types/orderTypes';

const createNewOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ORDER.REQUEST:
      return { ...state, loading: true };

    case CREATE_ORDER.SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };

    case CREATE_ORDER.FAILURE:
      return { loading: false, error: action.payload };

    case CLEAR_ERROR:
      return { ...state, error: null };

    default:
      return state;
  }
};

const myOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case MY_ORDER.REQUEST:
      return { loading: true };

    case MY_ORDER.SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };

    case MY_ORDER.FAILURE:
      return { loading: false, error: action.payload };

    case CLEAR_ERROR:
      return { ...state, error: null };

    default:
      return state;
  }
};

const orderDetailsReducer = (state = { order: {}, loading: true }, action) => {
  switch (action.type) {
    case ORDER_DETAILS.REQUEST:
      return { loading: true };

    case ORDER_DETAILS.SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };

    case ORDER_DETAILS.FAILURE:
      return { loading: false, error: action.payload };

    case CLEAR_ERROR:
      return { ...state, error: null };

    default:
      return state;
  }
};

const ordersReducer = (state = {}, action) => {
  switch (action.type) {
    case ALL_ORDERS.REQUEST:
      return { loading: true };

    case ALL_ORDERS.SUCCESS:
      return {
        loading: false,
        orders: action.payload.orders,
        totalAmount: action.payload.totalAmount,
      };

    case ALL_ORDERS.FAILURE:
      return { loading: false, error: action.payload };

    case CLEAR_ERROR:
      return { ...state, error: null };

    default:
      return state;
  }
};

const orderReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_ORDER.REQUEST:
    case DELETE_ORDER.REQUEST:
      return { loading: true };

    case UPDATE_ORDER.SUCCESS:
      return {
        loading: false,
        isUpdated: action.payload,
      };

    case DELETE_ORDER.SUCCESS:
      return {
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_ORDER.FAILURE:
    case DELETE_ORDER.FAILURE:
      return { loading: false, error: action.payload };

    case UPDATE_ORDER.RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case DELETE_ORDER.RESET:
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

export {
  createNewOrderReducer,
  myOrdersReducer,
  orderDetailsReducer,
  ordersReducer,
  orderReducer,
};

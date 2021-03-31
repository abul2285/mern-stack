import {
  ALL_PRODUCTS,
  PRODUCT_DETAILS,
  PRODUCT_REVIEW,
  CLEAR_ERROR,
  ADMIN_PRODUCTS,
  NEW_PRODUCT,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
  ALL_REVIEW,
  DELETE_REVIEW,
} from '../types/productsType';
import axios from 'axios';

const getProducts = (
  keyword = '',
  price,
  currentPage,
  category,
  rating
) => async (dispatch) => {
  try {
    dispatch({ type: ALL_PRODUCTS.REQUEST });
    let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&rating[gte]=${rating}`;

    if (category) {
      link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category}`;
    }

    const { data } = await axios.get(link);
    dispatch({ type: ALL_PRODUCTS.SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ALL_PRODUCTS.FAILURE,
      payload: error.response.data.message,
    });
  }
};

const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS.REQUEST });
    const { data } = await axios.get(`/api/v1/product/${id}`);
    dispatch({ type: PRODUCT_DETAILS.SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS.FAILURE,
      payload: error.response.data.message,
    });
  }
};

const getAdminProducts = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_PRODUCTS.REQUEST });
    const { data } = await axios.get(`/api/v1/admin/products`);
    dispatch({ type: ADMIN_PRODUCTS.SUCCESS, payload: data.products });
  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCTS.FAILURE,
      payload: error.response.data.message,
    });
  }
};

const newProduct = (productData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_PRODUCT.REQUEST });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post(
      `/api/v1/admin/product/new`,
      productData,
      config
    );
    dispatch({ type: NEW_PRODUCT.SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: NEW_PRODUCT.FAILURE,
      payload: error.response.data.message,
    });
  }
};

const updateProduct = (id, productData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCT.REQUEST });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.put(
      `/api/v1/admin/product/${id}`,
      productData,
      config
    );
    dispatch({ type: UPDATE_PRODUCT.SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT.FAILURE,
      payload: error.response.data.message,
    });
  }
};

const deleteProduct = (productId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT.REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/product/${productId}`);
    dispatch({ type: DELETE_PRODUCT.SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT.FAILURE,
      payload: error.response.data.message,
    });
  }
};

const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_REVIEW.REQUEST });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.put(`/api/v1/review`, reviewData, config);
    dispatch({ type: PRODUCT_REVIEW.SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: PRODUCT_REVIEW.FAILURE,
      payload: error.response.data.message,
    });
  }
};

const getAllReviews = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_REVIEW.REQUEST });
    const { data } = await axios.get(`/api/v1/admin/reviews`);
    dispatch({ type: ALL_REVIEW.SUCCESS, payload: data.allReviews });
  } catch (error) {
    dispatch({
      type: ALL_REVIEW.FAILURE,
      payload: error.response.data.message,
    });
  }
};

const deleteReview = (id, productId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_REVIEW.REQUEST });
    const { data } = await axios.delete(
      `/api/v1/admin/review/delete?id=${id}&productId=${productId}`
    );
    dispatch({ type: DELETE_REVIEW.SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: DELETE_REVIEW.FAILURE,
      payload: error.response.data.message,
    });
  }
};

const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
};

export {
  getProducts,
  getProductDetails,
  clearErrors,
  newReview,
  getAdminProducts,
  newProduct,
  deleteProduct,
  updateProduct,
  getAllReviews,
  deleteReview,
};

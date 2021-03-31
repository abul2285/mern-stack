import {
  ALL_PRODUCTS,
  PRODUCT_REVIEW,
  PRODUCT_DETAILS,
  CLEAR_ERROR,
  ADMIN_PRODUCTS,
  NEW_PRODUCT,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
  ALL_REVIEW,
  DELETE_REVIEW,
} from '../types/productsType';

const productsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case ALL_PRODUCTS.REQUEST:
    case ADMIN_PRODUCTS.REQUEST:
      return { loading: true, products: [] };

    case ALL_PRODUCTS.SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        productsCount: action.payload.productsCount,
        filteredProductsCount: action.payload.filteredProductsCount,
        productPerPage: action.payload.productPerPage,
      };

    case ADMIN_PRODUCTS.SUCCESS:
      return {
        ...state,
        loading: false,
        adminProducts: action.payload,
      };

    case ALL_PRODUCTS.FAILURE:
    case ADMIN_PRODUCTS.FAILURE:
      return { loading: false, error: action.payload };

    case CLEAR_ERROR:
      return { ...state, error: null };

    default:
      return state;
  }
};

const productDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS.REQUEST:
      return { ...state, loading: true };

    case PRODUCT_DETAILS.SUCCESS:
      return {
        loading: false,
        product: action.payload.product,
      };

    case PRODUCT_DETAILS.FAILURE:
      return { loading: false, error: action.payload };

    case CLEAR_ERROR:
      return { ...state, error: null };

    default:
      return state;
  }
};

const productReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_REVIEW.REQUEST:
      return { ...state, loading: true };

    case PRODUCT_REVIEW.SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };

    case PRODUCT_REVIEW.FAILURE:
      return { loading: false, error: action.payload };

    case PRODUCT_REVIEW.RESET:
      return { ...state, success: false };

    case CLEAR_ERROR:
      return { ...state, error: null };

    default:
      return state;
  }
};

const newProductReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_PRODUCT.REQUEST:
      return { ...state, loading: true };

    case NEW_PRODUCT.SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        product: action.payload.product,
      };

    case NEW_PRODUCT.FAILURE:
      return { loading: false, error: action.payload };

    case NEW_PRODUCT.RESET:
      return { ...state, success: false };

    case CLEAR_ERROR:
      return { ...state, error: null };

    default:
      return state;
  }
};

const productReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PRODUCT.REQUEST:
    case UPDATE_PRODUCT.REQUEST:
      return { ...state, loading: true };

    case DELETE_PRODUCT.SUCCESS:
      return {
        loading: false,
        isDeleted: action.payload.success,
      };

    case UPDATE_PRODUCT.SUCCESS:
      return {
        loading: false,
        isUpdated: action.payload,
      };

    case DELETE_PRODUCT.FAILURE:
    case UPDATE_PRODUCT.FAILURE:
      return { loading: false, error: action.payload };

    case DELETE_PRODUCT.RESET:
      return { ...state, isDeleted: false };

    case UPDATE_PRODUCT.RESET:
      return { ...state, isUpdated: false };

    case CLEAR_ERROR:
      return { ...state, error: null };

    default:
      return state;
  }
};

const reviewReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_REVIEW.REQUEST:
      return { ...state, loading: true };

    case DELETE_REVIEW.SUCCESS:
      return {
        loading: false,
        isDeleted: action.payload,
      };

    case DELETE_REVIEW.FAILURE:
      return { loading: false, error: action.payload };

    case DELETE_REVIEW.RESET:
      return { ...state, isDeleted: false };

    case CLEAR_ERROR:
      return { ...state, error: null };

    default:
      return state;
  }
};

const allReviewReducer = (state = { allReviews: [] }, action) => {
  switch (action.type) {
    case ALL_REVIEW.REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ALL_REVIEW.SUCCESS:
      return {
        ...state,
        loading: false,
        allReviews: action.payload.flat(),
      };

    case ALL_REVIEW.FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export {
  productsReducer,
  productDetailsReducer,
  productReviewReducer,
  newProductReducer,
  productReducer,
  allReviewReducer,
  reviewReducer,
};

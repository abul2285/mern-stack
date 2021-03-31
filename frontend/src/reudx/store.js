import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  productsReducer,
  productDetailsReducer,
  productReviewReducer,
  newProductReducer,
  productReducer,
  allReviewReducer,
  reviewReducer,
} from './reducers/productsReducer';
import {
  authReducer,
  userReducer,
  forgotPasswordReducer,
  allUsersReducer,
  userDetailsReducer,
} from './reducers/userReducers';
import { cartReducer } from './reducers/cartReducers';
import {
  createNewOrderReducer,
  myOrdersReducer,
  orderDetailsReducer,
  orderReducer,
  ordersReducer,
} from './reducers/orderReducers';

const middlewares = [thunk];
const reducer = combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
  product: productReducer,
  auth: authReducer,
  user: userReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newOrder: createNewOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailsReducer,
  newReview: productReviewReducer,
  newProduct: newProductReducer,
  orders: ordersReducer,
  order: orderReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  allReviews: allReviewReducer,
  review: reviewReducer,
});
const initialState = {
  cart: {
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
    shippingInfo: localStorage.getItem('shippingInfo')
      ? JSON.parse(localStorage.getItem('shippingInfo'))
      : {},
  },
};
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;

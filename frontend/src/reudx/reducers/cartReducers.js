import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  SAVE_SHIPPING_INFO,
} from '../types/cartTypes';

const cartReducer = (state = { cartItems: [], shippingInfo: {} }, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;
      const isItemExist = state.cartItems.find(
        (cart) => cart.product === item.product
      );

      if (isItemExist) {
        return {
          ...state,
          cartItems: state.cartItems.map((cart) =>
            cart.product === item.product ? item : cart
          ),
        };
      }
      return {
        ...state,
        cartItems: [...state.cartItems, item],
      };

    case REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (cart) => cart.product !== action.payload
        ),
      };

    case SAVE_SHIPPING_INFO:
      return {
        ...state,
        shippingInfo: action.payload,
      };
    default:
      return state;
  }
};

export { cartReducer };

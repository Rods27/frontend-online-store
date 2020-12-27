import { CART, ID, PRODUCT, REMOVE } from '../actions';

const INITIAL_STATE = {
  product: [],
  id: [],
  cart: []
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
  case PRODUCT:
    return {
      ...state, product: action.product,
    };
  case ID:
    return {
      ...state, id: [...state.id, action.id ],
    };
  case CART:
    return {
      ...state,
      cart: [...state.cart, action.cartItem]
    };
  case REMOVE:
    return {
      ...state,
      cart: action.cartItem
    };
  default:
    return state;
  }
}

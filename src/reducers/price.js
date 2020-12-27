import { PRICE, QUANTITY } from '../actions';

const INITIAL_STATE = {
  price: 0,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
  case PRICE: 
      const reajustedPrice = Number(action.price.toFixed(2))
    return {
      ...state,
      price: reajustedPrice + state.price,
    };
  case QUANTITY:
    return {
      ...state,
      quantity: {...state.quantity, [action.id]:action.quantity },
    }
  default:
    return state;
  }
}
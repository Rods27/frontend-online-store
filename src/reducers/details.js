import { CONFIRMATION, DETAILS } from '../actions';

const INITIAL_STATE = {
  toogle: true,
  confirmation: { toogle: false },
  product: {}
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
  case DETAILS: 
    return {
      ...state, toogle: action.toogle, product: action.product,
    };
  case CONFIRMATION:
    return {
      ...state, confirmation: { toogle: action.toogle },
    }
  default:
    return state;
  }
}
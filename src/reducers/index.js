import { combineReducers } from 'redux';
import product from './product';
import price from './price';
import details from './details';

const rootReducer = combineReducers({ product, price, details});

export default rootReducer;

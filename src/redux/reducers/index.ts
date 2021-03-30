import { combineReducers } from 'redux'

import cartReducer from './cart';
import productReducer from './product';

const createRootReducer = () =>
  combineReducers({
    cart: cartReducer,
    product: productReducer
  })

export default createRootReducer

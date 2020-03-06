import { createStore, combineReducers,applyMiddleware } from "redux";
import thunk from 'redux-thunk';

import homeReducer from './home-reducer';
import createProductReducer from './product-create-reducer';
import productsReducer from './products-reducer';
import cartReducer from './cart-reducer';

let reducers=combineReducers({
  homePage: homeReducer, 
  createPage: createProductReducer,
  productsPage: productsReducer,
  cartPage: cartReducer
});
let store=createStore(reducers,applyMiddleware(thunk));
export default store; 
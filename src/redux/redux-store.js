import { createStore, combineReducers,applyMiddleware } from "redux";
import createSagaMiddleware from 'redux-saga'

import homeReducer from './home/home-reducer';
import createProductReducer from './createProduct/product-create-reducer';
import productsReducer from './products/products-reducer';
import cartReducer from './cart/cart-reducer';
import homeSaga from './home/home-actions';
import cartSaga from './cart/cart-actions';

const sagaMiddleware = createSagaMiddleware()
let reducers=combineReducers({
  homePage: homeReducer, 
  createPage: createProductReducer,
  productsPage: productsReducer,
  cartPage: cartReducer
});
let store=createStore(reducers,  applyMiddleware(sagaMiddleware));

sagaMiddleware.run([homeSaga, cartSaga])
export default store; 
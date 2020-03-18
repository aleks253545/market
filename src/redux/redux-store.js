import { createStore, combineReducers,applyMiddleware } from "redux";
import createSagaMiddleware from 'redux-saga'

import homeReducer from './home/home-reducer';
import createProductReducer from './createProduct/product-create-reducer';
import productsReducer from './products/products-reducer';
import cartReducer from './cart/cart-reducer';
import rootSaga from './rootSaga'

const sagaMiddleware = createSagaMiddleware()
let reducers=combineReducers({
  homePage: homeReducer, 
  createPage: createProductReducer,
  productsPage: productsReducer,
  cartPage: cartReducer
});
let store = createStore(reducers,  applyMiddleware(sagaMiddleware));

const rootSagas = sagaMiddleware.run(rootSaga);
rootSagas.toPromise().catch(error => {
  // Error here is a fatal error.
  // None of the sagas down the road caught it.
});
export default store; 
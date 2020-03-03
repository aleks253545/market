import { createStore, combineReducers,applyMiddleware } from "redux";
import thunk from 'redux-thunk';

import homeReducer from './home-reducer';
import createProductReducer from './product-create-reducer';

let reducers=combineReducers({homePage:homeReducer, createPage:createProductReducer});
let store=createStore(reducers,applyMiddleware(thunk));
export default store; 
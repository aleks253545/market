import {productsPageSaga  } from './products/products-actions';
import {cartSaga } from './cart/cart-actions';
import {homeSaga } from './home/home-actions';
import {productCreateSaga } from './createProduct/product-create-actions';
import { all } from 'redux-saga/effects';

export default function* rootSaga () {
  yield all([
    productsPageSaga(),
    cartSaga(),
    homeSaga(),
    productCreateSaga()
  ])
}
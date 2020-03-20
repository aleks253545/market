import axios from 'axios'
import { SET_PRODUCTS, CLEAN_PRODUCTS, CHANGE_FILTER, UPDATE_COUNTER, DOWNLOAD_PRODUCTS_SAGA, UPDATE_QUANTITY} from '../constants';
import { put, call , takeEvery, all, select } from 'redux-saga/effects';
import { config } from '../config';
import * as productsApi from '../../api/products'
import * as selectors from '../selectors/selectors'

export const setProducts = (products) => {
  return {
    type:SET_PRODUCTS,
    products
  }
}



export const cleanProducts = () => {
  return {
   type: CLEAN_PRODUCTS,
  }
}
export const changeFilter = (prodFilter) => {
  return {
   type: CHANGE_FILTER,
   prodFilter
  }
}
export const updateCounter = (id, value) => ({
  type: UPDATE_COUNTER,
  id,
  value
})  
export const updateQuantity = (id, maxQuantitiy) => ({
  type: UPDATE_QUANTITY,
  id,
  maxQuantitiy
})


export const downloadProducts = () => ({
  type: DOWNLOAD_PRODUCTS_SAGA,
});

export function* downloadProductsSaga () {
  try {
    const offset = yield select(selectors.getOffset);
    const products = yield call(productsApi.downloadProducts, offset);
    console.log(products.data);
    yield put(setProducts(products.data));
  } catch (err) {
    console.log(err);
  }
}

export  function* productsPageSaga () {
  yield takeEvery(DOWNLOAD_PRODUCTS_SAGA, downloadProductsSaga);
  // yield takeEvery(UPDATE_COUNTER_SAGA, updateCounterSaga);
}


import axios from 'axios'
import { SET_PRODUCTS, SET_COUNTER, ADD_TO_CART, CLEAN_PRODUCTS, CHANGE_FILTER, UPDATE_COUNTER_SAGA, ADD_TO_CART_SAGA, DOWNLOAD_PRODUCTS_SAGA} from '../constants';
import { put, call , takeEvery, all, select } from 'redux-saga/effects';

const setProducts = (products) => {
  return {
    type:SET_PRODUCTS,
    products
  }
}

 const setCounter = (value, id) => {
   return {
    type: SET_COUNTER,
    value,
    id
   }
 }
 const addTocart = (productId, counter) => {
  return {
   type: ADD_TO_CART,
   counter,
   productId
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
  type: UPDATE_COUNTER_SAGA,
  id,
  value
})  

function* updateCounterSaga ({id, value}) {
  try {
    const page = yield select( state => state.productsPage.page);
    const counterValue = yield call(() =>
      axios.put(`http://localhost:3080/counters/${id}`, {
        value, 
        page 
      },
      {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
          'Content-Type': 'application/json'
        }
      })
    );
      yield put(setCounter(counterValue.data,id))
  } catch (err) {
    console.log(err);
  }
}


export const addToCart = (productId) => ({
  type: ADD_TO_CART_SAGA,
  productId
})

function* addToCartSaga ({productId}) {
  try {
    const product = yield call(() =>
      axios.post(`http://localhost:3080/carts`,{
        productId
      },
      {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
          'Content-Type': 'application/json'
        }
      })
    );
    yield put(addTocart(productId, product.data));
  } catch (err) {
    console.log(err);
  }

}

export const downloadProducts = () => ({
  type: DOWNLOAD_PRODUCTS_SAGA,
});

function* downloadProductsSaga () {
  try {
    const offset = yield select(state => state.productsPage.offset);
    const products = yield call(() => axios.get(`http://localhost:3080/products?offset=${offset}`));
    console.log(products.data);
    yield put(setProducts(products.data));
  } catch (err) {
    console.log(err);
  }
}

export  function* productsPageSaga () {
  yield takeEvery(DOWNLOAD_PRODUCTS_SAGA, downloadProductsSaga);
  yield takeEvery(ADD_TO_CART_SAGA, addToCartSaga);
  yield takeEvery(UPDATE_COUNTER_SAGA, updateCounterSaga);
}


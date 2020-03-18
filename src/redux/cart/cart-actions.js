import { SET_CART_PRODUCTS,SET_CART_COUNTER, DOWNLOAD_CART_PRODUCTS_SAGA, UPDATE_CART_COUNTER_SAGA, UPDATE_CART_SAGA, DELETE_CART_PRODUCT_CAGA, DELTE_PRODUCT_FROM_CART} from '../constants';
import axios from 'axios'
import {takeEvery, call, put, select, all} from 'redux-saga/effects';

export const setCartProducts = (cartProducts) => {
  return {
    type:SET_CART_PRODUCTS,
    cartProducts
  }
}

export const deleteProductFromCart = (productId) => ({
  type: DELTE_PRODUCT_FROM_CART,
  id: productId
})

export const setCartCounter = (value, id) => {
  return {
    type:SET_CART_COUNTER,
    value,
    id
  }
}

export const downloadCartProducts = (login, password) => ({
  type: DOWNLOAD_CART_PRODUCTS_SAGA,
  login,
  password
});

function* downloadCartProductsSaga() {
  try {
    const products = yield call(() =>
      axios.get(`http://localhost:3080/carts`, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
          'Content-Type': 'application/json'
        }
      })
    );
    if(products.data.length > 0){
      yield put(setCartProducts(products.data));
    }
  } catch(err) {
    console.log(err);
  }

}

export const updateCartCounter = (id, value) => ({
  type: UPDATE_CART_COUNTER_SAGA,
  id,
  value
});

function* updateCartCounterSaga ({id, value}) {
  try {
    const page = yield select(state => state.cartPage.page);
    const count = yield call(() =>
      axios.put(`http://localhost:3080/counters/${id}`,{
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
    yield put(setCartCounter(count.data,id));
  } catch (err) {
    console.log(err);
  }

}


export const updateCart = (typeReq) => ({
  type: UPDATE_CART_SAGA,
  typeReq
});

function* updateCartSaga ({typeReq}) {
  try {
    const products = yield call(() =>
      axios.put(`http://localhost:3080/carts`,{
        type: typeReq
      },
      {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
          'Content-Type': 'application/json'
        }
      })
    );
    yield put(setCartProducts(products.data));
  } catch(err) {
    console.log(err);
  }

}

export const deleteCartProduct = (cartId) => ({
  type: DELETE_CART_PRODUCT_CAGA,
  cartId
});



function* deleteCartProductSaga ({cartId}) {
  try {
    console.log(cartId ,'cartid')
     const productId =yield call(() =>
      axios.delete(`http://localhost:3080/carts/${cartId}`,{
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
        'Content-Type': 'application/json'
      }
      })
    )
    console.log(productId ,'productId')
    yield put(deleteProductFromCart(productId.data));
  } catch (err) {
    console.log(err)
  }
}

export function* cartSaga () {
  yield takeEvery(DELETE_CART_PRODUCT_CAGA, deleteCartProductSaga);
  yield takeEvery(UPDATE_CART_SAGA, updateCartSaga);
  yield takeEvery(DOWNLOAD_CART_PRODUCTS_SAGA, downloadCartProductsSaga);
  yield takeEvery(UPDATE_CART_COUNTER_SAGA, updateCartCounterSaga);
}


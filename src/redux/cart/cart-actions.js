import { SET_CART_PRODUCTS,SET_CART_COUNTER, DOWNLOAD_CART_PRODUCTS_SAGA, UPDATE_CART_COUNTER_SAGA, UPDATE_CART_SAGA, DELETE_CART_PRODUCT_CAGA, DELTE_PRODUCT_FROM_CART, ADD_TO_CART_SAGA, ADD_TO_CART} from '../constants';
import axios from 'axios';
import {config} from '../config'
import {takeEvery, call, put, select} from 'redux-saga/effects';
import { updateQuantity } from '../products/products-actions';
import * as selectors from '../selectors/selectors';

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

export const downloadCartProducts = () => ({
  type: DOWNLOAD_CART_PRODUCTS_SAGA,

});

function* downloadCartProductsSaga() {
  try {
    const products = yield call(() =>
      axios.get(config.domain + '/carts', {
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

const addTocart = (productId, product) => {
  return {
   type: ADD_TO_CART,
   product,
   productId
  }
}

export const updateCartCounter = (id, value) => ({
  type: UPDATE_CART_COUNTER_SAGA,
  id,
  value
});

function* updateCartCounterSaga ({id, value}) {
  try {
    const page = yield select(selectors.getPage);
    const count = yield call(() =>
      axios.put(config.domain + `/counters/${id}`,{
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
      axios.put(config.domain + `/carts`,{
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

export const deleteCartProduct = (productId) => ({
  type: DELETE_CART_PRODUCT_CAGA,
  productId
});



function* deleteCartProductSaga ({productId}) {
  try {
     const cartProduct =yield call(() =>
      axios.delete( config.domain + `/carts/${productId}`,{
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
        'Content-Type': 'application/json'
      }
      })
    )

    yield put(deleteProductFromCart(cartProduct.data));
  } catch (err) {
    console.log(err)
  }
}

export const addToCart = (productId, counter) => ({
  type: ADD_TO_CART_SAGA,
  productId,
  counter
})

function* addToCartSaga ({productId, counter}) {
  try {
    const response = yield call(() =>
      axios.post(config.domain + '/carts',{
        productId,
        counter
      },
      {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
          'Content-Type': 'application/json'
        }
      })
    );
    let product = yield select( state => state.productsPage.products.concat().find(item => item.id === productId ));
    let cartProduct = {
      ...product,
      quantity: response.data.cartQuantity
    }
    yield put(updateQuantity(productId, response.data.maxQuantity))
    yield put(addTocart(productId, cartProduct));
  } catch (err) {
  }

}

export function* cartSaga () {
  yield takeEvery(DELETE_CART_PRODUCT_CAGA, deleteCartProductSaga);
  yield takeEvery(UPDATE_CART_SAGA, updateCartSaga);
  yield takeEvery(ADD_TO_CART_SAGA, addToCartSaga);
  yield takeEvery(DOWNLOAD_CART_PRODUCTS_SAGA, downloadCartProductsSaga);
  yield takeEvery(UPDATE_CART_COUNTER_SAGA, updateCartCounterSaga);
}


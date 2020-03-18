import { SET_CART_PRODUCTS,SET_CART_COUNTER, DOWNLOAD_CART_PRODUCTS_SAGA, UPDATE_CART_COUNTER_SAGA, UPDATE_CART_SAGA, DELETE_CART_PRODUCT_CAGA} from '../constants';
import axios from 'axios'
import {takeEvery, call, put, select, all} from 'redux-saga';

export const setCartProducts = (cartProducts) => {
  return {
    type:SET_CART_PRODUCTS,
    cartProducts
  }
}

export const setCartCounter = (value, id) => {
  return {
    type:SET_CART_COUNTER,
    value,
    id
  }
}

export const signUp = (login, password) => ({
  type: DOWNLOAD_CART_PRODUCTS_SAGA,
  login,
  password
});

function* watchdownloadCartProductsSaga() {
  yield takeEvery(DOWNLOAD_CART_PRODUCTS_SAGA, downloadCartProductsSaga);
}
function* downloadCartProductsSaga() {
  try {
    const token = yield select(state => state.homePage.token);
    const products = yield call(
      axios.get(`http://localhost:3080/carts`, {
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        }
      })
    );
    if(products.length > 0){
      yield put(setCartProducts(products));
    }
  } catch(err) {
    throw new console.error(err);
  }

}
// export const downloadCartProductsSaga = () => {
//   return (dispatch, getState)=>{
//     axios.get(`http://localhost:3080/carts`, {
//       headers: {
//         'Authorization': 'Bearer ' + getState().homePage.token,
//         'Content-Type': 'application/json'
//       }
//     })
//     .then((res) => {
//       if(res.data.length > 0){
//         dispatch(setCartProducts(res.data));
//       }
//     })
//     .catch((err) => {
//       throw new console.error(err);
//     });
//   }
// }
export const updateCartCounter = (id, value) => ({
  type: UPDATE_CART_COUNTER_SAGA,
  id,
  value
});

function* watchupdateCartCounterSaga() {
  yield takeEvery(UPDATE_CART_COUNTER_SAGA, updateCartCounterSaga);
}

function* updateCartCounterSaga ({id, value}) {
  try {
    const page = yield select(state => state.cartPage.page);
    const token = yield select(state => state.homePage.token);
    const count = yield call(
      axios.put(`http://localhost:3080/counters/${id}`,{
        value, 
        page
      },
      {
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        }
      })
    );
    yield put(setCartCounter(count,id));
  } catch (err) {
    throw new console.error(err);
  }

}
// export const updateCartCounterSaga = (id, value) => {
//   return (dispatch, getState)=>{
//     axios.put(`http://localhost:3080/counters/${id}`,{
//       value, 
//       page: getState().cartPage.page
//     },
//     {
//       headers: {
//         'Authorization': 'Bearer ' + getState().homePage.token,
//         'Content-Type': 'application/json'
//       }
//     })
//     .then((res) => {
//       dispatch(setCartCounter(res.data,id));
//     })
//     .catch((err) => {
//       throw new console.error(err);
//     });
//   }
// }
export const updateCart = (typeReq) => ({
  type: UPDATE_CART_SAGA,
  typeReq
});

function* watchupdateCartSaga() {
  yield takeEvery(UPDATE_CART_SAGA, updateCartSaga);
}

function* updateCartSaga ({typeReq}) {
  try {
    const token = yield select(state => state.homePage.token);
    const products = yield call(
      axios.put(`http://localhost:3080/carts`,{
        type: typeReq
      },
      {
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        }
      })
    );
    yield put(setCartProducts(products));
  } catch(err) {
    throw new console.error(err);
  }

}
// export const updateCartSaga = ({typeReq}) => {
//   return (dispatch, getState)=>{
//     axios.put(`http://localhost:3080/carts`,{
//       type: typeReq
//     },
//     {
//       headers: {
//         'Authorization': 'Bearer ' + getState().homePage.token,
//         'Content-Type': 'application/json'
//       }
//     })
//     .then((res) => {
//       dispatch(setCartProducts(res.data));
//     })
//     .catch((err) => {
//       throw new console.error(err);
//     });
//   }
// }
export const deleteCartProduct = (productId) => ({
  type: DELETE_CART_PRODUCT_CAGA,
  productId
});

function* watchdeleteCartProductSaga() {
  yield takeEvery(UPDATE_CART_SAGA, deleteCartProductSaga);
}

function* deleteCartProductSaga ({productId}) {
  try {
    const token = yield select(state => state.homePage.token);
    const products = yield call(
      axios.delete(`http://localhost:3080/carts/${productId}`,{
      headers: {
        'Authorization': 'Bearer ' + getState().homePage.token,
        'Content-Type': 'application/json'
      }
      })
    )
    put(setCartProducts(products));
  } catch (err) {
    throw new console.error(err)
  }
}


export default function* cartSaga() {
  yield all([
    watchdeleteCartProductSaga(),
    watchupdateCartSaga(),
    watchupdateCartCounterSaga(),
    watchdownloadCartProductsSaga()
  ])
}
// export const deleteCartProductSaga = (productId) => {
//   return (dispatch, getState) => {
//     axios.delete(`http://localhost:3080/carts/${productId}`,{
//       headers: {
//         'Authorization': 'Bearer ' + getState().homePage.token,
//         'Content-Type': 'application/json'
//       }
//     })
//     .then((res) => {
//       dispatch(setCartProducts(res.data));
//     })
//     .catch((err) => {
//       throw new console.error(err);
//     })
//   }
// }
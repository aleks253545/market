import axios from 'axios';
import { CHANGE_NAME, CHANGE_DESCRIPTION, SET_IMAGE, CHANGE_QUANTITY, CLOSE, SET_REQ, SET_RES_DATA, CREATE_PRODUCT_SAGA, DOWNLOAD_PRODUCT_SAGA, EDIT_PRODUCT_SAGA} from '../constants';
import { put, call ,takeEvery, select} from 'redux-saga/effects';
import { config } from '../config';

export const changeName = (name) => ({
  type:CHANGE_NAME,
  name
});

export const changeDescription = (description) => ({
  type:CHANGE_DESCRIPTION,
  description
});

export const changeQuantity = (quantity) => ({
  type:CHANGE_QUANTITY,
  quantity
});

export const setImage=(image)=>({
  type:SET_IMAGE,
  image
});

export const close = () => ({
  type:CLOSE
});

export const setReqStatus = (status) => ({
  type: SET_REQ,
  status
});

export const setResData = (data) => ({
  type: SET_RES_DATA,
  data
});



export const crateProduct = () => ({
  type: CREATE_PRODUCT_SAGA,
});

function* createPageSaga () {
  try {
    let formData = new FormData();
    const image = yield select( state => state.createPage.image);
    if (image) {
      formData.append('image',image);
      let path = yield select( state => state.createPage.image.path);
      formData.append('imgPath',path);
    }
    let name = yield select( state => state.createPage.name)
    formData.append('name',name);
    let description = yield select( state => state.createPage.description)
    formData.append('description',description);
    let quantity = yield select( state => state.createPage.quantity)
    formData.append('quantity',quantity);
    yield call(() =>
      axios.post(config.domain + '/products',formData,
      {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
          'Content-Type': 'application/json'
        }
      })
    );
    yield put(setReqStatus('success'));
    yield put(close());
  } catch(err) {
    yield put(setReqStatus('error'))
  }

} 


export const downloadProduct = (id) => ({
  type: DOWNLOAD_PRODUCT_SAGA,
  id
});

function* downloadProductSaga({ id }) {
  try {
    let product = yield call( () =>
      axios.get(config.domain + `/products/${id}`)
     );
     yield put(setResData(product.data))
  } catch(err) {
    console.log(err);
  }


}

export const editProduct = (id) => ({
  type: EDIT_PRODUCT_SAGA,
  id
});

function* editProductSaga () {
  try {
    let formData = new FormData();
    const image = yield select( state => state.createPage.image);
    const productId = yield select( state => state.createPage.id);
    if (image) {
      formData.append('image',image);
      const path = yield select( state => state.createPage.image.path);
      formData.append('imgPath',path);
    }
    const name = yield select( state => state.createPage.name)
    formData.append('name',name);
    const description = yield select( state => state.createPage.description)
    formData.append('description',description);
    const quantity = yield select( state => state.createPage.quantity)
    formData.append('quantity',quantity);
    yield call(() =>
      axios.put( config.domain + `/products/${productId}`,
      formData,
      {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
          'Content-Type': 'application/json'
        }
      })
    );
    yield put(setReqStatus('success'));
    yield put(close())
  } catch (err) {
    yield put(setReqStatus('error'));
  }
} 
export function* productCreateSaga () {
  yield takeEvery(EDIT_PRODUCT_SAGA, editProductSaga);
  yield takeEvery(DOWNLOAD_PRODUCT_SAGA, downloadProductSaga);
  yield takeEvery(CREATE_PRODUCT_SAGA, createPageSaga);
}


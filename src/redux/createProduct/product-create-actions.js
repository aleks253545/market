import axios from 'axios';
import { CHANGE_NAME, CHANGE_DESCRIPTION, SET_IMAGE, CHANGE_QUANTITY, CLOSE, SET_REQ, SET_RES_DATA} from '../constants';

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

const config = {
  onUploadProgress: function(progressEvent) {
    var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
  }
};

export const crateProduct = () => {
  return (dispatch, getState)=>{
    let formData = new FormData();
    if (getState().createPage.image) {
      formData.append('image',getState().createPage.image);
      formData.append('imgPath',getState().createPage.image.path);
    }
    formData.append('name',getState().createPage.name);
    formData.append('description',getState().createPage.description);
    formData.append('quantity',getState().createPage.quantity);
    axios.post('http://localhost:3080/products',formData,
    {
      headers: {
        'Authorization': 'Bearer ' + getState().homePage.token,
        'Content-Type': 'application/json'
      }
    })
    .then((res) => {
      dispatch(setReqStatus('success'));
      dispatch(close());
    })
    .catch((err) => {
      dispatch(setReqStatus('error'))
    });
  }
}

export const daownloadProduct = (id) => {
  return (dispatch, getState)=>{
    axios.get(`http://localhost:3080/products/${id}`)
    .then((res) => {
      dispatch(setResData(res.data));
    })
    .catch((err) => {
      dispatch(setReqStatus('error'))
    });
  }
}

export const editProduct = () => {
  return (dispatch, getState)=>{
    let formData = new FormData();
    if (getState().createPage.image) {
      formData.append('image',getState().createPage.image);
      formData.append('imgPath',getState().createPage.image.path);
    }
    formData.append('name',getState().createPage.name);
    formData.append('description',getState().createPage.description);
    formData.append('quantity',getState().createPage.quantity);

    axios.put(`http://localhost:3080/products/${getState().createPage.id}`,
    formData,
    {
      headers: {
        'Authorization': 'Bearer ' + getState().homePage.token,
        'Content-Type': 'application/json'
      }
    })
    .then((res) => {
      dispatch(setReqStatus('success'));
      dispatch(close());
    })
    .catch((err) => {
      dispatch(setReqStatus('error'))
    });
  }
}

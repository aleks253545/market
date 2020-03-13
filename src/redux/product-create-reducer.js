import axios from 'axios';
import { act } from 'react-dom/test-utils';

const CHANGE_NAME = 'CHANGE_NAME',
CHANGE_DESCRIPTION = 'CHANGE_DESCRIPTION',
SET_IMAGE = 'SET_IMAGE',
CHANGE_QUANTITY = 'CHANGE_QUANTITY',
CLOSE = 'CLOSE',
SET_REQ = 'SET_REQ',
SET_RES_DATA = 'SET_RES_DATA';

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
})
export const setReqStatus = (status) => ({
  type: SET_REQ,
  status
})
export const setResData = (data) => ({
  type: SET_RES_DATA,
  data
})



let initialState = {
  name: '', 
  description: '', 
  quantity: 1, 
  image: null, 
  reqStatus:'',
  imgLink: '',
  id:'',
  userId:'',
  imgPath:''
};
let createProductReducer = (state = initialState, action)=>{
  switch(action.type){
    case 'CHANGE_DESCRIPTION': {
      return {
        ...state,
        description: action.description
      }
    }
    case 'CHANGE_NAME': {
      return {
        ...state,
        name: action.name
      }
    }
    case 'SET_IMAGE': {
      return {
        ...state,
        image: action.image
      }
    }
    case 'CHANGE_QUANTITY': {
      return {
        ...state,
        quantity: action.quantity
      }
    }
    case 'CLOSE': {
      return {
        ...state,
        quantity: 1, 
        name: '',
        description: '',
        image: null,
        reqStatus:''
      }
    }
    case 'SET_REQ': {
      return {
        ...state,
        reqStatus:action.status
      }
    }
    case 'SET_RES_DATA': {
      return {
        ...state,
        ...action.data
      }
    }
    default: {
      return state;
    }
  }
}
var config = {
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
    formData.append('userId',getState().homePage.userId);
    formData.append('name',getState().createPage.name);
    formData.append('description',getState().createPage.description);
    formData.append('quantity',getState().createPage.quantity);
    axios.post('http://localhost:3080/products',formData)
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

    axios.put(`http://localhost:3080/products/${getState().createPage.id}`,formData)
    .then((res) => {
      dispatch(setReqStatus('success'));
      dispatch(close());
    })
    .catch((err) => {
      dispatch(setReqStatus('error'))
    });
  }
}

export default createProductReducer;
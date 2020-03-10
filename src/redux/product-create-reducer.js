import axios from 'axios';

const CHANGE_NAME = 'CHANGE_NAME',
CHANGE_DESCRIPTION = 'CHANGE_DESCRIPTION',
SET_IMAGE = 'SET_IMAGE',
CHANGE_QUANTITY = 'CHANGE_QUANTITY',
CLOSE = 'CLOSE',
SET_REQ = 'SET_REQ';

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



let initialState = {
  name: '', 
  description: '', 
  quantity: 1, 
  image: null, 
  reqStatus:''
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
    default: {
      return state;
    }
  }
}

export const crateProduct = () => {
  return (dispatch, getState)=>{
    let userId = getState().homePage.userId;
    axios.post('http://localhost:3080/products',{
      ...getState().createPage,
      userId
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

export default createProductReducer;

import { CHANGE_NAME, CHANGE_DESCRIPTION, SET_IMAGE, CHANGE_QUANTITY, CLOSE, SET_REQ, SET_RES_DATA} from '../constants';

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
    case CHANGE_DESCRIPTION: {
      return {
        ...state,
        description: action.description
      }
    }
    case CHANGE_NAME: {
      return {
        ...state,
        name: action.name
      }
    }
    case SET_IMAGE: {
      return {
        ...state,
        image: action.image
      }
    }
    case CHANGE_QUANTITY: {
      return {
        ...state,
        quantity: action.quantity
      }
    }
    case CLOSE: {
      return {
        ...state,
        quantity: 1, 
        name: '',
        description: '',
        image: null,
        reqStatus:''
      }
    }
    case SET_REQ: {
      return {
        ...state,
        reqStatus:action.status
      }
    }
    case SET_RES_DATA: {
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

export default createProductReducer;
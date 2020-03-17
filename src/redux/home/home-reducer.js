
import { CHANGE_LOGIN, CHANGE_PASSWORD, SIGN_IN_USER, LOG_OUT, SAVE_TOKEN} from '../constants';

let initialState={ login:'',
 password:'', 
 authorized: false,
 userId:null,
 token:'' 
};

let homeReducer=(state=initialState,action)=>{
  switch(action.type){
    case CHANGE_LOGIN: {
      return {
        ...state,
        login: action.login
      }
    }
    case CHANGE_PASSWORD: {
      return {
        ...state,
        password: action.password
      }
    }
    case SIGN_IN_USER: {
      console.log(action);
      return {
        ...state,
        authorized:true,
        userId:action.userId
      }
    }
    case LOG_OUT: {
      return {
        ...initialState
      }
    }
    case SAVE_TOKEN: {
      return { 
        ...state,
        token: action.token
      }
    }
    default:{
      return state;
    }
  }
}

export default homeReducer;
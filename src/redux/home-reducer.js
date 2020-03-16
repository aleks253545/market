import axios from 'axios';
import cookie from 'react-cookies';

import { CHANGE_LOGIN, CHANGE_PASSWORD, SIGN_IN_USER, LOG_OUT, SAVE_TOKEN} from './constants';



export const changeLogin=(login)=>({
  type:CHANGE_LOGIN,
  login
});


export const changePassword=(password)=>({
  type:CHANGE_PASSWORD,
  password
});

export const signInUser=(data)=>({
  type:SIGN_IN_USER,
  userId: data.userId
});
export const logOutAC=()=>({
  type:LOG_OUT,
});
export const saveToken=(token)=>{
  localStorage.setItem('token', token);
  return {
  type:SAVE_TOKEN,
  token
  }};





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

export const logOut = () => {
  return (dispatch) => {
    cookie.save('token', '', { path:'' });
    dispatch(logOutAC())
  }

}

export const SigInUser = (login,password) => {  
  return (dispatch)=>{
    axios.post(`http://localhost:3080/users/auth`,{username:login,password})
    .then((res) => {
      cookie.save('token', `${res.data.access_token}`, { path:'' });
      dispatch(saveToken(res.data.access_token));
      axios.get('http://localhost:3080/users', {
        headers: {
          'Authorization': 'Bearer ' + localStorage.get('token'),
          'Content-Type': 'application/json'
        }
      }).then(res => {
        dispatch(signInUser(res.data));
      })     
    })
    .catch((err) => console.log(err));
  }
}



export const SigUpUser = (login,password) => {
  return (dispatch)=>{
    axios.post('http://localhost:3080/users',{
      username: login,
      password
    })
    .then((res) => {
      console.log(1);
      dispatch(SigInUser(login,password));
    })
    .catch((err) => console.log(err));
  }
}



export default homeReducer;
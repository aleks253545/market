import axios from 'axios';
import { CHANGE_LOGIN, CHANGE_PASSWORD, SIGN_IN_USER, LOG_OUT, SAVE_TOKEN } from '../constants';

export const changeLogin = (login) => ({
  type:CHANGE_LOGIN,
  login
});


export const changePassword = (password) => ({
  type:CHANGE_PASSWORD,
  password
});

export const signInUser = (data) => ({
  type:SIGN_IN_USER,
  userId: data.userId
});

export const logOutAC = () => ({
  type:LOG_OUT,
});

export const saveToken = (token) => {
  localStorage.setItem('token', token);
  return {
    type:SAVE_TOKEN,
    token
  }
};

export const logOut = () => {
  return (dispatch) => {
    localStorage.clear();
    dispatch(logOutAC())
  }
}
  
export const checkToken = () => {  
    return (dispatch)=>{
      if(localStorage.getItem('token')){
        axios.get('http://localhost:3080/users', {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
          }
        }).then(res => {
          dispatch(signInUser(res.data));
        })
        .catch((err) => console.log(err));
      }
  
    }
  }
  
export const SigInUser = (login,password) => {  
  return (dispatch)=>{
    axios.post(`http://localhost:3080/users/auth`,{username:login,password})
    .then((res) => {
      dispatch(saveToken(res.data.access_token));
      axios.get('http://localhost:3080/users', {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
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
      dispatch(signInUser(res.data));
    })
    .catch((err) => console.log(err));
  }
}
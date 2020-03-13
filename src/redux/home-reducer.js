import axios from 'axios';
import cookie from 'react-cookies';
import ProductsPage from '../components/ProductsPage/ProductsPage';
const CHANGE_LOGIN = 'CHANGE_LOGIN',
CHANGE_PASSWORD='CHANGE_PASSWORD',
SIGN_IN_USER='SIGN_IN_USER',
LOG_OUT = 'LOG_OUT';


export const changeLogin=(login)=>({
  type:CHANGE_LOGIN,
  login
});


export const changePassword=(password)=>({
  type:CHANGE_PASSWORD,
  password
});

export const signInUser=(id)=>({
  type:SIGN_IN_USER,
  id
});
export const logOutAC=()=>({
  type:'LOG_OUT',
});





let initialState={ login:'', password:'', authorized: false,userId:null };
let homeReducer=(state=initialState,action)=>{
  switch(action.type){
    case 'CHANGE_LOGIN': {
      return {
        ...state,
        login: action.login
      }
    }
    case 'CHANGE_PASSWORD': {
      return {
        ...state,
        password: action.password
      }
    }
    case 'SIGN_IN_USER': {
      return {
        ...state,
        authorized:true,
        userId:action.id
      }
    }
    case 'LOG_OUT': {
      return {
        ...state,
        userId: null,
        authorized: false
      }
    }
    default:{
      return state;
    }
  }
}
export const logOut = () => {
  return (dispatch) => {
      cookie.save('login', '', { path:'' });
    cookie.save('password', '', { path:'' });
    dispatch(logOutAC())
  }

}
export const checkCookie = () => {
    return async (dispatch) => { 
      let  login = await  cookie.load('login'),
      password = await cookie.load('password') ;
      if( login && password){
        axios.get(`http://localhost:3080/users?login=${login}&password=${password}`)
        .then((res) => {
          dispatch(signInUser(res.data));
        })
        .catch((err) => console.log(err));
        }
      }  
}
export const SigUpUser = (login,password) => {
  return (dispatch)=>{
    axios.post('http://localhost:3080/users',{
      login,
      password
    })
    .then((res) => {
      dispatch(signInUser(res.data.id));
    })
    .catch((err) => console.log(err));
  }
}

export const SigInUser = (login,password) => {
  return (dispatch)=>{
    axios.get(`http://localhost:3080/users?login=${login}&password=${password}`)
    .then((res) => {
      cookie.save('login', `${login}`, { path:'' });
      cookie.save('password', `${password}`, { path:'' });
      dispatch(signInUser(res.data));

    })
    .catch((err) => console.log(err));
  }
}

export default homeReducer;
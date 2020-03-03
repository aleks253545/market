import axios from 'axios';

const CHANGE_LOGIN = 'CHANGE_LOGIN',
CHANGE_PASSWORD='CHANGE_PASSWORD',
SIGN_IN_USER='SIGN_IN_USER';

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
    default:{
      return state;
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
    axios.get(`http://localhost:3080/users?login=${login}&password=${password}`,{
      login,
      password
    })
    .then((res) => {
      dispatch(signInUser(res.data));

    })
    .catch((err) => console.log(err));
  }
}

export default homeReducer;
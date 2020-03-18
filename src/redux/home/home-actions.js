import axios from 'axios';
import { put, takeEvery, call, all } from 'redux-saga/effects'
import { CHANGE_LOGIN, CHANGE_PASSWORD, SIGN_IN_USER, LOG_OUT, SAVE_TOKEN, CHECK_TOKEN_SAGA, SIGN_IN_SAGA, SIGN_UP_SAGA } from '../constants';


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

export const logOutAC = () => {
  localStorage.clear();
  return {
   type:LOG_OUT,
  }
};

export const saveToken = (token) => {
  localStorage.setItem('token', token);
  return {
    type:SAVE_TOKEN,
    token
  }
};


export const checkToken = () => ({
  type: CHECK_TOKEN_SAGA 
});

function* watchCheckToken() {
  yield takeEvery('CHECK_TOKEN_SAGA', checkTokenSaga);
}

function* checkTokenSaga() {
  try {
    if (localStorage.getItem('token')) {
      const user = yield call(
        axios.get('http://localhost:3080/users', {
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('token'),
              'Content-Type': 'application/json'
            }
          })
      );
        yield put(signInUser(user))
    }
  } catch (err) {
    throw new console.error(err);
  }
}


export const signIn = (login, password) => ({
  type: SIGN_IN_SAGA,
  login,
  password
});

function* watchSignIn() {
  yield takeEvery(SIGN_IN_SAGA, SigInUserSaga);
}

function* SigInUserSaga({login, password}) {
  try { 
    const request = yield call(
      axios.post(`http://localhost:3080/users/auth`,{
        username:login,
        password
      })
    );
    yield put(saveToken(request.access_token));
    const user = yield call(
      axios.get('http://localhost:3080/users', {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
          'Content-Type': 'application/json'
        }
      })
    );
    yield put(signInUser(user))
  } catch(err) {
    throw new console.error(err);
  }
}

// export const SigInUser = (login,password) => {  
//   return (dispatch)=>{
//     axios.post(`http://localhost:3080/users/auth`,{username:login,password})
//     .then((res) => {
//       dispatch(saveToken(res.data.access_token));
//       axios.get('http://localhost:3080/users', {
//         headers: {
//           'Authorization': 'Bearer ' + localStorage.getItem('token'),
//           'Content-Type': 'application/json'
//         }
//       }).then(res => {
//         dispatch(signInUser(res.data));
//       })     
//     })
//     .catch((err) => console.log(err));
//   }
// }
  
export const signUp = (login, password) => ({
  type: SIGN_UP_SAGA,
  login,
  password
});

function* watchSignUp() {
  yield takeEvery(SIGN_UP_SAGA, SigUpUserSaga);
} 

function* SigUpUserSaga({login, password}) {
  try{
    const user = yield call(
      axios.post('http://localhost:3080/users',{
        username: login,
        password
      })
    );
    yield put(signInUser(user))
  } catch (err) {
    throw new console.error(err);
  }

}

export default function* homeSaga() {
  yield all([
    watchSignUp(),
    watchSignIn(),
    watchCheckToken
  ])
}
// export const SigUpUserSaga = (login,password) => {
//   return (dispatch)=>{
//     axios.post('http://localhost:3080/users',{
//       username: login,
//       password
//     })
//     .then((res) => {
//       dispatch(signInUser(res.data));
//     })
//     .catch((err) => console.log(err));
//   }
// }
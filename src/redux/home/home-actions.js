import axios from 'axios';
import { put, takeEvery, call, select, takeLatest } from 'redux-saga/effects'
import { CHANGE_LOGIN, CHANGE_PASSWORD, SIGN_IN_USER, LOG_OUT, SAVE_TOKEN, CHECK_TOKEN_SAGA, SIGN_IN_SAGA, SIGN_UP_SAGA } from '../constants';
import { downloadCartProducts} from '../cart/cart-actions';
import { config } from '../config';

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

function* checkTokenSaga() {
  try {
    if (localStorage.getItem('token')) {
      const user = yield call(() => 
        axios.get(config.domain + '/users', {
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('token'),
              'Content-Type': 'application/json'
            }
          })
      );
        yield put(signInUser(user))
    }
  } catch (err) {
    console.log(err);
  }
}


export const signIn = (login, password) => ({
  type: SIGN_IN_SAGA,
  login,
  password
});

function* SigInUserSaga({login, password}) {
  try { 
    const request = yield call(() =>
      axios.post(config.domain + `/users/auth`,{
        username:login,
        password
      })
    );
    yield put(saveToken(request.data.access_token));
    const user = yield call(() =>
      axios.get( config.domain + '/users', {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
          'Content-Type': 'application/json'
        }
      })
    );
    yield put(signInUser(user.data));
    yield put(downloadCartProducts());
  } catch(err) {
    console.log(err);
  }
}


  
export const signUp = (login, password) => ({
  type: SIGN_UP_SAGA,
  login,
  password
});

function* SigUpUserSaga({login, password}) {
  try{
    const user = yield call(() =>
      axios.post( config.domain + '/users',{
        username: login,
        password
      })
    );
    yield put(signInUser(user.data));
  } catch (err) {
    console.log(err);
  }

}

export function* homeSaga() {
  yield takeEvery(SIGN_UP_SAGA, SigUpUserSaga);
  yield takeLatest(SIGN_IN_SAGA, SigInUserSaga);
  // yield takeEvery(CHECK_TOKEN_SAGA, checkTokenSaga);
} 

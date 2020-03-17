import { SET_CART_PRODUCTS,SET_CART_COUNTER } from '../constants';
import axios from 'axios'

export const setCartProducts = (cartProducts) => {
  return {
    type:SET_CART_PRODUCTS,
    cartProducts
  }
}

export const setCartCounter = (value, id) => {
  return {
    type:SET_CART_COUNTER,
    value,
    id
  }
}

export const downloadProductsOnCart = () => {
  return (dispatch, getState)=>{
    axios.get(`http://localhost:3080/carts`, {
      headers: {
        'Authorization': 'Bearer ' + getState().homePage.token,
        'Content-Type': 'application/json'
      }
    })
    .then((res) => {
      if(res.data.length > 0){
        dispatch(setCartProducts(res.data));
      }
    })
    .catch((err) => {
      throw new console.error(err);
    });
  }
}

export const updateCartCounter = (id, value) => {
  return (dispatch, getState)=>{
    axios.put(`http://localhost:3080/counters/${id}`,{
      value, 
      page: getState().cartPage.page
    },
    {
      headers: {
        'Authorization': 'Bearer ' + getState().homePage.token,
        'Content-Type': 'application/json'
      }
    })
    .then((res) => {
      dispatch(setCartCounter(res.data,id));
    })
    .catch((err) => {
      throw new console.error(err);
    });
  }
}

export const updateCart = (type) => {
  return (dispatch, getState)=>{
    axios.put(`http://localhost:3080/carts`,{
      type
    },
    {
      headers: {
        'Authorization': 'Bearer ' + getState().homePage.token,
        'Content-Type': 'application/json'
      }
    })
    .then((res) => {
      dispatch(setCartProducts(res.data));
    })
    .catch((err) => {
      throw new console.error(err);
    });
  }
}

export const deleteCartProduct = (productId) => {
  return (dispatch, getState) => {
    axios.delete(`http://localhost:3080/carts/${productId}`,{
      headers: {
        'Authorization': 'Bearer ' + getState().homePage.token,
        'Content-Type': 'application/json'
      }
    })
    .then((res) => {
      dispatch(setCartProducts(res.data));
    })
    .catch((err) => {
      throw new console.error(err);
    })
  }
}
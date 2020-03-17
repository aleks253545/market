import axios from 'axios'
import { SET_PRODUCTS, SET_COUNTER, ADD_TO_CART, CLEAN_PRODUCTS, CHANGE_FILTER} from '../constants';

const setProducts = (products) => {
  return {
    type:SET_PRODUCTS,
    products
  }
}

 const setCounter = (value, id) => {
   return {
    type: SET_COUNTER,
    value,
    id
   }
 }
 const addTocart = (productId, counter) => {
  return {
   type: ADD_TO_CART,
   counter,
   productId
  }
}
export const cleanProducts = () => {
  return {
   type: CLEAN_PRODUCTS,
  }
}
export const changeFilter = (prodFilter) => {
  return {
   type: CHANGE_FILTER,
   prodFilter
  }
}
export const updateCounter = (id, value, status) => {
  return (dispatch, getState)=>{
    axios.put(`http://localhost:3080/counters/${id}`, {
      value, 
      page: getState().productsPage.page, 
    },
    {
      headers: {
        'Authorization': 'Bearer ' + getState().homePage.token,
        'Content-Type': 'application/json'
      }
    })
    .then((res) => {
      dispatch(setCounter(res.data,id));
    })
    .catch((err) => {
      throw new console.error(err);
      
    });
  }
}
export const addToCard = (productId) => { 
  return (dispatch, getState) => {
    axios.post(`http://localhost:3080/carts`,{
      productId
    },
    {
      headers: {
        'Authorization': 'Bearer ' + getState().homePage.token,
        'Content-Type': 'application/json'
      }
    })
    .then((res) => {
      dispatch(addTocart(productId, res.data));
    })
    .catch((err) => {
      throw new console.error(err);
    });
  }
}
export const downloadProducts = () => {
  return (dispatch, getState)=>{
    axios.get(`http://localhost:3080/products?offset=${getState().productsPage.offset}`)
    .then((res) => {
      if(res.data.length > 0){
        console.log(res.data);
        dispatch(setProducts(res.data));
      }
    })
    .catch((err) => {
      throw new console.error(err);
    });
  }
}


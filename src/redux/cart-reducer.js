import axios from 'axios'

const SET_CART_PRODUCTS = 'SET_CART_PRODUCTS',
SET_CART_COUNTER = 'SET_CART_COUNTER',
UPDATE_CART = 'UPDATE_CART';

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

const initialState = { cartProducts:[], page :'cart'};
let cartReducer = (state = initialState, action ) => {
  switch(action.type) {   
    case 'SET_CART_PRODUCTS': {
      return {
        ...state,
        cartProducts: action.cartProducts
      }
    }
    case 'SET_CART_COUNTER': {
      let cartProducts = state.cartProducts.concat();
      cartProducts.find((product) => product.id === action.id).quantity = action.value;
      return {
        ...state,
        cartProducts: cartProducts
      }
    }
    case 'UPDATE_CART': {
      return { 
        ...state,
        cartProducts: action.cartProducts
      }
    }
    default : {
      return state
    }
  }
}

export const downloadProductsOnCart = () => {
  return (dispatch, getState)=>{
    axios.get(`http://localhost:3080/carts?userId=${getState().homePage.userId}`)
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
    axios.put(`http://localhost:3080/counters/${id}`,{value, page: getState().cartPage.page, userId: getState().homePage.userId})
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
    axios.put(`http://localhost:3080/carts`,{userId: getState().homePage.userId,type})
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
    axios.delete(`http://localhost:3080/carts/${productId}`)
    .then((res) => {
      dispatch(setCartProducts(res.data));
    })
    .catch((err) => {
      throw new console.error(err);
    })
  }
}

export default cartReducer;
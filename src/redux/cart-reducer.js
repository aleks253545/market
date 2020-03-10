import axios from 'axios'

const initialState = { cartProducts:[], page :'cart'};
const SET_CART_PRODUCTS = 'SET_CART_PRODUCTS',
SET_CART_COUNTER = 'SET_CART_COUNTER';

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
      console.log(action.value)
      cartProducts.find((product) => product.id === action.id).quantity = action.value;
      console.log(cartProducts);
      return {
        ...state,
        cartProducts: cartProducts
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

export default cartReducer;
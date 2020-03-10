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
export const setCartCounter = (cartProducts) => {
  return {
    type:SET_CART_COUNTER,
    cartProducts
  }
}
let cartReducer = (state = initialState, action ) => {
  switch(action.type) {   
    case 'SET_CART_PRODUCTS': {
      let downloadProds = state.cartProducts.concat();
      downloadProds.push(...action.cartProducts);
      return {
        ...state,
        cartProducts: downloadProds
      }
    }
    case 'SET_CART_COUNTER': {
      let products = state.cartProducts.concat();
      products.find((product) => product.id === action.id).quantity = action.value;
      return {
        ...state,
         products: products
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
        console.log(res.data);
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
import axios from 'axios'

const initialState = { cartProducts:[]};
const SET_CART_PRODUCTS = 'SET_CART_PRODUCTS';

export const setCartProducts = (cartProducts) => {
  return {
    type:SET_CART_PRODUCTS,
    cartProducts
  }
}
let cartReducer = (state = initialState, action) => {
  switch(action.type) {   
    case 'SET_CART_PRODUCTS': {
      let downloadProds = state.cartProducts.concat();
      downloadProds.push(...action.products)
      return {
        ...state,
        cartProducts: downloadProds
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
        // dispatch(setProducts(res.data));
      }
    })
    .catch((err) => {
      throw new console.error(err);
    });
  }
}


export default cartReducer;
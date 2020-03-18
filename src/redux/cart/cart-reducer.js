
import { SET_CART_PRODUCTS, SET_CART_COUNTER, UPDATE_CART, DELTE_PRODUCT_FROM_CART, ADD_TO_CART} from '../constants';

const initialState = { cartProducts:[], page :'cart'};
let cartReducer = (state = initialState, action ) => {
  switch(action.type) {   
    case SET_CART_PRODUCTS: {
      return {
        ...state,
        cartProducts: action.cartProducts
      }
    }
    case SET_CART_COUNTER: {
      let cartProducts = state.cartProducts.concat();
      cartProducts.find((product) => product.id === action.id).quantity = action.value;
      return {
        ...state,
        cartProducts: cartProducts
      }
    }
    case UPDATE_CART: {
      return { 
        ...state,
        cartProducts: action.cartProducts
      }
    }
    case DELTE_PRODUCT_FROM_CART: {
      let cartProducts = state.cartProducts.concat();
      let index = cartProducts.findIndex((product) => product.id === action.id);
      cartProducts.splice(index, 1);
      return {
        ...state,
        cartProducts
      }
    }
    case ADD_TO_CART:{
      let cartProducts = state.cartProducts.concat();
      let product= cartProducts.find((product) => product.id === action.productId);
      if( product) {
        product.quantity = action.product.quantity;
      } else {
        cartProducts.push(action.product);
      }
      return {
        ...state,
        cartProducts
      }
    }
    default : {
      return state
    }
  }
}

export default cartReducer;
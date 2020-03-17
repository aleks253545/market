
import { SET_CART_PRODUCTS, SET_CART_COUNTER, UPDATE_CART} from '../constants';

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
    default : {
      return state
    }
  }
}

export default cartReducer;
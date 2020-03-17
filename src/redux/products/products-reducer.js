
import { SET_PRODUCTS, SET_COUNTER, ADD_TO_CART, CLEAN_PRODUCTS, CHANGE_FILTER} from '../constants';



let initialState = {
  products:[],
  offset:0,
  page: 'products',
  prodFilter: 'All'
};

let productsReducer = (state = initialState, action) => {
  switch(action.type) {   
    case SET_PRODUCTS: {
      let downloadProds = state.products.concat();
      downloadProds.push(...action.products)
      return {
        ...state,
        products: downloadProds,
        offset: state.offset + action.products.length
      }
    }
    case SET_COUNTER: {
      let products = state.products.concat();
      products.find((product) => product.id === action.id).quantity = action.value;
      return {
        ...state,
         products: products
      }
    }
    case ADD_TO_CART:{
      return {
        ...state,
        products: state.products.concat().map((product)=> {
          if(action.productId === product.id){
            product.quantity = action.counter;
          }
          return product
        })
      }
    }
    case CLEAN_PRODUCTS: {
      return {
        ...state,
        products: [],
        offset:0
      }
    }
    case CHANGE_FILTER: {
      return {
        ...state,
        prodFilter: action.prodFilter
      }
    }
    default : {
      return state
    }
  }
}


export default productsReducer;

import { SET_PRODUCTS, CLEAN_PRODUCTS, CHANGE_FILTER, UPDATE_QUANTITY, UPDATE_COUNTER} from '../constants';



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
    case UPDATE_COUNTER: {
      let products = state.products.concat();
      let product = products.find((product) => product.id === action.id);
      if( action.value <= product.maxQuantitiy && action.value > 0 ){
        product.quantity = action.value;
      }
      return {
        ...state,
         products: products
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
    case UPDATE_QUANTITY: {
      let products = state.products.concat();
      let product = products.find((product) => product.id === action.id);
      product.maxQuantitiy = action.maxQuantitiy;
      if(action.maxQuantitiy > 0){
        product.quantity = 1;
      }else {
        product.quantity = 0;
      }
      return { 
        ...state, 
        products
      }
    }
    default : {
      return state
    }
  }
}


export default productsReducer;
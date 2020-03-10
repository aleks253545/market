import axios from 'axios'

const SET_PRODUCTS = 'SET_PRODUCTS',
SET_COUNTER='SET_COUNTER',
ADD_TO_CART='ADD_TO_CART',
CLEAN_PRODUCTS=  'CLEAN_PRODUCTS',
CHANGE_FILTER = 'CHANGE_FILTER';

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

let initialState = {
  products:[],
  offset:0,
  page: 'products',
  prodFilter: 'All'
};
let productsReducer = (state = initialState, action) => {
  switch(action.type) {   
    case 'SET_PRODUCTS': {
      let downloadProds = state.products.concat();
      downloadProds.push(...action.products)
      return {
        ...state,
        products: downloadProds,
        offset: state.offset + action.products.length
      }
    }
    case 'SET_COUNTER': {
      let products = state.products.concat();
      products.find((product) => product.id === action.id).quantity = action.value;
      return {
        ...state,
         products: products
      }
    }
    case 'ADD_TO_CART':{
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
    case 'CLEAN_PRODUCTS': {
      return {
        ...state,
        products: [],
        offset:0
      }
    }
    case 'CHANGE_FILTER': {
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

export const updateCounter = (id, value, status) => {
  return (dispatch, getState)=>{
    axios.put(`http://localhost:3080/counters/${id}`,{value, page: getState().productsPage.page, userId: getState().homePage.userId})
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
      userId: getState().homePage.userId,
      productId
    })
    .then((res) => {
      dispatch(addTocart(productId, res.data));
    })
    .catch((err) => {
      throw new console.error(err);
    });
  }
}


export default productsReducer;
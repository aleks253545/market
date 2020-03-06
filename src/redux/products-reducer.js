import axios from 'axios'

const SET_PRODUCTS = 'SET_PRODUCTS',
SET_COUNTER='SET_COUNTER';

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

let initialState = {
  products:[],
  offset:0
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

export const updateCounter = (id, value) => {
  return (dispatch, getState)=>{
    axios.put(`http://localhost:3080/counters/${id}`,{value})
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
      console.log(res.data)
    })
    .catch((err) => {
      throw new console.error(err);
    });
  }
}


export default productsReducer;
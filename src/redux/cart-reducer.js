import axios from 'axios'

const initialState = { products:[]};
const SET_PRODUCTS = 'SET_PRODUCTS',;

export const setProducts = (products) => {
  return {
    type:SET_PRODUCTS,
    products
  }
}
let cartReducer = (state = initialState, action) => {
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
    default : {
      return state
    }
  }
}

export const downloadProductsOnCart = () => {
  return (dispatch, getState)=>{
    axios.get(`http://localhost:3080/cards`)
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
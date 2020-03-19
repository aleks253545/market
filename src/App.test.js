import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import axios from 'axios';
import {expectSaga} from 'redux-saga-test-plan';

import { put, take, call, run , select} from 'redux-saga/effects';
import { downloadProductsSaga, downloadProducts, setProducts } from './redux/products/products-actions';        
import productsReducer from './redux/products/products-reducer';


let initialState = {
  products:[],
  offset:0,
  page: 'products',
  prodFilter: 'All'
}
// }) 
it('add products in array ', async () => {
  const offset = 0,
  products = [ 
    {id: "edf3a245-237b-47e3-979c-bc45865957aa",
    userId: "18c16c5d-a602-460a-8194-c9d9825b2945",
   },
  ];
  
  const saga = expectSaga(downloadProductsSaga)
      .provide([
          [call(() => axios.get(`http://localhost:3080/products?offset=${offset}`)), products],])
          .put(setProducts(products))
          .dispatch(downloadProducts())
      .run()
  })


  it('handles reducers and store state', async () => {
    return expectSaga(downloadProductsSaga)
    .withReducer(productsReducer, initialState)
    .hasFinalState({
      page:'products'
    })
    .run()
  });
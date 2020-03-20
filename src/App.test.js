import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import axios from 'axios';
import {expectSaga} from 'redux-saga-test-plan';
import * as selectors from './redux/selectors/selectors'
import config from './redux/config';
import * as matchers from 'redux-saga-test-plan/matchers';
import { put, take, call, run , select} from 'redux-saga/effects';
import { downloadProductsSaga, downloadProducts, setProducts } from './redux/products/products-actions';        
import productsReducer from './redux/products/products-reducer';
import * as productsApi from './api/products';
import { testSaga } from 'redux-saga-test-plan';
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

  it('should change click counter (integration test)', async () => {
    let initialState = {
      products:[],
      offset:0,
      page: 'products',
      prodFilter: 'All'
    }            

    const saga = expectSaga(downloadProductsSaga)
        .provide([
            [call(productsApi.downloadProducts),{
              id:'1',
              name: ' 2'
            }]
        ])
        .withReducer(productsReducer, initialState)

    const result = await saga
        .dispatch(downloadProducts)
        .run()

    expect(result.storeState.products).toBe([{
      id:'1',
      name: ' 2'
    }])
})

  // let saga = testSaga(downloadProductsSaga);
  // let products = [
  //   {
  //     id:'sasa',
  //     name: 'dsds'
  //   }
  // ]
  // // try path
  // saga.next().select(selectors.getOffset);
  // saga.next(0).call(productsApi.downloadProducts,0);
  // saga.next(products).put({type: 'SET_PRODUCTS', products});
  // saga.next().isDone();
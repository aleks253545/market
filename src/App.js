import React from 'react';

import logo from './logo.svg';
import './App.css';
import HomePage from './components/HomePage/HomePage' ;
import ProductsPage from './components/ProductsPage/ProductsPage';
import CreateProductBox from './components/CreateProductBox/CreateProductBox';
import Cart from './components/Cart/Cart';
import EditProductBox from './components/EditProductBox/EditProductBox';
import { BrowserRouter, Route, Redirect} from 'react-router-dom';
import Header from './containers/Header';


function App() {
  return (
    <div className='wrapper'>
      <BrowserRouter>
      <Header></Header>
        <Route path='/'> <Redirect to='/home'></Redirect></Route>
        <Route path='/home' component={HomePage}/>
        <Route path='/products' component={ProductsPage}/>
        <Route path='/create-product' component={CreateProductBox}/>
        <Route path='/cart' component={Cart}/>
      </BrowserRouter>
    </div>

  );
}

export default App;

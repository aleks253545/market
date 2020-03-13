import React from 'react';

import {Link} from 'react-router-dom'
import s from './ProductsMenu.module.scss';

function ProductsMenu(props) {
  return (
    <div className = {s.prodMenu}>
      <div className = {s.topBlockMenu}>
        <h3 className = {s.menuTitle}>Products</h3>
        {props.authorized?<Link className = {s.addButton} to='/create-product'>+ Add Product</Link>:''}
      </div>
      {props.authorized?(
      <nav className = {s.navMenu}>
        <a className = {s.menuTabs} onClick={ (event) => {
          props.onChangeFilter('All');
          console.log(event.target);
        }}>All Products</a>
        <a className = {s.menuTabs} onClick={ () => props.onChangeFilter('My')}>My Products</a>
      </nav>):''}
    </div>
  )
}
export default ProductsMenu;
import React from 'react';

import {Link} from 'react-router-dom'
import s from './ProductsMenu.module.scss';

function ProductsMenu() {
  return (
    <div className = {s.prodMenu}>
      <div className = {s.topBlockMenu}>
        <h3 className = {s.menuTitle}>Products</h3>
        <Link className = {s.addButton} to='/create-product'>+ Add Product</Link>
      </div>
      <nav className = {s.navMenu}>
        <a className = {s.menuTabs}>All Products</a>
        <a className = {s.menuTabs}>My Products</a>
      </nav>
    </div>
  )
}
export default ProductsMenu;
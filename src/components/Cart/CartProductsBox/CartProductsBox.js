import React from "react";

import s from './CartProductsBox.module.scss';
import Product from "../../ProductsPage/Product/Product";

function CartProductsBox() {
  return ( 
    <div className = {s.cartBox}>
      <Product></Product>
      <Product></Product>
      <Product></Product>
    </div>
  )
}

export default CartProductsBox;
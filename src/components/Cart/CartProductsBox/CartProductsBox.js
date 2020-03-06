import React from "react";

import s from './CartProductsBox.module.scss';
import Product from "../../ProductsPage/Product/Product";
import { useEffect } from "react";

function CartProductsBox(props) {
  useEffect(() =>{
    if(!props.products.length){
      props.downloadProductOnCart();
    }
  })
  let products = props.products.map((product) => {
    return (
      <Product 
      id = {product.id} 
      name = {product.name}
      owner = {product.user}
      userId = {props.userId}
      description = {product.description}
      key = {product.id}
      quantity = {product.quantity}
      updateCounter = {props.onUpdateCounter}
      onAddToCart = {props.onAddToCart}
      ></Product>
    )
  })
  return ( 
    <div className = {s.cartBox}>
      {products}
    </div>
  )
}

export default CartProductsBox;
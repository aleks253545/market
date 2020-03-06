import React from "react";

import s from './CartProductsBox.module.scss';
import Product from "../../ProductsPage/Product/Product";
import { useEffect } from "react";

function CartProductsBox(props) {
  useEffect(() =>{
    if(!props.cartProducts.length){
      props.downloadProductOnCart();
    }
  })
  console.log(props)
  let cartProducts = props.cartProducts.map((product) => {
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
      {cartProducts}
    </div>
  )
}

export default CartProductsBox;
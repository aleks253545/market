import React from 'react';

import s from './ProductsBox.module.scss';
import Product from '../Product/Product';
import { useEffect } from 'react';
import throttle from '../../../any/throtle'

 function ProductsBox(props) {
  useEffect(() => {
    if(!props.products.length){
      props.onDownloadRepos();
    }
    const interval = setInterval(() => {
      let scrollHeight=document.documentElement.scrollHeight,
      clientHeight=document.documentElement.clientHeight;
      if(scrollHeight < clientHeight + window.pageYOffset + 10 && props.products.length) {
        props.onDownloadRepos();
      }
    },2000);
  },[])  
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
    <section className = {s.productsBox} >
      {products}
      
    </section>
  )
}
export default ProductsBox;
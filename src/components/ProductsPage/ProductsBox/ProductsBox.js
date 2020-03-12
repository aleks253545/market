import React from 'react';

import s from './ProductsBox.module.scss';
import Product from '../Product/Product';
import { useEffect } from 'react';

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
    return () => {
      props.onDestroyBox();
      clearInterval(interval);
    }
  },[])  

  let products = props.products.map((product) => {
      const prod = <Product 
          id = {product.id} 
          name = {product.name}
          owner = {product.userId}
          userId = {props.userId}
          description = {product.description}
          key = {product.id}
          quantity = {product.quantity}
          updateCounter = {props.onUpdateCounter}
          onAddToCart = {props.onAddToCart}
          imgLink = {product.imgLink}
        ></Product>
    return   props.prodFilter === 'All'? prod: props.prodFilter ==='My'? product.userId === props.userId? prod : '' : '';
  })

  return (
    <section className = {s.productsBox} >
      {products}
      
    </section>
  )
}
export default ProductsBox;
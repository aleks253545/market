import React from 'react';

import s from './ProductsBox.module.scss';
import Product from '../Product/Product';
import { useEffect } from 'react';
import throttle from '../../../any/throtle';

 function ProductsBox(props) {
  const onScroll =  () => {
    let scrollHeight=document.documentElement.scrollHeight,
      clientHeight=document.documentElement.clientHeight;
      if(scrollHeight < clientHeight + window.pageYOffset + 30 && props.products.length) {
        props.onDownloadRepos();
      }
  }
  useEffect(() => {
    if(!props.products.length){
      props.onDownloadRepos();
    } 
    window.addEventListener('scroll',throttle(onScroll,1000));
    return () => {
      props.onDestroyBox();

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
import React from 'react';

import s from './ProductsBox.module.scss';
import Product from '../Product/Product';

function ProductsBox() {
  return (
    <section className = {s.productsBox}>
      <Product></Product>
      <Product></Product>
      <Product></Product>
      <Product></Product>
      <Product></Product>
      <Product></Product>
      <Product></Product>
      
    </section>
  )
}
export default ProductsBox;
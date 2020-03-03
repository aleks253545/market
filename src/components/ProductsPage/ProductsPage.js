import React from 'react';

import s from './ProductsPage.module.scss';
import ProductsMenu from './ProductsMenu/ProductsMenu';
import ProductsBox from './ProductsBox/ProductsBox';

function ProductsPage() {
  return (
    <main className = {s.productsBox}>
      <ProductsMenu></ProductsMenu>
      <ProductsBox></ProductsBox>
    </main>
  )
}

export default ProductsPage;

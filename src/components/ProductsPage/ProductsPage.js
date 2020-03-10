import React from 'react';

import s from './ProductsPage.module.scss';
import ProductsBoxContainer from '../../containers/productsBoxContainer';
import ProductsMenuContainer from '../../containers/ProductMenuContainer';

function ProductsPage() {

  return (
    <main className = {s.productsBox}>
      <ProductsMenuContainer></ProductsMenuContainer>
      <ProductsBoxContainer></ProductsBoxContainer>
    </main>
  )
}

export default ProductsPage;

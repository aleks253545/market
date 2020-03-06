import React from 'react';

import s from './ProductsPage.module.scss';
import ProductsMenu from './ProductsMenu/ProductsMenu';
import ProductsBoxContainer from '../../containers/productsBoxContainer';

function ProductsPage() {

  return (
    <main className = {s.productsBox}>
      <ProductsMenu></ProductsMenu>
      <ProductsBoxContainer></ProductsBoxContainer>
    </main>
  )
}

export default ProductsPage;

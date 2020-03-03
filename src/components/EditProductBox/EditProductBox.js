import React from 'react';

import s from './EditProductBox.module.scss';
import ProductForm from '../CreateProductBox/ProductForm/ProductForm';

function EditProductBox() {
  return (
    <main className = {s.createBox}>
      <div className = {s.wrapper}>
        <h2 className = {s.title}>Edit Product</h2>
        <ProductForm></ProductForm>
      </div>
    </main>
  )
}

export default EditProductBox;
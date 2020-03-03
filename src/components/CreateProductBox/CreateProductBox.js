import React from 'react';

import s from './CreateProductBox.module.scss';
import CreateProductForm from '../../containers/CreateProductForm';

function CreateProductBox() {
  return (
    <main className = {s.createBox}>
      <div className = {s.wrapper}>
        <h2 className = {s.title}>Create Product</h2>
        <CreateProductForm></CreateProductForm>
      </div>
    </main>
  )
}

export default CreateProductBox;
import React from 'react';

import s from './EditProductBox.module.scss';
import EditProductForm from '../../containers/EditProductContainer';

function EditProductBox(props) {
  return (
    <main className = {s.createBox}>
      <div className = {s.wrapper}>
        <h2 className = {s.title}>Edit Product</h2>
        <EditProductForm id = {props.match.params.id}></EditProductForm>
      </div>
    </main>
  )
}

export default EditProductBox;
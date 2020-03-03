import React from 'react';

import s from './Product.module.scss';
import image from '.././../../img/simpl.png';
import cart from '../../../img/cartProd.png';

function Product() {
  return (
    <div className = {s.product}>
      <img src = {image} className = {s.productImage} alt='image'></img>
      <div className = {s.infoBlock}>
        <h4 className = {s.productName}>Name of produc</h4>
        <span className = {s.productDescription}>sdskdmsds dksksdskdks kdskm kmdskdms kmdsk dskmd mskdkms kmdskm dskmd kmsdkms dkms kmdskm dskmd ksmd kmsdkms dkmskdmkdskmd kmsdkm sdkms dkms kmdskm dskm</span>
      </div>
      <div className = {s.counter}> 
        <button className = {s.btnCounter}>-</button>
        <span className = {s.counterInp} >1</span>
        <button className = {s.btnCounter}>+</button>
      </div>
      <button className = {s.addBtn}>
        <img src = {cart}></img>
        Add to cart
      </button>
    </div>
  )
}
export default Product;
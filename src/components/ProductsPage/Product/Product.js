import React from 'react';

import s from './Product.module.scss';
import image from '.././../../img/simpl.png';
import cart from '../../../img/cartProd.png';
import edit from '../../../img/editImg.png';

function Product(props) {
  let quantity = props.quantity;
    return (
    <div className = {s.product}>
      <img src = {image} className = {s.productImage} alt='image'></img>
      <div className = {s.infoBlock}>
        <h4 className = {s.productName}>{props.name}</h4>
        <span className = {s.productDescription}>{props.description}</span>
      </div>
      <div className = {s.counter}> 
        <button 
        className = {s.btnCounter} 
        onClick = {() => props.updateCounter(props.id,quantity-=1)}>-</button>
        <span className = {s.counterInp} >{props.quantity}</span>
        <button 
        className = {s.btnCounter} 
        onClick = {() => props.updateCounter(props.id,quantity+=1)}>
        +</button>
    </div>  
      {props.owner === props.userId ?
        (<button className = {s.editBtn}>
          <img src = {edit}></img>
          Edit Product
        </button>):
        (<button className = {s.addBtn} onClick = { () => props.onAddToCart(props.id)}>
          <img src = {cart}></img>
          Add to cart
        </button>)
      }
      
    </div>
  )
}
export default Product;
import React from 'react';

import s from './Product.module.scss';
import image from '.././../../img/simpl.png';
import cart from '../../../img/cartProd.png';
import edit from '../../../img/editImg.png';
import rubbish from '../../../img/rubbish.png';

function Product(props) {
  let quantity = props.quantity,
  counter;
  const addToCart = () => {
    props.onAddToCart(props.id)
  }
  if(props.quantity > 0 && props.userId !== props.owner) {
    counter=(
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
    )

  }
    return (
    <div className = {s.product}>
      <img src = {image} className = {s.productImage} alt='image'></img>
      <div className = {s.infoBlock}>
        <h4 className = {s.productName}>{props.name}</h4>
        <span className = {s.productDescription}>{props.description}</span>
      </div>
      {counter}
      {props.owner === props.userId ?
        (<button className = {s.editBtn}>
          <img src = {edit}></img>
          Edit Product
        </button>): 
        props.inCart ?
        (<button className = {s.rubbishBtn} onClick = {() => props.onDeleteCartProduct(props.cartId)}>
          <img src = {rubbish}></img>
          Delete
        </button>):
        (<button className = {s.addBtn} onClick = {addToCart}>
          <img src = {cart}></img>
          Add to cart
        </button>)
      }
      
    </div>
  )
}
export default Product;
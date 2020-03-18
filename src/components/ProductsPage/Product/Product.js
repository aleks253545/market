import React from 'react';

import s from './Product.module.scss';
import image from '.././../../img/simpl.png';
import cart from '../../../img/cartProd.png';
import edit from '../../../img/editImg.png';
import rubbish from '../../../img/rubbish.png';
import { Link } from 'react-router-dom';

function Product(
  {
    quantity,
    id, 
    userId, 
    owner, 
    updateCounter, 
    imgLink, 
    name, 
    description, 
    inCart, 
    onDeleteCartProduct,
    onAddToCart, 
    cartId
  }
) {
  let quantityComn = quantity,
  counter;
  const addToCart = () => {
    onAddToCart(id,quantityComn)
  }
  if(quantityComn > 0 && userId !== owner) {
    counter=(
          <div className = {s.counter}> 
          <button 
          className = {s.btnCounter} 
          onClick = {() => updateCounter(id,quantityComn-=1)}>-</button>
          <span className = {s.counterInp} >{quantityComn}</span>
          <button 
          className = {s.btnCounter} 
          onClick = {() => updateCounter(id,quantityComn+=1)}>
          +</button>
        </div>
    )

  }
    return (
    <div className = {s.product}>
      <img src = {imgLink} className = {s.productImage} alt='image'></img>
      <div className = {s.infoBlock}>
        <h4 className = {s.productName}>{name}</h4>
        <span className = {s.productDescription}>{description}</span>
      </div>
      {counter}
      {owner === userId ?
        (<Link className = {s.editBtn} to={`/edit-product/${id}`} reouteparams={{ id: id }}>
          <img src = {edit} />
            edit
          </Link>): 
        inCart ?
        (<button className = {s.rubbishBtn} onClick = {() => onDeleteCartProduct(cartId)}>
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
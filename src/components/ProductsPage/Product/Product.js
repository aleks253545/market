import React from 'react';

import s from './Product.module.scss';
import image from '.././../../img/simpl.png';
import cart from '../../../img/cartProd.png';
import edit from '../../../img/editImg.png';
import rubbish from '../../../img/rubbish.png';
import { Link } from 'react-router-dom';

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
  console.log(props.owner,props.userId);
    return (
    <div className = {s.product}>
      <img src = {props.imgLink} className = {s.productImage} alt='image'></img>
      <div className = {s.infoBlock}>
        <h4 className = {s.productName}>{props.name}</h4>
        <span className = {s.productDescription}>{props.description}</span>
      </div>
      {counter}
      {props.owner === props.userId ?
        (<Link className = {s.editBtn} to={`/edit-product/${props.id}`} RouteParams={{ id: props.id }}>
          <img src = {edit} />
            edit
          </Link>): 
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
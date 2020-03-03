import React from 'react';

import s from './Cart.module.scss';
import CartProductsBox from './CartProductsBox/CartProductsBox';

function Cart() {
  return (
    <main className = {s.cart}>
      <div className = {s.wrapper}>
        <h2 className = {s.title}>Cart</h2>
        <CartProductsBox></CartProductsBox>
        <div className = {s.buttonBox}>
          <button className = {s.clearBtn}>Clear</button>
          <button className = {s.orderBtn}>Oreder</button>
        </div>
      </div>
      
    </main>
  )
}
export default Cart;
import React from 'react';

import s from './WelcomingWindow.module.scss';
import { Redirect, Link } from 'react-router-dom';

function WelcomingWindow() {
  return (
    <div className = {s.box}>
      <h2 className = {s.title}>Hellow, Rodert</h2>
      <div className = {s.btnBox}>
        <Link to='/products' className = {s.button}>Products</Link>
        <Link to='/cart' className = {s.button}>Cart</Link>
      </div>
    </div>
  )
}
export default WelcomingWindow;

import React from 'react'; 

import s from './MainHeader.module.scss';
import cart from '../../img/cart.png';
import user from '../../img/user.png'
import { Link} from 'react-router-dom';

function MainHeader(props) {
  return (
    <header className = {s.header} >
      <span className = {s.logo}>Logotype</span>
        {props.authorized ? (
          <div className = {s.rightSide}>
            <Link to = '/products'>
              <span className= {s.rightSide_products}>Products</span>
            </Link> 
            <div className = {s.signOut}>
              <img src = {user} className = {s.OutImg}></img>
              <span className = {s.dropBlock} onClick = {()=> props.onLogOut()}>Log Out</span>
            </div> 
            <Link to = '/cart'>
              <div className = {s.position}>
                {
                  props.cartPdouctsLength > 0?
                    (<span className = {s.elipse}></span>):
                    ''
                }
                <img src = {cart}></img>
                
              </div>
            </Link>
            
          </div>
          ) : (
          <div className = {s.rightSide}>
            <Link to = '/products'> 
              <span className= {s.rightSide_products} >Products</span>
            </Link>
            <Link to = '/home/sign-in'>
              <span className = {s.rightSide_popUp}>Sign In</span>
            </Link>
            <Link to = '/home/sign-up'>
              <span className = {s.rightSide_popUp}>Sign Up</span>
            </Link>
          </div>
        )
        }
    </header> 
  )
}
export default MainHeader;

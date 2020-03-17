
import { connect } from 'react-redux'

import Cart from '../components/Cart/Cart'
import {updateCart} from '../redux/cart/cart-actions';

let mapStateToProps = (state) => {
    return{
      authorized: state.homePage.authorized
    }
}
let mapDispatchToProps=(dispath)=>{
    return{
      onClearCart: () => {
        dispath(updateCart('clear'))
      },
      onBuyAll: () => {
        dispath(updateCart('buy'))
      }
    }
}
const CartContainer = connect(mapStateToProps, mapDispatchToProps)(Cart);
export default CartContainer;
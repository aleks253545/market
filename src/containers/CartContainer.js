
import { connect } from 'react-redux'

import Cart from '../components/Cart/Cart'
import {updateCart} from '../redux/cart-reducer';

let mapStateToProps = (state) => {
    return{
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
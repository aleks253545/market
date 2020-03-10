
import { connect } from 'react-redux'

import CartProductsBox from '../components/Cart/CartProductsBox/CartProductsBox'
import {downloadProductsOnCart, updateCartCounter} from '../redux/cart-reducer';

let mapStateToProps = (state) => {
    return{
      cartProducts: state.cartPage.cartProducts,
      userId: state.homePage.userId
    }
}
let mapDispatchToProps=(dispath)=>{
    return{
      downloadProductOnCart: () => {
        dispath(downloadProductsOnCart());
      },
      onUpdateCounter: (id, value) => {
        dispath(updateCartCounter(id, value))
    },

    }
}
const CartBoxContainer = connect(mapStateToProps, mapDispatchToProps)(CartProductsBox);
export default CartBoxContainer;
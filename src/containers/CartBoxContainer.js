
import { connect } from 'react-redux'

import CartProductsBox from '../components/Cart/CartProductsBox/CartProductsBox'
import {downloadProductsOnCart, updateCartCounter, deleteCartProduct} from '../redux/cart/cart-actions';

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

      onDeleteCartProduct: (id) => {
        dispath(deleteCartProduct(id))
      }

    }
}
const CartBoxContainer = connect(mapStateToProps, mapDispatchToProps)(CartProductsBox);
export default CartBoxContainer;
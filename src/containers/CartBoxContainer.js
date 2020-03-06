
import { connect } from 'react-redux'

import CartProductsBox from '../components/Cart/CartProductsBox/CartProductsBox'
import {downloadProductsOnCart} from '../redux/cart-reducer';

let mapStateToProps = (state) => {
    return{
      products: state.cartPage.products
    }
}
let mapDispatchToProps=(dispath)=>{
    return{
      downloadProductOnCart: () => {
        dispath(downloadProductsOnCart());
      },

    }
}
const cartBoxContainer = connect(mapStateToProps, mapDispatchToProps)(CartProductsBox);
export default cartBoxContainer;
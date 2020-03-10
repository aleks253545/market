
import { connect } from 'react-redux'

import ProductsMenu from '../components/ProductsPage/ProductsMenu/ProductsMenu';
import {changeFilter} from '../redux/products-reducer';

let mapStateToProps = (state) => {
    return{
        authorized: state.homePage.authorized
    }
}
let mapDispatchToProps=(dispath)=>{
    return{
      onChangeFilter: (value) => {
        dispath(changeFilter(value))
    }
    }
}
const ProductsMenuContainer = connect(mapStateToProps, mapDispatchToProps)(ProductsMenu);
export default ProductsMenuContainer;
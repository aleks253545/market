
import { connect } from 'react-redux';

import ProductsBox from '../components/ProductsPage/ProductsBox/ProductsBox'

import { downloadProducts, updateCounter, addToCart, cleanProducts} from '../redux/products/products-actions';
let mapStateToProps = (state) => {  
    return{
        products: state.productsPage.products,
        userId: state.homePage.userId,
        prodFilter: state.productsPage.prodFilter
    }
}
let mapDispatchToProps = (dispath) => {
    return{
        onDownloadRepos:() => {
            dispath(downloadProducts());
        },
        onUpdateCounter: (id, value) => {
            dispath(updateCounter(id, value))
        },
        onAddToCart: (id) => {
            dispath(addToCart(id))
        },
        onDestroyBox : () => {
            dispath(cleanProducts());
        }
    }
}
const ProductsBoxContainer = connect(mapStateToProps, mapDispatchToProps)(ProductsBox);
export default ProductsBoxContainer;
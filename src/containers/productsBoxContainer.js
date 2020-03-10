
import { connect } from 'react-redux';

import ProductsBox from '../components/ProductsPage/ProductsBox/ProductsBox'

import { downloadProducts, updateCounter, addToCard} from '../redux/products-reducer';
let mapStateToProps = (state) => {  
    return{
        products: state.productsPage.products,
        userId: state.homePage.userId
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
            dispath(addToCard(id))
        }   
    }
}
const ProductsBoxContainer = connect(mapStateToProps, mapDispatchToProps)(ProductsBox);
export default ProductsBoxContainer;
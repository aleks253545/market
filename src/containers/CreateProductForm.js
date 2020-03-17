
import { connect } from 'react-redux'

import ProductForm from '../components/CreateProductBox/ProductForm/ProductForm'
import {changeName,changeDescription, changeQuantity, close, crateProduct} from '../redux/createProduct/product-create-actions';

let mapStateToProps = (state) => {
    return{
      name:state.createPage.name,
      description: state.createPage.description,
      quantity: state.createPage.quantity,
      reqStatus: state.createPage.reqStatus
    }
}
let mapDispatchToProps=(dispath)=>{
    return{
      onChangeName: (name) => {
        dispath(changeName(name));
      },
      onChangeDescription: (description) => {
        dispath(changeDescription(description));
      },
      onChangeQuantity: (quantity) => {
        dispath(changeQuantity(quantity));
      },
      onClose: () => {
        dispath(close());
      },
      onCreateProduct: () => {
        dispath(crateProduct());
      }
    }
}
const CreateProductForm = connect(mapStateToProps, mapDispatchToProps)(ProductForm);
export default CreateProductForm;
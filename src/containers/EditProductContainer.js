import { connect } from 'react-redux'

import EditProductForm from '../components/EditProductBox/ProductForm/EditProductForm'
import {changeName,changeDescription, changeQuantity, close, editProduct, downloadProduct, setImage} from '../redux/createProduct/product-create-actions';

let mapStateToProps = (state) => {
    return{
      name:state.createPage.name,
      description: state.createPage.description,
      quantity: state.createPage.quantity,
      reqStatus: state.createPage.reqStatus,
      imgPath: state.createPage.imgLink
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
      oneditProduct: () => {
        dispath(editProduct());
      },
      downloadProduct: (id) => {
        dispath(downloadProduct(id))
      },
      setImage: (img) => {
        dispath(setImage(img))
      }
    } 
}
const EditProductContainer = connect(mapStateToProps, mapDispatchToProps)(EditProductForm);
export default EditProductContainer;
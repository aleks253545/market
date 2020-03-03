
import { connect } from 'react-redux'

import Previews from '../components/CreateProductBox/ProductForm/DragAndDrop/Previews';

import {setImage} from '../redux/product-create-reducer';
let mapStateToProps = (state) => {
    return{
        img:state.createPage.image
    }
}
let mapDispatchToProps=(dispath)=>{
    return{
        setImg:(image) => {
            dispath(setImage(image));
        },
    }
}
const DragAndDrop = connect(mapStateToProps, mapDispatchToProps)(Previews);
export default DragAndDrop;
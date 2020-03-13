import React, { useEffect } from 'react';
import s from './ProductForm.module.scss';
// import DragAndDrop from '../../../containers/DragAndDrop';
import Previews from './DragAndDrop/Previews'
import {Link, Redirect} from 'react-router-dom';

function EditProductForm(props) {

  let nameRef = React.createRef();
  let descRef = React.createRef();
  let counter = props.quantity ;
  useEffect(() => {
    if(props.id){
      props.downloadProduct(props.id);
    }
    return () => props.onClose();
  }, [])
  const changeName = () => {
    props.onChangeName(nameRef.current.value);
  }
  const changeDescription = () => {
    props.onChangeDescription(descRef.current.value);
  }
  const editProduct = () => {
    props.oneditProduct();
  }
  if(props.reqStatus === 'success'){
    return <Redirect to={'/products'}></Redirect>
  }
  return (
    
      <div className = {s.productForm}>
        <div className = {s.leftSite}>
          <label  className = {s.subtitle}>Title</label>
          <input id='titleInp' 
            type='text' 
            className = {s.title} 
            ref = {nameRef} 
            onChange = {changeName} 
            value = {props.name}>
          </input>
          <label className = {s.subtitle} >Title</label>
          <textarea id='titleArea' 
            type='text' 
            className = {s.descriptionArea} 
            onChange = {changeDescription} 
            value = {props.description}
            ref = {descRef}>
          </textarea>
          <div className = {s.counter}>
            <span className = {s.descCounter}>Count</span>
            <button 
              className = {s.btnCounter}
              onClick ={() => props.onChangeQuantity(counter > 1 ? counter-1 : 1)}
            > - 
            </button>
            <span className = {s.counterInp} >{counter}</span>
            <button 
              className = {s.btnCounter} 
              onClick = {() => props.onChangeQuantity(counter+1)}
            >+</button>
          </div>
          <div className = {s.buttonsBlock}>
            <button className = {s.addBtn} onClick= {editProduct}>Edit</button>
            <Link to = '/products' className = {s.closeBtn}>Close</Link>
          </div> 
        </div>
        <div className = {s.rightSite}>
          <h3 className = {s.subtitle} >Image</h3>
          <Previews imgPath ={props.imgPath} setImage = {props.setImage}></Previews>
        </div>
        
      </div>
  )
}
export default EditProductForm;
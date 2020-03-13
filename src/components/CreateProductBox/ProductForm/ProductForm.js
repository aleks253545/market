import React, { useEffect } from 'react';
import s from './ProductForm.module.scss';
import DragAndDrop from '../../../containers/DragAndDrop';
import {Link, Redirect} from 'react-router-dom';

function ProductForm(props) {
  // if(props.match.params.id){
  //   props.downloadProduct(props.match.params.id);
  // }
  let nameRef = React.createRef();
  let descRef = React.createRef();
  let counter = props.quantity ;
  useEffect(() => {
    return () => props.onClose();
  }, [])
  const changeName = () => {
    props.onChangeName(nameRef.current.value);
  }
  const changeDescription = () => {
    props.onChangeDescription(descRef.current.value);
  }
  const createProduct = () => {
    props.onCreateProduct();
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
          <label  className = {s.subtitle} >Title</label>
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
            <button className = {s.addBtn} onClick= {createProduct}>Add</button>
            <Link to = '/products' className = {s.closeBtn}>Close</Link>
          </div> 
        </div>
        <div className = {s.rightSite}>
          <h3 className = {s.subtitle} >Image</h3>
          <DragAndDrop></DragAndDrop>
        </div>
        
      </div>
  )
}
export default ProductForm;
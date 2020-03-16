import React from 'react';

import s from './ProductsBox.module.scss';
import Product from '../Product/Product';
import throttle from 'lodash.throttle'


 class  ProductsBox extends React.Component {
   constructor(props ){
     super(props);
     this.onScroll = this.onScroll.bind(this);
     this.throttling = throttle(this.onScroll,1000);
   }
  onScroll() {
    let scrollHeight=document.documentElement.scrollHeight,
      clientHeight=document.documentElement.clientHeight;
      if(scrollHeight < clientHeight + window.pageYOffset + 30 && this.props.products.length) {
        this.props.onDownloadRepos();
      }
  }
  componentDidMount() {
    if(!this.props.products.length){
      this.props.onDownloadRepos();
    } 
    window.addEventListener('scroll', this.throttling, false)
  }
  componentWillUnmount() {
    this.props.onDestroyBox();
    window.removeEventListener('scroll',this.throttling,false)
  }


  render (){
    return (
    <section className = {s.productsBox} >
      {
            this.props.products.map((product) => {
              const prod = <Product 
                  id = {product.id} 
                  name = {product.name}
                  owner = {product.userId}
                  userId = {this.props.userId}
                  description = {product.description}
                  key = {product.id}
                  quantity = {product.quantity}
                  updateCounter = {this.props.onUpdateCounter}
                  onAddToCart = {this.props.onAddToCart}
                  imgLink = {product.imgLink}
                ></Product>
            return   this.props.prodFilter === 'All'? prod: this.props.prodFilter ==='My'? product.userId === this.props.userId? prod : '' : '';
          })
      }
      
    </section>
    )
  }
}
export default ProductsBox;
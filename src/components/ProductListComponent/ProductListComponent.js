import React from 'react';

import './productList.css';

const ProductListComponent = (props) => {
  const { title, price, varianceTitle, img,comparePrice ,GoToPage,pid} = props;


  return (
    <div onClick={()=>{GoToPage(pid)}} className="product-list-item">
      <img src={img} alt={title} className="product-image" />
      <div>
      <div className="product-title">{title}</div>
      <div className="product-variance-title">{varianceTitle}</div>
      <div className='row'>
      <div className="product-price">{price}</div>
      <div className="product-compare-price">{comparePrice}</div>
      </div>
      </div>
    </div>
  );
};

export default ProductListComponent;
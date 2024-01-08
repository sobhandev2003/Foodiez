import React from 'react';
import '../css/Cart.css';

function CartProducts(props) {
    const {name,des,photo,price}=props.product;
  return (
    <div className='cart-product'>
        <img src={photo} alt=''/>
        <div>

        <h2>{name}</h2>
        <p>{des}</p>
      
        <h3><span>&#8377; </span>{price}</h3>
        </div>
    </div>

  )
}

export default CartProducts
import React from 'react';
import '../css/Cart.css';
import food1 from '../photo/abouPhoto3.png';
function CartProducts(props) {
    const {product}=props
  return (
    <div className='cart-product'>
        <img src={food1} alt=''/>
        <div>

        <h2>{product.name}</h2>
        {/* <br/> */}
        <h3><span>&#8377; </span>{product.price}</h3>
        </div>
    </div>

  )
}

export default CartProducts
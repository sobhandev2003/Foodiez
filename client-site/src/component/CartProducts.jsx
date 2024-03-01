import React from 'react';
import '../css/Cart.css';
import { IoMdRemoveCircle } from "react-icons/io";
import { useDispatch } from 'react-redux';
import { deleteCartItem } from '../services/Buyer';
function CartProducts(props) {
  const dispatch=useDispatch();
    const {name,description,photo,photoType,price}=props.product;
    const handelRemoveToCart=()=>{
      const authToken=localStorage.getItem("buyerAuthToken")
      dispatch(deleteCartItem(authToken,props.product._id))
    }

  return (
    <div className='cart-product'>
      <div className='left-div'>
        <img src={`data:${photoType};base64,${photo}`} alt=''/>
        <button onClick={() => handelRemoveToCart()}><IoMdRemoveCircle className='icon'/></button>
        </div>
        <div className='right-div'>
        <h2>{name}</h2>
        <p>{description}</p>
        <h3><span>&#8377; </span>{price}</h3>
        </div>
    </div>

  )
}

export default CartProducts
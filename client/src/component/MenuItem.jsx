import React, { useRef } from 'react'
import '../css/Shope.css';
import { useDispatch } from 'react-redux';
import { addToCarts } from '../fetures/CartsSlaice';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Alert from './Alert';

import Rating from '@mui/material/Rating';
//--------------------MenuCatagory-------------
export const MenuCatagory = (props) => {
  const { name } = props.catagory;

  return (
    <>
      <p>{name}</p>
    </>
  )
}
//-----------MenuItems----------------------
export const MenuItem = (props) => {

  const { name,ratting, des, img, price } = props.item;
  // console.log("typeOf: "+typeof(ratting));
  const productNameRef = useRef();
  const priceRef = useRef();
  const desRef = useRef();
  const imgRef = useRef();

  const dispatch = useDispatch();
  const addTocart = () => {
    const name = productNameRef.current.innerText;
    const price = priceRef.current.innerText;
    const des = desRef.current.innerText;
    const photo = imgRef.current.src;
    // console.log(photo);

    dispatch(addToCarts({ name, des, price, photo }));
    // toast(<div>  Add to cart <ShoppingCartOutlinedIcon/> </div>);
    Alert('success', <div>Add to cart  <ShoppingCartOutlinedIcon /> </div>)
  }
  return (
    <div className='menu-item'>
      <div className='left-div'>
        <img src={img} alt='loded' ref={imgRef} />
        <button onClick={addTocart}>ADD+</button>

      </div>
      <div className='right-div'>
        <h2 ref={productNameRef}>{name}</h2>
        {/* <p className='rating-p'>{ratting}<span ><StarOutlinedIcon className='ratting-icon' fontSize='5rem'/></span></p> */}
        <p ><Rating name="half-rating-read" defaultValue={ratting} precision={0.5} readOnly /></p>
        <h4 ref={priceRef}><strong>&#8377; </strong>{price}</h4>
        <p ref={desRef}>{des}</p>
      </div>
      
    </div>
  )
}

// export default MenuItem
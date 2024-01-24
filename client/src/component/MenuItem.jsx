import React, { useRef } from 'react'
import '../css/Shope.css';
import { useDispatch } from 'react-redux';
import { addToCarts } from '../fetures/CartsSlaice';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Alert from './Alert';
import Rating from '@mui/material/Rating';
import { Link } from 'react-scroll';

//SECTION - --------------------MenuCatagory-------------
export const MenuCatagory = (props) => {
  const { categoryname, id } = props.catagory;
  return (
    <>
      <Link activeClass='active'
        to={`${id}`}
        spy={true}
        smooth={true}
        offset={-150}
        duration={100}

      >
        {categoryname}
      </Link>
      {/* <p>{name}</p> */}
    </>
  )
}

//SECTION - -----------MenuItems----------------------
export const MenuItem = (props) => {

  const { name, description, rating, photo, photoType, price, _id } = props.item;
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
    dispatch(addToCarts({ name, des, price, photo, _id }));
    Alert('success', <div>Add to cart  <ShoppingCartOutlinedIcon /> </div>)
  }

  return (
    <div className='menu-item'>
      <div className='left-div'>
        <img src={`data:${photoType};base64,${photo}`} alt='loded' ref={imgRef} />
        <button onClick={addTocart}>ADD+</button>
      </div>
      <div className='right-div'>
        <h2 ref={productNameRef}>{name}</h2>
        <p ><Rating name="half-rating-read" defaultValue={rating} precision={0.5} readOnly /></p>
        <h4 ref={priceRef}><strong>&#8377; </strong>{price}</h4>
        <p ref={desRef}>{description}</p>
      </div>

    </div>
  )
}

// export default MenuItem
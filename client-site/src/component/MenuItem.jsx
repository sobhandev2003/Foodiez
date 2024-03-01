import React from 'react'
import '../css/Shope.css';
import Rating from '@mui/material/Rating';
import { Link } from 'react-scroll';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addCartItems } from '../services/Buyer';
import { setIsLogin } from '../fetures/loginFrtures';

//SECTION - --------------------MenuCatagory-------------
export const MenuCatagory = (props) => {
  const { name, id } = props.catagory;
  return (
    <>
      <Link activeClass='active'
        to={`${id}`}
        spy={true}
        smooth={true}
        offset={-150}
        duration={100}

      >
        {name}
      </Link>
      {/* <p>{name}</p> */}
    </>
  )
}

//SECTION - -----------MenuItems----------------------
export const MenuItem = (props) => {
  const dispatch = useDispatch();
  const Seller_Id = useParams().id;
  const Category_Id = props.Category_Id;

  const { name, description, rating,numberOfRating, photo, photoType, price, _id } = props.item;


  const handelAddToCart = () => {
    const Item_Id = _id;
    const authToken = localStorage.getItem("buyerAuthToken")
    if (authToken) {
      dispatch(addCartItems({ Seller_Id, Category_Id, Item_Id }, authToken))
    }
    else {
      dispatch(setIsLogin(true));
    }
  }

  return (
    <div className='menu-item'>
      <div className='left-div'>
        <img src={`data:${photoType};base64,${photo}`} alt='loded' />
        <button onClick={() => handelAddToCart()}>ADD+</button>
      </div>
      <div className='right-div'>
        <h2 >{name}</h2>
        <p className='display-rating'><Rating name="half-rating-read" defaultValue={rating} precision={0.5} readOnly /><span>{`(${numberOfRating})`}</span></p>
        <h4 ><strong>&#8377; </strong>{price}</h4>
        <p >{description}</p>
      </div>
    </div>
  )
}

// export default MenuItem
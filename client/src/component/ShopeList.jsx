import React from 'react';
import '../css/ShopeList.css';
import { useNavigate } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCatagory } from '../services/Catagory';
import { setIsLogin } from '../fetures/loginFrtures';

function ShopeList(props) {
  const { id, restaurantName, img, imgType, rating,address } = props.seller;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginAccountDetails=useSelector(state=>state.Login.loginAccountDetails);
  //NOTE - navigate product page
  const navigateSallerProductPage = async () => {
    dispatch(fetchCatagory(id));
    if(!loginAccountDetails){
      dispatch(setIsLogin(true))
    }
    navigate(`/restaurant/${id}`)
  }

  return (
    <div className='shope-list-item'>
      <div className='shope-list' onClick={navigateSallerProductPage}>
        <img className='shope-photo overflow-hidden' src={`data:${imgType};base64,${img}`} alt='shope-phot' />
        <h2 className='shope-name overflow-hidden'>{restaurantName}</h2>
        <div className='ratting-div overflow-hidden'>
          <p ><Rating name="half-rating-read" defaultValue={rating} precision={0.5} readOnly /></p>
        </div>
        <p className='food overflow-hidden'>{address}</p>
        {/*
        <p className='offer overflow-hidden'>{offer}</p>
        <h3 className='delivery-time overflow-hidden'>
       {delevery_time}
        </h3> */}
      </div>
    </div>
  )
}

export default ShopeList
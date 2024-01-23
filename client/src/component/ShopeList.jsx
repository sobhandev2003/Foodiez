import React, { useState, useEffect } from 'react';
import base64 from 'base64-js';
import '../css/ShopeList.css';
// import demoPhoto from '../photo/images.jpg';
import { useNavigate } from 'react-router-dom';
import Rating from '@mui/material/Rating';
function ShopeList(props) {
  // console.log(props.seller.id);
  const {id,restaurantName,img,imgType,special_food,rating}=props.seller;
    const navigate=useNavigate();
    const navigateSallerProductPage=()=>{
      console.log(id);
       navigate(`/shope/${id}`)
    }
  return (
    <div className='shope-list-item'>
      <div className='shope-list' onClick={navigateSallerProductPage}>
       <img className='shope-photo overflow-hidden' src={`data:${imgType};base64,${img}`} alt='shope-phot'/>
        <h2 className='shope-name overflow-hidden'>{restaurantName}</h2>
        <div className='ratting-div overflow-hidden'>
            <p ><Rating name="half-rating-read" defaultValue={rating} precision={0.5} readOnly /></p>
        </div>
        <p className='food overflow-hidden'>{special_food.slice(0,35)}...</p>
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
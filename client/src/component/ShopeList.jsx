import React from 'react'
import '../css/ShopeList.css';
// import demoPhoto from '../photo/images.jpg';
import { useNavigate } from 'react-router-dom';
import Rating from '@mui/material/Rating';
function ShopeList(props) {
  const {name,photo,rating,  foods,offer, delevery_time}=props.shope;
    const navigate=useNavigate();
    // for demo
    // const food="Bakery, Beverages, Maharashtrian, Snacks, Street Food, South Indian, Punjabi, Chaat, Indian, American, North Indian, Fast Food, Desserts, Cafe, Healthy Food, Home Food"
  return (
    <div className='shope-list-item'>
      <div className='shope-list' onClick={()=>{navigate(`/shope/shope-id`)}}>
        <img className='shope-photo overflow-hidden' src={photo} alt='shope-phot'/>
        <h2 className='shope-name overflow-hidden'>{name}</h2>
        <div className='ratting-div overflow-hidden'>
            <p ><Rating name="half-rating-read" defaultValue={rating} precision={0.5} readOnly /></p>
        </div>
        <p className='food overflow-hidden'>{foods.slice(0,35)}...</p>
        <p className='offer overflow-hidden'>{offer}</p>
        <h3 className='delivery-time overflow-hidden'>
       {delevery_time}
        </h3>
        </div>
    </div>
  )
}

export default ShopeList
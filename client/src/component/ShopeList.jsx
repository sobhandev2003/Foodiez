import React from 'react'
import '../css/ShopeList.css';
import demoPhoto from '../photo/images.jpg';
import { useNavigate } from 'react-router-dom';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
function ShopeList() {
    const navigate=useNavigate();
    // for demo
    const food="Bakery, Beverages, Maharashtrian, Snacks, Street Food, South Indian, Punjabi, Chaat, Indian, American, North Indian, Fast Food, Desserts, Cafe, Healthy Food, Home Food"
  return (
    <div className='shope-list' onClick={()=>{navigate(`/shope/123`)}}>
        <img className='shope-photo overflow-hidden' src={demoPhoto} alt='shope-phot'/>
        <h2 className='shope-name overflow-hidden'>Chai Point</h2>
        <div className='ratting-div overflow-hidden'>
            <h3>4.8</h3>
            <StarOutlinedIcon className='ratting-icon'/>
        </div>
        <p className='food overflow-hidden'>{food.slice(0,35)}...</p>
        <p className='offer overflow-hidden'>₹150 for two</p>
        <h3 className='delivery-time overflow-hidden'>
        43 Minutes
        </h3>

    </div>
  )
}

export default ShopeList
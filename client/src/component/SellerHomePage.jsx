import React, { useEffect, useState } from 'react'
import photo1 from '../photo/photo1.png';
import { useSelector } from 'react-redux';
function SellerHomePage() {
  const currentSellerDetailes=useSelector(state=>state.Seller.currentSellerDetails);
  const [currentSeller,setCurrentSeller]=useState();
useEffect(()=>{
//NOTE - fetch curent seller all catagory and
},[currentSellerDetailes])


  return (
     

    <div>
 <div className='home-above-div'>
        <h3>Start selling food online from your restaurant.</h3>
        <img src={photo1} alt='photo1' />
      </div>

    </div>
  )
}

export default SellerHomePage
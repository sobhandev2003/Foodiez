import React, { useEffect, useState } from 'react';
import '../css/Home.css';
import { useSelector, useDispatch } from 'react-redux';
import { searchSeller } from '../services/searchSellerReducers';
import photo1 from '../photo/photo1.webp';
import ShopeList from '../component/ShopeList';
import photo2 from '../photo/photo2.webp';
import { LuSearchX } from "react-icons/lu";
function BuyerHomePage() {
  const dispatch = useDispatch()
  const [sellers, setSellers] = useState([]);
  const allSllerdata = useSelector(state => state.Seller.allSeller)
  //NOTE  -   Search a seller
  const filterByName = (e) => {
    dispatch(searchSeller({ restaurantName: e.target.value }));
  }

  const filterByRating = (rating) => {
    dispatch(searchSeller({ rating }));
  }

  //NOTE - call useEffect -----

  useEffect(() => {
    setSellers(allSllerdata);
  }, [allSllerdata])
  return (
    <div className='buyer-home-page'>
      <div className='home-above-div'>
        <h3>Order food online in your home</h3>

        <img src={photo1} alt='photo1' />
      </div>
      <div className='shope-midile-div'>
        <div className='search-div'>
          <div className='search-rating-div' >
            <button className='rating-search-btn' onClick={() => { filterByRating(-1) }}>All Rated</button>
            <button className='rating-search-btn' onClick={() => { filterByRating(2) }}>2+ Rated</button>
            <button className='rating-search-btn' onClick={() => { filterByRating(3) }}>3+ Rated</button>
            <button className='rating-search-btn' onClick={() => { filterByRating(4) }}>4+ Rated</button>
          </div>
          <input type="search" id='search-input' onChange={filterByName} name="search" placeholder='Type for search' />
        </div>
        <div className='shope-list-div'>
          {
            //TODO - fixed not restaurant found style
            sellers && sellers.length > 0 ? sellers.map((seller) => {
              return <ShopeList key={seller.id} seller={seller} />
            }) : <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <LuSearchX style={{ fontSize: "10rem" }} />
              <h2>No restaurant found</h2></div>
          }
        </div>



      </div>
      <div className='home-bottom-img'>
        <img src={photo2} alt='photo2' />
      </div>
    </div>
  )
}

export default BuyerHomePage
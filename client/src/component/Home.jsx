import React, { useEffect, useState } from 'react';
import '../css/Home.css';
import photo1 from '../photo/photo1.png';
import ShopeList from './ShopeList';
import photo2 from '../photo/photo2.png';
import { useSelector, useDispatch } from 'react-redux';
import { searchSeller } from '../reducers/searchSellerReducers';
// import { searchSeller } from '../../reducers/searchSellerReducers';
function Home() {
  console.log("ch");
  const dispatch = useDispatch()
  const [sellers, setSellers] = useState([]);
  const allSllerdata = useSelector(state => state.allSeller.allSeller)

  //SECTION -  For search a seller
  const filterByName = (e) => {
    dispatch(searchSeller({ restaurantName: e.target.value }));

  }
  const filterByRating = (rating) => {
    dispatch(searchSeller({ rating }));
    // setFilterSeller(sellers.filter((seller) => {
    //   return seller.rating >= rating;
    // }));
  }
  //NOTE - call useEffect -----
  useEffect(() => {
    setSellers(allSllerdata);
  }, [allSllerdata])
  return (
    <div className='home'>
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
            //TODO - 
            sellers && sellers.length > 0 ? sellers.map((seller) => {

              //  console.log(sellers);
              return <ShopeList key={seller.id} seller={seller} />
            }) : <h2>No shope found</h2>
          }
        </div>



      </div>
      <div className='home-bottom-img'>
        <img src={photo2} alt='photo2' />
      </div>
    </div>
  )
}

export default Home
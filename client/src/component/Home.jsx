import React, { useEffect, useState } from 'react';
import '../css/Home.css';
import photo1 from '../photo/photo1.png';
import ShopeList from './ShopeList';
import photo2 from '../photo/photo2.png';

import jsonData from '../demoDataFile/shope.json'
function Home() {
  const shopes = jsonData.shopes;
  const [seller, setSeller] = useState();
  const [filterShope, setFilterShope] = useState(shopes);
  //TODO - fetch seller from backend ---------
  const fetchSeller = async () => {
    try {
      const response = await fetch("http://localhost:5001/food/user/seller/")
      // const parseSellersJson=await JSON.parse()
      const data = await response.json();

      setSeller(data);
      // setFilterShope(data)

    } catch (error) {
      console.log(error);
    }
  }

  //SECTION -  For search a shope

  const filterByName = (e) => {
    setFilterShope(shopes.filter((shope) => {
      return shope.name.toLowerCase().includes(e.target.value)
    }));
  }
  const filterByRating = (rating) => {

    setFilterShope(shopes.filter((shope) => {
      return shope.rating >= rating;
    }));
  }
  //NOTE - call useEffect -----
  useEffect(() => {
    fetchSeller();
    // console.log(seller);
  }, [])
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
            seller && filterShope.length > 0 ? seller.map((seller) => {
                // console.log(seller);
              return <ShopeList seller={seller} />
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
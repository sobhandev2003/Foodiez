import React, {  useState } from 'react';
import '../css/Home.css';
import photo1 from '../photo/photo1.png';
import ShopeList from './ShopeList';
import photo2 from '../photo/photo2.png';
import demoPhoto from '../photo/images.jpg';
function Home() {
  const shopes=[
    {
      name:"Chai point",
      photo:demoPhoto,
      rating:4,
      foods:"Bakery, Beverages, Maharashtrian,",
      offer:"150 for two",
      delevery_time:"25 Minutes"
    },
    {
      name:"Chai point",
      photo:demoPhoto,
      rating:3.5,
      foods:"Bakery, Beverages, Maharashtrian,",
      offer:"500 for five",
      delevery_time:"30 Minutes"
    },
    {
      name:"Afc",
      photo:demoPhoto,
      rating:4.4,
      foods:"Bakery, Beverages, Maharashtrian,",
      offer:"200 for two",
      delevery_time:"40 Minutes"
    },
    {
      name:"Food zone",
      photo:demoPhoto,
      rating:3.3,
      foods:"Bakery, Beverages, Maharashtrian,",
      offer:"250 for three",
      delevery_time:"33 Minutes"
    },
    {
      name:"Pizza hat",
      photo:demoPhoto,
      rating:2.3,
      foods:"Bakery, Beverages, Maharashtrian,",
      offer:"350 for four",
      delevery_time:"23 Minutes"
    }
  ]
  // For search a shope
const [filterShope,setFilterShope]=useState(shopes);
const filterByName=(e)=>{
//  console.log(e.target.value);
  setFilterShope(shopes.filter((shope)=>{
    return shope.name.toLowerCase().includes(e.target.value)
 }));
}
const filterByRating=(rating)=>{
  // console.log(e.target.value);
   setFilterShope(shopes.filter((shope)=>{
     return shope.rating>=rating;
  }));
 }

  return (
    <div className='home'>
     <div className='home-above-div'>
        <h3>Order food online in your home</h3>
        
            <img  src={photo1} alt='photo1' />
     </div>
     <div className='shope-midile-div'>
      <div className='search-div'> 
      <div className='search-rating-div' >
        <button className='rating-search-btn' onClick={()=>{filterByRating(-1)}}>All Rated</button>
        <button className='rating-search-btn' onClick={()=>{filterByRating(2)}}>2+ Rated</button>
        <button className='rating-search-btn' onClick={()=>{filterByRating(3)}}>3+ Rated</button>
        <button className='rating-search-btn' onClick={()=>{filterByRating(4)}}>4+ Rated</button>
      </div>
        <input type="search" id='search-input' onChange={filterByName} name="search" placeholder='Type for search' />
      </div>
      <div className='shope-list-div'>
      {
        filterShope.length>0 ?filterShope.map((shope)=>{

          return <ShopeList shope={shope}/>
        }):<h2>No shope found</h2>
      }
      </div>
     


</div>
<div className='home-bottom-img'>
  <img src={photo2} alt='photo2'/>
</div>
    </div>
  )
}

export default Home
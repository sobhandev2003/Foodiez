import React from 'react';
import '../css/Home.css';
import photo1 from '../photo/photo1.png';
function Home() {
  return (
    <div className='home'>
     <div className='home-above-div'>
        <h3>Order food online in your home</h3>
        
            <img  src={photo1} alt='photo1' />
     </div>
     
    </div>
  )
}

export default Home
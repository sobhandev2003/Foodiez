import React from 'react'
import '../css/Shope.css';
import food1 from '../photo/abouPhoto3.png';
function MenuItem() {
  return (
    <div className='menu-item'>
            <div>

            <h2>Name</h2>
            <h3>Price</h3>
            <p>description</p>
            </div>
            <div className='right-div'>
            <img src={food1} alt='loded'/>
               <button>ADD+</button>
            </div>
    </div>
  )
}

export default MenuItem
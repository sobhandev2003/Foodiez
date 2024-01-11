import '../css/Shope.css'
import React from 'react'
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import MenuItem from './MenuItem';

import menu from '../demoDataFile/menu.json'
function Shope() {
  
  const menuItems=menu.menu;
 
  return (
    //demo meno arr


    <div className='shope-page'>
        <div className='shope-details'>
            <div>
            <h2>Shope Name</h2>
            <p>Ava label food </p>
            </div>
            <div className='shope-rating'>
                <StarOutlinedIcon className='ratting-icon'/>
                <span>4.3 rating</span>
            </div>
            {/* <hr/> */}
        </div>
        <div className='menu-card'>
          {
            menuItems && menuItems.map((item)=>{
              return <MenuItem item={item}/>
            })
          }

         
        
        </div>


    </div>
  )
}

export default Shope
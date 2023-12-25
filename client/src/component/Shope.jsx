import React from 'react'
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import MenuItem from './MenuItem';
function Shope() {
  return (
    <div className='shope-page'>
        <div className='shope-details'>
            <div>
            <h2>Shope Name</h2>
            <p>Ava label food </p>
            </div>
            <div>
<StarOutlinedIcon/>
                <span>rating</span>
            </div>
            <hr/>
        </div>
        <div className='menu-card'>
         <MenuItem/>
         <MenuItem/>
         <MenuItem/>
         <MenuItem/>
         <MenuItem/>
         <MenuItem/>
         <MenuItem/>
        </div>


    </div>
  )
}

export default Shope
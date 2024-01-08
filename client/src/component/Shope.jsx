import '../css/Shope.css'
import React from 'react'
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import MenuItem from './MenuItem';
import food1 from '../photo/abouPhoto3.png';
import food2 from '../photo/food2.png';
import food3 from '../photo/food3.png';
function Shope() {
  const menuItems=[
    {
      name: "coffe",
      des:"jhftfhjkgugkjk",
      img:food2,
      price:200
    },
    {
      name: "barger",
      des:"jhftfhjkgugkjk",
      img:food1,
      price:300
    }, {
      name: "biriani",
      des:"jhftfhjkgugkjkhghghgkki",
      img:food3,
      price:500
    },
  ]
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
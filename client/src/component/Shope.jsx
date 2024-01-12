import '../css/Shope.css'
import React from 'react';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import { MenuCatagory, MenuItem } from './MenuItem';

import menu from '../demoDataFile/menu.json'
function Shope() {

  const menuCatagory = menu.catagory;
  // const {menu,setMenu}=useState();



  return (
    //demo meno arr


    <div className='shope-page'>
      <div className='shope-details'>
        <div>
          <h2>Shope Name</h2>
          <p>Ava label food </p>
        </div>
        <div className='shope-rating'>
          <StarOutlinedIcon className='ratting-icon' />
          <span>4.3 rating</span>
        </div>

      </div>
      <div className='menu-card'>
        <div className='menu-catagory'>
          {
            menuCatagory && menuCatagory.map((catagory) => {
              return <MenuCatagory catagory={catagory} />
            })
          }
        </div>
        <div className='menu-food'>

          {
            menuCatagory && menuCatagory.map((catagory) => {
              const { menu } = catagory
              console.log("menu: ");
              console.log(menu);
              // setMenu(menu);

              return <div name={`${catagory.id}`}>

                <h3 >{catagory.name}</h3>
                {

                  menu && menu.map(

                    (item) => {
                      // console.log(menu);
                      return <MenuItem item={item} />
                    }
                  )
                }
                <hr />
              </div>

            })
          }
        </div>



      </div>


    </div>
  )
}

export default Shope
import '../css/Shope.css'
import React, { useEffect, useState } from 'react';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import { MenuCatagory, MenuItem } from '../component/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCatagory } from '../services/Catagory';
import { useParams } from 'react-router-dom';

function Shope() {
  window.scrollTo(0,0);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [catagorys, setCatagorys] = useState();
  const allCatagory = useSelector(state => state.catagory.catagory);

  useEffect(() => {

    setCatagorys(allCatagory);
  }, [allCatagory])

  useEffect(() => {
    dispatch(fetchCatagory(id));
  }, [dispatch,id])

  return (
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
            catagorys && catagorys.length>0? catagorys.map((catagory) => {
              return <MenuCatagory key={catagory.id} catagory={catagory} />
            }):<h1>loading</h1>
          }

          {!catagorys && <h1>loding</h1>}

        </div>

        <div className='menu-food'>

          {
            catagorys && catagorys.map((catagory) => {
              const { item } = catagory
              
              return <div key={catagory.id} name={`${catagory.id}`}>
                
                <h3 >{catagory.name}</h3>
                {
                 item && item.map((food) => {
                    return <MenuItem key={food._id} item={food} Category_Id={catagory.id} />
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
import '../css/Shope.css'
import React, { useEffect, useState } from 'react';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import { MenuCatagory, MenuItem } from '../component/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCatagory } from '../services/Catagory';
import { useParams } from 'react-router-dom';
import loadingSpin from '../photo/loading-spinner.gif'

function Shope() {
  window.scrollTo(0, 0);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [catagorys, setCatagorys] = useState(null);
  const allCatagory = useSelector(state => state.catagory.catagory);

  useEffect(() => {
    setCatagorys(allCatagory);
  }, [allCatagory])

  useEffect(() => {
    dispatch(fetchCatagory(id));
  }, [dispatch, id])

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

    {catagorys ? <div className='menu-card'>
        <div className='menu-catagory'>
          {
          
            catagorys.length > 0 ? catagorys.map((catagory) => {
              return <MenuCatagory key={catagory.id} catagory={catagory} />
            }) : <h1>No Food sell this restaurant </h1>
          }

        </div>

        <div className='menu-food'>

          {
             catagorys.map((catagory) => {
              const { item } = catagory

              return <div key={catagory.id} name={`${catagory.id}`}>

                <h3 >{catagory.name}</h3>
                {
                  item && item.length>0 ?<>{ item.map((food) => {
                    return <MenuItem key={food._id} item={food} Category_Id={catagory.id} />
                  }
                  )}
                  </>:<h4 className='orange'>No item present for this category</h4>
                }
                <hr />
              </div>

            })
          }
        </div>



      </div>:
      <div className='loading-container'>
          <img className='loading-spin' src={loadingSpin} alt="loading..." />
          </div>}


    </div>
  )
}

export default Shope
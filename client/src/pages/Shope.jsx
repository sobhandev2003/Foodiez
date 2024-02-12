import '../css/Shope.css'
import React, { useCallback, useEffect, useState } from 'react';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import { MenuCatagory, MenuItem } from '../component/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCatagory } from '../services/Catagory';
import { useParams } from 'react-router-dom';
import loadingSpin from '../photo/loading-spinner.gif'
import { fetchSellerById } from '../services/Seller';
import { isValidMongoObjectId } from '../component/inputValidator';
import Error from '../component/Error';

function Shope() {
  window.scrollTo(0, 0);
  const { id } = useParams();
  const isValidSellerId=isValidMongoObjectId(id);
  const dispatch = useDispatch();
  const [catagorys, setCatagorys] = useState(null);
  const allCatagory = useSelector(state => state.catagory.catagory);
  const [seller, setSeller] = useState(null);
  const [errorRouting, setErrorRouting] = useState(false);
  const getSeller = useCallback(async () => {
    const data = await fetchSellerById(id);
    if (data) {
      setSeller(data);
    }
    else if (!seller) {
      setErrorRouting(true)
    }
  },[id,seller])

  useEffect(() => {
    setCatagorys(allCatagory);
  }, [allCatagory])

  useEffect(() => {
    isValidSellerId && dispatch(fetchCatagory(id));
  }, [isValidSellerId,dispatch, id])
  useEffect(() => {
    isValidSellerId && getSeller();
    !isValidSellerId && setErrorRouting(true)
    // eslint-disable-next-line
  }, [])
  return (
    <>
    <div className='shope-page' style={{display:errorRouting?"none":"block"}}>
     {seller && <div className='shope-details'>
        <div>
          <h2>{seller.restaurantName}</h2>
          <p>{seller.address} </p>
        </div>
        <div className='shope-rating'>
          <StarOutlinedIcon className='ratting-icon' />
          <span>{seller.rating} rating</span>
        </div>

      </div>}

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
                  item && item.length > 0 ? <>{item.map((food) => {
                    return <MenuItem key={food._id} item={food} Category_Id={catagory.id} />
                  }
                  )}
                  </> : <h4 className='orange'>No item present for this category</h4>
                }
                <hr />
              </div>

            })
          }
        </div>



      </div> :
        <div className='loading-container'>
          <img className='loading-spin' src={loadingSpin} alt="loading..." />
        </div>}


    </div>
    {errorRouting && <Error navigateTo={"Go to Home "} navigatePath={"/"}/>}
    </>
  )
}

export default Shope
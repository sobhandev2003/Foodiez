import React, { useEffect, useState } from 'react'
import photo1 from '../photo/photo1.png';
import {  useDispatch, useSelector } from 'react-redux';
import '../css/Home.css'
import {  Fab } from '@mui/material';
import { Edit } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { fetchItemByCategoryId } from '../conectWithBackend/item';
function SellerHomePage() {
  const navigate = useNavigate();
  const dispatch=useDispatch()
  const currentSellerDetailes = useSelector(state => state.Seller.currentSellerDetails);
  const currentSellerCategory = useSelector(state => state.Seller.currentSellerCategory);
  // const [currentSeller,setCurrentSeller]=useState();
  const [categories, setCategories] = useState();

  const editCategory = (catagory) => {
    // dispatch(setEditCategory(catagory))
    dispatch(fetchItemByCategoryId(catagory.id))
    localStorage.setItem("editCategory",JSON.stringify(catagory))

    navigate('/edit-category')
  }


  useEffect(() => {
    //NOTE - fetch curent seller all catagory and
    setCategories(currentSellerCategory);
    // console.log(currentSellerCategory);
  }, [currentSellerDetailes, currentSellerCategory])

  return (
    <div className='seller-home-page'>
      <div className='home-above-div'>
        <h3>Start selling food online from your restaurant.</h3>
        <img src={photo1} alt='photo1' />
      </div>
      <div className='categories'>
        {
          categories && categories.length > 0 ? categories.map((catagory) => {

            return <div className='seller-category' key={catagory.id}>
              <h2>{catagory.categoryname}</h2>
              <Fab aria-label="edit" className='edit-fab' onClick={() => { editCategory(catagory) }}>
                <Edit />
              </Fab>

            </div>
          }) : <h1>loading</h1>
        }
      </div>
    </div>
  )
}

export default SellerHomePage
import React, { useEffect, useState } from 'react'
import photo1 from '../photo/photo1.webp';
import { useDispatch, useSelector } from 'react-redux';
import '../css/Home.css'
import { FiEdit } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import { fetchItemByCategoryId } from '../services/item';
import loadingSpinner from '../photo/loading-spinner.gif'
function SellerHomePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  // const authToken = localStorage.getItem("authToken");
  const loginAccountDetails = useSelector(state => state.Login.loginAccountDetails);
  const currentSellerCategory = useSelector(state => state.Seller.currentSellerCategory);
  const [categories, setCategories] = useState(null);

  const editCategory = (catagory) => {
    dispatch(fetchItemByCategoryId(catagory.id))
    localStorage.setItem("editCategory", JSON.stringify({ id: catagory.id, name: catagory.name }))
    navigate('/edit-category')
  }

  useEffect(() => {
    //NOTE - fetch curent seller all catagory and
    setCategories(currentSellerCategory);

  }, [loginAccountDetails, currentSellerCategory])


  return (
    <>
      <div className='home-above-div'>
        <h3>Start selling food online from your restaurant.</h3>
        <img src={photo1} alt='photo1' />
      </div>
      <div className='categories'>
        {
          categories ? <>{categories.length > 0 ? categories.map((catagory) => {

            return <div className='seller-category' key={catagory.id}>
              <h2>{catagory.name} </h2>
              <FiEdit aria-label="edit" className='edit-fab' onClick={() => { editCategory(catagory) }} />


            </div>
          }) : <h1>Don't have any category</h1>}</> : <><img src={loadingSpinner} alt='Loading..' /></>
        }
        {/* <img src={loadingSpinner} alt='Loading..'/> */}
      </div>

    </>
  )
}

export default SellerHomePage
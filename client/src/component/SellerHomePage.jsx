import React, { useEffect, useState } from 'react'
import photo1 from '../photo/photo1.png';
import { useDispatch, useSelector } from 'react-redux';
import '../css/Home.css'
import { Fab } from '@mui/material';
import { Edit } from '@mui/icons-material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useNavigate } from 'react-router-dom';
import { fetchItemByCategoryId } from '../conectWithBackend/item';
import CloseIcon from '@mui/icons-material/Close';
import Model from './Model';
import { deleteCategoryById } from '../conectWithBackend/Catagory';
function SellerHomePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [deleteCategory, setDeleteCategory] = useState();
  const [password, setPassword] = useState();
  const currentSellerDetailes = useSelector(state => state.Seller.currentSellerDetails);
  // console.log(currentSellerDetailes);
  const currentSellerCategory = useSelector(state => state.Seller.currentSellerCategory);
  // const [currentSeller,setCurrentSeller]=useState();
  const [categories, setCategories] = useState();

  const editCategory = (catagory) => {
    // dispatch(setEditCategory(catagory))
    dispatch(fetchItemByCategoryId(catagory.id))
    localStorage.setItem("editCategory", JSON.stringify({ id: catagory.id, categoryname: catagory.categoryname }))
    navigate('/edit-category')
  }

  const handelDeleteCategory = async(e) => {
    e.preventDefault()
    // console.log(currentSellerDetailes);
    if (deleteCategory){
      const authToken = localStorage.getItem("authToken")
       dispatch(deleteCategoryById(authToken, password, deleteCategory ,currentSellerDetailes))
      
    }
    
    setDeleteCategory(null)
  }


  const handeleInputChange = (e) => {
    setPassword(e.target.value);
  }
  //pop-up windo;
  const deleteCategoryTeplet = (
    deleteCategory && <Model>
      <CloseIcon className='cancel-model' onClick={() => { setDeleteCategory(null) }} />
      
      <form className='model-element' onSubmit={handelDeleteCategory}>
      <label className='delete-category-aller-p'>Are you sure?<br />You Want to delete <strong> {deleteCategory.categoryname} </strong>Category </label>
        <label style={{ fontSize: "2rem" }}>Password:</label>
        <input type='password' onChange={handeleInputChange} placeholder='Enter your account password' required />
      
        <button type="submit" className='delete-btn'>Delete</button>
      </form>
    </Model>
  )
  useEffect(() => {
    //NOTE - fetch curent seller all catagory and
    setCategories(currentSellerCategory);

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
              <h2>{catagory.categoryname} </h2>
              <Fab aria-label="edit" className='edit-fab' onClick={() => { editCategory(catagory) }}>
                <Edit />
              </Fab>
              <button className='delete-category-btn' onClick={() => { setDeleteCategory(catagory) }} ><DeleteForeverIcon className='icon' /></button>
            </div>
          }) : <h1>loading</h1>
        }
      </div>
      {deleteCategory && deleteCategoryTeplet}
    </div>
  )
}

export default SellerHomePage
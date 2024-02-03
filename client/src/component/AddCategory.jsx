import React, { useState } from 'react'
import '../css/AddCategory.css'
import { CreateNewCategory } from '../conectWithBackend/Catagory';
import { useDispatch, useSelector } from 'react-redux';

function AddCategory({setIsCategoryAdd}) {
    const dispatch=useDispatch();
    const currentSellerDetailes = useSelector(state => state.Seller.currentSellerDetails);
    const [formDta,setFormData]=useState();
    //NOTE - handel form submit
    const handelSubmit=(e)=>{
        e.preventDefault();
        dispatch(CreateNewCategory(formDta,currentSellerDetailes));
        setIsCategoryAdd(false);
    }

    //NOTE - Handel input change
    const handelInputChage=(e)=>{
        const { name, value } = e.target;
        setFormData((prevData)=>({
            ...prevData,
            [name]:value
        }))
    }
  return (
    <>
        <form className='model-element' onSubmit={handelSubmit}>
        <input type="text" name="categoryname" onChange={handelInputChage} placeholder='Enter Category name'/>
        <button type="submit">Submit</button>
        </form>
    </>
  )
}

export default AddCategory
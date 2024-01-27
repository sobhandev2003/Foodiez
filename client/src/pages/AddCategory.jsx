import React, { useState } from 'react'
import '../css/AddCategory.css'
import { CreateNewCategory } from '../reducersControlers/CreateCatagory';
function AddCategory() {
    const [formDta,setFormData]=useState();
    //NOTE - handel form submit
    const handelSubmit=(e)=>{
        e.preventDefault();
        // console.log(formDta);
        CreateNewCategory(formDta);
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
    <div className='add-category-page'>
        <form onSubmit={handelSubmit}>
        <input type="text" name="categoryname" onChange={handelInputChage} placeholder='Enter Category name'/>
        <input type="submit" value="Submit" />
        </form>
    </div>
  )
}

export default AddCategory
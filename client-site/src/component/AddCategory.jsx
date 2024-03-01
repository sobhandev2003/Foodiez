import React, { useState } from 'react'
import '../css/AddCategory.css'
import { CreateNewCategory } from '../services/Catagory';
import { useDispatch, useSelector } from 'react-redux';

function AddCategory({ setIsCategoryAdd }) {
    const dispatch = useDispatch();
    const loginAccountDetails=useSelector(state=>state.Login.loginAccountDetails);
    const [formDta, setFormData] = useState();
    //NOTE - handel form submit
    const handelSubmit = (e) => {
        e.preventDefault();
        dispatch(CreateNewCategory(formDta, loginAccountDetails));
        setIsCategoryAdd(false);
    }

    //NOTE - Handel input change
    const handelInputChage = (e) => {
        const { name, value, type } = e.target;
        const inputValue = type === "text" ? value.charAt(0).toUpperCase() + value.slice(1) : value;
      
        setFormData((prevData) => ({
            ...prevData,
            [name]: inputValue
        }))
    }
    return (
        <>
            <form className='model-element' onSubmit={handelSubmit}>
                <input type="text" name="name" minLength="2" maxLength="15" onChange={handelInputChage} placeholder='Enter Category name' />
                <button type="submit">Submit</button>
            </form>
        </>
    )
}

export default AddCategory
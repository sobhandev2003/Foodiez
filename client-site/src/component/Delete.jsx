import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteItem, fetchItemByCategoryId } from '../services/item';
import Alert from './Alert';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { deleteCategoryById } from '../services/Catagory';
function Delete(props) {
    const { type, deleteData, additionalData,closeModel , } = props
    const [formData, setFormData] = useState();
    const dispatch = useDispatch();
    const authToken = localStorage.getItem("sellerAuthToken")||localStorage.getItem("buyerAuthToken");
    const loginAccountDetails=useSelector(state=>state.Login.loginAccountDetails);
    const navigate = useNavigate();
    const handelDeleteItem = async () => {
        if (deleteData) {

            if (!authToken || !additionalData) {
                Alert("error", <p>Something wrong</p>)
            }
            else {
                await deleteItem(authToken, additionalData.id, deleteData._id, formData);
                dispatch(fetchItemByCategoryId(additionalData.id));
            }
            closeModel(false)
        }
    }

    const handelDeleteCategory = () => {

        if (deleteData) {

            dispatch(deleteCategoryById(authToken, formData, deleteData, loginAccountDetails, navigate))

        }
        closeModel(false)

    }

    const handeleDelete = (e) => {
        e.preventDefault();
        switch (type) {
            case "item":
                handelDeleteItem();
                break;
            case "category":
                handelDeleteCategory();
                break;
            default:
                Alert("error",<p>Nothing gate for delete</p>)    
        }
    }
    const handelInputChange = (e) => {
        const { name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }))

    }
    return (
        <>
            <CloseIcon className='cancel-model' onClick={() => { closeModel(false) }} />
            <form className='model-element' onSubmit={handeleDelete}>
                <label className='delete-category-aller-p'>Are you sure?<br />You Want to delete <strong> {deleteData.name} </strong>{type} </label>
                <label style={{ fontSize: "2rem" }}>Password:</label>
                <input type='password' onChange={handelInputChange} name='password' placeholder='Enter password' required />

                <button type="submit" className='delete-btn'>Delete</button>
            </form>
        </>
    )
}

export default Delete
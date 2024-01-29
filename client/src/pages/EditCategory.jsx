import React, { useEffect, useState } from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useNavigate } from 'react-router-dom';
import Model from '../component/Model';
import CloseIcon from '@mui/icons-material/Close';
import { Alert } from '@mui/material';
import Rating from '@mui/material/Rating';
import { Fab } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { createNewItem, fetchItemByCategoryId, updateItem } from '../conectWithBackend/item';
import '../css/EditCategory.css'
import { useDispatch, useSelector } from 'react-redux';
function EditCategory() {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const category = JSON.parse(localStorage.getItem("editCategory"))
    const Items = useSelector(state => state.catagory.items)
    const [items, setItems] = useState();
    const [isAddIteam, setIsAddIteam] = useState(false);
    const [editItem, setEditItem] = useState();
    const [formData, setFormData] = useState();
    //NOTE -  Add item A category
    const handelItemAdd = async (e) => {
        e.preventDefault();
        const authToken = localStorage.getItem("authToken");
        if (!authToken || !category || !formData) {
            Alert("error", <p>Something wrong</p>)
        }
        else {
            await createNewItem(authToken, category.id, formData)
            dispatch(fetchItemByCategoryId(category.id));
        }
        setIsAddIteam(false)
    }
    //NOTE - handel edit item
    const handelEditItem = async (e) => {
        e.preventDefault();
        //    console.log(editItem);
        const authToken = localStorage.getItem("authToken");
        if (!authToken || !category || !editItem) {
            Alert("error", <p>Something wrong</p>)
        }
        else {
            await updateItem(authToken, category.id, editItem)
            dispatch(fetchItemByCategoryId(category.id));
        }
        setEditItem(null);

    }

    //NOTE - saved input data 
    const handelInputChange = (e) => {
        const { name, value, type, files } = e.target;
        const inputValue = type === "file" ? files[0] : value;

        setFormData((prevData) => ({
            ...prevData,
            [name]: inputValue
        }))

    }
    const handelEditItemInputChange = (e) => {
        setEditItem({ ...editItem, [e.target.name]: e.target.value })
    }


    //SECTION - pop-Up element
    //NOTE - Pop - Up for fill add item details 
    const AddIteamTemplet = (
        <Model>
            <CloseIcon className='cancel-model' onClick={() => { setIsAddIteam(false) }} />
            <form className='model-element' onSubmit={handelItemAdd}>
                <label className='heading'>Add item in Category {category.categoryname}</label>
                <input type="text" name="name" onChange={handelInputChange} placeholder='Enter item name' required />
                <input type="text" name="description" onChange={handelInputChange} placeholder='Enter some about item' required />
                <input type="file" name="photo" accept="image/png, image/jpeg" onChange={handelInputChange} required />
                <input type="number" name="price" onChange={handelInputChange} placeholder='Enter item Price' required />
                <button type="submit">Submit</button>
            </form>
        </Model>
    )
    //NOTE -  Pop - Up for fill update item details  
    const editItemTemplet = (
        editItem && <Model>
            <CloseIcon className='cancel-model' onClick={() => { setEditItem(null) }} />
            <form className='model-element' onSubmit={handelEditItem}>
                <label className='heading'>Edit item details </label>
                <input type="text" name="name" value={editItem.name} onChange={handelEditItemInputChange} disabled />
                <input type="text" name="description" value={editItem.description} onChange={handelEditItemInputChange} placeholder='Enter some about item' required />
                <input type="number" name="price" value={editItem.price} onChange={handelEditItemInputChange} placeholder='Enter item Price' required />
                <button type="submit">Submit</button>

            </form>
        </Model>
    )

    //NOTE - 
    const additem = () => {
        setIsAddIteam(true);
    }
    //NOTE - 
    useEffect(() => {
        if (!category) {
            navigate('/');
        }
        dispatch(fetchItemByCategoryId(category.id))
    }, [])

    useEffect(() => {
        setItems(Items);
    }, [Items])

    return (
        <div>
            <h3>Items<AddCircleIcon className='icon' onClick={additem} /> </h3>
            {isAddIteam && AddIteamTemplet}
            {editItem && editItemTemplet}
            <div className='item-div'>
                {
                    items && items.map((item) => {
                        const { name, description, price, photo, photoType, rating } = item;
                        // console.log(item._id);
                        return <div key={item._id} className='shope-list-item'>
                            <div className='shope-list'>
                                <Fab aria-label="edit" className='edit-item' onClick={() => { setEditItem(item) }}>
                                    <EditIcon className='edit-icon' />
                                </Fab>
                                <Fab aria-label="delete" className='delete-item'>
                                    <DeleteIcon className="delete-icon" />
                                </Fab>

                                <img className='shope-photo overflow-hidden' src={`data:${photoType};base64,${photo}`} alt='shope-phot' />
                                <h2 className='shope-name overflow-hidden'>{name}</h2>
                                <h3>{price}</h3>
                                <div className='ratting-div overflow-hidden'>
                                    <p ><Rating name="half-rating-read" defaultValue={rating} precision={0.5} readOnly /></p>
                                </div>
                                <p className='food overflow-hidden'>{description}</p>

                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default EditCategory
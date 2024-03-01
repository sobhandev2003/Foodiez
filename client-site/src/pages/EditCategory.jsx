import React, { useEffect, useState } from 'react'
import { IoMdAddCircleOutline } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import Model from '../component/Model';
import CloseIcon from '@mui/icons-material/Close';
import { Alert } from '@mui/material';
import Rating from '@mui/material/Rating';
import { Fab } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { MdDeleteForever, MdDelete } from "react-icons/md";
import { createNewItem, fetchItemByCategoryId, updateItem } from '../services/item';
import '../css/EditCategory.css'
import { useDispatch, useSelector } from 'react-redux';
import Delete from '../component/Delete';
import loadingSpinner from '../photo/loading-spinner.gif'
function EditCategory() {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const authToken = localStorage.getItem("sellerAuthToken");
    const category = JSON.parse(localStorage.getItem("editCategory"))
    const Items = useSelector(state => state.catagory.items)
    const [items, setItems] = useState(null);
    const [isAddIteam, setIsAddIteam] = useState(false);
    const [editItem, setEditItem] = useState();
    const [formData, setFormData] = useState();
    const [delete_item, setDeleteItem] = useState();
    const [isDeleteCategory, setIsDeleteCategory] = useState(false);
    //NOTE -  Add item A category
    const handelItemAdd = async (e) => {
        e.preventDefault();

        if (!authToken || !category || !formData) {
            Alert("error", <p>Something wrong</p>)
        }
        else {
            await createNewItem(authToken, category.id, formData)
            dispatch(fetchItemByCategoryId(category.id));
        }
        setIsAddIteam(false)
    }

    //NOTE - handel update item
    const handelUpdateItem = async (e) => {
        e.preventDefault();
      
        if (!authToken || !category || !editItem) {
            Alert("error", <p>Something wrong</p>)
        }
        else {
            await updateItem(authToken, category.id, editItem)
            dispatch(fetchItemByCategoryId(category.id));
        }
        setEditItem(null);

    }

    //NOTE - saved input data in from data state
    const handelInputChange = (e) => {  
        const { name, value, type, files } = e.target;
        let inputValue = type === "file" ? files[0] : value;
        inputValue =type==="text" ? value.charAt(0).toUpperCase() + value.slice(1):inputValue;
        setFormData((prevData) => ({
            ...prevData,
            [name]: inputValue
        }))

    }
//NOTE - saved edit Item Editing details in editItem state
    const handelEditItemInputChange = (e) => {
        const { name, value, type } = e.target;
       const inputValue = type==="text" ? value.charAt(0).toUpperCase() + value.slice(1):value;
        setEditItem({ ...editItem, [name]: inputValue })
    }



//SECTION - pop-Up element

    //NOTE - Pop - Up for fill add item details 
    const AddIteamTemplet = (
        <Model>
            <CloseIcon className='cancel-model' onClick={() => { setIsAddIteam(false) }} />
            <form className='model-element' onSubmit={handelItemAdd}>
                <label className='heading'>Add item in Category {category.name}</label>
                <input type="text" name="name" minLength="2" maxLength="50" onChange={handelInputChange}  placeholder='Enter item name' required />
                <input type="text" name="description" minLength="5" maxLength="200" onChange={handelInputChange} placeholder='Enter some about item' required />
                <input type="file" name="photo" accept="image/png, image/jpeg" onChange={handelInputChange} required />
                <input type="number" name="price" minLength="2" maxLength="5" onChange={handelInputChange} placeholder='Enter item Price' required />
                <button type="submit">Submit</button>
            </form>
        </Model>
    )

    //NOTE -  Pop - Up for fill update item details  
    const editItemTemplet = (
        editItem && <Model>
            <CloseIcon className='cancel-model' onClick={() => { setEditItem(null) }} />
            <form className='model-element' onSubmit={handelUpdateItem}>
                <label className='heading'>Edit item details </label>
                <input type="text" name="name" value={editItem.name} onChange={handelEditItemInputChange} disabled />
                <input type="text" name="description" maxLength="100" value={editItem.description} onChange={handelEditItemInputChange} placeholder='Enter some about item' required />
                <input type="number" name="price" value={editItem.price} onChange={handelEditItemInputChange} placeholder='Enter item Price' required />
                <button type="submit">Submit</button>

            </form>
        </Model>
    )

    //NOTE -  Pop - Up for fill Delete item details  

    const deleteItemTeplet = (
        delete_item && <Model>
         <Delete type="item" deleteData={delete_item} additionalData={category} closeModel={setDeleteItem}/>
        </Model>
    )

    //NOTE - pop up for delete category;
    const deleteCategoryTeplet = (
        <Model>
            <Delete type="category" deleteData={category} closeModel={setIsDeleteCategory} />
        </Model>
    )


    //NOTE - 
    useEffect(() => {
        if (!category) {
            navigate('/');
        }
        dispatch(fetchItemByCategoryId(category.id))
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        setItems(Items);
    }, [Items])

    return (
        <div className='edit-category-page'>
            <h1 className=''>{category.name}</h1>
            <button className='add-item' onClick={() => { setIsAddIteam(true) }}>Add a new item<IoMdAddCircleOutline className='icon' /> </button>

            <div className='item-div'>
                {
                    items? <> {items.length!==0? <> {items.map((item) => {
                        const { name, description, price, photo, photoType, rating,numberOfRating} = item;
                        return <div key={item._id} className='shope-list-item'>
                            <Fab aria-label="edit" className='edit-item' onClick={() => { setEditItem(item) }}>
                                <EditIcon className='edit-icon' />
                            </Fab>
                            <MdDelete className="delete-item delete-icon" onClick={() => setDeleteItem(item)} />
                            <div className='shope-list'>
                                <img className='shope-photo overflow-hidden' src={`data:${photoType};base64,${photo}`} alt='shope-phot' />
                                <h2 className='shope-name overflow-hidden'>{name} </h2>
                                <h3>{price}</h3>
                                <div className='ratting-div overflow-hidden'>
                                    <p className='display-rating'><Rating name="half-rating-read" defaultValue={rating} precision={0.5} readOnly /><span>{`(${numberOfRating})`}</span></p>
                                </div>
                                <p className='food overflow-hidden'>{description}</p>

                            </div>
                        </div>
                    })}</>:<p style={{fontSize:"1.5rem"}}>No Item Present for this category</p>}</>:<><img src={loadingSpinner} alt='loading...'/> </>
                }

            </div>
            <button className='delete-category-btn' onClick={() => { setIsDeleteCategory(true) }} >Delete this category <MdDeleteForever className='icon' /></button>
            {delete_item && deleteItemTeplet}
            {isDeleteCategory && deleteCategoryTeplet}
            {isAddIteam && AddIteamTemplet}
            {editItem && editItemTemplet}
        </div>
    )
}

export default EditCategory
import React, { useEffect, useState } from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useNavigate } from 'react-router-dom';
import Model from '../component/Model';
import CloseIcon from '@mui/icons-material/Close';

function EditCategory() {
    const navigate = useNavigate()
    const category = JSON.parse(localStorage.getItem("editCategory"))
    const [isAddIteam, setIsAddIteam] = useState(false);
    const [formData, setFormData] = useState();
    const handelSubmit = (e) => {
        e.preventDefault();

        console.log(formData);
        setIsAddIteam(false)
    }
    const handelInputChange = (e) => {
        const { name, value, type, files } = e.target;
        const inputValue = type === "file" ? files[0] : value;
        setFormData((prevData) => ({
            ...prevData,
            [name]: inputValue
        }))

    }
    const AddIteamTemplet = (
        <Model>
            <CloseIcon className='cancel-model' onClick={()=>{setIsAddIteam(false)}}/>
            <form onSubmit={handelSubmit}>
                <label className='heading'>Add item in Category {category.categoryname}</label>
                <input type="text" name="name" onChange={handelInputChange} placeholder='Enter item name' required />
                <input type="text" name="description" onChange={handelInputChange} placeholder='Enter some about item' required />
              
                <input type="file" name="photo" accept="image/png, image/jpeg"  onChange={handelInputChange} required />
           
                <input type="number" name="price" onChange={handelInputChange} placeholder='Enter item Price' required />
                <button type="submit">Submit</button>
            </form>

            {/* <button onClick={() => (setIsAddIteam(false))}>cancel</button> */}
        </Model>
    )

    const additem = () => {
        setIsAddIteam(true);
    }

    useEffect(() => {
        if (!category) {
            navigate('/');
        }
    }, [category,navigate])

    return (
        <div>

            <h3>Items<AddCircleIcon className='icon' onClick={additem} /> </h3>
            {isAddIteam && AddIteamTemplet}

        </div>
    )
}

export default EditCategory
import React, { useState } from 'react'
import {
    FaListAlt
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import AddBoxIcon from '@mui/icons-material/AddBox';
import Model from './Model';
import AddCategory from './AddCategory';
import CloseIcon from '@mui/icons-material/Close';
import { MenuItem, Typography } from '@mui/material';
function SellerNavItem() {
    const navigate=useNavigate();
    const [isCategoryAdd, setIsCategoryAdd] = useState(false)
    const addCategoryTemplet = (
        <Model>
            <CloseIcon className='cancel-model' onClick={() => { setIsCategoryAdd(false) }} />
            <AddCategory setIsCategoryAdd={setIsCategoryAdd} />

        </Model>
    )
    return (
        <>
          
            <MenuItem onClick={()=>{navigate('/');setIsCategoryAdd(true)}}>
            <Typography textAlign="center"  className='nav-hover' ><AddBoxIcon className='icon' />Add Category</Typography>
            </MenuItem>
             <MenuItem onClick={()=>{navigate('/order')}}>
            <Typography textAlign="center"   className='nav-hover' ><FaListAlt className='icon list-ico' /> Customer Order</Typography>
            </MenuItem>
        
            {isCategoryAdd && addCategoryTemplet}
        </>
    )
}

export default SellerNavItem
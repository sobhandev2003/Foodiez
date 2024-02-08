import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import { FaBoxes } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { MenuItem, Typography } from '@mui/material';
function BuyerNavItem() {
    const navigate=useNavigate()
    const loginAccountDetails = useSelector(state => state.Login.loginAccountDetails);
    // console.log(loginAccountDetails);
    const [numberOfCartProduct,setNumberOfCartProduct]=useState(0);
    useEffect(()=>{
        loginAccountDetails.cartItem &&   setNumberOfCartProduct(loginAccountDetails.cartItem.length)
    },[loginAccountDetails])
    
    return (
        <>
         <MenuItem onClick={()=>{navigate('/cart')}}>
            <Typography textAlign="center"   className='nav-hover' ><AddShoppingCartOutlinedIcon className='icon cart-ico' />Carts <span className='cart-count'>{ numberOfCartProduct}</span></Typography>
            </MenuItem>
            <MenuItem onClick={()=>{navigate('/my-order')}}>
            <Typography textAlign="center"   className='nav-hover' ><FaBoxes className='icon order-ico' /> My Order</Typography>
            </MenuItem>
            {/* <li>
                <NavLink className='cart' to="/cart"><AddShoppingCartOutlinedIcon className='icon cart-ico' />Carts <span className='cart-count'>{ numberOfCartProduct}</span> </NavLink>
            </li> */}
            {/* <li>
                <NavLink to="/my-order"><FaBoxes className='icon order-ico' /> My Order</NavLink>
            </li> */}
        </>
    )
}

export default BuyerNavItem
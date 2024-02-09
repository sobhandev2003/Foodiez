import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import { FaBoxes } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { MenuItem, Typography } from '@mui/material';
import { rollIn } from 'react-animations';

import styled, { keyframes } from 'styled-components';
function BuyerNavItem() {
    const navigate = useNavigate()
    const loginAccountDetails = useSelector(state => state.Login.loginAccountDetails);
    // console.log(loginAccountDetails);
    const [numberOfCartProduct, setNumberOfCartProduct] = useState(0);
    useEffect(() => {
        loginAccountDetails.cartItem && setNumberOfCartProduct(loginAccountDetails.cartItem.length)
    }, [loginAccountDetails])

    //NOTE - for cart count bounce
    const bounceAnimation = keyframes`${rollIn}`;
    const BouncyDiv = styled.div`
    display:inline-block;
    margin-left: 5px;
    background-color:#0aa928;
    color: white;
    padding: 0px 4px 0px 4px;
    width:15px;
    border-radius: 70%;
    position: relative;
      animation: 1.5s ${bounceAnimation} infinite alternate;
    `;
    return (
        <>
            <MenuItem onClick={() => { navigate('/cart') }}>
                <Typography textAlign="center" className='nav-hover' ><AddShoppingCartOutlinedIcon />Carts <BouncyDiv className='cart-count' >{numberOfCartProduct}</BouncyDiv></Typography>
            </MenuItem>
            <MenuItem onClick={() => { navigate('/my-order') }}>
                <Typography textAlign="center" className='nav-hover' ><FaBoxes className='icon order-ico' /> My Order</Typography>
            </MenuItem>
        </>
    )
}

export default BuyerNavItem


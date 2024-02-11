import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import { FaBoxes } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { MenuItem, Typography } from '@mui/material';
import { rollIn, swing } from 'react-animations';

import styled, { keyframes } from 'styled-components';
import { addToCarts } from '../fetures/CartsSlaice';

//NOTE - for cart count bounce
const rollInAnimation = keyframes`${rollIn}`;
const swingAnimation = keyframes`${swing}`
const RollInSpn = styled.span`
    display:inline-block;
    margin-left: 5px;
    background-color:#0aa928;
    color: white;
    padding: 0px 4px 0px 4px;
    width:15px;
    border-radius: 70%;
    position: relative;
      animation: 1.5s ${rollInAnimation} infinite alternate;
  `;

const SwingSpn = styled.span`
display:inline-block;
margin-left: 5px;
background-color:#0aa928;
color: white;
padding: 0px 4px 0px 4px;
width:15px;
border-radius: 70%;
position: relative;
  animation: 1.5s ${swingAnimation} infinite alternate;
`;
function BuyerNavItem() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const loginAccountDetails = useSelector(state => state.Login.loginAccountDetails);
    const numberOfOrders = useSelector(state => state.Buyer.numberOfOrders);
    // console.log(loginAccountDetails);
    const [numberOfCartProduct, setNumberOfCartProduct] = useState(0);


    useEffect(() => {
        if (loginAccountDetails.cartItem) {

            setNumberOfCartProduct(loginAccountDetails.cartItem.length)
            dispatch(addToCarts(loginAccountDetails.cartItem))
        }

    }, [loginAccountDetails, dispatch])



    return (
        <>
            <MenuItem onClick={() => { navigate('/cart') }}>
                <Typography textAlign="center" className='nav-hover' ><AddShoppingCartOutlinedIcon />Carts <RollInSpn className='cart-count' >{numberOfCartProduct}</RollInSpn></Typography>
            </MenuItem>
            <MenuItem onClick={() => { navigate('/my-order') }}>
                <Typography textAlign="center" className='nav-hover' ><FaBoxes className='icon order-ico' /> My Order <SwingSpn> {numberOfOrders} </SwingSpn></Typography>
            </MenuItem>
        </>
    )
}

export default BuyerNavItem


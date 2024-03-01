import React, { useEffect, useState } from 'react'
import {
    FaListAlt
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AddBoxIcon from '@mui/icons-material/AddBox';
import Model from './Model';
import AddCategory from './AddCategory';
import CloseIcon from '@mui/icons-material/Close';
import { MenuItem, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { rollIn } from 'react-animations';
import styled, { keyframes } from 'styled-components';
import { fetchNumberOfPendingOrder } from '../services/Order';
const rollInAnimation = keyframes`${rollIn}`;
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
function SellerNavItem() {
    const navigate=useNavigate();
    const dispatch = useDispatch()
    const sellerAuthToken = localStorage.getItem("sellerAuthToken");
    const numberOfPendingOrders = useSelector(state => state.Seller.numberOfPendingOrders);
 
    const [isCategoryAdd, setIsCategoryAdd] = useState(false)
    const addCategoryTemplet = (
        <Model>
            <CloseIcon className='cancel-model' onClick={() => { setIsCategoryAdd(false) }} />
            <AddCategory setIsCategoryAdd={setIsCategoryAdd} />

        </Model>
    )

    useEffect(() => {  
        sellerAuthToken && dispatch(fetchNumberOfPendingOrder(sellerAuthToken));
       }, [dispatch,sellerAuthToken])
    return (
        <>
          
            <MenuItem onClick={()=>{navigate('/');setIsCategoryAdd(true)}}>
            <Typography textAlign="center"  className='nav-hover' ><AddBoxIcon className='icon' />Add Category</Typography>
            </MenuItem>
             <MenuItem onClick={()=>{navigate('/order')}}>
            <Typography textAlign="center"   className='nav-hover' ><FaListAlt className='icon list-ico' /> Customer Order <RollInSpn>{numberOfPendingOrders}</RollInSpn></Typography>
            </MenuItem>
        
            {isCategoryAdd && addCategoryTemplet}
        </>
    )
}

export default SellerNavItem


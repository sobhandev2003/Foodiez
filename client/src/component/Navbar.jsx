import '../css/Navbar.css';
import React, { useEffect, useRef, useState } from 'react';
// import logo from photp directory
import logo from '../photo/logo.jpg';
import { Link } from 'react-router-dom';
//import MUI icon
//user Acount icon
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
//Help icon
import SupportIcon from '@mui/icons-material/Support';
//cart icon
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
//Add icon

import AddBoxIcon from '@mui/icons-material/AddBox';
//toggole buuton
import ToggleButton from '@mui/material/ToggleButton';
import ViewListIcon from '@mui/icons-material/ViewList';

import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentSeller } from '../conectWithBackend/currentSellerReducers';

function Navbar() {
    const authToken = localStorage.getItem("authToken");
    const navbarRef = useRef();
    const dispatch = useDispatch()
    const cartsProducts = useSelector(state => state.cart.ToCarts);
    const currentSellerDetails = useSelector(state => state.Seller.currentSellerDetails)
    const [height, setHeight] = useState('120px');
    const [currentSeller, setCurrentSeller] = useState();
    const toggoleHeight = () => {
        navbarRef.current.style.height = height;
        height === '70px' ? setHeight('120px') : setHeight('70px');
    }
    useEffect(() => {
        setCurrentSeller(currentSellerDetails)
        // console.log(currentSellerDetails)
    }, [currentSellerDetails])
    useEffect(() => {
        if (authToken) {
            dispatch(fetchCurrentSeller(authToken));
        }
    }, [authToken, dispatch])
    return (
        <div ref={navbarRef} className='navbar'>
            <div className='logo'>
                <Link to="/"><img src={logo} alt='Logo' /></Link>
            </div>
            <div className='toggole-btn'>
                <ToggleButton onClick={toggoleHeight} value="list" aria-label="list">
                    <ViewListIcon />
                </ToggleButton>
            </div>
            {currentSeller ?
                //NOTE - if user log in     
                <div className='nav-link-div'>
                  
                    {currentSeller.user_role === "seller" ?
                       //NOTE - Navabar link for Seller account *
                        <div className='seller-nav-link'>
                            <Link to='/add-category' ><AddBoxIcon className='icon'/>Add Category</Link>
                            <Link className='help color-white' to="/help"><SupportIcon className='icon help-ico' />Help</Link>
                            <Link className='mange-account color-white' to="/mangeacount"><ManageAccountsOutlinedIcon className='icon' /> {currentSeller.ownerName.split(" ")[0] || currentSeller.buyerName.split(" ")[0]}</Link>
                        </div>
                        :
                        //NOTE - Navabar link for buyer account
                        <div className='buyer-nav-link'>
                            <Link className='cart color-white' to="/cart"><AddShoppingCartOutlinedIcon className='icon cart-ico' />Carts <span className='cart-count'>{cartsProducts.length}</span> </Link>

                        </div>}


                </div>
                :
                //NOTE - if user not login
                <div>
                    <Link className='login' to="/login"><span>Sign in</span></Link>
                    <Link className='register' to="/register"><>Sign up</></Link>
                </div>


            }
        </div>
    )
}

export default Navbar
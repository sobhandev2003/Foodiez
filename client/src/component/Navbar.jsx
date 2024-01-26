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
//toggole buuton
import ToggleButton from '@mui/material/ToggleButton';
import ViewListIcon from '@mui/icons-material/ViewList';

import { useSelector } from 'react-redux';

function Navbar() {
    const authToken = localStorage.getItem("authToken");
    const navbarRef = useRef();
    const cartsProducts = useSelector(state => state.cart.ToCarts);
    const [height, setHeight] = useState('120px');
    const toggoleHeight = () => {
        navbarRef.current.style.height = height;
        height === '70px' ? setHeight('120px') : setHeight('70px');
    }
    useEffect(()=>{},[authToken])
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
            {authToken ?
        //NOTE - if user log in     
                <div className='nav-link-div'>
                    <Link className='contact' to="/help"><SupportIcon className='icon contact-ico' />Help</Link>
                    <Link className='cart' to="/cart"><AddShoppingCartOutlinedIcon className='icon cart-ico' />Carts <span className='cart-count'>{cartsProducts.length}</span> </Link>
                    <Link to="/mangeacount"><ManageAccountsOutlinedIcon /> userName</Link>

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
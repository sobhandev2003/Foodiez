import '../css/Navbar.css';
import React, { useRef, useState } from 'react';
// import logo from photp directory
import logo from '../photo/logo.jpg';
import {Link}  from 'react-router-dom';
//import MUI icon
    //home icon
    // import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';   
    import BungalowOutlinedIcon from '@mui/icons-material/BungalowOutlined'; 
    //about icon
    import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
    //contact icon
    import ContactPhoneOutlinedIcon from '@mui/icons-material/ContactPhoneOutlined';
    //cart icon
    import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
    //toggole buuton
    import ToggleButton from '@mui/material/ToggleButton';
    import ViewListIcon from '@mui/icons-material/ViewList';

import { useSelector } from 'react-redux';

function Navbar() {
const navbarRef=useRef();
    const cartsProducts=useSelector(state=>state.cart.ToCarts);
    // console.log(cartsProducts);
    const [height,setHeight]=useState('120px');
    const toggoleHeight=()=>{
        navbarRef.current.style.height=height;
        height==='70px'?setHeight('120px'):setHeight('70px');
    }
  return (
   <div ref={navbarRef} className='navbar'>
    <div className='logo'>
        <img src={logo} alt='Logo' />
    </div>
    <div className='titale'>
        <h1>FOOD</h1>
    </div>
    <div className='toggole-btn'>
    <ToggleButton onClick={toggoleHeight} value="list" aria-label="list">
        <ViewListIcon  />
      </ToggleButton>
    </div>
    <div className='nav-link-div'>
    <Link  to="/"><BungalowOutlinedIcon className='icon home-ico'/>Home</Link>
    <Link className='about' to="/about"><InfoOutlinedIcon  className='icon about-ico'/>About </Link>
    <Link className='contact' to="/contact"><ContactPhoneOutlinedIcon className='icon contact-ico'/>Contact</Link>
    <Link className='cart' to="/cart"><AddShoppingCartOutlinedIcon className='icon cart-ico'/>Carts <span className='cart-count'>{cartsProducts.length}</span> </Link>
    
    {/* <Link className='signin' to="/signin"><span>Sign in</span></Link> */}

    </div>
   </div>
  )
}

export default Navbar
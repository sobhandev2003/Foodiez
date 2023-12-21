import '../css/Navbar.css';
import React from 'react';
// import logo from photp directory
import logo from '../photo/logo.jpg';
import {Link}  from 'react-router-dom';
//import MUI icon
    //home icon
    import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';    
    //about icon
    import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
    //contact icon
    import ContactPhoneOutlinedIcon from '@mui/icons-material/ContactPhoneOutlined';
    //cart icon
    import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';

function Navbar() {
  return (
   <div className='navbar'>
    <div className='logo'>
        <img src={logo} alt='Logo' />
    </div>
    <div className='titale'>
        <h1>FOOD</h1>
    </div>
    <div className='nav-link-div'>
    <Link  to="/"><HomeOutlinedIcon className='icon home-ico'/>Home</Link>
    <Link className='about' to="/about"><InfoOutlinedIcon  className='icon about-ico'/>About </Link>
    <Link className='contact' to="/contact"><ContactPhoneOutlinedIcon className='icon contact-ico'/>Contact</Link>
    <Link className='cart' to="/cart"><AddShoppingCartOutlinedIcon className='icon cart-ico'/>Carts <span className='cart-count'>0</span> </Link>
    
    <Link className='signin' to="/signin">Sign in</Link>

    </div>
   </div>
  )
}

export default Navbar
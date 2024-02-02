import '../css/Navbar.css';
import React, { useEffect, useState } from "react";
import {
    FaListAlt
} from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { NavLink, useNavigate } from "react-router-dom";
import logo from '../photo/logo.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentSeller } from '../conectWithBackend/currentSellerReducers';
//Help icon
import SupportIcon from '@mui/icons-material/Support';
//cart icon
// import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
//Add icon
import AddBoxIcon from '@mui/icons-material/AddBox';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useMediaQuery } from 'react-responsive';

const Navbar = () => {
    const [showMediaIcons, setShowMediaIcons] = useState(false);

    //SECTION - 
    const navigate = useNavigate();
    const authToken = localStorage.getItem("authToken");
    const dispatch = useDispatch()
    // const cartsProducts = useSelector(state => state.cart.ToCarts);
    const currentSellerDetails = useSelector(state => state.Seller.currentSellerDetails)
    const [isVisibaleAccounContor, setIsVisibaleAccounContor] = useState(false)
    const [currentSeller, setCurrentSeller] = useState();
    //react-responsive
    const isMobile = useMediaQuery({ query: '(max-width: 767px)' })
    const logOutAccount = () => {
        localStorage.clear();
        navigate('/login')
        window.location.reload()
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
        <>
            <nav className="main-nav">
                {/* 1st logo part  */}
                <div className="logo">
                    <NavLink to="/"><img src={logo} alt='Logo' /></NavLink>
                </div>

                {/* 2nd menu part  */}
                <div
                    className={
                        showMediaIcons ? "menu-link mobile-menu-link" : "menu-link"
                    }>
                    {
                        currentSeller ?
                            <ul>
                                {
                                    currentSeller.user_role === "seller" ?
                                        <>
                                            <li>
                                                <NavLink to='/add-category' ><AddBoxIcon className='icon' />Add Category</NavLink>
                                            </li>
                                            <li>
                                                <NavLink className='help color-white' to="/help"><SupportIcon className='icon help-ico' />Help</NavLink>
                                            </li>
                                            <li>
                                                <NavLink className="order" to='/order'><FaListAlt className='icon list-ico' /> Customer Order </NavLink>
                                            </li>
                                            {isMobile && <>
                                                {<li><button className='log-out-btn' onClick={logOutAccount}>Log out  <LogoutIcon className='icon logout-icon' /> </button>
                                                </li>}

                                            </>}

                                        </> :
                                        <>
                                        </>
                                }

                            </ul> :
                            <>
                                {isMobile && <ul>
                                    <li><NavLink className='login' to="/login">Sign in</NavLink></li>
                                    <li><NavLink className='register' to="/register">Sign up</NavLink></li>
                                </ul>

                                }


                            </>
                    }

                </div>

                {/* 3rd social media links */}
                <div className="account-control">
                    {!isMobile && <><div className='user-account'>
                        <AccountCircleIcon className='icon' onClick={() => setIsVisibaleAccounContor(!isVisibaleAccounContor)} />
                    </div>
                        <ul style={{ display: isVisibaleAccounContor ? "block" : "none" }}>
                            {
                                currentSeller ?
                                    <>
                                        <li><span>{currentSeller.ownerName}</span></li>
                                        <li><button className='log-out-btn color-white' onClick={logOutAccount}>Log out  <LogoutIcon className='icon logout-icon' /> </button>
                                        </li>
                                    </> : <>
                                        <li><NavLink className='login' to="/login">Sign in</NavLink></li>
                                        <li><NavLink className='register' to="/register">Sign up</NavLink></li>
                                    </>
                            }
                        </ul>
                    </>}


                    {/* hamburget menu start  */}
                    <div className="hamburger-menu">
                        <button onClick={() => setShowMediaIcons(!showMediaIcons)}>
                            <GiHamburgerMenu />
                        </button>
                    </div>
                </div>
            </nav>

        </>
    );
};

export default Navbar;
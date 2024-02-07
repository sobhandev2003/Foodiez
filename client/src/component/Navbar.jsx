import '../css/Navbar.css';
import React, { useEffect, useState } from "react";
import {
    FaListAlt
} from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { NavLink, useNavigate } from "react-router-dom";
import logo from '../photo/logo.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentSeller, updateProfilePhoto } from '../services/Seller';
//Help icon
import SupportIcon from '@mui/icons-material/Support';
//cart icon
// import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
//Add icon
import AddBoxIcon from '@mui/icons-material/AddBox';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CloseIcon from '@mui/icons-material/Close';
import { useMediaQuery } from 'react-responsive';
import Model from './Model';
import AddCategory from './AddCategory';
import Login from '../component/Login';
import { FaCloudUploadAlt } from "react-icons/fa";
import { fetchLoginBuyerDetails } from '../services/Buyer';
import { setIsLogin } from '../fetures/loginFrtures';
const Navbar = () => {
    const [showMediaIcons, setShowMediaIcons] = useState(false);

    //SECTION - 
    const navigate = useNavigate();
    const authToken = localStorage.getItem("authToken");
    const dispatch = useDispatch()
    // const cartsProducts = useSelector(state => state.cart.ToCarts);
    const isLogin = useSelector(state => state.Login.isLogin);
    const [isLoginTemplateVisible, setIsLoginTemplateVisible] = useState(false)
    //NOTE - Login  Account details get
    const loginAccountDetails = useSelector(state => state.Login.loginAccountDetails);
    const [loginAccount, setLoginAccount] = useState(null);
    //NOTE - 
    const [isVisibaleAccounContor, setIsVisibaleAccounContor] = useState(false)
    const [isCategoryAdd, setIsCategoryAdd] = useState(false)
    const [isProfilePhotoUpdate, setIsProfilePhotoUpdate] = useState(false);
    const [newPhoto, setnewPhoto] = useState();
    //react-responsive
    const isMobile = useMediaQuery({ query: '(max-width: 767px)' })
    const logOutAccount = () => {
        localStorage.clear();
        navigate('/');
        window.location.reload();
    };

    const handelInputChange = (e) => {
        const { files } = e.target;
        setnewPhoto(files[0]);

    }
    const handelUpdateprofilePhoto = (e) => {
        e.preventDefault();
        const authToken = localStorage.getItem("authToken");
        dispatch(updateProfilePhoto(authToken, newPhoto, setIsProfilePhotoUpdate));
    }
    //NOTE - pop - up Model for add a new category
    const addCategoryTemplet = (
        <Model>
            <CloseIcon className='cancel-model' onClick={() => { setIsCategoryAdd(false) }} />
            <AddCategory setIsCategoryAdd={setIsCategoryAdd} />

        </Model>
    )

    //NOTE - sign in pop up model
    const signInTemplet = (
        <Model>
            <CloseIcon className='cancel-model' onClick={() => { dispatch(setIsLogin(false)) }} />
            <Login />
        </Model>
    )
    //NOTE - Update profile photo
    const updateProfilePfotoTemplet = (
        <Model>
            <CloseIcon className='cancel-model' onClick={() => { setIsProfilePhotoUpdate(false) }} />
            <form className='model-element' onSubmit={handelUpdateprofilePhoto}>
                <input type="file" name="photo" accept="image/png, image/jpeg" onChange={handelInputChange} />
                <button type="submit">Update</button>
            </form>
        </Model>
    )
    useEffect(() => {
        setIsLoginTemplateVisible(isLogin)
    }, [isLogin])
    useEffect(() => {
        console.log(loginAccountDetails);
        setLoginAccount(loginAccountDetails)
    }, [loginAccountDetails])

    useEffect(() => {
        if (authToken) {
            dispatch(fetchCurrentSeller(authToken));
            dispatch(fetchLoginBuyerDetails(authToken))
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
                        loginAccount ?
                            <ul>
                                {
                                    loginAccount.user_role === "seller" ?
                                        <>
                                            <li>
                                                <NavLink to='/' onClick={() => setIsCategoryAdd(true)}><AddBoxIcon className='icon' />Add Category</NavLink>
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
                                    <li><NavLink className='login' to="/" onClick={() => dispatch(setIsLogin(true))}>Sign in</NavLink></li>
                                    <li><NavLink className='register' to="/register">Sign up</NavLink></li>
                                </ul>

                                }


                            </>
                    }

                </div>

                {/* 3rd social media links */}
                <div className="account-control">
                    {!isMobile && <><div className='user-account'>
                        {!loginAccount && <AccountCircleIcon className='icon' onClick={() => setIsVisibaleAccounContor(!isVisibaleAccounContor)} />}
                        {
                            loginAccount && <button className='profile-photo' onClick={() => setIsVisibaleAccounContor(!isVisibaleAccounContor)}><img src={`data:${loginAccount.profile_photoType};base64,${loginAccount.profile_photo}`} alt='👤'></img></button>
                        }
                    </div>
                        <ul style={{ display: isVisibaleAccounContor ? "block" : "none" }}>
                            {
                                loginAccount ?
                                    <>
                                        <li className='text-center' style={{ width: "100%" }}><span className='front-size-2rem' style={{ width: "100%" }} >{loginAccount.ownerName || loginAccount.name}</span></li>
                                        <li><button className='change-profile-photo' onClick={() => setIsProfilePhotoUpdate(true)}>Change profile photoT <FaCloudUploadAlt /></button></li>
                                        <li><button className='log-out-btn color-white' onClick={logOutAccount}>Log out  <LogoutIcon className='icon logout-icon' /> </button>
                                        </li>
                                    </> : <>
                                        <li><NavLink className='login' to="/" onClick={() => dispatch(setIsLogin(true))}>Sign in</NavLink></li>
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
            {isCategoryAdd && addCategoryTemplet}
            {isLoginTemplateVisible && signInTemplet}
            {isProfilePhotoUpdate && updateProfilePfotoTemplet}
        </>
    );
};

export default Navbar;
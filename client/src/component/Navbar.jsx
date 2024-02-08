import '../css/Navbar.css';
import React, { useEffect, useState } from "react";

import { GiHamburgerMenu } from "react-icons/gi";
import { NavLink, useNavigate } from "react-router-dom";
import logo from '../photo/logo.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentSeller } from '../services/Seller';
//Help icon
import SupportIcon from '@mui/icons-material/Support';
//cart icon
// import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
//Add icon

import LogoutIcon from '@mui/icons-material/Logout';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CloseIcon from '@mui/icons-material/Close';
import { useMediaQuery } from 'react-responsive';
import Model from './Model';

import Login from '../component/Login';
import { FaCloudUploadAlt } from "react-icons/fa";
import { fetchLoginBuyerDetails } from '../services/Buyer';
import { setIsLogin } from '../fetures/loginFrtures';
import SellerNavItem from './SellerNavItem';
import BuyerNavItem from './BuyerNavItem';
import { updateProfilePhoto } from '../services/upadateProfilePhoto';

//for MUI APP barr
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';


const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
//!SECTION
const Navbar = () => {
    //!SECTION
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };




    //!SECTION
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
        // console.log(loginAccount);
        const authToken = localStorage.getItem("authToken");
        dispatch(updateProfilePhoto(loginAccount.user_role, authToken, newPhoto, setIsProfilePhotoUpdate));
    }

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
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters sx={{ justifyContent: { xs: "space-around" }, width: { xs: '100%' } }}>
                        <Box >
                            <NavLink to="/"><img src={logo} alt='Logo' className="logo" /></NavLink>
                        </Box>

                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {
                                //TODO - 
                                <div
                                    className={
                                        `menu-link ${!loginAccount && "auth-link"} `

                                    }>
                                    {loginAccount ?
                                        <ul>
                                            {
                                                loginAccount.user_role === "seller" ?
                                                    <>
                                                        <SellerNavItem />
                                                    </> :
                                                    <>
                                                        <BuyerNavItem />
                                                    </>
                                            }
                                            <li>
                                                <NavLink className='help color-white' to="/help"><SupportIcon className='icon help-ico' />Help</NavLink>
                                            </li>
                                            {isMobile && <>
                                                {<li><button className='log-out-btn' onClick={logOutAccount}>Log out  <LogoutIcon className='icon logout-icon' /> </button>
                                                </li>}
                                            </>}

                                        </ul> :
                                        <>
                                        //TODO -
                                            <ul className='auth-list'>
                                                <li><NavLink className='login' to="/" onClick={() => dispatch(setIsLogin(true))}>Sign in</NavLink></li>
                                                <li><NavLink className='register' to="/register">Sign up</NavLink></li>
                                            </ul>
                                        </>}
                                </div>
                            }

                        </Box>

                        <Box sx={{ flexGrow: 0 }}>
                            {<Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    {<Avatar alt={"👤"} src={loginAccount && `data:${loginAccount.profile_photoType};base64,${loginAccount.profile_photo}`} />}

                                </IconButton>
                            </Tooltip>}
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {
                                    loginAccount ? <>

                                        <MenuItem key={loginAccount.id + "1w2"} >
                                            <Typography textAlign="center" sx={{ color: "#2ce084" }}>{loginAccount.email}</Typography>
                                        </MenuItem>
                                        {loginAccount.restaurantName && <MenuItem key={loginAccount.id + "1w2"} >
                                            <Typography textAlign="center" sx={{ color: "#2ce084" }}>{loginAccount.restaurantName}</Typography>
                                        </MenuItem>}
                                        <MenuItem key={loginAccount.id + "1w2"} >
                                            <Typography textAlign="center" sx={{ color: "#2ce084" }}>{loginAccount.ownerName || loginAccount.name}</Typography>
                                        </MenuItem>
                                        {
                                            isMobile && <>

                                                <div
                                                >
                                                    {loginAccount ?
                                                        <ul>
                                                            {
                                                                loginAccount.user_role === "seller" ?
                                                                    <>

                                                                        <SellerNavItem />

                                                                    </> :
                                                                    <>
                                                                        <BuyerNavItem />
                                                                    </>
                                                            }

                                                            <MenuItem onClick={() => { navigate('/help') }}>
                                                                <Typography textAlign="center" className='nav-hover' >Help</Typography>
                                                            </MenuItem>

                                                        </ul> :
                                                        <>

                                                        </>}
                                                </div>

                                            </>
                                        }
                                        <MenuItem key={loginAccount.id + "12"} onClick={() => setIsProfilePhotoUpdate(true)}>
                                            <Typography textAlign="center" sx={{ color: "green" }}>Change profile photoT <FaCloudUploadAlt /></Typography>
                                        </MenuItem>

                                        <MenuItem key={loginAccount.id + "rty"} onClick={logOutAccount}>
                                            <Typography textAlign="center" sx={{ color: "red" }}>Log out</Typography>
                                        </MenuItem>


                                    </> : <>
                                   //TODO -  
                                        <ul className='auth-list'>
                                            <li><NavLink className='login' to="/" onClick={() => dispatch(setIsLogin(true))}>Sign in</NavLink></li>
                                            <li><NavLink className='register' to="/register">Sign up</NavLink></li>
                                        </ul>
                                    </>
                                }

                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            {isLoginTemplateVisible && signInTemplet}
            {isProfilePhotoUpdate && updateProfilePfotoTemplet}
        </>
    );
};

export default Navbar;
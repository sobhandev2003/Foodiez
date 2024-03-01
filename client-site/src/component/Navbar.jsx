import '../css/Navbar.css';
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from '../photo/logo.webp';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentSeller } from '../services/Seller';
//Help icon
import SupportIcon from '@mui/icons-material/Support';
import LogoutIcon from '@mui/icons-material/Logout';
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
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

const Navbar = () => {
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    //SECTION - 
    const navigate = useNavigate();
    // const authToken = localStorage.getItem("authToken");
    const dispatch = useDispatch()
    const sellerAuthToken = localStorage.getItem("sellerAuthToken");
    const buyerAuthToken = localStorage.getItem("buyerAuthToken");
    // const cartsProducts = useSelector(state => state.cart.ToCarts);
    const isLogin = useSelector(state => state.Login.isLogin);
    const [isLoginTemplateVisible, setIsLoginTemplateVisible] = useState(false)
    //NOTE - Login  Account details get
    const loginAccountDetails = useSelector(state => state.Login.loginAccountDetails);
    const [loginAccount, setLoginAccount] = useState(null);
    const [avtarSrc, setAvterSrc] = useState(null)
    //NOTE - 
    // const [isVisibaleAccounContor, setIsVisibaleAccounContor] = useState(false)
    const [isProfilePhotoUpdate, setIsProfilePhotoUpdate] = useState(false);
    const [newPhoto, setnewPhoto] = useState();
    //react-responsive
    const isVWLesThen900Px = useMediaQuery({ query: '(max-width: 899.5px)' })
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
        const authToken = localStorage.getItem("sellerAuthToken") || localStorage.getItem("buyerAuthToken");
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
        if (sellerAuthToken) {
            dispatch(fetchCurrentSeller(sellerAuthToken));
        }
        if (buyerAuthToken) {
            dispatch(fetchLoginBuyerDetails(buyerAuthToken));
        }
// eslint-disable-next-line
    }, [dispatch])
    useEffect(() => {
        setIsLoginTemplateVisible(isLogin)
    }, [isLogin])
    useEffect(() => {
        setLoginAccount(loginAccountDetails)

    }, [loginAccountDetails])
    useEffect(() => {
        loginAccount && setAvterSrc(`data:${loginAccount.profile_photoType};base64,${loginAccount.profile_photo}`)
    }, [loginAccount])
   

    return (
        <>
            <AppBar position="fixed">
                <Container maxWidth="xl">
                    <Toolbar disableGutters sx={{ justifyContent: { xs: "space-between" }, width: { xs: '100%' } }}>
                        {/* <Box > */}
                        <NavLink to="/"><img src={logo} alt='Logo' className="logo" /></NavLink>
                        {/* </Box> */}

                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {
                                <div
                                    className={`menu-link ${!loginAccount && "auth-link"} `}>
                                    {loginAccount ?
                                        <ul>
                                            {loginAccount.user_role === "seller" ?
                                                <>
                                                    <SellerNavItem />
                                                </> :
                                                <>
                                                    <BuyerNavItem />
                                                </>
                                            }
                                            <MenuItem onClick={() => { navigate('/help') }}>
                                                <Typography textAlign="center" className='nav-hover' > <SupportIcon className='icon help-ico' /> Help</Typography>
                                            </MenuItem>
                                        </ul> :
                                        <>
                                        </>}
                                </div>
                            }
                        </Box>

                        <Box sx={{ flexGrow: 0 }}>
                            {loginAccount ? <> {<Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    {<Avatar alt={"👤"} src={avtarSrc} />}

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
                                    <MenuItem key={loginAccount.id + "email"} >
                                        <Typography textAlign="center" sx={{ color: "#2ce084" }}>{loginAccount.email}</Typography>
                                    </MenuItem>
                                    {loginAccount.restaurantName &&
                                        <MenuItem key={loginAccount.id + "restaurantName"} >
                                            <Typography textAlign="center" sx={{ color: "#2ce084" }}>{loginAccount.restaurantName}</Typography>
                                        </MenuItem>
                                    }
                                    <MenuItem key={loginAccount.id + "name"} >
                                        <Typography textAlign="center" sx={{ color: "#2ce084" }}>{loginAccount.ownerName || loginAccount.name}</Typography>
                                    </MenuItem>
                                    {isVWLesThen900Px &&
                                        <div>
                                            {loginAccount.user_role === "seller" ?
                                                <>
                                                    <SellerNavItem />
                                                </>
                                                :
                                                <>
                                                    <BuyerNavItem />
                                                </>
                                            }
                                            <MenuItem onClick={() => { navigate('/help') }}>
                                                <Typography textAlign="center" className='nav-hover' > <SupportIcon className='icon help-ico' /> Help</Typography>
                                            </MenuItem>
                                        </div>
                                    }
                                    <MenuItem key={loginAccount.id + "12"} onClick={() => setIsProfilePhotoUpdate(true)}>
                                        <Typography textAlign="center" sx={{ color: "green" }}><FaCloudUploadAlt className='icon' /> Change profile photo </Typography>
                                    </MenuItem>

                                    <MenuItem key={loginAccount.id + "rty"} onClick={logOutAccount}>
                                        <Typography textAlign="center" sx={{ color: "red" }}>Log out<LogoutIcon /></Typography>
                                    </MenuItem>
                                </Menu>
                            </>
                                :
                                <div className='auth-container'>
                                    <MenuItem onClick={() => { dispatch(setIsLogin(true)) }}>
                                        <Typography textAlign="center" className='nav-hover' >Sign in</Typography>
                                    </MenuItem>

                                    <MenuItem onClick={() => { navigate("/register") }}>
                                        <Typography textAlign="center" className='nav-hover' >Sign up</Typography>
                                    </MenuItem>
                                </div>}
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
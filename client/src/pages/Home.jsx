import React ,{useState,useEffect} from 'react';
import '../css/Home.css';
import BuyerHomePage from '../component/BuyerHomePage';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentSeller } from '../services/Seller';
import SellerHomePage from '../component/SellerHomePage';

function Home() {
  window.scrollTo(0,0);
  const authToken = localStorage.getItem("authToken");

  const dispatch = useDispatch()
  const loginAccountDetails=useSelector(state=>state.Login.loginAccountDetails);
  const [loginAccount,setLoginAccount]=useState(null);
  useEffect(() => {
    setLoginAccount(loginAccountDetails)
}, [loginAccountDetails])
useEffect(() => {
    if (authToken) {
        dispatch(fetchCurrentSeller(authToken));
    }
}, [authToken, dispatch])
  return (
    <>
      {
         loginAccount && loginAccount.user_role==="seller"?
         <SellerHomePage/>
         : 
         <BuyerHomePage/>
      }
   
    </>
  )
}

export default Home
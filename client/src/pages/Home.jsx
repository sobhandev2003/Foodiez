import React ,{useState,useEffect} from 'react';
import '../css/Home.css';
import BuyerHomePage from '../component/BuyerHomePage';
import { useSelector } from 'react-redux';
import SellerHomePage from '../component/SellerHomePage';

function Home() {
  window.scrollTo(0,0);
  const loginAccountDetails=useSelector(state=>state.Login.loginAccountDetails);
  const [loginAccount,setLoginAccount]=useState(null);
  useEffect(() => {
    setLoginAccount(loginAccountDetails)
}, [loginAccountDetails])
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
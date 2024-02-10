import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import BuyerOrder from '../component/BuyerOrder';
import SellerOrder from '../component/SellerOrder';

function Order() {
  const loginAccountDetails=useSelector(state=>state.Login.loginAccountDetails);
  const [loginAccount,setLoginAccount]=useState(null);
  useEffect(()=>{
    setLoginAccount(loginAccountDetails)
  },[loginAccountDetails])
  return (
    <>{
      loginAccount && loginAccount.user_role==="seller"?
      <><SellerOrder/></>
      :
      <><BuyerOrder/> </>
    }
    </>
  )
}

export default Order
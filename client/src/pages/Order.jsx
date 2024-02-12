import React, { useEffect, useState } from 'react'
import '../css/Order.css'
import { useSelector } from 'react-redux';
import BuyerOrder from '../component/BuyerOrder';
import SellerOrder from '../component/SellerOrder';
import loadingSpin from '../photo/loading-spinner.gif'
function Order() {
  const loginAccountDetails = useSelector(state => state.Login.loginAccountDetails);
  const [loginAccount, setLoginAccount] = useState(null);
  useEffect(() => {
    setLoginAccount(loginAccountDetails)
  }, [loginAccountDetails])
  return (
    <div className='order-page'>{
      loginAccount ?
        <>{loginAccount.user_role === "seller" ?
          <><SellerOrder /></>
          :
          <><BuyerOrder /></>
        }</>
        :
        <div className='loading-container'>
          <img className='loading-spin' src={loadingSpin} alt="loading..." />
        </div>
    }
    </div>
  )
}

export default Order
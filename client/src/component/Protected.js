import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Home from '../pages/Home';
import Error from './Error';


function Protected({component,path}) {
    const loginAccountDetails=useSelector(state=>state.Login.loginAccountDetails);
    const [isAuthenticated,setIsAuthenticated]=useState(false);
    const handelAuthentication=useCallback(()=>{
        if(!loginAccountDetails){
            setIsAuthenticated(false)
        }
         if(loginAccountDetails && loginAccountDetails.user_role==="seller"&& (path==="/edit-category")){
            setIsAuthenticated(true)
         }
         if(loginAccountDetails && loginAccountDetails.user_role==="buyer"&& (path==="/place-order"||path==="/cart"||path==="/restaurant/:id")){
            setIsAuthenticated(true)
         }
    },[loginAccountDetails,path])
    useEffect(() => {
       handelAuthentication()
  }, [loginAccountDetails,handelAuthentication])
  return (
    <>
      { isAuthenticated && component}
      { !loginAccountDetails && <Home/>}
      {loginAccountDetails && !isAuthenticated && <Error navigateTo={"Back to home"} navigatePath={"/"}/>}
    
        </>
  )
}

export default Protected
import {configureStore} from '@reduxjs/toolkit';
// import thunk from 'redux-thunk'
import cartReduser from '../fetures/CartsSlaice';

import allSellerReducer from '../fetures/seller';
import allBuyerReducer from '../fetures/buyer'
import categoryReducer from '../fetures/category';
import loginReducer from '../fetures/loginFrtures'
export const store =configureStore({
    reducer:{
        cart:cartReduser,
        Seller:allSellerReducer,
        Buyer:allBuyerReducer,
        Login:loginReducer,
        catagory:categoryReducer,
      },
      
});
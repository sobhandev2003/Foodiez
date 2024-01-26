import {configureStore} from '@reduxjs/toolkit';
import cartReduser from '../fetures/CartsSlaice';
import allSellerReducer from '../fetures/seller';
import categoryReducer from '../fetures/category';
export const store =configureStore({
    reducer:{
        cart:cartReduser,
        Seller:allSellerReducer,
        // createSllerAccout:createSller
        catagory:categoryReducer,
      }
});
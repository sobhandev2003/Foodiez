import {configureStore} from '@reduxjs/toolkit';
import cartReduser from '../fetures/CartsSlaice';
import getAllSeller from '../fetures/seller';
export const store =configureStore({
    reducer:{
        cart:cartReduser,
        allSeller:getAllSeller
      }
});
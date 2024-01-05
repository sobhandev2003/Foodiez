import {configureStore} from '@reduxjs/toolkit';
import cartReduser from '../fetures/CartsSlaice';
export const store =configureStore({
    reducer:{
        cart:cartReduser
      }
});
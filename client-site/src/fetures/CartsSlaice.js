import {createSlice} from '@reduxjs/toolkit';
const initialState={
    ToCarts:[]
}

export const CartsSlaice=createSlice({
    name:'addToCarts',
    initialState,
    reducers:{
        addToCarts:(state,action)=>{
            state.ToCarts=action.payload;

        },
        
    }
})
export const {addToCarts}=CartsSlaice.actions;
export default CartsSlaice.reducer;
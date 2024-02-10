import { createSlice } from "@reduxjs/toolkit";

const initialState={
    addresses:null
}

export const buyerSlice=createSlice({
    name:"buyer",
    initialState,
    reducers:{
        setAddresses:(state,action)=>{
            // console.log(action.payload);
            state.addresses=action.payload
        }
    }
}) 
export const {setAddresses}=buyerSlice.actions;
export default buyerSlice.reducer;
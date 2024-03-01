import { createSlice } from "@reduxjs/toolkit";

const initialState={
    addresses:null,
    orders:null,
    numberOfOrders:0
}

export const buyerSlice=createSlice({
    name:"buyer",
    initialState,
    reducers:{
        setAddresses:(state,action)=>{
            state.addresses=action.payload
        },
        setOrders:(state,action)=>{
            state.orders=action.payload
            state.numberOfOrders=action.payload.length;
        }
    }
}) 
export const {setAddresses,setOrders}=buyerSlice.actions;
export default buyerSlice.reducer;
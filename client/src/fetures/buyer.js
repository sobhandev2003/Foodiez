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
            // console.log(action.payload);
            state.addresses=action.payload
        },
        setOrders:(state,action)=>{
            // console.log(action.payload);
            state.orders=action.payload
            state.numberOfOrders=action.payload.length;
            // console.log(state.numberOfOrders);
        }
    }
}) 
export const {setAddresses,setOrders}=buyerSlice.actions;
export default buyerSlice.reducer;
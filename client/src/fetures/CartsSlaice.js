import {createSlice} from '@reduxjs/toolkit';
const initialState={
    ToCarts:[]

}

export const CartsSlaice=createSlice({
    name:'addToCarts',
    initialState,
    reducers:{
        addToCarts:(state,action)=>{
            // console.log(action.payload);
            const product={
                
                name:action.payload.name,
                price:action.payload.price
            }
            state.ToCarts.push(product);
        },
        
    }
})
export const {addToCarts}=CartsSlaice.actions;
export default CartsSlaice.reducer;
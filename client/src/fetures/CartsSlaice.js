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
            const {name,des,price,photo,_id}=action.payload;
            // console.log(_id);
            const product={
                
                name:name,
                des:des,
                price:price,
                photo:photo
            }
            state.ToCarts.push(product);
        },
        
    }
})
export const {addToCarts}=CartsSlaice.actions;
export default CartsSlaice.reducer;
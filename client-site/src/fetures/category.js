import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    catagory: null,
    editCategory:null,
    items:null,
}

export const categorySlice = createSlice({
    name: "category",
    initialState,
    
    reducers: {
        //NOTE - fetch cattagory by seller id 
        getCatagory: (state, action) => {
            state.catagory = action.payload
        },
        setEditCategory:(state,action)=>{
            state.editCategory=action.payload
            
        },
        setItem:(state,action)=>{
            state.items=action.payload
            
        }
    }
})

export const { getCatagory,setEditCategory,setItem } = categorySlice.actions;
export default categorySlice.reducer
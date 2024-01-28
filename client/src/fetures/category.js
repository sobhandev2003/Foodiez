import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    catagory: [],
    editCategory:null
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
            
        }
    }
})

export const { getCatagory,setEditCategory } = categorySlice.actions;
export default categorySlice.reducer
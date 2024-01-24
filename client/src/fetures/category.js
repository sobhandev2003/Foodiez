import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    catagory: []
}

export const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        //NOTE - fetch cattagory by seller id 
        getCatagory: (state, action) => {
            state.catagory = action.payload
        }
    }
})

export const { getCatagory } = categorySlice.actions;
export default categorySlice.reducer
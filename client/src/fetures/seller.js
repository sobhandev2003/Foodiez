import { createSlice } from "@reduxjs/toolkit";
const fetchSeller = async (quary) => {
  try {
    console.log("check");
    const response = await fetch(`http://localhost:5001/food/user/seller?restaurantName=${quary}`)
    const data = await response.json();
    return data;
  } 
  catch (error) {
    console.log(error);
  }
}

const initialState = {
  allSeller: await fetchSeller(""),
  createSllerAccout:false,
  

};

export const SellerSlice = createSlice({
  name: "seller",
  initialState,
  //NOTE - search seller use restaurantName or based on ratting use query
  reducers: {
    setSeller: (state, action) => {
    state.allSeller=action.payload
    },
    createSller:(state,action)=>{  
      state.createSllerAccout=action.payload.success;
    },

    
  }
})

export const {setSeller,createSller}=SellerSlice.actions;

export default SellerSlice.reducer;
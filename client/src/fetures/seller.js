import { createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../services/baseUrl";
const fetchSeller = async (quary) => {
  try {
    console.log("check");
    const response = await fetch(`${baseUrl}/food/user/seller?restaurantName=${quary}`)
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
  currentSellerCategory:null,
  

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
  
    currentSellerCategory:(state,action)=>{
      state.currentSellerCategory=action.payload
    }

    
  }
})

export const {setSeller,createSller,currentSellerCategory}=SellerSlice.actions;

export default SellerSlice.reducer;
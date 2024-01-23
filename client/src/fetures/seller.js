import { createSlice } from "@reduxjs/toolkit";
const fetchSeller = async (quary) => {
  try {
    console.log("check");
    const response = await fetch(`http://localhost:5001/food/user/seller?restaurantName=${quary}`)
    
    const data = await response.json();

    return data;

  } catch (error) {
    console.log(error);
  }
}
const initialState = {
  allSeller: await fetchSeller("")
};
export const getAllSellerSlice = createSlice({
  name: "fetchAllseller",
  initialState,
  reducers: {
    setSeller: (state, action) => {
    state.allSeller=action.payload
    }
  }
})
export const {setSeller}=getAllSellerSlice.actions;

//SECTION - search by resturent name

export default getAllSellerSlice.reducer;
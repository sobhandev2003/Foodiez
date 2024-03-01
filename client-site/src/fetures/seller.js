import { createSlice } from "@reduxjs/toolkit";
const baseUrl=process.env.REACT_APP_BASE_URL;
const fetchSeller = async (quary) => {
  try {
    const response = await fetch(`${baseUrl}/food/user/seller?restaurantName=${quary}`)
    const data = await response.json();
    return data;
  } 
  catch (error) {
    console.error(error);
  }
}

const initialState = {
  allSeller: await fetchSeller(""),
  createSllerAccout:false,
  currentSellerCategory:null,
  orders:null,
  numberOfOrders:0,
  numberOfPendingOrders:0
  

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
    },
    setNumberOfPendingOrder:(state,action)=>{
      state.numberOfPendingOrders=action.payload
    },
    setSellerOrder:(state,action)=>{
      state.orders=action.payload
      state.numberOfOrders=action.payload.length
    }

    
  }
})

export const {setSeller,createSller,currentSellerCategory,setNumberOfPendingOrder,setSellerOrder}=SellerSlice.actions;

export default SellerSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const initialState={
    isLogin:false,
    loginAccountDetails:null
}

export const loginSlice=createSlice({
    name:"Login",
    initialState,
    reducers:{
        setIsLogin:(state,action)=>{
                state.isLogin=action.payload;
                console.log(state.isLogin);
        },
        setLoginAccountDetails:(state,action)=>{
            state.loginAccountDetails=action.payload
        }
    }
})

export const {setIsLogin,setLoginAccountDetails} =loginSlice.actions
export default loginSlice.reducer
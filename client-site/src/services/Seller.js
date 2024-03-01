import Alert from "../component/Alert";
import {  setLoginAccountDetails } from "../fetures/loginFrtures";
import { createSller, setSellerOrder } from "../fetures/seller";

import { fetchCurrentSellerCategory } from "./Catagory";
const baseUrl=process.env.REACT_APP_BASE_URL;
//NOTE - fetch seller by id

export const fetchSellerById=async(sellerId)=>{
    try {
        const response=await fetch(`${baseUrl}/food/user/seller/restaurant/${sellerId}`,{
            method:"GET"
        })

        const data=await response.json();
        if(response.ok){
            return data
        }
        else{
            return null
        }
    } catch (error) {
        console.error(error);
        return null
    }
}

//NOTE - register a new Seller
export const registerSeller = (sellerData) => async (dispatch) => {

    const { restaurantName, ownerName, address, email, mobile, photo, password, } = sellerData;
    try {
        const formData = new FormData();
        formData.append('restaurantName', restaurantName);
        formData.append('ownerName', ownerName);
        formData.append('address', address);
        formData.append('email', email);
        formData.append('mobile', mobile);
        formData.append('photo', photo);
        formData.append('password', password);

        const response = await fetch(`${baseUrl}/food/user/seller/register`, {
            method: 'POST',
            headers: {
                // Add any additional headers if needed
            },
            body: formData,
        });
        if (response.ok) {
            // Request was successful
            const data = await response.json();

            Alert("success", <p>{data.message}</p>)
            dispatch(createSller({ success: true }))

        } else {
            // Request failed
            const errorData = await response.json();
            Alert("error", <p>{errorData.message}</p>)
            console.error('Error:', response.status, errorData.message);
            dispatch(createSller({ success: false }))
        }
    } catch (error) {
        console.error('Error:', error.message);
        dispatch(createSller({ success: false }))
    }
};

//NOTE - login seller Account with email && Password

export const loginSeller = async (sellerData) => {

    try {
        const response = await fetch(`${baseUrl}/food/user/seller/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(sellerData),
        })
        if (response.ok) {
            const data = await response.json()
            // localStorage.setItem("authToken",data);
            Alert("success", <p>Successfully login your account</p>)
            return data;

        }
        else {
            const errorData = await response.json()
            Alert("error", <p>{errorData.message}</p>)
            return false

        }

    } catch (error) {
        console.error(error);
        return false
    }

}

//NOTE - fetch current seller details

export const fetchCurrentSeller = (authToken) => async (dispatch) => {
    try {
        const response = await fetch(`${baseUrl}/food/user/seller/current`, {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + authToken,

            }
        }
        )
        if (response.ok) {
            const data = await response.json();
            
            if(!data.user_role){
               Alert("error",<>Oops! Something wrong.Re-login your account </>)
            }
            else{
                
                dispatch(fetchCurrentSellerCategory(data));
                dispatch(setLoginAccountDetails(data))
            }
        }
        else {
            const errorData = response.json()
            Alert("error", <p>{errorData.massage}</p>)
        }

    } catch (error) {
        console.error("ch",error);

    }
}

//NOTE - Forgot account password use email 

export const forgotPassword = async (sellerData, setIsForgotPassword) => {
    try {
        const response = await fetch(`${baseUrl}/food/user/seller/forgotpassword`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(sellerData)
        })
        const data = await response.json();
        if (response.ok) {
            Alert("success", <p>{data.massage}</p>)
            setIsForgotPassword(false)

        }
        else {
            Alert("error", <p>{data.message}</p>);

        }
    } catch (error) {
        console.error(error)
    }
}

//NOTE - fetch seller all order item

export const fetchAllOrder=(authToken, status)=>async(dispatch)=>{

    try {
        const response =await fetch(`${baseUrl}/food/user/seller/order?status=${status}`,{
            method:"GET",
            headers: {
                'Authorization': 'Bearer ' + authToken,
            }
        })
        const data=await response.json();
        if(response.ok){
                dispatch(setSellerOrder(data))            
        }
        else{
            Alert("error",<>{data.message}</>)
        }
        
    } catch (error) {
        console.error(error);
    }
}


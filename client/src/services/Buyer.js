import Alert from "../component/Alert";
import { setAddresses, setOrders } from "../fetures/buyer";

import { setLoginAccountDetails } from "../fetures/loginFrtures";
import { baseUrl } from "./baseUrl";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
//NOTE - register a new buyer account
export const registerBuyerAccount = async (buyerData, navigate) => {
    try {

        const response = await fetch(`${baseUrl}/food/user/buyer/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(buyerData)
        })
        const data = await response.json();
        if (response.ok) {
            Alert("success", <p>Account successfully register</p>);
            navigate('/');
            Alert("info", <>Sign in  your Account</>)
        }
        else {
            Alert("error", <p>{data.message}</p>)
        }

    } catch (error) {
        console.error(error);
    }
}

//NOTE - Login buyer account

export const loginBuyerAccount = async (buyerDetails) => {
    try {
        const response = await fetch(`${baseUrl}/food/user/buyer/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(buyerDetails)
        });
        const data = await response.json();
        if (response.ok) {

            return data;
        }
        else {

            Alert("error", <>{data.message}</>)
        }

    } catch (error) {
        console.error(error);
    }
}
//NOTE - fetch Login Buyer Details

export const fetchLoginBuyerDetails = (authToken) => async (dispatch) => {
    // console.log(authToken);
    try {
        const response = await fetch(`${baseUrl}/food/user/buyer/current`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + authToken
            }
        })

        const data = await response.json();

        if (response.ok) {
            dispatch(setLoginAccountDetails(data))
        }
        else {

            Alert("error", <>{data.message}</>)
        }


    } catch (error) {
        console.error(error);
    }
}
//NOTE - Add Cart Items
export const addCartItems = (cartItemDetails, authToken) => async (dispatch) => {

    try {
        const response = await fetch(`${baseUrl}/food/user/buyer/cart-item`, {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + authToken,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(cartItemDetails)
        })

        const data = response.json();
        if (response.ok) {
            Alert('success', <div>Add to cart  <ShoppingCartOutlinedIcon /> </div>)
            dispatch(fetchLoginBuyerDetails(authToken))
        }
        else {
            Alert("error", <>{data.message}</>)
        }

    } catch (error) {
        console.error(error);
    }
}

//NOTE - get cart item

export const getCartItem = async (authToken) => {
    try {
        const response = await fetch(`${baseUrl}/food/user/buyer/cart-item`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + authToken
            }
        })

        const data = await response.json();
        if (response.ok) {
            return data;
        }
        else {
            console.error(data.message);
        }

    } catch (error) {
        console.error(error);
    }
}

//NOTE - Delete Cart item 
export const deleteCartItem = (authToken, itemId) => async (dispatch) => {
    try {
        const response = await fetch(`${baseUrl}/food/user/buyer/cart-item/${itemId}`, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + authToken
            }
        })
        const data = await response.json();
        if (response.ok) {
            Alert("success", <>{data.message}</>)
            dispatch(fetchLoginBuyerDetails(authToken))
        }
        else {

            Alert("error", <>{data.message}</>)
        }

    } catch (error) {
        console.error(error);
    }
}

//NOTE - fetch buyer address
export const fetchBuyerSavedAddress = (authToken) => async (dispatch) => {
    try {
        const response = await fetch(`${baseUrl}/food/user/buyer/delivery-address`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + authToken
            }
        })
        const data = await response.json();
        if (response.ok) {
            dispatch(setAddresses(data))
        }
        else {
            Alert("error", <>{data.message}</>)
        }

    } catch (error) {
        console.error(error);
    }
}

//NOTE - saved new address
export const savedNewAddress = (authToken, addressDetails) => async (dispatch) => {
    try {
        const response = await fetch(`${baseUrl}/food/user/buyer/delivery-address`, {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + authToken,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(addressDetails)
        })
        const data = await response.json();
        if (response.ok) {
            Alert("success", <>{data.message}</>)
            dispatch(fetchBuyerSavedAddress(authToken))

            
        }
        else{
            Alert("error",<>{data.message}</>)
         
        }
    } catch (error) {
        console.error(error);
        
    }
}

//NOTE - Place new order
export const savePlaceOrderInDB=(authToken,orderDetails,navigate)=>async(dispatch)=>{
    try {
        const response=await fetch(`${baseUrl}/food/user/buyer/order`,{
            method:"POST",
            headers:{
                "Authorization": "Bearer " + authToken,
                "Content-Type": "application/json"
            },
            body:JSON.stringify(orderDetails)
        }   )
        const data=await response.json();
        if (response.ok) {
            Alert('success',<>{data.message}</>)
            dispatch(fetchLoginBuyerDetails(authToken))
            navigate("/my-order")
        }
        else{
            Alert('error',<>{data.message}</>)
        }

    } catch (error) {
        console.error(error);
    }
}

//NOTE - get buyer all order
export const fetchOrderBuyerDetails=(authToken)=>async(dispatch)=>{
    try {
        const response=await fetch(`${baseUrl}/food/user/buyer/order`,{
            method:"GET",
            headers:{
                "Authorization": "Bearer " + authToken, 
            }
        })
        const data=await response.json();
        if(response.ok){
            // console.log(data);
            dispatch(setOrders(data))
        }
        else{
            console.error(data.message);
        }

    } catch (error) {
        console.error(error);
    }
}
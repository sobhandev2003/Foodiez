import Alert from "../component/Alert";
import { setLoginAccountDetails } from "../fetures/loginFrtures";
import { createSller } from "../fetures/seller";

import { fetchCurrentSellerCategory } from "./Catagory";
import { baseUrl } from "./baseUrl";

//NOTE - register a new Seller

export const registerSeller = (sellerData) => async (dispatch) => {
    // console.log(sellerData);
    // const {}
 
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
            // const data = await response.json();
            Alert("success",<p>Successfully register your email</p>)
           dispatch(createSller({success:true}))
           
        } else {
            // Request failed
        const errorData = await response.json();
        Alert("error",<p>{errorData.message}</p>)
        console.error('Error:', response.status, errorData.message);
        dispatch(createSller({success:false}))
        }
    } catch (error) {
        console.error('Error:', error.message);
        dispatch(createSller({success:false}))
    }
};

//NOTE - login seller Account with email && Password

export const loginSeller=async(sellerData)=>{

    try {
        const response=await fetch(`${baseUrl}/food/user/seller/login`,{
            method: 'POST',
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(sellerData),
        }) 
        if(response.ok){
            const data=await response.json()
            // localStorage.setItem("authToken",data);
            Alert("success",<p>Successfully login your account</p>)
         return data;
         
        }
        else{
            const errorData=await response.json()
            Alert("error",<p>{errorData.message}</p>)
            return false
          
        }
       
    } catch (error) {
        console.log(error);
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
        if(response.ok){
            const data= await response.json();
        // console.log(data);
        dispatch(fetchCurrentSellerCategory(data));
        dispatch(setLoginAccountDetails(data))
    }
    else{
        const errordata=response.json()
        Alert("error",<p>{errordata.massage}</p>)
    }

    } catch (error) {
        console.log(error);

    }
}
//NOTE - Forgot account password use email 
export const forgotPassword=async(sellerData,setIsForgotPassword)=>{
    console.log(sellerData);
    try {
        const response = await fetch(`${baseUrl}/food/user/seller/forgotpassword`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(sellerData)
        })
        const data=await response.json();
        console.log(data);
        if(response.ok){
            Alert("success",<p>{data.massage}</p>)
            setIsForgotPassword(false)
        
        }
        else{
            Alert("error",<p>{data.message}</p>);
            
        }
    } catch (error) {
    console.error(error)
    }
}

//NOTE -  Update Profile Seller photo
// export const updateProfilePhoto=(authToken,photo,setIsProfilePhotoUpdate)=>async(dispatch)=>{
//     try {
//         const formData=new FormData();
//         formData.append("photo",photo);
//         const response=await fetch(`${baseUrl}/food/user/seller/upload-profile-photo`,{
//         method:"POST",
//         headers: {
//             'Authorization': 'Bearer ' + authToken,

//         },
//         body :formData

//         })
//         const data=await response.json();
//         // console.log(data);
//         if(response.ok){
//             Alert('success',<p>{data.msg}</p>)
//             dispatch(fetchCurrentSeller(authToken));
//             setIsProfilePhotoUpdate(false);
//         }
//         else{
//             Alert('error',<p>{data.message}</p>)
//         }
//     } catch (error) {
//         console.error(error);
//     }
// }
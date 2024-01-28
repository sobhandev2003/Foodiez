import Alert from "../component/Alert";
import { createSller } from "../fetures/seller";


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

        const response = await fetch('http://localhost:5001/food/user/seller/register', {
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


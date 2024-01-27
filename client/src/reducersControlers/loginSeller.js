

import Alert from "../component/Alert";


export const loginSeller=async(sellerData)=>{

    try {
        const response=await fetch('http://localhost:5001/food/user/seller/login',{
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
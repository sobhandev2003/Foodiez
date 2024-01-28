import { currentSellerCategory } from "../fetures/seller";

export const fetchCurrentSellerCategory=(sellerData)=>async(dispatch)=>{
    const id=sellerData.id;
    try {
        const response= await fetch(`http://localhost:5001/food/category/${id}`,{
            method:"GET"
        }) ;

        if (response.ok) {
            const data=await response.json();
            dispatch(currentSellerCategory(data))
        } else {
            console.error("Something wrong");
        }
   
        // console.log(data);
        
    } catch (error) {
        console.log(error);
    }
}
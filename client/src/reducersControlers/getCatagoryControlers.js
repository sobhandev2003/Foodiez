import { getCatagory } from "../fetures/category";

export const fetchCatagory=(id)=>async(dispatch)=>{
    try {
        console.log(id);
        const response=await fetch(`http://localhost:5001/food/category/${id}`);
        const data=await response.json();
        dispatch(getCatagory(data));
    } catch (error) {
        console.log(error);
    }
}
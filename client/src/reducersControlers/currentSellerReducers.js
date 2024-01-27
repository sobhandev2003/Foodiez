import Alert from "../component/Alert";
import { currentSeller } from "../fetures/seller";

export const fetchCurrentSeller = (authToken) => async (dispatch) => {
    try {
        const response = await fetch('http://localhost:5001/food/user/seller/current', {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + authToken,

            }
        }
        )
        if(response.ok){
            const data= await response.json();
        // console.log(data);
        dispatch(currentSeller(data))
    }
    else{
        const errordata=response.json()
        Alert("error",<p>{errordata.massage}</p>)
    }

    } catch (error) {
        console.log(error);

    }


}
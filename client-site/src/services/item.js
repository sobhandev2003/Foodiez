import Alert from "../component/Alert";
import { setItem } from "../fetures/category";
const baseUrl=process.env.REACT_APP_BASE_URL;
export const createNewItem = async (authToken, id, itemDetails) => {
    const formData = new FormData();
    formData.append("name", itemDetails.name);
    formData.append("description", itemDetails.description);
    formData.append("photo", itemDetails.photo);
    formData.append("price", itemDetails.price);
    try {
        const response = await fetch(`${baseUrl}/food/category/${id}/item`, {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + authToken,
            },
            body: formData,
        })

        const data = await response.json();
        if (response.ok) {
            Alert("success", <p>{data.msg}</p>)
        }
        else {
            // const errorData=await response.json();
            Alert("error", <p>{data.message}</p>)
        }


    } catch (error) {
        console.error(error);
    }

}
//NOTE - fetch iteam us category id
export const fetchItemByCategoryId =  (id)=>async(dispatch) => {
    try {

        const response = await fetch(`${baseUrl}/food/category/${id}/item`, {
            method: "GET",
        })
        const data = await response.json();
        if (response.ok) {
            dispatch(setItem(data))
        }
        else {
            console.error(data.message);
        }

    } catch (error) {
        console.error(error);
    }
}
//NOTE - udet a iteam

export const updateItem = async (authToken, id, EditItem) => {
    const { _id, description, price } = EditItem;

    try {
        const response = await fetch(`${baseUrl}/food/category/${id}/item/${_id}`, {
            method: "PUT",
            headers: {
                "Authorization": "Bearer " + authToken,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ price,description })
        }
        )
        const data = await response.json();
        if(response.ok){
            Alert("success",<p>Item Successfully updated</p>)
        }
        else{
            Alert("error",<p>{data.message}</p>)
        }
    } catch (error) {
        console.error(error)
    }

}

//NOTE - delete item
export const deleteItem=async(authToken,categoryId,itemId,password)=>{
    try {
        
        const response = await fetch(`${baseUrl}/food/category/${categoryId}/item/${itemId}`, {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + authToken,
                "Content-Type": "application/json"
                
            },
            body: JSON.stringify(password)
        }
      
        )
        const data=await response.json();
        if (response.ok) {
            Alert("success",<p>Item Successfully deleted</p>)
            
        }
        else{
            Alert("error",<p>{data.message}</p>)
        }

    } catch (error) {
        console.error(error);
    }

}
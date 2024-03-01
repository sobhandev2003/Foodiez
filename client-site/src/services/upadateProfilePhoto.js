import Alert from "../component/Alert";
import { fetchLoginBuyerDetails } from "./Buyer";
import { fetchCurrentSeller } from "./Seller";
const baseUrl=process.env.REACT_APP_BASE_URL;

export const updateProfilePhoto=(user,authToken,photo,setIsProfilePhotoUpdate)=>async(dispatch)=>{
    try {
        const formData=new FormData();
        formData.append("photo",photo);
        const response=await fetch(`${baseUrl}/food/user/${user}/upload-profile-photo`,{
        method:"POST",
        headers: {
            'Authorization': 'Bearer ' + authToken,

        },
        body :formData

        })
        const data=await response.json();
        if(response.ok){
            Alert('success',<p>{data.message}</p>)
           user.toLowerCase()==="seller"? dispatch(fetchCurrentSeller(authToken)):dispatch(fetchLoginBuyerDetails(authToken));
            setIsProfilePhotoUpdate(false);
        }
        else{
            Alert('error',<p>{data.message}</p>)
        }
    } catch (error) {
        console.error(error);
    }
}
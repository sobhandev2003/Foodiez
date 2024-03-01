import Alert from "../component/Alert";
import { getCatagory } from "../fetures/category";
import { currentSellerCategory } from "../fetures/seller";

const baseUrl=process.env.REACT_APP_BASE_URL;
//NOTE - fetch current seller category
export const fetchCurrentSellerCategory = (sellerData) => async (dispatch) => {
    const id = sellerData.id;

    try {
        const response = await fetch(`${baseUrl}/food/category/${id}`, {
            method: "GET"
        });

        if (response.ok) {
            const data = await response.json();
            dispatch(currentSellerCategory(data))
        } else {
            console.error("Something wrong");
        }

    } catch (error) {
        console.error(error);
    }
}


//NOTE - create new category

export const CreateNewCategory =  (categoryData,currentSellerDetailes)=>async(dispatch) => {
    const authToken = localStorage.getItem("sellerAuthToken")
    if (authToken) {
        try {
            const response = await fetch(`${baseUrl}/food/category`, {
                method: "POST",
                headers: {
                    'Authorization': 'Bearer ' + authToken,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(categoryData)
            })
            if (response.ok) {
                 
                Alert("success", <p>Successfully Create a new catagory</p>)
                dispatch(fetchCurrentSellerCategory(currentSellerDetailes))
            } else {
                const errorData = await response.json();
                Alert("error", <p>{errorData.massage}</p>)
            }


        } catch (error) {
            console.error(error);
        }
    }
    else {
        Alert("error", <p>Unauthorized</p>)
    }
}

//NOTE - fetch category
export const fetchCatagory = (id) => async (dispatch) => {
 
    try {
        
        const response = await fetch(`${baseUrl}/food/category/${id}`);
        const data = await response.json();
        dispatch(getCatagory(data));
    } catch (error) {
        console.error(error);
    }
}


//NOTE - Dellete a category;
export const deleteCategoryById = (authToken, password, category, currentSellerDetailes,navigate) => async (dispatch) => {

    try {
        if (authToken) {
            try {
                const response = await fetch(`${baseUrl}/food/category/${category.id}`, {
                    method: "POST",
                    headers: {
                        'Authorization': 'Bearer ' + authToken,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(password)
                })
                if (response.ok) {
                    const data = await response.json();
                    dispatch(fetchCurrentSellerCategory(currentSellerDetailes))
                    Alert("success", <p>Successfully Delete category  {data.name}</p>)
                    navigate('/')
                } else {
                    const errorData = await response.json();
                    Alert("error", <p>{errorData.message}</p>)
                }



            } catch (error) {
                console.error(error);
            }
        }
        else {
            Alert("error", <p>Unauthorized</p>)
        }

    } catch (error) {

    }
}
import Alert from "../component/Alert";
import { getCatagory } from "../fetures/category";
import { currentSellerCategory } from "../fetures/seller";
//NOTE - fetch current seller category
export const fetchCurrentSellerCategory = (sellerData) => async (dispatch) => {
    const id = sellerData.id;
    console.log(id);
    try {
        const response = await fetch(`http://localhost:5001/food/category/${id}`, {
            method: "GET"
        });

        if (response.ok) {
            const data = await response.json();
            dispatch(currentSellerCategory(data))
        } else {
            console.error("Something wrong");
        }

        // console.log(data);

    } catch (error) {
        console.error(error);
    }
}


//NOTE - create new category

export const CreateNewCategory = async (categoryData) => {
    const authToken = localStorage.getItem("authToken")
    if (authToken) {
        try {
            const response = await fetch('http://localhost:5001/food/category', {
                method: "POST",
                headers: {
                    'Authorization': 'Bearer ' + authToken,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(categoryData)
            })
            if (response.ok) {
                // const data = await response.json();  
                Alert("success", <p>Successfully Create a new catagory</p>)
            } else {
                const errorData = await response.json();
                Alert("error", <p>{errorData.massage}</p>)
            }

            // console.log(data);


        } catch (error) {
            console.log(error);
        }
    }
    else {
        Alert("error", <p>Unauthorized</p>)
    }
}

//NOTE - fetch category
export const fetchCatagory = (id) => async (dispatch) => {
    // console.log(id);
    try {
        console.log(id);
        const response = await fetch(`http://localhost:5001/food/category/${id}`);
        const data = await response.json();
        dispatch(getCatagory(data));
    } catch (error) {
        console.log(error);
    }
}


//NOTE - Dellete a category;
export const deleteCategoryById = (authToken, password, category, currentSellerDetailes) => async (dispatch) => {
    // console.log(category);
    const deleteData = {
        password
    }
    // console.log(deleteData);
    try {
        if (authToken) {
            try {
                const response = await fetch(`http://localhost:5001/food/category/${category.id}`, {
                    method: "POST",
                    headers: {
                        'Authorization': 'Bearer ' + authToken,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(deleteData)
                })
                if (response.ok) {
                    const data = await response.json();
                    dispatch(fetchCurrentSellerCategory(currentSellerDetailes))
                    Alert("success", <p>Successfully Delete category  \{data.categoryname}</p>)
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
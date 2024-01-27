import Alert from "../component/Alert";

export const CreateNewCategory = async (categoryData) => {
    const authToken = localStorage.getItem("authToken")
    if (authToken) {
        try {
            const response = await fetch('http://localhost:5001/food/category', {
                method: "POST",
                headers: {
                    'Authorization': 'Bearer '+ authToken,
                    "Content-Type":"application/json"   
                },
                body: JSON.stringify(categoryData)
            })
            if (response.ok) {
                // const data = await response.json();  
                Alert("success",<p>Successfully Create a new catagory</p>)
            } else {
                const errorData = await response.json();  
                Alert("error",<p>{errorData.massage}</p>)
            }
          
            // console.log(data);


        } catch (error) {
            console.log(error);
        }
    }
    else{
      Alert("error",<p>Unauthorized</p>)
    }
}
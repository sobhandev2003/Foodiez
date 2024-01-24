import { setSeller } from "../fetures/seller";

export const searchSeller = (query) => async (dispatch) => {
    console.log(query);
    const {restaurantName,rating}=query
    try {
      const response = await fetch(`http://localhost:5001/food/user/seller?restaurantName=${restaurantName?restaurantName:''}&rating=${rating?rating:-1}`);
      const data = await response.json();
      dispatch(setSeller(data)); // Dispatch the action with the new data
    } catch (error) {
      console.error(error);
      // Handle error if needed
    }
  };
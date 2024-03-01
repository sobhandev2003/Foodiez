import { setSeller } from "../fetures/seller";
const baseUrl=process.env.REACT_APP_BASE_URL;

export const searchSeller = (query) => async (dispatch) => {
    const {restaurantName,rating}=query
    try {
      const response = await fetch(`${baseUrl}/food/user/seller?restaurantName=${restaurantName?restaurantName:''}&rating=${rating?rating:-1}`);
      const data = await response.json();
      dispatch(setSeller(data)); // Dispatch the action with the new data
    } catch (error) {
      console.error(error);
      // Handle error if needed
    }
  };
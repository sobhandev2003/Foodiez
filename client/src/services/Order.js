import { baseUrl } from "./baseUrl";
import Alert from "../component/Alert";
export const fetchOrderDetailsByOrderId = async (authToken, orderId) => {

    try {
        const response = await fetch(`${baseUrl}/food/user/buyer/order?order_Id=${orderId}`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + authToken
            }
        })
        const data = await response.json()
        if (response.ok) {
            return data;
        }
        else {
            Alert("error", <>{data.message}</>)
        }

    } catch (error) {
        console.error(error);
    }
}

export const CancelOrder = async (authToken, orderId, reason) => {
    // console.log({ reason });
    try {
        const response = await fetch(`${baseUrl}/food/user/buyer/cancel/${orderId}`, {
            method: "PUT",
            headers: {
                "Authorization": "Bearer " + authToken,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ reason })
        })
        const data = await response.json()
        if (response.ok) {
            Alert("success", <>{data.message}</>)
            // console.log(data);
        }
        else {
            Alert("error", <>{data.message}</>)
        }

    } catch (error) {
        console.error(error);
    }

}

//SECTION -  Seller
//NOTE - fetch seller all order
export const fetchSellerOrderDetailsByOrderId = async (authToken, orderId) => {
    // console.log(authToken,orderId);
    try {
        const response = await fetch(`${baseUrl}/food/user/seller/order?order_Id=${orderId}`, {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + authToken,
            }
        })
        const data = await response.json();
        if (response.ok) {
            // console.log(data);
            return data
        }
        else {
            Alert("error", <>{data.message}</>)
        }

    } catch (error) {
        console.error(error);
    }
}
//NOTE - cancel order by Seller
export const CancelOrderBySeller = async (authToken, orderId, reason) => {
    try {
        const response = await fetch(`${baseUrl}/food/user/seller/order/cancel/${orderId}`, {
            method: "PUT",
            headers: {
                "Authorization": "Bearer " + authToken,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ reason })
        })
        const data = await response.json()
        if (response.ok) {
            Alert("success", <>{data.message}</>)
            // console.log(data);
        }
        else {
            Alert("error", <>{data.message}</>)
        }

    } catch (error) {
        console.error(error);
    }
}
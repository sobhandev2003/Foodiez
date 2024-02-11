import React, { useEffect, useState } from 'react'
import '../css/OrderDetails.css'
import { useLocation } from 'react-router-dom';
import { CancelOrder, fetchOrderDetailsByOrderId } from '../services/Order';
import Model from '../component/Model'
import loadingSpin from '../photo/loading-spinner.gif'
import CircleIcon from '@mui/icons-material/Circle';
import CloseIcon from '@mui/icons-material/Close';
function OrderDetails() {
    window.scrollTo(0,0)
    const location = useLocation();
    const orderId = new URLSearchParams(location.search).get('order_id');
    const authToken = localStorage.getItem("buyerAuthToken")
    const [order, setOrder] = useState(null);
    const [orderItem, setOrderItem] = useState(null);
    const [deliveryAddress, setDeliveryAddress] = useState(null)
    const [isCancelOrder, setIsCancelOrder] = useState(false)
    const [orderCancelReason, setOrderCancelReason] = useState(null)
    //NOTE - get orderDetails from DB
    const getOrderDetailsByOrderId = async () => {
        const data = await fetchOrderDetailsByOrderId(authToken, orderId);
        if(data){
            setOrder(data)
            setOrderItem(data.item)
            setDeliveryAddress(data.address)
        }
    }
    //NOTE - handel cancel order
    const handelOrderCancel = async () => {
        // console.log(orderCancelReason);
      await  CancelOrder(authToken, orderId, orderCancelReason)
      getOrderDetailsByOrderId()
      setIsCancelOrder(false)
    }
  //NOTE - set order cancel reason 
    const handelOrderCancelReasonInput = (e) => {
        setOrderCancelReason(e.target.value)
    }
    //NOTE - pop up Model for take reason of order cancel
    const cancelOrderTemple = (
        <Model>
            <CloseIcon className='cancel-model' onClick={() => { setIsCancelOrder(false) }} />
            <div className='confirm-cancel-div'>
                <label className="custom-field one">
                    <input type="text" placeholder=" " name='additionalInfo' onChange={handelOrderCancelReasonInput} />
                    <span className="placeholder">Cancel reason</span>
                </label>
                <button onClick={handelOrderCancel}>Confirm Cancel</button>
            </div>
        </Model>
    )

 
    useEffect(() => {
        getOrderDetailsByOrderId()
        // eslint-disable-next-line
    }, [])
    return (
        <div className='order-details-page'>
            {
                order ? <div className='order-details'>
                    <section>
                        <h3>Delivery Address</h3>
                        <h4>{order.Buyer_Name}</h4>
                        <div>
                            <p><span>{deliveryAddress.city}</span>,<span>{deliveryAddress.district}</span></p>
                            <p><span>{deliveryAddress.additionalInfo} </span> -<span>{deliveryAddress.postCode}</span></p>
                            <p><span>{deliveryAddress.state}</span>,<span>{deliveryAddress.country}</span></p>
                        </div>
                        <p><b>Phone number</b><span>{order.Contact_Number}</span></p>
                    </section>
                    <section>
                        <div>
                            <img src={`data:${orderItem.photoType};base64,${orderItem.photo}`} alt='' />
                            <div>
                                <p>{orderItem.name}</p>
                                <p style={{ color: "gray" }}>{orderItem.description}</p>
                                <p><b>&#8377;</b><b>{orderItem.price}</b></p>
                            </div>
                        </div>
                        <div>
                            <p><CircleIcon style={{ color: "orange", fontSize: "1rem" }} /><span>Order confirmed on </span><span>{order.orderTime}</span></p>
                            {order.orderDeliverTime && <p><CircleIcon style={{ color: "green", fontSize: "1rem" }} /><span>Order delivered on </span><span>{order.orderDeliverTime}</span></p>}
                            {order.orderCancelTime && <p><CircleIcon style={{ color: "red", fontSize: "1rem" }} /><span>Order cancel on </span><span>{order.orderCancelTime}</span></p>}
                            {!order.orderDeliverTime && !order.Order_Cancel_Reason && <button onClick={() => setIsCancelOrder(true)}>Cancel order</button>}
                        </div>
                    </section>
                </div> : <div className='loading-container'>
                    <img className='loading-spin' src={loadingSpin} alt="loading..." />
                </div>

            }
            {isCancelOrder && cancelOrderTemple}
        </div>

    )
}

export default OrderDetails
import React, { useEffect, useRef, useState } from 'react'
import '../css/OrderDetails.css'
import { useLocation } from 'react-router-dom';
import { CancelOrder, CancelOrderBySeller, fetchOrderDetailsByOrderId, fetchSellerOrderDetailsByOrderId, giveRatingDeliveredItem, updateOrderDelivered } from '../services/Order';
import Model from '../component/Model'
import loadingSpin from '../photo/loading-spinner.gif'
import CircleIcon from '@mui/icons-material/Circle';
import CloseIcon from '@mui/icons-material/Close';
import { MdStarRate } from "react-icons/md";
import { isValidMongoObjectId } from '../component/inputValidator';
import Error from '../component/Error';
import { Rating } from '@mui/material';
import Alert from '../component/Alert';
import { useDispatch } from 'react-redux';
function OrderDetails() {

    window.scrollTo(0, 0)
    const dispatch = useDispatch()
    const location = useLocation();
    const foundOrderDivRef = useRef(null);
    const notFoundOrderDivRef = useRef(null);

    const orderId = new URLSearchParams(location.search).get('order_id');
    const buyerAuthToken = localStorage.getItem("buyerAuthToken")
    const sellerAuthToken = localStorage.getItem("sellerAuthToken")
    const [order, setOrder] = useState(null);
    const [orderItem, setOrderItem] = useState(null);
    const [deliveryAddress, setDeliveryAddress] = useState(null)
    const [isCancelOrder, setIsCancelOrder] = useState(false)
    const [orderCancelReason, setOrderCancelReason] = useState(null);
    const [isFeedbackModelDisplay, setIsFeedbackModelDisplay] = useState(false);
    const [feedbackData, setFeedbackData] = useState({ rating: -1, feedback: "" })
    //NOTE - get orderDetails from DB

    const getOrderDetailsByOrderId = async () => {

        let data;
        
        if (buyerAuthToken) {
            data = await fetchOrderDetailsByOrderId(buyerAuthToken, orderId);
        }
        else if (sellerAuthToken) {
            data = await fetchSellerOrderDetailsByOrderId(sellerAuthToken, orderId)
        }
        if (data) {
            console.log(data);
            setOrder(data)
            setOrderItem(data.item)
            setDeliveryAddress(data.address)
        }
        else if (!data) {
            if (foundOrderDivRef && notFoundOrderDivRef) {
                foundOrderDivRef.current.style.display = "none"
                notFoundOrderDivRef.current.style.display = "block"
            }
        }
    }
    //NOTE - Handel order deliver
    const handelDeliver = async () => {
        await updateOrderDelivered(sellerAuthToken, orderId, dispatch);
        getOrderDetailsByOrderId()
    }
    //NOTE - handel cancel order
    const handelOrderCancel = async () => {
        if (buyerAuthToken) {
            await CancelOrder(buyerAuthToken, orderId, orderCancelReason)
            getOrderDetailsByOrderId()
        }
        else if (sellerAuthToken) {
            await CancelOrderBySeller(sellerAuthToken, orderId, orderCancelReason, dispatch);
            getOrderDetailsByOrderId();
        }

        setIsCancelOrder(false)
    }
    const handelFeedback = async (e) => {
        e.preventDefault()
        if (feedbackData.rating === -1) {
            Alert("info", <>rating given mandatory</>)
        }
        else {
            const response = await giveRatingDeliveredItem(buyerAuthToken, orderId, feedbackData, setIsFeedbackModelDisplay);
            if (response) {
                setIsFeedbackModelDisplay(false)
                getOrderDetailsByOrderId()
            }
        }
    }
    //NOTE - set order cancel reason 
    const handelOrderCancelReasonInput = (e) => {
        setOrderCancelReason(e.target.value)
    }

    //NOTE - handel feedback data
    const handleRatingChange = (event, value) => {
        setFeedbackData(prevData => ({ ...prevData, rating: value }));
    };

    const handleFeedbackChange = (event) => {
        setFeedbackData(prevData => ({ ...prevData, feedback: event.target.value }));
    };
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
    //NOTE - Pop up model for feedback
    const feedbackTemplate = (
        <Model>
            <CloseIcon className='cancel-model' onClick={() => { setIsFeedbackModelDisplay(false) }} />
            <form className='feedback-Model model-element' onSubmit={handelFeedback}>
                <Rating name="half-rating" defaultValue={0} precision={0.5} onChange={handleRatingChange} aria-required />
                <textarea rows="10" placeholder='Give your feedback' value={feedbackData.feedback} onChange={handleFeedbackChange}></textarea>
                <button type='submit' >Submit</button>
            </form>
        </Model>
    )

    useEffect(() => {
        const isValidOrderId = isValidMongoObjectId(orderId);
        isValidOrderId && getOrderDetailsByOrderId()

        //TODO - if orderId on valid then display something wrong
        if (!isValidOrderId) {
            if (foundOrderDivRef && notFoundOrderDivRef) {
                foundOrderDivRef.current.style.display = "none"
                notFoundOrderDivRef.current.style.display = "block"
            }
        }
        // eslint-disable-next-line
    }, [])
    return (
        <>
            <div className='order-details-page' ref={foundOrderDivRef} >
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
                                {/*NOTE - display order time */}
                                <p><CircleIcon style={{ color: "orange", fontSize: "1rem" }} /><span>Order confirmed on </span><span>{order.orderTime}</span></p>

                                {/*NOTE - Display delivery time and rating button */}
                                {order.orderDeliverTime && <div className='feedback-div'>
                                    <p><CircleIcon style={{ color: "green", fontSize: "1rem" }} /><span>Order delivered on </span><span>{order.orderDeliverTime}</span></p>
                                    {buyerAuthToken && order.Rating < 0 && <button onClick={() => setIsFeedbackModelDisplay(true)}><MdStarRate />Rating & Feedback</button>}
                                    { order.Rating >= 0 &&<label ><strong>Feedback : </strong><span>{order.Feedback}</span><br/> <Rating name="half-rating-read" defaultValue={order.Rating} precision={0.5} readOnly /></label>}
                                </div>}

                                {/*NOTE - Display Cancel time and reason */}
                                {order.orderCancelTime && <div className='order-cancel-detail'>
                                    <p><CircleIcon style={{ color: "red", fontSize: "1rem" }} /><span>Order cancel on </span><span>{order.orderCancelTime}</span></p>
                                    {((buyerAuthToken && order.Order_Cancel_By === "Seller") || (sellerAuthToken && order.Order_Cancel_By === "Buyer")) && <p><span>Reason :</span><span className='order-cancel-reason'>{order.Order_Cancel_Reason}</span></p>}
                                </div>}

                                {/*NOTE - Display cancel and delivered status chang  button */}
                                {!order.orderDeliverTime && !order.Order_Cancel_Reason && <button className='cancel-btn' style={{ color: "blue" }} onClick={() => setIsCancelOrder(true)} >Cancel order</button>}
                                {sellerAuthToken && !order.orderDeliverTime && !order.Order_Cancel_Reason && <button style={{ color: "green" }} onClick={handelDeliver}>Delivered Order</button>}

                            </div>
                        </section>
                    </div> : <div className='loading-container'>
                        <img className='loading-spin' src={loadingSpin} alt="loading..." />
                    </div>

                }
                {/*NOTE - For display Model */}
                {isCancelOrder && cancelOrderTemple}
                {isFeedbackModelDisplay && feedbackTemplate}
            </div>
            <div ref={notFoundOrderDivRef} style={{ display: "none" }}>
                <Error navigateTo={"Go to My orders"} navigatePath={"/order"} />

            </div>
        </>
    )
}

export default OrderDetails
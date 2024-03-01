import React from 'react'
import CircleIcon from '@mui/icons-material/Circle';
import { useNavigate } from 'react-router-dom';
function OrderItem({ order }) {
    const { item, orderCancelTime, orderDeliverTime, orderTime, _id } = order;
    const { name, description, photo, photoType, price } = item;
    const navigate=useNavigate();
    const handelOrderDetailsDisplay = () => {
        navigate(`/order_details?order_id=${_id}`)
    }
    return (
        <div className='order-item-template' onClick={handelOrderDetailsDisplay}>
            <div>
                <img src={`data:${photoType};base64,${photo}`} alt='' />
                <p>
                    <b>{name}</b>
                    <span>{description}</span>
                </p>
            </div>
            <div >
                <p>&#8377;<span>{price}</span></p>
                {orderCancelTime && <p><CircleIcon style={{ color: "red", fontSize: "1rem" }} /> Canceled on  <span>{orderCancelTime}</span></p>}
                {orderDeliverTime && <p><CircleIcon style={{ color: "green", fontSize: "1rem" }} /> Delivered on  <span>{orderDeliverTime}</span></p>}
                {!orderCancelTime && !orderDeliverTime && <p><CircleIcon style={{ color: "orange", fontSize: "1rem" }} /> Order on <span>{orderTime}</span></p>}

            </div>
        </div>
    )
}

export default OrderItem
import React, { useEffect } from 'react'
import '../css/BuyerOrder.css'
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrderBuyerDetails } from '../services/Buyer';
import loadingSpin from '../photo/loading-spinner.gif'
import BuyerOrderItem from './BuyerOrderItem';
import emptyOrderImg from '../photo/empty-order.webp'
import { useNavigate } from 'react-router-dom';
function BuyerOrder() {
  const dispatch = useDispatch()
  const navigate=useNavigate()
  const authToken = localStorage.getItem("buyerAuthToken");
  const loginAccountDetails = useSelector(state => state.Login.loginAccountDetails);
  const orders = useSelector(state => state.Buyer.orders);
  const numberOfOrders = useSelector(state => state.Buyer.numberOfOrders);

  useEffect(() => {
    dispatch(fetchOrderBuyerDetails(authToken))
  }, [loginAccountDetails, authToken, dispatch])
  return (
    <div>{
      orders ? <div className='order-container'>
        {numberOfOrders > 0 ?
          <>
            {
              orders.map((order, index) => {
                return <BuyerOrderItem key={index} order={order} />
              })
            }
          </> :
          <div className='empty-order'>
            <img src={emptyOrderImg} alt="empty" />
            <button onClick={()=>navigate('/')}>Order item</button>
          </div>
        }
      </div> : <div className='loading-container'>
        <img className='loading-spin' src={loadingSpin} alt="loading..." />
      </div>

    }</div>
  )
}

export default BuyerOrder
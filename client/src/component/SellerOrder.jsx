import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchAllOrder } from '../services/Seller';
import loadingSpin from '../photo/loading-spinner.gif'
import OrderItem from './OrderItem';
function SellerOrder() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const authToken = localStorage.getItem("sellerAuthToken");
  // const loginAccountDetails = useSelector(state => state.Login.loginAccountDetails);
  const orders = useSelector(state => state.Seller.orders);
  const numberOfOrders = useSelector(state => state.Seller.numberOfOrders);


  useEffect(()=>{
    dispatch(fetchAllOrder(authToken));
  },[dispatch,authToken])
useEffect(()=>{
},[orders])
  return (
    <div className='seller-order-div'>
      <section>
        <button>Pending Order</button>
        <button>Cancel Order</button>
        <button>Delivered Order</button>
      </section>
      {
         <section>{
          orders ? <div className='order-container'>
            {numberOfOrders > 0 ?
              <>
                {
                  orders.map((order, index) => {
                    return <OrderItem key={index} order={order} />
                  })
                }
              </> :
              <div className='empty-order'>
                {/* <img src={emptyOrderImg} alt="empty" /> */}
                <button onClick={() => navigate('/')}>Order item</button>
              </div>
            }
          </div> : <div className='loading-container'>
            <img className='loading-spin' src={loadingSpin} alt="loading..." />
          </div>
    
        }</section>

      }
    </div>
  )
}

export default SellerOrder
import React, { useEffect, useState } from 'react'
import '../css/Order.css'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchAllOrder } from '../services/Seller';
import { fetchAllBuyerOrders } from '../services/Buyer';
import emptyOrderImg from '../photo/empty-order.webp'
import loadingSpin from '../photo/loading-spinner.gif'
import OrderItem from '../component/OrderItem';
function Order() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const sellerAuthToken = localStorage.getItem("sellerAuthToken");
  const buyerAuthToken = localStorage.getItem("buyerAuthToken");
  const loginAccountDetails = useSelector(state => state.Login.loginAccountDetails);
  const [loginAccount, setLoginAccount] = useState(null);
  const orders = useSelector(state => state.Seller.orders || state.Buyer.orders);
  const numberOfOrders = useSelector(state => state.Seller.numberOfOrders||state.Buyer.numberOfOrders);
 const [orderStatus,setOrderStatus]=useState("")

  useEffect(() => {  
   sellerAuthToken && dispatch(fetchAllOrder(sellerAuthToken,orderStatus));
   buyerAuthToken && dispatch(fetchAllBuyerOrders(buyerAuthToken,orderStatus))
  }, [dispatch,sellerAuthToken,buyerAuthToken,orderStatus])

 useEffect(() => {
  setOrderStatus("")
  }, [])

  useEffect(() => {
    setLoginAccount(loginAccountDetails)
  }, [loginAccountDetails])
  return (
    <div className='order-page'>{
      loginAccount ?
        <>

          <div className='seller-order-div'>
            <section>
              <button onClick={()=>setOrderStatus("")}>All Order</button>
              <button onClick={()=>setOrderStatus("pending")}>Pending Order</button>
              <button onClick={()=>setOrderStatus("canceled")}>Cancel Order</button>
              <button onClick={()=>setOrderStatus("delivered")}>Delivered Order</button>
            </section>
            {
              <section>{
               orders ? 
                <div className='order-container'>
                  {numberOfOrders > 0 ?
                    <>
                      {
                        orders.map((order, index) => {
                          return <OrderItem key={index} order={order} />
                        })
                      }
                    </> :
                    <div className='empty-order'>
                      <img src={emptyOrderImg} alt="empty" />
                      {buyerAuthToken &&<button onClick={() => navigate('/')}>Order item</button>}
                    </div>
                  }
                </div> : <div className='loading-container'>
                  <img className='loading-spin' src={loadingSpin} alt="loading..." />
                </div>

              }</section>

            }
          </div>
        </>
        :
        <div className='loading-container'>
          <img className='loading-spin' src={loadingSpin} alt="loading..." />
        </div>
    }
    </div>
  )
}

export default Order
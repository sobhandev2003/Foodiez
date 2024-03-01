import React, { useEffect, useState } from 'react'
import '../css/Cart.css';
import cartImg from '../photo/cartimag.webp';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CartProducts from '../component/CartProducts';
import { getCartItem } from '../services/Buyer';
import loadingSpin from '../photo/loading-spinner.gif'
function Cart() {
  window.scrollTo(0, 0);
  const navigate = useNavigate();
  const cartProductsDetail = useSelector(state => state.cart.ToCarts);
  const [cartProducts, setCartProducts] = useState(null);
  let totalPrice = 0;
  cartProducts && cartProducts.forEach(product => {
    totalPrice += Number(product.price);
  });

  const authToken = localStorage.getItem("buyerAuthToken");


  const fetchCartItem = async () => {
    if (authToken && cartProductsDetail) {
      const data = await getCartItem(authToken);
      setCartProducts(data);
    }
  }
  const handelPlaceOrder = () => {
    navigate("/place-order")
  }

  useEffect(() => {
    fetchCartItem();
    // eslint-disable-next-line
  }, [cartProductsDetail])

  return (
    <div className='crat-page'>
      <div className='I'>
        <h1>Your Cart</h1>
      </div>
      <div className='II'>
        {cartProducts ?
          <>{cartProducts.length > 0 ?
            <div className='add-cart'>
              <div className='cart-products'>
                {cartProducts.map((product, index) => {
                  return <CartProducts key={product._id + index} product={product} />
                }
                )}
              </div>
              <div className='cart-products-bill'>
                <h3>RECEIPT</h3>
                <p><span>No of items</span><span> {cartProducts.length}</span></p>
                <p><span>Total</span><span> &#8377;{totalPrice}</span></p>
                <p><span>Shipping</span><span> &#8377;0.00</span></p>
                <button   onClick={handelPlaceOrder}>Place Order</button>
              </div>
            </div> :
            <div className='epmty-cart'>
              <img src={cartImg} alt=''></img>
              <h2 className='txt-margin-bottom'>Your cart is Currently Empty.</h2>
              <p className='txt-margin-bottom'>Click below to Add items.</p>
              <button className='txt-margin-bottom' onClick={() => { navigate('/') }}>Add items</button>


            </div>
          }</> :
          <div className='loading-container'>
            <img className='loading-spin' src={loadingSpin} alt="loading..." />
          </div>
        }
      </div>




    </div>
  )
}

export default Cart
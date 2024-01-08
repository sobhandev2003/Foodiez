import React from 'react'
import '../css/Cart.css';
import cartImg from '../photo/cartimag.jpg';
import { useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import CartProducts from './CartProducts';

function Cart() {
  const navigate=useNavigate();
    const cartProducts=useSelector(state=>state.cart.ToCarts);
    let totalPrice=0;
    cartProducts && cartProducts.forEach(product => {
      totalPrice+=Number(product.price);
    });
    // console.log(cartProducts);
  return (
    <div className='crat-page'>
<div className='I'>
  <h1>Your Cart</h1>
</div>
<div className='II'>
{cartProducts.length>0 ?<div className='add-cart'>
  <div className='cart-products'>
  {cartProducts.map((product)=>
  
  { return <CartProducts product={product}/>}

) }
</div>
<div className='cart-products-bill'>
  <h3>RECEIPT</h3>
  <p><span>No of items</span><span> {cartProducts.length}</span></p>
  <p><span>Total</span><span> &#8377;{totalPrice}</span></p>
  <p><span>Shipping</span><span> &#8377;0.00</span></p>
  <p>Select payment Mode</p>
  <div className='payment-mode-div'>
  <label>
  <input type='radio' name='payment-mode'/>
  <span className='payment-mode'>UPI</span>
  </label>
  <label>
  <input type='radio' name='payment-mode'/>
  <span className='payment-mode'>Credit Card</span>
  </label>
  <label>
  <input type='radio' name='payment-mode'/>
  <span className='payment-mode'>Cash on delivery</span>
  </label>
  </div>
  <button>Place Order</button>
</div>
</div>  :
<div className='epmty-cart'>
  <img src={cartImg} alt=''></img>
  <h2 className='txt-margin-bottom'>Your cart is Currently Empty.</h2>
  <p className='txt-margin-bottom'>Click below to Add items.</p>
  <button className='txt-margin-bottom' onClick={()=>{navigate('/')}}>Add items</button>
  
 
  </div>}
</div>




    </div>
  )
}

export default Cart
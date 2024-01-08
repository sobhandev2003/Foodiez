import React, { useRef } from 'react'
import '../css/Shope.css';
import food1 from '../photo/abouPhoto3.png';
import {useDispatch} from 'react-redux';
import { addToCarts } from '../fetures/CartsSlaice';
// import {  toast } from 'react-toastify';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Alert from './Alert';
function MenuItem() {
  // const notify = () => toast("Wow so easy!");
  const productNameRef=useRef();
  const priceRef=useRef();
  const dispatch=useDispatch();
const addTocart=()=>{
const name=productNameRef.current.innerText;
const price=priceRef.current.innerText;

dispatch(addToCarts({name,price}));
// toast(<div>  Add to cart <ShoppingCartOutlinedIcon/> </div>);
Alert('success' ,<div>Add to cart  <ShoppingCartOutlinedIcon/> </div>)
}
  return (
    <div className='menu-item'>
            <div>

            <h2 ref={productNameRef}>Lorem ipsum dolor sit amet.</h2>
            <h3 ref={priceRef}>100</h3>
            <p>description</p>
            </div>
            <div className='right-div'>
            <img src={food1} alt='loded'/>
               <button onClick={addTocart}>ADD+</button>
               {/* <ToastContainer /> */}
            </div>
    </div>
  )
}

export default MenuItem
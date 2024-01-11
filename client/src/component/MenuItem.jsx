import React, { useRef } from 'react'
import '../css/Shope.css';

import {useDispatch} from 'react-redux';
import { addToCarts } from '../fetures/CartsSlaice';

import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Alert from './Alert';
function MenuItem(props) {
const {name,des,img,price}=props.item;
  const productNameRef=useRef();
  const priceRef=useRef();
  const desRef=useRef();
const imgRef=useRef();

  const dispatch=useDispatch();
const addTocart=()=>{
const name=productNameRef.current.innerText;
const price=priceRef.current.innerText;
const des=desRef.current.innerText;
const photo=imgRef.current.src;
// console.log(photo);

dispatch(addToCarts({name,des,price,photo}));
// toast(<div>  Add to cart <ShoppingCartOutlinedIcon/> </div>);
Alert('success' ,<div>Add to cart  <ShoppingCartOutlinedIcon/> </div>)
}
  return (
    <div className='menu-item'>
            <div>

            <h2 ref={productNameRef}>{name}</h2>
            <h3 ref={priceRef}><strong>&#8377; </strong>{price}</h3>
            <p ref={desRef}>{des}</p>
            </div>
            <div className='right-div'>
            <img src={img} alt='loded' ref={imgRef}/>
               <button onClick={addTocart}>ADD+</button>
               {/* <ToastContainer /> */}
            </div>
    </div>
  )
}

export default MenuItem
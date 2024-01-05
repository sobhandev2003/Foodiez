import React, { useRef } from 'react'
import '../css/Shope.css';
import food1 from '../photo/abouPhoto3.png';
import {useDispatch} from 'react-redux';
import { addToCarts } from '../fetures/CartsSlaice';

function MenuItem() {
  const productNameRef=useRef();
  const priceRef=useRef();
  const dispatch=useDispatch();
const addTocart=()=>{
const name=productNameRef.current.innerText;


const price=priceRef.current.innerText;


dispatch(addToCarts({name,price}));

}
  return (
    <div className='menu-item'>
            <div>

            <h2 ref={productNameRef}>Name</h2>
            <h3 ref={priceRef}>Price</h3>
            <p>description</p>
            </div>
            <div className='right-div'>
            <img src={food1} alt='loded'/>
               <button onClick={addTocart}>ADD+</button>
            </div>
    </div>
  )
}

export default MenuItem
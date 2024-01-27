import React ,{useState,useEffect} from 'react';
import '../css/Home.css';
import BuyerHomePage from '../component/BuyerHomePage';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentSeller } from '../reducersControlers/currentSellerReducers';
import SellerHomePage from '../component/SellerHomePage';

function Home() {
  window.scrollTo(0,0);
  const authToken = localStorage.getItem("authToken");

  const dispatch = useDispatch()
  const currentSellerDetails = useSelector(state => state.Seller.currentSellerDetails)
  const [currentSeller, setCurrentSeller] = useState();
  useEffect(() => {
    setCurrentSeller(currentSellerDetails)
    // console.log(currentSellerDetails)
}, [currentSellerDetails])
useEffect(() => {
    if (authToken) {
        dispatch(fetchCurrentSeller(authToken));
    }
}, [authToken, dispatch])
  return (
    <div className='home'>
      {
         currentSeller && currentSeller.user_role==="seller"?
         <SellerHomePage/>
         : 
         <BuyerHomePage/>
      }
   
    </div>
  )
}

export default Home
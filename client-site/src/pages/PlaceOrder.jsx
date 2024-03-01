import React, { useEffect, useState } from 'react'
import '../css/PlaceOrder.css'
import { useDispatch, useSelector } from 'react-redux';
import { fetchBuyerSavedAddress, savePlaceOrderInDB, savedNewAddress } from '../services/Buyer';
import { BiCurrentLocation } from "react-icons/bi";
import { GrPowerReset } from "react-icons/gr";
import PaymentForm from '../component/PaymentForm';
import { useNavigate } from 'react-router-dom';
function PlaceOrder() {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const authToken = localStorage.getItem("buyerAuthToken");
  const cartProductsDetail = useSelector(state => state.cart.ToCarts);
  const addresses = useSelector(state => state.Buyer.addresses);
  const [cartProducts, setCartProducts] = useState(null);
  const [buyerDetails, setBuyerDetails] = useState({
    name: "",
    Contact_Number: ""
  })
  const [buyerAddress, setBuyerAddress] = useState(null);

  const [deliveryAddress, setDeliveryAddress] = useState(null);
  const [isAddNewAddress, setIsAddNewAddress] = useState(false)
  const [newAddress, setNewAddress] = useState({
    country: "",
    state: "",
    district: "",
    city: "",
    postCode: "",
    street: "",
    additionalInfo: ""
  })
  const [currentAddress, setCurrentAddress] = useState(null);
  const [isDeleverAddressSelected, setIsDeleverAddressSelected] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null)
  const [isOnlinePayment, setIsOnlinePayment] = useState(false);
  const [isPaymentDone, setIsPaymentDone] = useState(false)
  const handePlaceOrder = () => {

    const orderDetails={
      DeliveryAddress_id:deliveryAddress,
      Contact_Number:buyerDetails.Contact_Number,
      Buyer_Name:buyerDetails.name,
      OrderItems:cartProducts,
      Payment_methods:paymentMethod,
      Payment_Done:isPaymentDone,
    }

    dispatch(savePlaceOrderInDB(authToken,orderDetails,navigate))


  }

  const handelBuyerDetails = (e) => {
    const { name, value, type } = e.target;
    const inputValue = type === "text" ? value.charAt(0).toUpperCase() + value.slice(1) : value;
    setBuyerDetails((prevData) => ({
      ...prevData,
      [name]: inputValue
    }))
  }
  const handelSelectDeliverAddress = (e) => {
    setDeliveryAddress(e.target.value);
  }
  const handelNewAddressCreateFromSubmit = async (e) => {
    e.preventDefault()
    dispatch(savedNewAddress(authToken, newAddress))
    setIsAddNewAddress(false)
  }
  const handelNewAdressInputChange = (e) => {
    const { name, value, type } = e.target;
    const inputValue = type === "text" ? value.charAt(0).toUpperCase() + value.slice(1) : value;
    setNewAddress((prevData) => ({
      ...prevData,
      [name]: inputValue
    }))
  }
  const handelNewAddressInputReset = () => {
    setNewAddress({
      street: "",
      city: "",
      state: "",
      district: "",
      postCode: "",
      country: ""
    })
  }

  const handelPaymentMethod = (e) => {
    setPaymentMethod(e.target.value)
    if (e.target.value !== "Cash on Delivery") {
      setIsOnlinePayment(true)
    }
    else {
      setIsOnlinePayment(false)
    }
  }

  const getCurrentAddress = async () => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      const getCurrentAddressUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
      const response = await fetch(getCurrentAddressUrl)
      const data = await response.json()
      const { country, state, state_district, postcode, village, road } = data.address
      setCurrentAddress({ country, state, district: state_district, postCode: postcode, city: village, street: road })

    })
  }

  useEffect(() => {
    if (currentAddress) {
      for (const key in currentAddress) {
        if (Object.hasOwnProperty.call(currentAddress, key)) {
          const value = currentAddress[key];
          setNewAddress((prevData) => ({
            ...prevData,
            [key]: value || " "
          }))
        }
      }
    }
  }, [currentAddress])


  useEffect(() => {
    dispatch(fetchBuyerSavedAddress(authToken))
  }, [authToken, dispatch])

  useEffect(() => {
    addresses && setBuyerAddress(addresses)
  }, [addresses])

  useEffect(() => {
    setCartProducts(cartProductsDetail);
  }, [cartProductsDetail])

  return (
    <div className='place-order'>
      <div className='place-order-address-div' style={{ display: !isDeleverAddressSelected ? "block" : "none" }}>
        <div>
          <label htmlFor='buyer-name'><span>Name :</span>
          <input type="text" id='buyer-name' name="name" minLength="2" maxLength="30" placeholder='name' onChange={handelBuyerDetails} value={buyerDetails.name} required/>
          </label>
          <label htmlFor='cont-number'><span>Contact Number :</span>
          <input type="number" id='cont-number' name="Contact_Number" maxLength="10" minLength="10" pattern="[0-9]{10}" title="Ten digits code" placeholder="Mobile number" onChange={handelBuyerDetails} value={buyerDetails.Contact_Number} required/>
          </label>
        </div>
        <div className='address-list-container'>
          <b>Select delivery address </b>
          {
            buyerAddress && buyerAddress.length > 0 ? <>{buyerAddress.map((address, index) => {
              return <label key={address._id} >
                <input type="radio" value={address._id} name="deliveryAddress" onChange={handelSelectDeliverAddress} />
                <p>
                  {address.additionalInfo && <span>{address.additionalInfo}</span>}
                  <span>{address.street},{address.city}</span>
                  <span>{address.postCode}</span>
                  <span>{address.state},{address.country}</span>
                </p>
              </label>
            })}
            </> : <>
              <b style={{ marginBottom: "10px" }}> Delivery address  not previously saved.</b>
            </>
          }
        </div>
        <div style={{ display: isAddNewAddress ? "block" : "none" }}>
          <h3>Fill new address details</h3>
          <form className='new-address-details-from' onSubmit={handelNewAddressCreateFromSubmit} >
            <label className="custom-field one">
              <input type="text" name='country' minLength="2" maxLength="10" placeholder="" onChange={handelNewAdressInputChange} value={newAddress.country
              } required />
              <span className="placeholder"> Country</span>
            </label>
            <label className="custom-field one">
              <input type="text" placeholder="" name='state' minLength="2" maxLength="10" onChange={handelNewAdressInputChange} value={newAddress.state} required />
              <span className="placeholder">State</span>
            </label>
            <label className="custom-field one">
              <input type="text" placeholder="" name='district' minLength="2" maxLength="10" onChange={handelNewAdressInputChange} value={newAddress.district} required />
              <span className="placeholder">District</span>
            </label>
            <label className="custom-field one">
              <input type="text" placeholder=" " name='city' minLength="2" maxLength="10" onChange={handelNewAdressInputChange} value={newAddress.city} required />
              <span className="placeholder">City</span>
            </label>
            <label className="custom-field one">
              <input type="number" placeholder=" " name='postCode' minLength="4" maxLength="10" onChange={handelNewAdressInputChange} value={newAddress.postCode} required />
              <span className="placeholder">Postal Code</span>
            </label>
            <label className="custom-field one">
              <input type="text" placeholder=" " name='street' minLength="2" maxLength="10" onChange={handelNewAdressInputChange} value={newAddress.street} required />
              <span className="placeholder">Street name</span>
            </label>
            <label className="custom-field one">
              <input type="text" placeholder=" " name='additionalInfo' minLength="2" maxLength="20" onChange={handelNewAdressInputChange} value={newAddress.additionalInfo} />
              <span className="placeholder">Additional Info</span>
            </label>

            <div className='from-handel-btn'>
              <button type="submit" >Add</button>
              <button type="reset" onClick={handelNewAddressInputReset}><GrPowerReset /><span>Reset form</span></button>
              <button type='button' onClick={() => { getCurrentAddress(); }}><BiCurrentLocation /><span>Use current location</span></button>
            </div>
          </form>
        </div>
        <div className='btn-div'>
          <button className={`${isAddNewAddress ? "cancel-btn" : "add-address-btn"}`} onClick={() => setIsAddNewAddress(!isAddNewAddress)}>{isAddNewAddress ? "Cancel" : " New address"}</button>
          {(buyerDetails.name.length > 3 && buyerDetails.Contact_Number.length === 10 && deliveryAddress) && <button className='continue-btn' onClick={() => setIsDeleverAddressSelected(true)}>Continue</button>}
        </div>
      </div>

      <div className='payment-div' style={{ display: isDeleverAddressSelected ? "block" : "none" }}>
        <h2>Select payment method</h2>
        <div >
        <div className='payment-method-div'>
          <label className="particles-checkbox-container">
            <input type="radio" className="particles-checkbox" name='payment-method' value="UPI" onClick={handelPaymentMethod} />
            <span>UPI</span>
          </label>

          <label className="particles-checkbox-container">
            <input type="radio" className="particles-checkbox" name='payment-method' value="Credit Card" onClick={handelPaymentMethod} />
            <span>Credit Card</span>
          </label>

          <label className="particles-checkbox-container">
            <input type="radio" className="particles-checkbox" name='payment-method' value="Debit Card" onClick={handelPaymentMethod} />
            <span>Debit Card</span>
          </label>
          <label className="particles-checkbox-container">
            <input type="radio" className="particles-checkbox" name='payment-method' value="Cash on Delivery" onClick={handelPaymentMethod} />
            <span>Cash on Delivery</span>
          </label>
        </div>
        <div className='online-payment-details' style={{ display: isOnlinePayment ? "block" : "none" }}>
           <PaymentForm isPaymentDone={isPaymentDone} setIsPaymentDone={setIsPaymentDone} paymentMethod={paymentMethod} />
        </div>
        </div>

        <div className='btn-div'>
          <button onClick={() => setIsDeleverAddressSelected(false)}>Back</button>
          {(isPaymentDone || paymentMethod === "Cash on Delivery") && <button onClick={handePlaceOrder}>Order</button>}
        </div>
      </div>

    </div>
  )
}
export default PlaceOrder
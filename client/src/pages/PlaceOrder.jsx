import React, { useEffect, useState } from 'react'
import '../css/PlaceOrder.css'
import { useDispatch, useSelector } from 'react-redux';
import { fetchBuyerSavedAddress, savedNewAddress } from '../services/Buyer';
import { BiCurrentLocation } from "react-icons/bi";
import { GrPowerReset } from "react-icons/gr";
function PlaceOrder() {
  const dispatch = useDispatch();
  const authToken = localStorage.getItem("buyerAuthToken");
  const cartProductsDetail = useSelector(state => state.cart.ToCarts);
  const addresses = useSelector(state => state.Buyer.addresses);
  const [cartProducts, setCartProducts] = useState(null);
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
const [isDeleverAddressSelected,setIsDeleverAddressSelected]=useState(false)
  const handelSelectDeliverAddress = (e) => {
    console.log(e.target.value);
    setDeliveryAddress(e.target.value);

  }
  const handelNewAddressCreateFromSubmit = async (e) => {
    e.preventDefault()
    dispatch(savedNewAddress(authToken, newAddress))
    setIsAddNewAddress(false)
  }
  const handelNewAdressInputChange = (e) => {
    const { name, value,type } = e.target;
    const inputValue = type === "text" ? value.charAt(0).toUpperCase() + value.slice(1) : value;
    // console.log(name,value);
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

  const getCurrentAddress = async () => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      console.log(latitude, longitude)
      const getCurrentAddressUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
      const response = await fetch(getCurrentAddressUrl)
      const data = await response.json()
      const { country, state, state_district, postcode, village, road } = data.address
      setCurrentAddress({ country, state, district: state_district, postCode: postcode, city: village, street: road })

    })


  }

  useEffect(() => {
    console.log(currentAddress);
    if (currentAddress) {
      console.log(currentAddress);
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
    <>
      <div className='place-order-address-div' style={{display: !isDeleverAddressSelected ? "block" : "none"}}>
        <div className='address-list-container'>
          {
            buyerAddress && buyerAddress.length>0 ? <>{buyerAddress.map((address, index) => {
              // console.log(index,address);
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
            </>:<>
            <b style={{marginBottom:"10px"}}> Delivery address  not previously saved.</b>
            </>
          }
        </div>
        <div style={{ display: isAddNewAddress ? "block" : "none" }}>
          <h3>Fill new address details</h3>
          <form className='new-address-details-from' onSubmit={handelNewAddressCreateFromSubmit} >
            <label className="custom-field one">
              <input type="text" name='country' placeholder="" onChange={handelNewAdressInputChange} value={newAddress.country
              } required />
              <span className="placeholder"> Country</span>
            </label>
            <label className="custom-field one">
              <input type="text" placeholder="" name='state' onChange={handelNewAdressInputChange} value={newAddress.state} required />
              <span className="placeholder">State</span>
            </label>
            <label className="custom-field one">
              <input type="text" placeholder="" name='district' onChange={handelNewAdressInputChange} value={newAddress.district} required />
              <span className="placeholder">District</span>
            </label>
            <label className="custom-field one">
              <input type="text" placeholder=" " name='city' onChange={handelNewAdressInputChange} value={newAddress.city} required />
              <span className="placeholder">City</span>
            </label>
            <label className="custom-field one">
              <input type="number" placeholder=" " name='postCode' onChange={handelNewAdressInputChange} value={newAddress.postCode} required />
              <span className="placeholder">Postal Code</span>
            </label>
            <label className="custom-field one">
              <input type="text" placeholder=" " name='street' onChange={handelNewAdressInputChange} value={newAddress.street} required />
              <span className="placeholder">Street name</span>
            </label>
            <label className="custom-field one">
              <input type="text" placeholder=" " name='additionalInfo' onChange={handelNewAdressInputChange} value={newAddress.additionalInfo} />
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
          {deliveryAddress && <button className='continue-btn' onClick={()=>setIsDeleverAddressSelected(true)}>Continue</button>}
        </div>    
      </div>
      <div style={{display: isDeleverAddressSelected ? "block" : "none"}}>
        <h2>Make payment</h2>

        <button onClick={()=>setIsDeleverAddressSelected(false)}>Back</button>
      </div>
    </>
  )
}
export default PlaceOrder
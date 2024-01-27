import React, { useEffect, useState } from 'react'
import '../css/Login.css'
import Alert from '../component/Alert';
import { validateEmail, validatePassword } from '../component/inputValidator';
import { useDispatch } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import { loginSeller } from '../reducersControlers/loginSeller';
import { fetchCurrentSeller } from '../reducersControlers/currentSellerReducers';
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const authorizeSeller = useSelector(state => state.Seller.authorizeSeller)
  const [formData, setFormData] = useState({
    user_role: "buyer",
    email: "",
    password: "",
  });
  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    // For file input, use the files property
    const inputValue = type === "file" ? files[0] : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: inputValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { user_role, email, password } = formData;
    if (!validateEmail(email) || !validatePassword(password)) {
      Alert("error", <div>inputs are not valid</div>)
    }
    else {
      if (user_role.toLowerCase() === "seller") {
        const sellerData = {
          email: email,
          password: password
        }
        const authData = await loginSeller(sellerData);
        if (authData) {
          localStorage.setItem("authToken", authData);
          dispatch(fetchCurrentSeller(authData));
          navigate('/')
        }
      }
    }
  };
  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      navigate('/')
    }
  }, [navigate])
  return (
    <div className='login-page'>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            <input type="radio" name="user_role" value="buyer" onChange={handleInputChange} defaultChecked />
            <span>Buyer</span>
          </label>
          <label>
            <input type="radio" name="user_role" value="seller" onChange={handleInputChange} />
            <span>Seller</span>
          </label>
        </div>
        <div>
          <input type="email" name="email" placeholder="Email" onChange={handleInputChange} required />
          <input type="password" name="password" placeholder="Password" onChange={handleInputChange} required />
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  )
}

export default Login
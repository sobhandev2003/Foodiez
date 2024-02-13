import React, { useEffect, useState } from 'react'
import '../css/Login.css'
import Alert from './Alert';
import { validateEmail, validatePassword } from './inputValidator';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginSeller, fetchCurrentSeller, forgotPassword } from '../services/Seller';
import { fetchLoginBuyerDetails, forgetBuyerAccountPassword, loginBuyerAccount } from '../services/Buyer';
import { setIsLogin } from '../fetures/loginFrtures';
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isForgotPassword, setIsForgotPassword] = useState(false);
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
        if (isForgotPassword) {
          forgotPassword(sellerData, setIsForgotPassword)
        }
        else {
          const authData = await loginSeller(sellerData);
          if (authData) {
            localStorage.setItem("sellerAuthToken", authData);
            dispatch(fetchCurrentSeller(authData));
            dispatch(setIsLogin(false))
            navigate('/')
          }
        }
      }
      else {
        if (isForgotPassword) {
         forgetBuyerAccountPassword(email,password,setIsForgotPassword)
        }
        else{

          const authData=await loginBuyerAccount({email,password})
          if(authData){
            localStorage.setItem("buyerAuthToken", authData);
            dispatch(fetchLoginBuyerDetails(authData));
           dispatch(setIsLogin(false))
            navigate('/')
          }
        }

      }
    }
  };
  useEffect(() => {
    const authToken = localStorage.getItem("sellerAuthToken")||localStorage.getItem("buyerAuthToken");
    if (authToken) {
      navigate('/')
    }
  }, [navigate])
  return (
    <>
      {!isForgotPassword && <h2 className='login-h2'>Login Account</h2>}
      {isForgotPassword && <h2 className='reset-password-h2'>Reset Account Password</h2>}
      <form className='model-element login-form' onSubmit={handleSubmit}>
        <div className="wrapper">
          <input type="radio" name="user_role" value="buyer" id="option-1" onChange={handleInputChange} defaultChecked />
          <input type="radio" name="user_role" value="seller" id="option-2" onChange={handleInputChange} />
          <label htmlFor="option-1" className="option option-1">
            <div className="dot"></div>
            <span>Buyer</span>
          </label>
          <label htmlFor="option-2" className="option option-2">
            <div className="dot"></div>
            <span>Seller</span>
          </label>
        </div>
        <div >
          <input type="email" name="email" placeholder="Email" onChange={handleInputChange} required />
          <input type="password" name="password" placeholder={isForgotPassword ? "Enter new Password" : "Password"} onChange={handleInputChange} required />
          <button type="submit">Submit</button>
        </div>
        <Link to="/" className='forgot-password-link'
          onClick={() => {
            setIsForgotPassword(true);
          }}
        >Forgot Password</Link>
        <p>Need an account?
          <Link to="/register" onClick={() => dispatch(setIsLogin(false))}> Sign up </Link>now!
        </p>
      </form>
    </>
  )
}

export default Login
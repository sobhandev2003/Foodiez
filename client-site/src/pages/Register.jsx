import React, { useEffect, useState } from 'react'
import '../css/Register.css'
import { validateEmail, validatePassword, validatePhoneNumber, validateWords } from '../component/inputValidator';
import Alert from '../component/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { registerSeller } from '../services/Seller';
import { useNavigate } from 'react-router-dom';
import { createSller } from '../fetures/seller';
import registerPageGif from '../photo/register-page-gif.gif'
import { registerBuyerAccount } from '../services/Buyer';
import { setIsLogin } from '../fetures/loginFrtures';
function Register() {
    window.onload = ()=> {
        window.scrollTo(0, 50);
    };
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const createSllerAccout = useSelector(state => state.Seller.createSllerAccout);
    const [formData, setFormData] = useState({
        user_role: "buyer",
        restaurantName: "",
        ownerName: "",
        name: "",//NOTE - for buyer account
        address: "",
        email: "",
        mobile: "",
        photo: null,
        password: "",
    });


    const handleInputChange = (e) => {
        e.preventDefault();
        const { name, value, type, files } = e.target;

        const inputValue = type === "file" ? files[0] : (type === "text" ? value.charAt(0).toUpperCase() + value.slice(1) : value);
        setFormData((prevData) => ({
            ...prevData,
            [name]: inputValue,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { user_role,
            restaurantName,
            ownerName,
            name,//NOTE - for buyer account
            address,
            email,
            mobile,
            photo,
            password } = formData;
        const maxSize = 2 * 1024 * 1024; // 2 MB
        if (!validateEmail(email) || !validatePhoneNumber(mobile) || !validateWords(address) || !validatePassword(password)) {
            Alert("error", <div>inputs are not valid</div>)
        }
        else if (photo && photo.size > maxSize) {
            Alert("warning", <p>File size must be less then 2 MB</p>)
        }
        else {
            if (user_role.toLowerCase() === "seller") {
                dispatch(registerSeller({ restaurantName, ownerName, address, email, mobile, photo, password }));
            }
            else {
                registerBuyerAccount({ name, email, mobileNumber: mobile, password }, navigate)
            }

        }
    };
    useEffect(() => {
        if (createSllerAccout) {
            dispatch(setIsLogin(true))
            dispatch(createSller({ success: false }))
        }
    }, [createSllerAccout, dispatch, navigate])

    useEffect(()=>{
        window.scrollTo(0, 50)
    },[])
    return (
        <div className='register-page'>
            <div className='gif-div'>
                <img src={registerPageGif} alt='GIF' />
            </div>
            <div>
                <h3>Create a new Account</h3>
                <form className="account-register-form" onSubmit={handleSubmit}>
                    <div className="wrapper">
                        <input type="radio" name="user_role" value="buyer" id="option-1" onChange={handleInputChange} defaultChecked />
                        <input type="radio" name="user_role" value="seller" id="option-2" onChange={handleInputChange} />
                        <label htmlFor="option-1" className="option option-1" >
                            <div className="dot"></div>
                            <span>Buyer</span>
                        </label>
                        <label htmlFor="option-2" className="option option-2">
                            <div className="dot"></div>
                            <span>Seller</span>
                        </label>
                    </div>
                    {formData.user_role === "seller" ? <div>
                        <input type="text" name="restaurantName" minLength="2" maxLength="30" placeholder="Restaurant name" onChange={handleInputChange} value={formData.restaurantName} required />
                        <input type="text" name="ownerName" minLength="2" maxLength="30" placeholder="Owner name" onChange={handleInputChange} value={formData.ownerName} required />
                        <input type="text" name="address" placeholder="Address" minLength="2" maxLength="50" onChange={handleInputChange} value={formData.address} required />
                        <input type="email" name="email" placeholder="Email" onChange={handleInputChange} value={formData.email} className={!validateEmail(formData.email) ? 'invalid-input' : 'valid-input'} required />
                        <input type="tel" name="mobile" pattern="[0-9]{10}" title="Ten digits code" placeholder="Mobile" onChange={handleInputChange} value={formData.mobile} className={!validatePhoneNumber(formData.mobile) ? 'invalid-input' : 'valid-input'} required />
                        <input type="file" name="photo" accept="image/png, image/jpeg" onChange={handleInputChange} required />
                        <input type="password" name="password" placeholder="Password" onChange={handleInputChange} value={formData.password} className={!validatePassword(formData.password) ? 'invalid-input' : 'valid-input'} required />
                    </div> :
                        <div>
                            <input type="text" name="name" minLength="2" maxLength="30" placeholder="enter your name name" onChange={handleInputChange} value={formData.name} required />
                            <input type="email" name="email" placeholder="Email" onChange={handleInputChange} value={formData.email} className={!validateEmail(formData.email) ? 'invalid-input' : 'valid-input'} required />
                            <input type="tel" name="mobile" pattern="[0-9]{10}" title="Ten digits code" placeholder="Mobile" onChange={handleInputChange} value={formData.mobile} className={!validatePhoneNumber(formData.mobile) ? 'invalid-input' : 'valid-input'} required />
                            <input type="password" name="password" placeholder="Password" onChange={handleInputChange} value={formData.password} className={!validatePassword(formData.password) ? 'invalid-input' : 'valid-input'} required />

                        </div>}
                    <button >Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Register
import React, { useEffect, useState } from 'react'
import '../css/Register.css'
import { validateEmail, validatePassword, validatePhoneNumber } from '../component/inputValidator';
import Alert from '../component/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { registerSeller } from '../reducersControlers/registerSeller';
import { useNavigate } from 'react-router-dom';
import { createSller } from '../fetures/seller';
function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const createSllerAccout = useSelector(state => state.Seller.createSllerAccout)
    const [formData, setFormData] = useState({
        user_role: "buyer",
        restaurantName: "",
        ownerName: "",
        address: "",
        email: "",
        mobile: "",
        photo: null,
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

    const handleSubmit = (e) => {
        e.preventDefault();
        const { user_role,
            restaurantName,
            ownerName,
            address,
            email,
            mobile,
            photo,
            password, } = formData;
            console.log(photo);
            const maxSize = 2 * 1024 * 1024; // 2 MB
        if (!validateEmail(email) || !validatePhoneNumber(mobile) || !validatePassword(password)) {
            Alert("error", <div>inputs are not valid</div>)
        }
        else if (photo.size > maxSize) {
         Alert("warning",<p>File size must be les then 2 MB</p>)
        }
        else {
            if (user_role.toLowerCase() === "seller") {
                dispatch(registerSeller({ restaurantName, ownerName, address, email, mobile, photo, password }));
            }

        }
    };
    useEffect(() => {
        // console.log(createSllerAccout);
        if (createSllerAccout) {
            navigate('/login')
            dispatch(createSller({ success: false }))
        }
    }, [createSllerAccout,dispatch,navigate])
    return (
        <div className='register-page'>
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
                    <input type="text" name="restaurantName" placeholder="Restaurant name" onChange={handleInputChange} required />
                    <input type="text" name="ownerName" placeholder="Owner name" onChange={handleInputChange} required />
                    <input type="text" name="address" placeholder="Address" onChange={handleInputChange} required />
                    <input type="email" name="email" placeholder="Email" onChange={handleInputChange} required />
                    <input type="tel" name="mobile" pattern="[0-9]{10}" title="Ten digits code" placeholder="Mobile" onChange={handleInputChange} required />
                    <input type="file" name="photo" accept="image/png, image/jpeg" onChange={handleInputChange}  required />
                    <input type="password" name="password" placeholder="Password" onChange={handleInputChange} required />
                </div>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default Register
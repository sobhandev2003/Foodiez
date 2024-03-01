import React, { useState } from 'react';
import '../css/PaymentForm.css'
import paymentDoneIcon from '../photo/payment-done.webp';
import qrCode from '../photo/qr_code_barcode.webp'
const PaymentForm = ({ isPaymentDone, setIsPaymentDone, paymentMethod }) => {

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 15 }, (_, index) => currentYear + index);
    const yearOption = years.map((year, index) => (
        <option key={index} value={year}>{year}</option>
    ))
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const monthOptions = months.map((month, index) => (
        <option key={index} value={month}>{month}</option>
    ));

    // Then use monthOptions array in your JSX

    const [cardNumber, setCardNumber] = useState('');

    const handleCardNumberChange = (e) => {
        let input = e.target.value;
        input = input.replace(/\s/g, '');

        if (Number(input)) {
            input = input.match(/.{1,4}/g).join(' ');
            setCardNumber(input);
        }
    };

    const handelPayment = (e) => {
        e.preventDefault()
        setIsPaymentDone(true)

    }

    return (
        <div className="payment-from-div">
            {!isPaymentDone ?
                <>
                    {paymentMethod !== "UPI" ?
                        <form onSubmit={handelPayment}>

                            <div className="row">
                                {/* Payment Section */}
                                {/* Card Accepted Image */}
                                <div className="inputBox">
                                    <label htmlFor="cardName">Name On Card:</label>
                                    <input
                                        type="text"
                                        id="cardName"
                                        placeholder="Enter card name"
                                        required
                                    />
                                </div>

                                {/* Credit Card Number */}
                                <div className="inputBox">
                                    <label htmlFor="cardNum">Credit Card Number:</label>
                                    <input
                                        type="text"
                                        id="cardNum"
                                        placeholder="1111-2222-3333-4444"
                                        maxLength="19"
                                        value={cardNumber}
                                        onChange={handleCardNumberChange}
                                        required
                                    />
                                </div>

                                {/* Expiration Month */}
                                <div className="inputBox">
                                    <label htmlFor="">Exp Month:</label>
                                    <select name="" id="">
                                        <option value="">Choose month</option>

                                        {monthOptions}

                                    </select>
                                </div>



                                {/* Expiration Year */}
                                <div className="inputBox">
                                    <label htmlFor="">Exp Year:</label>
                                    <select name="" id="">
                                        <option value="">Choose Year</option>
                                        {yearOption}
                                    </select>
                                </div>

                                {/* CVV */}
                                <div className="inputBox">
                                    <label htmlFor="cvv">CVV :</label>
                                    <input type="number" pattern="\d{4}" maxLength="4" id="cvv" placeholder="1234" required />

                                </div>

                            </div>
                            {/* Submit Button */}
                            <button type="submit" className="submit_btn" >PAY</button>
                        </form> :
                        <div className='upi-payment-container'>

                            <img src={qrCode} alt="QR Code" />
                            <button type="submit" className="submit_btn" onClick={()=>setIsPaymentDone(true)} >PAY</button>
                        </div>}
                </> : <div className='after-payment-div'>
                    <img src={paymentDoneIcon} alt="Payment done" />
                    <h4>Payment completed</h4>
                    <h4>Successfully</h4>
                </div>}
        </div>
    );
};

export default PaymentForm;

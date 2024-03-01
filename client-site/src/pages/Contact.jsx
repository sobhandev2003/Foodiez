import React from 'react'
import '../css/Contact.css'
//Adrees
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
//phone
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
// mail
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import Alert from '../component/Alert';
function Contact() {
    window.scrollTo(0,0);
    return (
        <div className='contact-page'>
            <div className='contact-page-left'>
                <h3>Contact us</h3>
                <h1>GET IN TOUCH WITH US</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, neque, sit cumque ipsam nemo ratione at, sunt sint explicabo voluptatem eius porro nihil. Consequatur omnis atque amet rem praesentium quas.</p>
                <div className='contact-details'>
                    <div className='contact-details-I'>
                        <div className='contact-details-icon'>
                           <HomeOutlinedIcon sx={{ fontSize: 50 }}/>
                        </div>
                        <div className='text-div'>
                            <h3>Our Location</h3>
                            <p>Khanakul , Hooghly , West Bengal , India , 712412</p>
                        </div>
                    </div>
                    <div className='contact-details-II'>
                        <div className='contact-details-icon'>
                         <LocalPhoneIcon sx={{ fontSize: 50 }}/>
                        </div>
                        <div className='text-div'>
                        <h3>Phone Number</h3>
                            <p>+91 1234567809</p>
                        </div>
                    </div>
                    <div className='contact-details-III'>
                        <div className='contact-details-icon'>
                            <EmailOutlinedIcon sx={{ fontSize: 50 }}/>
                        </div>
                        <div className='text-div'>
                        <h3>Email Address</h3>
                            <p>info@yourdomain.com</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='contact-page-right'>

                <form action="#" method="post">
                    <input type="text" name="name" maxLength="20" placeholder="Your Name" required />
                    <input type="email" name="email" placeholder="Your Email" required />
                    <input type="tel" name="phone" pattern="[0-9]{10}" placeholder="Your Phone Number" required />
                    <textarea name="message" placeholder="Write your message here" rows="4" required></textarea>
                    <input type="submit" value="Send Message" onClick={()=>{Alert("success","Message sended")}} />
                </form>

            </div>
        </div>
    )
}

export default Contact
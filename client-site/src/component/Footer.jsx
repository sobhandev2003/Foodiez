import React from 'react'
import '../css/Footer.css';
import logo from '../photo/logo.webp';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Link } from 'react-router-dom';
//SECTION - MUI icon
import HomeIcon from '@mui/icons-material/Home';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

function Footer() {

  return (
    <div className='footer-div'>
      <div className='footer-top-div'>
        <p>Get connected with us on social networks:</p>
        <div>
          <Link to={"https://www.linkedin.com/in/sobhandev-pramanik-818464226/"} target='_blank'><LinkedInIcon className='icon' fontSize='medium' /></Link>
          <Link to={"https://twitter.com/CseRana58887"} target='_blank'><TwitterIcon className='icon' fontSize='medium' /></Link>
          <Link to={"/"}><FacebookOutlinedIcon className='icon' fontSize='medium' /></Link>
          <Link to={"/"}><InstagramIcon className='icon' fontSize='medium' /></Link>
          <Link to={"https://github.com/sobhandev2003"} target='_blank'><GitHubIcon className='icon' fontSize='medium' /></Link>
        </div>
      </div>
      <div className='footer-bootm-div'>
        <div className='I-div'>
          <div>

            <img src={logo} alt='logo'></img>
            <h2>FOOD</h2>
          </div>
          <p>
            Here you can order you favourite food. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio voluptatem neque necessitatibus nemo dignissimos inventore, sed accusantium error in autem.
          </p>
        </div>
        <div className='II-div'>
          <h3>PRODUCTS</h3>
          <span>Pizza</span>
          <span>Burger</span>
          <span>Ice-Creams</span>
          <span>Chinese</span>
        </div>
        <div className='III-div'>
          <h3>USEFUL LINKS</h3>
          <span>Pricing</span>
          <span>Settings</span>
          <span>Orders</span>
          <span>Help</span>

        </div>
        <div className='IV-div'>
          <h3>CONTACT</h3>

          <p><span><HomeIcon /></span><span>Khanakul, Hooghly,India, 712417  </span></p>
          <p><span><EmailIcon /></span><span>info@example.com</span></p>

          <p><span><LocalPhoneIcon /></span><span>+ 01 234 567 89</span></p>

        </div>
      </div>
      <p className='footer-end-line'>
        <span>{new Date().getFullYear()}</span>
        <span>MadeBy:🧡Sobhandev Pramanik</span>

      </p>
    </div>
  )
}

export default Footer
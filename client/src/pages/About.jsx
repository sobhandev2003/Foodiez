import React from 'react'
import '../css/About.css';
import photo1 from '../photo/abouPhoto1.png';
import photo2 from '../photo/abouPhoto2.png';
import photo3 from '../photo/abouPhoto3.png';
function About() {
    window.scrollTo(0,0);
    return (
        <div className='about-page'>
            <div className='image-div'>
                <div>
                    <img src={photo3} className='photo3' alt='🚫' />

                    <img src={photo2} className='photo2' alt='🚫' />
                </div>
                <img src={photo1} className='photo1' alt='🚫' />
            </div>
            <div className='text-div'>
                <h2>We give home delivery fresh food in your area. </h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius aspernatur odio impedit deserunt, rerum enim sint nulla illum labore facere fugit quos neque dolores libero accusantium voluptatem distinctio velit veniam laboriosam earum incidunt harum dolorum voluptatum magni. Temporibus ipsa commodi,  laudantium, aut sint unde dicta, nesciunt vel fugiat possimus cum sunt libero omnis aliquid cupiditate autem fuga nisi exercitationem eligendi.  veritatis molestias asperiores earum iste. Maxime id beatae dolorem facilis!

             
                </p>
            </div>
        </div>
    )
}

export default About
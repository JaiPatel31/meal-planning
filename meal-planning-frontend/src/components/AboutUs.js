import React from 'react';
import './AboutUs.css';

function AboutUs() {
  return (
    <div className="about-us">

      {/* Section with three images side by side */}
      <div className="three-images">
        <div>
          <img src="/jaipatel.png" alt="Jai Patel" className="image-box"/>
          <p>Jai Patel</p>
          <a href="https://www.linkedin.com/in/jai-patel-aa8a9a233?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" target="_blank"><img src="https://res.cloudinary.com/dd3on0o08/image/upload/v1731298989/linkedin_lwd1v0.png" className="icon" alt="linkedin-image" /></a>
        </div>
        <div>
          <img src="/shruthika.jpeg" alt="Shruthika" className="image-box"/>
          <p>Shruthika</p>
          <a href="https://www.linkedin.com/in/shruthika8" target="_blank"><img src="https://res.cloudinary.com/dd3on0o08/image/upload/v1731298989/linkedin_lwd1v0.png" className="icon" alt="linkedin-image"/></a>
        </div>
        <div>
          <img src="/bindhu.jpg" alt="Sai Bindhu " className="image-box"/>
          <p>Sai Bindhu </p>
          <a href="https://www.linkedin.com/in/sai-bindhu-javvaji-32b2b9237" target="_blank"><img src="https://res.cloudinary.com/dd3on0o08/image/upload/v1731298989/linkedin_lwd1v0.png" className="icon" alt="linkedin-image"/></a>

        </div>
      </div>
      <div className='footer'>
                <div className='footer-content'>
                    <div className='footer-left'>
                        <img src="https://res.cloudinary.com/dujmpn87j/image/upload/v1730144316/Bright_Colorful_Playful_Funny_Donuts_Food_Circle_Logo_processed_yb2a5y.png" alt="Meal Planning App Logo" className='footer-logo'/>
                        <h1>SavvyEats</h1>
                    </div>
                    <div className='footer-right'>
                        <a href='/blog' className='footer-text'>Blog</a>
                        <a href='/meal-plans' className='footer-text'>Meal Plans</a>
                        <a href='/recipes' className='footer-text'>Recipes</a>
                        <a href='/about-us' className='footer-text'>About Us</a>
                        <a href='/footer-text' className='footer-text'>Contact Us</a>
                        <a href='/register' className='footer-text'>Get Started</a>
                    </div>
                    <hr className='footer-line'/>
                    <div className='footer-bottom'>
                        <p>&copy; 2024 SavvyEats. All rights reserved.</p>
                    </div>
                </div>
            </div>
    </div>
    
  );
}

export default AboutUs;

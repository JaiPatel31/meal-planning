import React from 'react';
import './LandingPage.css';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import AboutUs from './AboutUs';

const LandingPage = () => {
    const navigate = useNavigate();
    const [mousePosition, setMousePosition] = useState({
        x: 0,
        y: 0
      });
      const [cursorVariant, setCursorVariant] = useState("default");
    
      useEffect(() => {
        const mouseMove = e => {
          setMousePosition({
            x: e.clientX,
            y: e.clientY
          })
        }
    
        window.addEventListener("mousemove", mouseMove);
    
        return () => {
          window.removeEventListener("mousemove", mouseMove);
        }
      }, []);
    
      const variants = {
        default: {
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
        },
        text: {
          height: 100,
          width: 100,
          x: mousePosition.x - 75,
          y: mousePosition.y - 75,
          backgroundColor: "#f73302",
          mixBlendMode: "screen"
        }
      }
    
      const textEnter = () => setCursorVariant("text");
      const textLeave = () => setCursorVariant("default");

      const handleRegisterClick = () => {
            navigate('/register');
     };
    return (
        <div className='main-container'>
            <div className='sub-container'>
                <div className='section-one'>
                    <div className='sub-heading'>
                        <div className="heading">
                            <motion.div
                                className='cursor'
                                variants={variants}
                                animate={cursorVariant}
                            />
                            <h1 onMouseEnter={textEnter} onMouseLeave={textLeave} className='title'>Welcome to SavvyEats!!!😋</h1>
                        </div>
                        <button className='first-button' onClick={handleRegisterClick}>
                            Make good choices!!👉🏻
                        </button>
                    </div>
                </div>
            </div>
            <div className='section-two'>
                <div className='sub-heading'>
                    <img src="https://res.cloudinary.com/dujmpn87j/image/upload/v1730230765/Untitled_design-4_u3kqzg.png" alt="Healthy Food" className='food-image-two'/>
                </div>
                <div className='sub-heading-two'>
                    <h1>2000 + Recipes</h1>
                    <p>Choose from a wide range of recipes to suit your taste and preferences.</p>
                </div>
            </div>
            <div className='section-three'>
                <div className='sub-heading'>
                    <h1>Meal Plan</h1>
                    <p>Plan your meals on our calendar feature.</p>
                </div>
                <div>
                    <img src="https://res.cloudinary.com/dujmpn87j/image/upload/v1730231531/Orange_Yellow_Brown_Creative_October_2024_Monthly_Calendar_qtlgra.png" alt="food-image-three" className='food-image-three'/>
                </div>
            </div>
            <div className='section-four'>
                <div className='sub-heading'>
                    <img src="https://res.cloudinary.com/dujmpn87j/image/upload/v1731267400/chat-3_tkujkh.png" alt="food-image-three" className='food-image-four'/>
                </div>
                <div className='sub-heading-three'>
                    <h1>Explore our Nutrition Chatbot</h1>
                    <p>Get personalized nutrition advice from our AI-powered chatbot.</p>
                </div>
            </div>
            <div className='section-five'>
                <div className='sub-heading'>
                    <h1 className='head'>Stay Fit & Stay Healthy...!!!</h1>
                    <p>Sign up to get started.</p>
                    <button className='first-button' onClick={handleRegisterClick}>
                        Get Started 👉🏻
                    </button>
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
};

export default LandingPage;
import React from 'react';
import './AboutUs.css';

function AboutUs() {
  return (
    <div className="about-us">
      {/* First section with image on the left and description on the right */}
      <div className="about-us-section">
        <div className="about-us-left">
          <img src="/chatbot.jpeg" alt="AI-Chatbot" />
        </div>
        <div className="about-us-right">
          <p>
            An AI chatbot is a software application powered by artificial intelligence that simulates human-like conversations with users.<br />
            It uses natural language processing (NLP) to understand and respond to text or voice inputs, providing automated assistance, answering questions, and performing tasks in various contexts such as customer support, information retrieval, and personal assistance.
          </p>
        </div>
      </div>

      {/* Second section with description on the left and image on the right */}
      <div className="about-us-section">
        <div className="about-us-left">
          <p>At SavyEats, we believe that cooking should be both enjoyable and informative.</p>
          <p>That's why, when exploring our recipes, users can easily discover essential details like preparation time, nutritional benefits, and clear instructions for each dish.</p>
          <p>We aim to provide everything you need to create delicious meals while supporting your health and dietary goals.</p>
        </div>
        <div className="about-us-right">
          <img src="/aboutus.jpeg" alt="Team values" />
        </div>
      </div>

      {/* Section with three images side by side */}
      <div className="three-images">
        <div>
          <img src="/jai.jpg" alt="Jai Patel" className="image-box"/>
          <p>Jai Patel</p>
          <a href="https://www.linkedin.com/in/jai-patel-aa8a9a233?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" target="_blank"><img src="https://res.cloudinary.com/dd3on0o08/image/upload/v1731298989/linkedin_lwd1v0.png" className="icon" alt="linkedin-image" /></a>
        </div>
        <div>
          <img src="/shruthika.jpg" alt="Shruthika" className="image-box"/>
          <p>Shruthika</p>
          <a href="https://www.linkedin.com/in/shruthika8" target="_blank"><img src="https://res.cloudinary.com/dd3on0o08/image/upload/v1731298989/linkedin_lwd1v0.png" className="icon" alt="linkedin-image"/></a>

        </div>
        <div>
          <img src="/bindhu.jpg" alt="Sai Bindhu " className="image-box"/>
          <p>Sai Bindhu </p>
          <a href="https://www.linkedin.com/in/sai-bindhu-javvaji-32b2b9237" target="_blank"><img src="https://res.cloudinary.com/dd3on0o08/image/upload/v1731298989/linkedin_lwd1v0.png" className="icon" alt="linkedin-image"/></a>

        </div>
      </div>
    </div>
  );
}

export default AboutUs;

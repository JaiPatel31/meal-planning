import React, { useState } from 'react';
import axios from 'axios';
import './Chatbot.css';

const Chatbot = () => {
  const [userMessage, setUserMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [showChatbot, setShowChatbot] = useState(true); // New state to control visibility

  const handleInputChange = (e) => {
    setUserMessage(e.target.value);
  };

  const sendMessage = async () => {
    if (!userMessage) return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: 'user', text: userMessage },
    ]);

    try {
      // Make API request to backend
      const response = await axios.post('http://localhost:5001/api/chat', {
        userMessage,
      });

      const botResponse = response.data.generated_text;

      // Update the messages state with the bot's response
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'bot', text: botResponse },
      ]);
    } catch (error) {
      console.error('Error sending message:', error);
    }

    setUserMessage('');
  };

  const toggleChatbot = () => {
    setShowChatbot(!showChatbot); // Toggle chatbot visibility
  };

  return (
    <>
      {!showChatbot ? (
        <div className="chatbot">
          <div className="chatbot-header">
            <h1 className="chatbot-title"> Your Nutrition Assistant</h1>
            <button className="chatbot-close" onClick={toggleChatbot}>X</button>
          </div>
          <div className="chat-window">
            {messages.map((msg, idx) => (
              <div key={idx} className={msg.sender}>
                <p className='chatbot-reply'>{msg.text}</p>
              </div>
            ))}
          </div>
          <div className="chat-input-container">
            <input
              type="text"
              value={userMessage}
              onChange={handleInputChange}
              placeholder="Ask something about nutrition..."
              className="chat-input"
            />
            <button onClick={sendMessage} className="chat-input-button">Send</button>
          </div>
          <div className="chat-caption">
            <p>Powered by <b>meta-llama/Meta-Llama-3-8B-Instruct</b></p>
          </div>
        </div>
      ) : (
        <div className="chatbot-icon" onClick={toggleChatbot}>
          <img src="https://res.cloudinary.com/dujmpn87j/image/upload/v1731229286/chat-2_gtcb2t.png" alt="Open chatbot" className='chat-image'/>
        </div>
      )}
    </>
  );
};

export default Chatbot;
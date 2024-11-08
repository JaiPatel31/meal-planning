import React, { useState } from 'react';
import axios from 'axios';
import './Chatbot.css';

const Chatbot = () => {
  const [userMessage, setUserMessage] = useState('');
  const [messages, setMessages] = useState([]);

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

  return (
    <div className="chatbot">
      <div className="chatbot-header">Nutrition Assistant</div>
      <div className="chat-window">
        {messages.map((msg, idx) => (
          <div key={idx} className={msg.sender}>
            <p>{msg.text}</p>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={userMessage}
          onChange={handleInputChange}
          placeholder="Ask something about nutrition..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      <div className="chat-caption">
        <p>Powered by <b>meta-llama/Meta-Llama-3-8B-Instruct</b></p>
      </div>
    </div>
  );
};

export default Chatbot;
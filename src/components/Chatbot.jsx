import React, { useState } from 'react';
import '../assets/css/chatbot.css'; // Assuming you have a separate CSS file for styling

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const closeChat = () => {
    setIsOpen(false);
  };

  return (
    <div id="chat-widget" className="chat-widget">
      <button id="chat-toggle-btn" className="chat-toggle-btn" onClick={toggleChat}>
        {isOpen ? 'Close Chat' : 'Ask IVA'}
      </button>
      {isOpen && (
        <div id="chat-window" className="chat-window">
          <div className="chat-header">
            <button className="close-btn" onClick={closeChat}>×</button>
          </div>
          <iframe
            src="https://your-bot-url-here" // Replace with your chatbot's URL
            width="100%"
            height="calc(100% - 40px)" // Adjust height to account for header
            title="Chatbot"
            className="chat-iframe"
          />
        </div>
      )}
    </div>
  );
};

export default Chatbot;

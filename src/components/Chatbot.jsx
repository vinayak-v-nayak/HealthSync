import React, { useState } from "react";
import "../assets/css/chatbot.css"; // Assuming you have a separate CSS file for styling

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
      <button
        id="chat-toggle-btn"
        className="chat-toggle-btn"
        onClick={toggleChat}
      >
        {isOpen ? "Close Chat" : "Ask IVA"}
      </button>
      {isOpen && (
        <div id="chat-window" className="chat-window">
          <div className="chat-header">
            <h2>Insurance Virtual Assistant</h2>
          </div>
          <iframe
            src="" // Replace with your chatbot's URL
            width="100%"
            height="100%" // Adjust height to account for header
            title="Chatbot"
            className="chat-iframe"
          />
        </div>
      )}
    </div>
  );
};

export default Chatbot;

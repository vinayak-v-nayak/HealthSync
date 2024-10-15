import React from 'react';

const Chatbot = () => {
  return (
    <div id="chat-widget" className="chat-widget">
      <button id="chat-toggle-btn" className="chat-toggle-btn">Ask IVA</button>
      <div id="chat-window" className="chat-window">
        <iframe src="{your_bot_url}" frameBorder="0" width="100%" height="100%"></iframe>
      </div>
    </div>
  );
};

export default Chatbot;

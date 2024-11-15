import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "./chatbot.css";
import { generateChatResponse } from "./googleGenAiService"; // Import the service function

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const messagesEndRef = useRef(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = async () => {
    if (userInput.trim() === "") return;

    const newMessage = { type: "user", text: userInput };
    setMessages((prev) => [...prev, newMessage]);

    const userId = Cookies.get("user");
    const token = Cookies.get("token");

    if (!token) {
      setMessages((prev) => [
        ...prev,
        { type: "bot", text: "You need to log in to send messages." },
      ]);
      return;
    }

    try {
      // Use the generateChatResponse function from googleGenAiService.js to get the bot's response
      const botResponse = await generateChatResponse(userInput);

      // Add the bot's response to the messages
      setMessages((prev) => [
        ...prev,
        { type: "bot", text: botResponse },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { type: "bot", text: "Sorry, there was an error with the response." },
      ]);
    }

    setUserInput("");
  };

  const startNewChat = () => {
    setChatHistory((prev) => [...prev, messages]);
    setMessages([]);
  };

  const toggleHistory = () => setShowHistory(!showHistory);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div id="chat-widget" className="chat-widget">
      {!isOpen && (
        <button className="chat-toggle-btn" onClick={toggleChat}>
          💬
        </button>
      )}
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <button onClick={startNewChat} className="new-chat-btn" title="New Chat">
              🔄
            </button>
            <h2>IVA Chatbot</h2>
            <button onClick={toggleHistory} className="history-btn" title="History">
              📜
            </button>
            <button onClick={toggleChat} className="close-chat-btn">X</button>
          </div>

          {showHistory && (
            <div className="chat-history">
              <h3>Chat History</h3>
              {chatHistory.length ? (
                chatHistory.map((history, idx) => (
                  <div key={idx} className="history-item">
                    <h4>Conversation {idx + 1}</h4>
                    {history.map((msg, i) => (
                      <div key={i} className={`chat-message ${msg.type}`}>
                        {msg.text}
                      </div>
                    ))}
                  </div>
                ))
              ) : (
                <p>No past conversations.</p>
              )}
            </div>
          )}

          <div className="chat-body">
            {messages.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.type}`}>
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-footer">
            <input
              type="text"
              placeholder="Type your question..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              className="chat-input"
            />
            <button onClick={handleSend} className="send-btn">Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;

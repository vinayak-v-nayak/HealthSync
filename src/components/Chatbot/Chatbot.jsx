import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "./chatbot.css";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const messagesEndRef = useRef(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = async () => {
    if (!userInput.trim()) {
      return;
    }

    const newMessage = { type: "user", text: userInput };
    setMessages((prev) => [...prev, newMessage]);

    // Check user authentication
    const userId = Cookies.get("user");
    const token = Cookies.get("token");

    if (!token) {
      setMessages((prev) => [
        ...prev,
        { type: "bot", text: "You need to log in to send messages." },
      ]);
      setUserInput("");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/ask", {
        question: userInput,
      });

      if (response.data) {
        setMessages((prev) => [
          ...prev,
          { type: "bot", text: response.data },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { type: "bot", text: "No response from the bot. Please try again." },
        ]);
      }
    } catch (error) {
      console.error("Error fetching bot response:", error.message || error);
      setMessages((prev) => [
        ...prev,
        { type: "bot", text: "Sorry, an error occurred. Please try again later." },
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
      {!isOpen ? (
        <button className="chat-toggle-btn" onClick={toggleChat}>
          💬
        </button>
      ) : (
        <div className="chat-window">
          <div className="chat-header">
            <button
              onClick={startNewChat}
              className="new-chat-btn"
              title="Start New Chat"
            >
              🔄
            </button>
            <h2>IVA Chatbot</h2>
            <button
              onClick={toggleHistory}
              className="history-btn"
              title="View Chat History"
            >
              📜
            </button>
            <button onClick={toggleChat} className="close-chat-btn">
              X
            </button>
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
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="chat-input"
            />
            <button onClick={handleSend} className="send-btn">
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;

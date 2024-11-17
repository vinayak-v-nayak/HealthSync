import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "./chatbot.css";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [userQuestion, setUserQuestion] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const messagesEndRef = useRef(null);

  const toggleChat = () => setIsOpen(!isOpen);

  // Function to call Gemini API with the specific prompt format
  const gemini = async (userQuestion) => {
    try {
      const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GOOGLE_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      // Customize the prompt to reflect an insurance policyholder asking a question
      const prompt = `You are an expert insurance agent. A policyholder has asked the following question: "${userQuestion}".
      Please explain the concept in a clear, step-by-step manner. Use simple language and examples where possible.`;

      const result = await model.generateContent(prompt);
      setAiResponse(result ? result.response.text() : "No response received");
    } catch (error) {
      console.error("Error with Gemini API:", error);
      setAiResponse("Sorry, there was an error while fetching the response.");
    }
  };

  // Handle sending the user's question and displaying the response
  const handleSend = async () => {
    if (!userInput.trim()) {
      return;
    }

    const newMessage = { type: "user", text: userInput };
    setMessages((prev) => [...prev, newMessage]);

    // Check user authentication
    const token = Cookies.get("token");

    if (!token) {
      setMessages((prev) => [
        ...prev,
        { type: "bot", text: "You need to log in to send messages." },
      ]);
      setUserInput("");
      return;
    }

    // Set user question and send it to Gemini API for response
    setUserQuestion(userInput);
    gemini(userInput);

    setUserInput("");
  };

  // Start a new chat
  const startNewChat = () => {
    setChatHistory((prev) => [...prev, messages]);
    setMessages([]);
  };

  // Toggle chat history view
  const toggleHistory = () => setShowHistory(!showHistory);

  // Scroll to the bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Whenever the user question changes, trigger the Gemini API
  useEffect(() => {
    if (userQuestion) {
      gemini(userQuestion);
    }
  }, [userQuestion]);

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

            {aiResponse && (
              <div className="mt-4 p-4 bg-gray-200 rounded-md">
                <h4 className="font-semibold text-lg mb-2">Explanation:</h4>
                <div className="space-y-3 leading-relaxed text-gray-800">
                  {aiResponse.split("\n").map((line, index) => (
                    <div key={index} className="mb-2">
                      {line.startsWith("") ? (
                        <p className="font-bold text-blue-600">{line}</p>
                      ) : line.startsWith("* ") ? (
                        <li className="list-disc list-inside ml-4">
                          {line.replace("* ", "")}
                        </li>
                      ) : (
                        <p>{line}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

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

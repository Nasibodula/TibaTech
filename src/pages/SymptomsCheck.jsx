import React, { useState } from "react";
import axios from "axios";
import "./SymptomsCheck.css";

const SymptomsCheck = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (event) => {
    event.preventDefault();
    if (input.trim() === "") return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8080/get",
        { msg: input },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        }
      );

      console.log("Response received:", response.data); // Debug log

      if (response.data && response.data.response) {
        const botMessage = {
          text: response.data.response,
          sender: "bot"
        };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Error details:", error); // Debug log
      const errorMessage = {
        text: "Error connecting to chatbot. Please try again.",
        sender: "bot"
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
      setInput("");
    }
  };

  return (
    <div className="chat-container">
      <header className="chat-header">
        <h1>Medical Chatbot</h1>
      </header>
      
      <div className="messages-container">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.sender === "user" ? "user-message" : "bot-message"}`}
          >
            {msg.text}
          </div>
        ))}
        {isLoading && (
          <div className="message bot-message loading">
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={sendMessage} className="input-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your symptoms here..."
          disabled={isLoading}
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
};

export default SymptomsCheck;
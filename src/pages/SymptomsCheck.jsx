import React, { useState, useEffect } from "react";
import axios from "axios";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Mic, MicOff } from 'lucide-react';
import "./SymptomsCheck.css";

const SymptomsCheck = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    if (transcript) {
      setInput(transcript);
    }
  }, [transcript]);

  const startListening = () => {
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true });
    setIsListening(true);
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
    setIsListening(false);
  };

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
      console.error("Error details:", error);
      const errorMessage = {
        text: "Error connecting to chatbot. Please try again.",
        sender: "bot"
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
      setInput("");
      resetTranscript();
    }
  };

  if (!browserSupportsSpeechRecognition) {
    return (
      <div className="chat-container">
        <div className="error-message">
          Your browser doesn't support speech recognition.
        </div>
      </div>
    );
  }

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
        <button 
          type="button" 
          className={`mic-button ${isListening ? 'listening' : ''}`}
          onClick={isListening ? stopListening : startListening}
        >
          {isListening ? <MicOff /> : <Mic />}
        </button>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
};

export default SymptomsCheck;
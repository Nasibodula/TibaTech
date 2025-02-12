import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import "./HelpCenter.css";

const HelpCenter = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const faqs = [
    {
      question: "What is TibaTech?",
      answer: "TibaTech is a platform that provides medical assistance, including symptom checking, clinic directions, and doctor consultations."
    },
    {
      question: "How does the chatbot work?",
      answer: "The chatbot uses AI to answer your medical questions, provide symptom analysis, and guide you to the nearest clinics."
    },
    {
      question: "Can I consult a doctor through TibaTech?",
      answer: "Yes, TibaTech offers consultation services where you can connect with certified doctors."
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleSend = () => {
    if (input.trim() === "") return;

    // Add user message to chat
    const userMessage = { text: input, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    // Simulate bot response based on user input
    let botResponse = "";
    if (input.toLowerCase().includes("tibatech")) {
        botResponse = "TibaTech is a platform that provides medical assistance, including symptom checking, clinic directions, and doctor consultations.";
    } else if (input.toLowerCase().includes("chatbot")) {
        botResponse = "The chatbot uses AI to answer your medical questions, provide symptom analysis, and guide you to the nearest clinics.";
    } else if (input.toLowerCase().includes("doctor")) {
        botResponse = "Yes, TibaTech offers consultation services where you can connect with certified doctors. [Redirecting to Consult Page...]";
        window.location.href = "/consult";  // Adjust the URL as needed
    } else if (["hi", "hello", "hey", "ola", "how are you"].some(greet => input.toLowerCase().includes(greet))) {
        botResponse = "Hello! How can TibaTech help you today?";
    } else if (["directions", "location", "where is", "clinic", "hospital;"].some(word => input.toLowerCase().includes(word))) {
        botResponse = "Sure! Here’s a list of nearby clinics. [Redirecting to Clinics Page...]";
        window.location.href = "/clinics";  // Adjust the URL as needed
    } else if (["disease", "symptom", "feeling sick", "health issue", "sick"].some(word => input.toLowerCase().includes(word))) {
        botResponse = "You can check your symptoms using our Symptom Checker. [Redirecting to Symptom Checker Page...]";
        window.location.href = "/symtomscheck";  // Adjust the URL as needed
    } else {
        botResponse = "I'm sorry, I don't understand that question. Can you please rephrase?";
    }
    
    setTimeout(() => {
      const botMessage = { text: botResponse, sender: "bot" };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    }, 1000);

    // Clear input
    setInput("");
  };

  return (
    <div className="help-center">
      {/* FAQ Section */}
      <section className="faq-section">
        <h2 className="section-title">Frequently Asked Questions</h2>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <button
                onClick={() => toggleFAQ(index)}
                className="faq-question"
              >
                {faq.question}
                <ChevronDown
                  className={`chevron ${activeIndex === index ? "rotate" : ""}`}
                  size={20}
                />
              </button>
              {activeIndex === index && (
                <div key={index} className={`faq-item ${activeIndex === index ? "active" : ""}`}>{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Chatbot Section */}
      <div className="chatbot-container">
        <div className="chatbot-header">
          <h3>Ask Me</h3>
        </div>
        <div className="chatbot-messages">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.sender === "user" ? "user-message" : "bot-message"}`}
            >
              {msg.text}
            </div>
          ))}
        </div>
        <div className="chatbot-input">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question..."
          />
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
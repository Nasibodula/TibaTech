import React, { useState } from 'react';
import { ArrowLeft, Phone, Calendar, MessageSquare, ChevronUp, ChevronDown, Paperclip } from 'lucide-react';
import { Link } from 'react-router-dom';
import CallInterface from '../components/CallInterface';
import { Card, Button } from 'react-bootstrap';

const TelemedicinePage = () => {
  const [showChat, setShowChat] = useState(false);
  const [isChatExpanded, setIsChatExpanded] = useState(true);
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [image, setImage] = useState(null);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (currentMessage || image) {
      const newMessage = { text: currentMessage, image, sender: 'user' };
      setMessages([...messages, newMessage]);
      setCurrentMessage('');
      setImage(null);

      // Simulate auto-reply from a healthcare provider
      setTimeout(() => {
        setMessages(prev => [...prev, {
          text: "Thank you for your message. A healthcare provider will respond shortly.",
          sender: 'doctor'
        }]);
      }, 1000);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Convert image to base64 for preview
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleChat = () => {
    setIsChatExpanded(!isChatExpanded);
  };

  return (
    <div className="min-vh-100 bg-light">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container py-3">
          <div className="d-flex align-items-center">
            <button className="btn btn-link me-3 p-2">
              <ArrowLeft size={20} />
            </button>
            <h1 className="h4 mb-0">Consultation Services</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-4">
        {/* Alert Banner */}
        <div className="alert alert-warning mb-4">
          <p className="mb-0">
            For medical emergencies, please dial emergency services immediately.
          </p>
        </div>

        {/* Consultation Options */}
        <div className="row mb-4 g-4">
          <div className="col-md-6">
            <div className="card h-100">
              <CallInterface />
            </div>
          </div>

          <div className="col-md-6">
            <div className="card h-100">
              <div className="card-body d-flex flex-column justify-content-center align-items-center text-center p-5">
                <Calendar className="text-primary mb-3" size={48} />
                <h2 className="h5 mb-3">Book an Appointment</h2>
                <p className="text-muted mb-4">
                  Schedule a consultation for a later time
                </p>
                <Link to='/doctors'>
                  <button className="btn btn-outline-primary w-100">
                    Schedule Appointment
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="card">
          <div className="card-header bg-white p-3">
            <div 
              className="d-flex align-items-center justify-content-between"
              onClick={showChat ? toggleChat : () => setShowChat(true)}
              style={{ cursor: 'pointer' }}
            >
              <div className="d-flex align-items-center">
                <MessageSquare className="text-primary me-3" size={32} />
                <div>
                  <h2 className="h5 mb-1">Chat Consultation</h2>
                  <p className="text-muted mb-0">Message a healthcare provider</p>
                </div>
              </div>
              {showChat && (isChatExpanded ? <ChevronUp size={24} className="text-muted" /> : <ChevronDown size={24} className="text-muted" />)}
            </div>
          </div>

          {showChat && isChatExpanded && (
            <div className="card-body p-4">
              <div className="border rounded p-3 mb-3" style={{ height: '300px', overflowY: 'auto' }}>
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded mb-2 ${msg.sender === 'user' ? 'bg-primary bg-opacity-10 ms-auto' : 'bg-light me-auto'}`}
                    style={{ maxWidth: '80%' }}
                  >
                    {msg.text && <p className="mb-1">{msg.text}</p>}
                    {msg.image && <img src={msg.image} alt="Uploaded" className="img-fluid rounded mt-2" style={{ maxWidth: "200px" }} />}
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <form onSubmit={handleSendMessage} className="d-flex gap-2">
                <label className="btn btn-outline-secondary p-2">
                  <Paperclip size={20} />
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="d-none" />
                </label>
                <input
                  type="text"
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="form-control"
                />
                <button type="submit" className="btn btn-primary">Send</button>
              </form>

              {/* Image Preview */}
              {image && (
                <div className="mt-3 text-center">
                  <img src={image} alt="Preview" className="img-fluid rounded" style={{ maxWidth: "100px" }} />
                  <Button variant="danger" size="sm" className="ms-2" onClick={() => setImage(null)}>Remove</Button>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default TelemedicinePage;

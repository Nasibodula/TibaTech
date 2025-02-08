import React, { useState } from 'react';
import { ChevronDown, Phone, Mail, MapPin, Facebook, Twitter, Instagram} from 'lucide-react';
import './FAQSection.css';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How do I schedule a virtual consultation?",
      answer: "You can easily schedule a virtual consultation through our mobile app or website. Simply select your preferred healthcare provider, choose an available time slot, and confirm your appointment. You'll receive confirmation details via email."
    },
    {
      question: "What should I do in case of a medical emergency?",
      answer: "In case of a medical emergency, immediately contact our 24/7 emergency support line. Our trained professionals will guide you through immediate steps and dispatch emergency services if necessary. Always call local emergency services first for life-threatening situations."
    },
    {
      question: "Are my medical records secure?",
      answer: "Yes, we take data security very seriously. All medical records are encrypted and stored in compliance with healthcare privacy regulations. We use state-of-the-art security measures to protect your sensitive information."
    },
    {
      question: "How does the prescription management system work?",
      answer: "Our prescription management system allows you to request refills, track medications, and receive reminders. Your healthcare provider can electronically send prescriptions to your preferred pharmacy, making the process seamless and efficient."
    },
    {
      question: "Can I switch healthcare providers?",
      answer: "Yes, you can switch healthcare providers at any time. Browse through our network of qualified professionals and select based on your preferences. Your medical records will be safely transferred to ensure continuity of care."
    }
  ];

  return (
    <section id="faq" className="faq-section">
      <div className="grid-background">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="grid-line-horizontal" />
        ))}
        {[...Array(20)].map((_, i) => (
          <div key={i} className="grid-line-vertical" />
        ))}
      </div>
      
      <h2 className="section-title">Frequently Asked Questions</h2>
      <div className="faq-container">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`faq-item ${openIndex === index ? 'active' : ''}`}
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            <div className="faq-question">
              <h3>{faq.question}</h3>
              <ChevronDown className="faq-icon" />
            </div>
            <div className="faq-answer">
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="footer-content">
        <div className="footer-column company-info">
          <h3>TibaTech</h3>
          <p>Revolutionizing healthcare through technology, making quality medical care accessible to everyone, anywhere.</p>
          <div className="social-links">
            <a href="#" className="social-icon"><Facebook size={20} /></a>
            <a href="#" className="social-icon"><Twitter size={20} /></a>
            <a href="#" className="social-icon"><Instagram size={20} /></a>
          </div>
        </div>

        <div className="footer-column quick-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-column services">
          <h4>Our Services</h4>
          <ul>
            <li>Virtual Consultations</li>
            <li>Emergency Support</li>
            <li>Specialist Appointments</li>
            <li>Prescription Management</li>
          </ul>
        </div>

        <div className="footer-column contact-info">
          <h4>Contact Us</h4>
          <div className="contact-item">
            <Phone size={16} />
            <span>+1 (234) 567-8900</span>
          </div>
          <div className="contact-item">
            <Mail size={16} />
            <span>contact@tibatech.com</span>
          </div>
          <div className="contact-item">
            <MapPin size={16} />
            <span>123 Healthcare Ave, Medical District, NY 10001</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 TibaTech. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default function FAQandFooter() {
  return (
    <>
      <FAQSection />
      <Footer />
    </>
  );
}
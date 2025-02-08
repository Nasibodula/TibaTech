import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import FAQSection from './FAQSection';
import './HealthcareServices.css';

const HealthcareServices = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const services = [
    {
      title: 'Virtual Consultations',
      description: 'Talk to certified doctors from anywhere, anytime.',
      image: 'pic1.png'
    },
    {
      title: '24/7 Emergency Support',
      description: 'Immediate assistance for any urgent medical needs.',
      image: 'pic2.png'
    },
    {
      title: 'Specialist Appointments',
      description: 'Easily book appointments with top healthcare specialists.',
      image: 'pic3.png'
    },
    {
      title: 'Prescription Management',
      description: 'Get prescriptions reviewed and renewed effortlessly.',
      image: 'pic4.png'
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === services.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? services.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <><div id="healthcare-services" className="healthcare-section">
          <div className="grid-background">
              {[...Array(20)].map((_, i) => (
                  <div key={i} className="grid-line-horizontal" />
              ))}
              {[...Array(20)].map((_, i) => (
                  <div key={i} className="grid-line-vertical" />
              ))}
          </div>

          <h1 className="section-title">Our Healthcare Services</h1>
          <p className="section-description">
              Bringing healthcare closer to you with instant access to professionals.
          </p>

          <div className="carousel-container">
              <button className="carousel-button prev" onClick={prevSlide}>
                  <ChevronLeft size={24} />
              </button>

              <div className="carousel-content">
                  {services.map((service, index) => (
                      <div
                          key={index}
                          className={`service-card ${index === currentIndex ? 'active' : ''}`}
                          style={{
                              transform: `translateX(${(index - currentIndex) * 100}%)`
                          }}
                      >
                          <div className="card-inner">
                              <div className="card-image">
                                  <img src={service.image} alt={service.title} />
                              </div>
                              <div className="card-text">
                                  <h3>{service.title}</h3>
                                  <p>{service.description}</p>
                              </div>
                          </div>
                      </div>
                  ))}
              </div>

              <button className="carousel-button next" onClick={nextSlide}>
                  <ChevronRight size={24} />
              </button>
          </div>

          <div className="carousel-indicators">
              {services.map((_, index) => (
                  <button
                      key={index}
                      className={`indicator ${index === currentIndex ? 'active' : ''}`}
                      onClick={() => setCurrentIndex(index)} />
              ))}
          </div>

          <div
              className="scroll-indicator"
              onClick={() => document.getElementById('faq').scrollIntoView({ behavior: 'smooth' })}
          >
              <ChevronDown className="bounce" size={48} />
          </div>

      </div><FAQSection /></>

  );
};

export default HealthcareServices;

import React from 'react';
import { ChevronDown } from 'lucide-react';
import './Homepage.css';
import About from './About';
import HealthcareServices from './HealthcareServices';


const Homepage = ({id}) => {
  const scrollToAbout = () => {
    document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <div id={id} className="homepage">
        <div className="content">
          <div className="text-section">
            <div className="text-container">
              <h1 className="title">TIBA TECH</h1>
              <p className="description">
                Get fast, reliable health care with just a click of a button!
              </p>
              <button className="cta-button">Get Started</button>
            </div>
            <div className="decorative-elements">
              <div className="circle-decoration"></div>
              <div className="line-decoration"></div>
            </div>
          </div>
          
          <div className="image-section">
            <img src="doctor.png" alt="Doctor" className="doctor-image" />
          </div>
        </div>

        <div className="silver-lines">
          <div className="line line1"></div>
          <div className="line line2"></div>
          <div className="line line3"></div>
        </div>

        <div className="scroll-indicator" onClick={scrollToAbout}>
          <ChevronDown className="bounce" size={48} />
        </div>
      </div>
      
      <About />

    </>
  );
};

export default Homepage;
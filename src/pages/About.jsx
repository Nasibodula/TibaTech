import React, { useEffect, useState } from 'react';
import './About.css';
import HealthcareServices from './HealthcareServices';
import { ChevronDown } from 'lucide-react';


const About = () => {
  const scrollToAbout = () => {
    document.getElementById('healthcare-services').scrollIntoView({ behavior: 'smooth' });
  };    
  const [activeUsers, setActiveUsers] = useState(0);
  const [healthcareProviders, setHealthcareProviders] = useState(0);
  const [availability, setAvailability] = useState(0);
  const [countingStarted, setCountingStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-visible');
            if (entry.target.classList.contains('achievement-section') && !countingStarted) {
              setCountingStarted(true);
              startCounting();
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [countingStarted]);

  const startCounting = () => {
    const targets = [10000, 500, 24];
    const setStates = [setActiveUsers, setHealthcareProviders, setAvailability];

    targets.forEach((target, index) => {
      let count = 0;
      const interval = setInterval(() => {
        count += Math.ceil(target / 100);
        if (count >= target) {
          count = target;
          clearInterval(interval);
        }
        setStates[index](count);
      }, 20);
    });
  };

  return (
    <><div id="about" className="about-section">
          <div className="glowing-grid"></div>
          <div className="about-content">
              <h1 className="about-title fade-in">About TibaTech</h1>

              <div className="about-grid">
                  {['Our Vision', 'Our Mission', 'Innovation', 'Excellence'].map((title, index) => (
                      <div key={index} className="about-card fade-in">
                          <div className="card-inner">
                              <h3>{title}</h3>
                              <p>
                                  {title === 'Our Vision' && 'Revolutionizing healthcare accessibility through cutting-edge technology.'}
                                  {title === 'Our Mission' && 'Ensuring immediate access to medical expertise through our platform.'}
                                  {title === 'Innovation' && 'Creating seamless healthcare experiences with advanced technology.'}
                                  {title === 'Excellence' && 'Maintaining high standards in healthcare delivery.'}
                              </p>
                          </div>
                      </div>
                  ))}
              </div>

              <div className="achievement-section fade-in">
                  {[{ number: activeUsers, label: 'Active Users' },
                  { number: healthcareProviders, label: 'Healthcare Providers' },
                  { number: availability, label: 'Availability (Hours)' }].map((item, index) => (
                      <div key={index} className="achievement-item">
                          <span className="achievement-number">{item.number}+</span>
                          <span className="achievement-label">{item.label}</span>
                      </div>
                  ))}
              </div>
          </div>
          
        <div className="scroll-indicator" onClick={scrollToAbout}>
          <ChevronDown className="bounce" size={48} />
        </div>
      </div>
      <HealthcareServices /></>

  );
};

export default About;

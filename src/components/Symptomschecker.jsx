import React, { useEffect } from 'react';
import ScrollReveal from 'scrollreveal';

export default function Services() {
  useEffect(() => {
    const scrollRevealOption = {
      origin: 'left',
      distance: '50px',
      duration: 1000,
      delay: 200,
    };

    // Ensure ScrollReveal applies to the correct elements
    ScrollReveal().reveal('.section__header', { ...scrollRevealOption });
    ScrollReveal().reveal('.section__description', { ...scrollRevealOption, delay: 500 });
    ScrollReveal().reveal('.choose__card', { ...scrollRevealOption, delay: 700, interval: 200 });
    ScrollReveal().reveal('img', { ...scrollRevealOption, delay: 300, interval: 200 });

  }, []);

  return (
    <section className="choose__container container py-5" id="choose">
      <div className="row align-items-center">
        {/* Left Side - Image */}
        <div className="col-lg-5">
          <img src="/assets/team.png" alt="choose" className="choose__img rounded" />
        </div>

        {/* Right Side - Content */}
        <div className="col-lg-7">
          <h2 className="section__header">Our Healthcare Services</h2>
          <p className="section__description">
          Access essential healthcare services with ease. Use our platform for symptom checking, 
          consultations, and finding nearby clinics.
          </p>

          <div className="row">
            {/* Service Cards */}
            <div className="col-md-6 choose__card">
              <i className="ri-customer-service-line icon"></i>
              <div>
                <h5>Customer Support</h5>
                <p>Our dedicated support team is available 24/7.</p>
              </div>
            </div>

            <div className="col-md-6 choose__card">
            <i className="ri-stethoscope-line icon"></i>
              <div>
                <h5>Symptom Checker</h5>
                <p>Check your symptoms and get possible diagnoses.</p>
              </div>
            </div>

            <div className="col-md-6 choose__card">
              <i className="ri-hospital-line icon"></i>
                <div>
                  <h5>Consultation Services</h5>
                  <p>Get online medical consultations from experts.</p>
                </div>
            </div>

            <div className="col-md-6 choose__card">
              <i className="ri-map-pin-user-line icon"></i>
                <div>
                  <h5>Nearby Clinics</h5>
                  <p>Find healthcare facilities near you.</p>
                </div>
            </div>

            <div className="col-md-6 choose__card">
              <i className="ri-settings-3-line icon"></i>
                <div>
                  <h5>Settings & Offline Mode</h5>
                  <p>Customize your experience and access offline tools.</p>
                </div>
            </div>

            <div className="col-md-6 choose__card">
              <i className="ri-question-line icon"></i>
                <div>
                  <h5>About & Help Center</h5>
                  <p>Learn more about our services and get support.</p>
                </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
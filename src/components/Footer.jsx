import React from 'react';


const Footer = () => {
  return (
    <footer className="footer">
      <div className="container p-4">
        <div className="row">
          <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
            <h5>Let's Connect with us</h5>
            <p>
              We're here to provide reliable healthcare information and services. Let's build a healthier future together.
            </p>
            <button className="btn btn-primary">Make an Inquiry</button>
          </div>

          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5>Quick Link</h5>
            <ul>
              <li><a href="#!">Home</a></li>
              <li><a href="#!">About Us</a></li>
              <li><a href="#!">Departments</a></li>
              <li><a href="#!">Meet the Team</a></li>
              <li><a href="#!">Testimonials</a></li>
              <li><a href="#!">FAQ</a></li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5>Services</h5>
            <ul>
              <li><a href="#!">General Medicine</a></li>
              <li><a href="#!">Pediatrics</a></li>
              <li><a href="#!">Cardiology</a></li>
              <li><a href="#!">Neurology</a></li>
              <li><a href="#!">Orthopedics</a></li>
              <li><a href="#!">Dermatology</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="text-center p-3">
        © 2024 MedEase | <a href="#!">Privacy Policy</a> | <a href="#!">Terms & Conditions</a> | <a href="#!">Accessibility</a>
      </div>
    </footer>
  );
};

export default Footer;
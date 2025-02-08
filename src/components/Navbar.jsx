import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Add this CSS file for styling

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isSticky ? 'sticky' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          Tiba Tech
        </Link>
        <ul className="navbar-links">
          <li><Link to="/" className="nav-link">Home</Link></li>
          <li><Link to="/symtomscheck" className="nav-link">Symptoms Checker</Link></li>
          <li><Link to="/services" className="nav-link">Consult</Link></li>
          <li><Link to="/clinics" className="nav-link">Clinics</Link></li>
          <li><Link to="/contact" className="nav-link">Help Center</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
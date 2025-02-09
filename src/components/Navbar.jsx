import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import './Navbar.css'; // Ensure this CSS file is imported

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={`navbar ${isSticky ? 'sticky' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <span className="brand-text">Tiba Tech</span>
        </Link>
        <ul className="navbar-links">
          <li><Link to="/" className="nav-link">Home</Link></li>
          <li><Link to="/symtomscheck" className="nav-link">Symptoms Checker</Link></li>
          <li><Link to="/consult" className="nav-link">Consult</Link></li>
          <li><Link to="/clinics" className="nav-link">Clinics</Link></li>
          <li><Link to="/contact" className="nav-link">Help Center</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
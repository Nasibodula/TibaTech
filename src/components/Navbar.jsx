
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

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
        
        {/* Mobile Menu Toggle */}
        <button 
          className="mobile-menu-button" 
          onClick={toggleMenu}
          aria-label="Toggle Navigation Menu"
        >
          {isOpen ? <X size={24} color="white" /> : <Menu size={24} color="white" />}
        </button>
        
        <ul className={`navbar-links ${isOpen ? 'active' : ''}`}>
          <li><Link to="/" className="nav-link" onClick={toggleMenu}>Home</Link></li>
          <li><Link to="/symtomscheck" className="nav-link" onClick={toggleMenu}>Symptoms Checker</Link></li>
          <li><Link to="/consult" className="nav-link" onClick={toggleMenu}>Consult</Link></li>
          <li><Link to="/clinics" className="nav-link" onClick={toggleMenu}>Clinics</Link></li>
          <li><Link to="/contact" className="nav-link" onClick={toggleMenu}>Help Center</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isHeaderShrunk, setIsHeaderShrunk] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check the scroll position to make navbar sticky at top
      if (window.scrollY >= 50) {
        setIsSticky(true);
        setIsHeaderShrunk(true);
      } else {
        setIsSticky(false);
        setIsHeaderShrunk(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className='nav'>
      {/* Header Section */}
      <header className={`py-2 flex row  ${isHeaderShrunk ? 'header-shrunk' : 'header-normal'}`}>
        <div className='atb'>
          <span>Sign In</span>
          <span>Sign Out</span>
        </div>
      </header>

      {/* Navigation Section */}
      <nav className={`navbar navbar-expand-lg navbar-light p-2  ${isSticky ? 'navbar-fixed' : 'navbar-normal'}`}>
        <a className="navbar-brand fw-bold" href="#">Tiba Tech</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
         <ul className="navbar-nav ms-auto justify-content"> 
            <li className='nav-item '><Link to='/' className='nav-link'>Home</Link></li>
            <li className='nav-item'><Link to='/symtomscheck' className='nav-link'>Symptoms Check</Link></li>
            <li className='nav-item'><Link to='/services' className='nav-link'>Services</Link></li>
            <li className='nav-item'><Link to='/portfolio' className='nav-link'>Portfolio</Link></li>
            <li className='nav-item'><Link to='/contact' className='nav-link'>Contact</Link></li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
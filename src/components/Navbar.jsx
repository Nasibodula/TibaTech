import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSignOutAlt } from "react-icons/fa";

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
      <header className={`py-2 flex  ${isHeaderShrunk ? 'header-shrunk' : 'header-normal'}`}>
        <div className='atb'>
          <h4 className='fw-light'>Welcome to TibaTech. Redifined Healthcare With AI.</h4>
        </div>
        <div className="profile_details ">
          <Link className='li'   to="/profile"><img src="/assets/profile.jpg" alt="Profile" /></Link>
          <div className="profile_content flex mr-20">
            <div className="name">Nasibo Dula</div>
            <div className="designation">Admin</div>
          </div>
          <Link  className='li' to='/signup'><FaSignOutAlt size={20} className='color-dark'/></Link>
        </div>
      </header>

      {/* Navigation Section */}
      <nav className={`navbar navbar-expand-lg  p-2  ${isSticky ? 'navbar-fixed' : 'navbar-normal'}`}>
        <a className="navbar-brand fw-bold" href="#">Tiba Tech</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
         <ul className="navbar-nav ms-auto "> 
            <li className='nav-item '><Link to='/' className='nav-link'>Home</Link></li>
            <li className='nav-item'><Link to='/symtomscheck' className='nav-link'>Symptoms Checker</Link></li>
            <li className='nav-item'><Link to='/services' className='nav-link'>Consult</Link></li>
            <li className='nav-item'><Link to='/portfolio' className='nav-link'>Clinics</Link></li>
            <li className='nav-item'><Link to='/contact' className='nav-link'>Help Center</Link></li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
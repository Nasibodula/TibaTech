// import React,{useState} from 'react'
// import { SiConsul } from "react-icons/si";
// import {BsPhoneVibrate} from 'react-icons/bs'
// import {AiOutlineGlobal} from 'react-icons/ai'
// import {CgMenuGridO} from 'react-icons/cg'
// import { Link } from 'react-router-dom';



// export default function Navbar() {
//   const [active, setActive] = useState('navBarMenu')
//  const showNavbar = () =>{
//   setActive('navBarMenu showNavBar')
//  }
//  const removeNavbar = () =>{
//   setActive('navBarMenu')
//  }


//   return (
//     <div className='navBar flex '>
//       <div className='navBarOne flex'>
//         <div className='icon'>
//           <SiConsul/>
//         </div>
//         <div className='none flex'>
//           <li className='flex'><BsPhoneVibrate/>support</li>
//           <li className='flex'><AiOutlineGlobal/>Languages</li>
//         </div>

//         <div className='atb flex'>
//           <span>Sign In</span>
//           <span>Sign Out</span>
//         </div>
//       </div>
//       <div className='navBarTwo'>
//         <div className="logoDiv">
//           <span className='Logo'> DULA</span>
//         </div>

//         <div className={active}>
//           <ul className='menu flex'>
//             <li onClick={removeNavbar} className='listItem'><Link to='/'>Home</Link></li>
//             <li onClick={removeNavbar} className='listItem'><Link to='/services'>Services</Link></li>
//             <li onClick={removeNavbar} className='listItem'>Home</li>
//             <li onClick={removeNavbar} className='listItem'>Home</li>
//           </ul>

//           <button className='btn flex btnOne'>Contact</button>
//         </div>

//         <button className='btn flex btnTwo'>Contact</button>
//         <div onClick={showNavbar} className='toggleIcon'>
//           <CgMenuGridO className='icon'/>
//         </div>
//       </div>
//     </div>
//   )
// }

// {/* <li>
// <Link to="/dashboard">
//   <i className="bx bx-grid-alt"></i>
//   <span className="link_name">Dashboard</span>
// </Link>
// <span className="tooltip">Dashboard</span>
// </li> */}


import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';  // Ensure Bootstrap is imported

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
    <div>
      {/* Header Section */}
      <header className={`py-2 ${isHeaderShrunk ? 'header-shrunk' : 'header-normal'}`}>
        <p className="text-center">Exploring Africa's Wildest Wonders</p>
      </header>

      {/* Navigation Section */}
      <nav className={`navbar navbar-expand-lg navbar-light bg-light ${isSticky ? 'navbar-fixed' : 'navbar-normal'}`}>
        <a className="navbar-brand" href="#">Safari Adventures</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link" href="#big-five">The Big Five</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#savanna">The Savanna</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#guides">Safari Guides</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#photography">Photography</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#conservation">Conservation</a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
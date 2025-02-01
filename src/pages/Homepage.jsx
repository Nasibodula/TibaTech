// import ArticlesPage from '../components/ArticlePage'
import React, { useEffect, useState, useRef } from 'react';
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import Services from '../components/Services'
import Questions from '../components/Questions'
import DoctorsPage from '../components/Doctors'
import Features from '../components/Features'
import About from '../components/Aboutus'
import ScrollReveal from 'scrollreveal';
import Reviews from '../components/Reviews';
import Subscribe from '../components/Subscribe';




export default function Homepage() {
  useEffect(() => {
    const scrollRevealOption = {
      origin: 'bottom',
      distance: '50px',
      duration: 1000,
    };

    // Apply ScrollReveal to entire page
    ScrollReveal().reveal('.hero', { ...scrollRevealOption });
    ScrollReveal().reveal('.section', { ...scrollRevealOption, delay: 500 });
    ScrollReveal().reveal('.footer', { ...scrollRevealOption, delay: 1000 });
  }, []);
  return (
    <div >
      <Hero/>
      <About/>
      <Services/>
      <Questions/>
      <Reviews/>
      <Subscribe/>
      {/* <Footer/> */}
    </div>
  )
}

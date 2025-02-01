import React, { useEffect, useRef } from 'react';
import { PhoneCall } from "lucide-react";
import ScrollReveal from 'scrollreveal';

const Hero = () => {
  const menuBtnRef = useRef(null);
  const navLinksRef = useRef(null);

  useEffect(() => {
    // ScrollReveal options for animation
    const scrollRevealOption = {
      origin: 'bottom',
      distance: '50px',
      duration: 1000,
      delay: 200,
    };

    // ScrollReveal animations for specific elements in Hero component
    ScrollReveal().reveal('.header__container h1', { ...scrollRevealOption });
    ScrollReveal().reveal('.header__container p', { ...scrollRevealOption, delay: 500 });
    ScrollReveal().reveal('.header__container button', { ...scrollRevealOption, delay: 700 });
    ScrollReveal().reveal('.header__image img', { ...scrollRevealOption, delay: 1000 });

    // For menu button and nav links behavior (hamburger menu)
    const menuBtn = menuBtnRef.current;
    const navLinks = navLinksRef.current;

    if (menuBtn && navLinks) {
      const menuBtnIcon = menuBtn.querySelector("i");

      menuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("open");
        const isOpen = navLinks.classList.contains("open");
        menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
      });

      navLinks.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuBtnIcon.setAttribute("class", "ri-menu-line");
      });
    }
  }, []);

  return (
    <section className="mt-1 hero flex" id="home">
      <div className="header__content col-lg-6 text-content ">
        <span className="badge text-black p-2 rounded-pill fw-medium">
          World's Most Adopted Healthcare AI
        </span>
        <h2 className="display-4 fw-medium">
          Revolutionizing<br /> Healthcare with<br /> AI
        </h2>
        <p className="text-muted ">
          Redefine healthcare with AI! Experience the power of faster diagnostics <br /> and precisely tailored treatments, designed by
          TibaTech. Unveil the <br /> immense potential of intelligent care.
        </p>
        <div className="mt-4 d-flex flex-column flex-sm-row gap-3">
          <button className="btn btn-dark d-flex align-items-center" ref={menuBtnRef}>
            <PhoneCall className="me-2" /> Book a call
          </button>
          <button className="btn btn-outline-dark">Appointment</button>
        </div>
      </div>
      <div className="header__image col-lg-6 text-center">
        <img
          src="/assets/digital-brain.png"
          className="text-primary floating-brain"
          alt="Digital Brain"
        />
        <img
          src="/assets/robotic-hand.png"
          alt="Robotic Hand"
          className="img-fluid robotic-hand-image"
          ref={navLinksRef}
        />
      </div>
    </section>
  );
};

export default Hero;
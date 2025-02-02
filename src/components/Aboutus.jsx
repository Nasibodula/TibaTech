import React,{useEffect} from 'react';
import ScrollReveal from 'scrollreveal';
import { Link } from "react-router-dom";


export default function About() {
  useEffect(() => {
    const scrollRevealOption = {
      origin: 'left',
      distance: '50px',
      duration: 1000,
    };

    ScrollReveal().reveal('.section__title', { ...scrollRevealOption });
    ScrollReveal().reveal('.section__content', { ...scrollRevealOption, delay: 500 });
  }, []);
  return (
    <section className="about py-5" id="about">
      <div className="container">
        <div className="row d-flex align-items-center">
                    {/* Right Side - Image */}
                    <div className="col-lg-6 col-md-12 text-center">
            <img 
              src="/assets/robotic-hand2.jpg" 
              alt="db" 
              className="img-fluid about__image"
            />
          </div>
          {/* Left Side - Text Content */}
          <div className="col-lg-6 col-md-12">
            <h2 className="section__header mb-4">About Us</h2>
            <p className="section__description">
            At TibaTech, we are committed to revolutionizing healthcare accessibility,
            especially in underserved rural areas. We understand the challenges faced by
            communities with limited access to doctors and healthcare services. Our mission
            is to bridge this gap by leveraging the power of artificial intelligence to provide
            essential health guidance, empower individuals, and transform the way healthcare is delivered.
            </p>
            <p className="section__description">
            Our goal is to empower individuals with the knowledge they need to take charge of their
            health and well-being, reduce health inequalities, and ultimately improve the quality
            of life for those in rural Kenya.
            </p>
            <Link to='/viewmore'><button className="btn btn-dark  mt-3">View More</button></Link>
          </div>

        </div>
      </div>
    </section>
  );
} 